import { Injectable, inject } from '@angular/core';
import {
  MediaAdminFolderService,
  MediaAdminFolderDoc,
} from './media-admin-folder.service';
import {
  MediaAdminMediaService,
  MediaAdminMediaDoc,
} from './media-admin-media.service';
import { StorageStructureService } from '../admin/services/storage-structure.service';
import {
  collection,
  onSnapshot,
  query,
  where,
  type Firestore,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable, map, combineLatest, of, catchError } from 'rxjs';
import { Client } from '../../core/models/client.model';

export interface MediaAdminNode {
  name: string;
  path: string;
  kind: 'folder' | 'file' | 'service';
  isPackage?: boolean;
  isDynamic?: boolean;
  isClientFolder?: boolean;
  clientId?: string;
  asset?: MediaAdminMediaDoc;
  folder?: MediaAdminFolderDoc;
}

@Injectable({ providedIn: 'root' })
export class MediaAdminService {
  private readonly folderService = inject(MediaAdminFolderService);
  private readonly mediaService = inject(MediaAdminMediaService);
  private readonly storageStructure = inject(StorageStructureService);
  private readonly firestore: Firestore = getFirestore();

  /**
   * Obtiene la estructura combinada (estática + dinámica) para una ruta.
   */
  getNodes$(path: string): Observable<MediaAdminNode[]> {
    const normalizedPath = this.normalizePath(path);
    const isRootLevel = normalizedPath === '' || normalizedPath === 'servicios';
    const isClientsContainerPath = this.isClientsContainerPath(normalizedPath);

    // 1. Obtener hijos estáticos
    const staticChildren =
      this.storageStructure.getStaticChildren(normalizedPath);
    const staticNodes: MediaAdminNode[] = staticChildren
      .map<MediaAdminNode>((c) => ({
        name: c.name || 'Sin nombre',
        path: c.path || '',
        kind: isRootLevel ? 'service' : 'folder',
        isPackage: c.isPackage,
      }))
      .filter((node) => this.hasValidPath(node));

    // 2. Obtener hijos dinámicos (Firestore)
    const root = normalizedPath ? normalizedPath.split('/')[0] : '';
    const dynamicFolders$ =
      root && normalizedPath
        ? this.folderService
            .listFolders$({ root, parentPath: normalizedPath })
            .pipe(catchError(() => of([])))
        : of([]);

    // 3. Obtener archivos (Firestore)
    const files$ = this.getFilesByFolderWithAliases$(normalizedPath);

    const clientFolders$ = this.getClientFoldersByParent$(normalizedPath);

    return combineLatest([dynamicFolders$, clientFolders$, files$]).pipe(
      map(([folders, clientFolders, assets]) => {
        const dynamicNodes: MediaAdminNode[] = (folders || [])
          .filter((f) => !!f)
          .map<MediaAdminNode>((f) => ({
            name: f.name || 'Sin nombre',
            path: f.path || '',
            kind: 'folder',
            isDynamic: true,
            folder: f,
          }))
          .filter((node) => this.hasValidPath(node));

        const clientFolderNodes: MediaAdminNode[] = (clientFolders || [])
          .filter((n) => !!n)
          .filter((node) => this.hasValidPath(node));

        const fileNodes: MediaAdminNode[] = (assets || [])
          .filter((a) => !!a)
          .map<MediaAdminNode>((a) => ({
            name: a.name || 'Sin nombre',
            path: a.storagePath || '',
            kind: 'file',
            asset: a,
          }))
          .filter((node) => this.hasValidPath(node));

        if (isClientsContainerPath) {
          return [...clientFolderNodes, ...fileNodes];
        }

        return [...staticNodes, ...dynamicNodes, ...clientFolderNodes, ...fileNodes];
      }),
    );
  }

  private getClientFoldersByParent$(parentPath: string): Observable<MediaAdminNode[]> {
    const normalizedParent = this.normalizePath(parentPath);
    const segments = normalizedParent.split('/');
    const isSupportedPath =
      segments.length >= 3 &&
      segments[0] === 'servicios' &&
      segments[2] === 'clientes';

    if (!isSupportedPath) {
      return of([]);
    }

    const service = segments[1];

    return new Observable<MediaAdminNode[]>((subscriber) => {
      const q = query(
        collection(this.firestore, 'clients'),
        where('service', '==', service),
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const nodes = snapshot.docs
            .map((record) => ({
              id: record.id,
              ...(record.data() as Omit<Client, 'id'>),
            }))
            .filter((client) => this.normalizePath(client.folder) !== '')
            .filter((client) => {
              const folder = this.normalizePath(client.folder);
              return this.getFolderAliases(folder).some(
                (candidate) =>
                  candidate.startsWith(`${normalizedParent}/`) ||
                  candidate === normalizedParent,
              );
            })
            .map<MediaAdminNode>((client) => ({
              name: client.name,
              path: this.toPreferredClientFolder(this.normalizePath(client.folder)),
              kind: 'folder',
              isDynamic: true,
              isClientFolder: true,
              clientId: client.id,
            }))
            .filter((node) => this.hasValidPath(node));

          subscriber.next(nodes);
        },
        () => subscriber.next([]),
      );

      return unsubscribe;
    });
  }

  private getFilesByFolderWithAliases$(
    folderPath: string,
  ): Observable<MediaAdminMediaDoc[]> {
    const aliases = this.getFolderAliases(folderPath);
    if (aliases.length === 1) {
      return this.mediaService.listByFolder$(aliases[0]).pipe(
        catchError(() => of([])),
      );
    }

    return combineLatest(
      aliases.map((alias) =>
        this.mediaService.listByFolder$(alias).pipe(catchError(() => of([]))),
      ),
    ).pipe(
      map((groups) => {
        const seen = new Set<string>();
        return groups
          .flat()
          .filter((asset) => {
            const key = asset.id || asset.storagePath || asset.url || asset.name;
            if (!key || seen.has(key)) {
              return false;
            }
            seen.add(key);
            return true;
          });
      }),
    );
  }

  private getFolderAliases(folderPath: string): string[] {
    const normalized = this.normalizePath(folderPath);
    if (!normalized) {
      return [];
    }

    const aliases = [normalized];
    if (normalized.includes('/grados/clientes/')) {
      aliases.push(normalized.replace('/grados/clientes/', '/grados/estudiantes/'));
    } else if (normalized.includes('/grados/estudiantes/')) {
      aliases.push(normalized.replace('/grados/estudiantes/', '/grados/clientes/'));
    }

    return Array.from(new Set(aliases));
  }

  private toPreferredClientFolder(folderPath: string): string {
    return this.normalizePath(folderPath).replace(
      '/grados/estudiantes/',
      '/grados/clientes/',
    );
  }

  /**
   * Obtiene el árbol completo de carpetas para el sidebar (solo carpetas).
   */
  getFolderTree$(): Observable<MediaAdminNode[]> {
    // Para el sidebar, queremos la estructura jerárquica.
    // Empezamos con la raíz 'servicios'
    return this.getNodes$('').pipe(
      map((nodes) =>
        nodes.filter(
          (n) =>
            !!n && !!n.path && (n.kind === 'service' || n.kind === 'folder'),
        ),
      ),
    );
  }

  async deleteFile(asset: MediaAdminMediaDoc): Promise<void> {
    return this.mediaService.softDelete(asset);
  }

  async createClientFolder(
    parentPath: string,
    name: string,
  ): Promise<MediaAdminFolderDoc> {
    const root = parentPath.split('/')[0] || 'servicios';
    return this.folderService.createFolder({ root, parentPath, name });
  }

  async deleteFolder(path: string): Promise<void> {
    return this.folderService.deleteFolder(path);
  }

  private normalizePath(value: string): string {
    return String(value ?? '')
      .trim()
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .toLowerCase();
  }

  private isClientsContainerPath(path: string): boolean {
    const segments = this.normalizePath(path).split('/');
    return (
      segments.length >= 3 &&
      segments[0] === 'servicios' &&
      segments[2] === 'clientes'
    );
  }

  private hasValidPath(node: MediaAdminNode | null | undefined): boolean {
    return (
      !!node && typeof node.path === 'string' && node.path.trim().length > 0
    );
  }
}
