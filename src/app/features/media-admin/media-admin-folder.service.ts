import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
  type Firestore
} from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface MediaAdminFolderDoc {
  id: string;
  root: string;
  path: string;
  parentPath: string;
  name: string;
  segment: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class MediaAdminFolderService {
  private readonly app = inject(FirebaseApp);
  private readonly firestore: Firestore = getFirestore(this.app);

  listFolders$(options: { root: string; parentPath: string }): Observable<MediaAdminFolderDoc[]> {
    const root = this.normalizeSegment(options.root);
    const parentPath = this.normalizePath(options.parentPath);

    return new Observable<MediaAdminFolderDoc[]>((subscriber) => {
      const q = query(
        collection(this.firestore, 'mediaFolders'),
        where('root', '==', root),
        where('parentPath', '==', parentPath)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const folders = snapshot.docs
            .map((record) => ({
              id: record.id,
              ...(record.data() as Omit<MediaAdminFolderDoc, 'id'>)
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

          subscriber.next(folders);
        },
        (error) => subscriber.error(error)
      );

      return unsubscribe;
    });
  }

  listAllFoldersByRoot$(options: { root: string }): Observable<MediaAdminFolderDoc[]> {
    const root = this.normalizeSegment(options.root);

    return new Observable<MediaAdminFolderDoc[]>((subscriber) => {
      const q = query(collection(this.firestore, 'mediaFolders'), where('root', '==', root));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const folders = snapshot.docs
            .map((record) => ({
              id: record.id,
              ...(record.data() as Omit<MediaAdminFolderDoc, 'id'>)
            }))
            .sort((a, b) => a.path.localeCompare(b.path));

          subscriber.next(folders);
        },
        (error) => subscriber.error(error)
      );

      return unsubscribe;
    });
  }

  async createFolder(options: { root: string; parentPath: string; name: string }): Promise<MediaAdminFolderDoc> {
    const root = this.normalizeSegment(options.root);
    const parentPath = this.normalizePath(options.parentPath);
    const name = String(options.name ?? '').trim();

    if (!root) {
      throw new Error('Root inválido.');
    }

    if (!parentPath) {
      throw new Error('Parent inválido.');
    }

    if (!name) {
      throw new Error('Ingresa un nombre de carpeta.');
    }

    const segment = this.normalizeSegment(name);
    if (!segment) {
      throw new Error('Nombre de carpeta inválido.');
    }

    const path = this.joinPath(parentPath, segment);
    const id = this.idFromPath(path);

    const nowIso = new Date().toISOString();
    const docValue: Omit<MediaAdminFolderDoc, 'id'> = {
      root,
      path,
      parentPath,
      name,
      segment,
      createdAt: nowIso,
      updatedAt: nowIso
    };

    await setDoc(doc(this.firestore, 'mediaFolders', id), docValue);

    return {
      id,
      ...docValue
    };
  }

  async deleteFolder(path: string): Promise<void> {
    const normalized = this.normalizePath(path);
    if (!normalized) return;

    const id = this.idFromPath(normalized);
    await deleteDoc(doc(this.firestore, 'mediaFolders', id));
  }

  async updateFolderName(path: string, name: string): Promise<void> {
    const normalized = this.normalizePath(path);
    if (!normalized) return;

    const trimmedName = String(name ?? '').trim();
    if (!trimmedName) {
      throw new Error('Ingresa un nombre.');
    }

    const id = this.idFromPath(normalized);
    await setDoc(
      doc(this.firestore, 'mediaFolders', id),
      {
        name: trimmedName,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
  }

  joinPath(parentPath: string, segment: string): string {
    const parent = this.normalizePath(parentPath);
    const child = this.normalizeSegment(segment);
    if (!parent) return child;
    if (!child) return parent;
    return `${parent}/${child}`;
  }

  private normalizePath(value: string): string {
    return String(value ?? '')
      .trim()
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9/_-]+/g, '')
      .toLowerCase();
  }

  private normalizeSegment(value: string): string {
    return String(value ?? '')
      .trim()
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9_-]+/g, '')
      .toLowerCase();
  }

  private idFromPath(path: string): string {
    return this.normalizePath(path).replace(/\//g, '__');
  }
}
