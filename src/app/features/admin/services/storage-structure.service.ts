import { Injectable, inject, isDevMode } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  type FirebaseStorage,
} from 'firebase/storage';
import { from, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

export interface StorageFolderStructure {
  page: string;
  categories?: {
    name: string;
    packages?: string[];
    subfolders?: string[];
    isDynamic?: boolean; // Indica si la carpeta es para contenido dinámico (ej: clientes)
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class StorageStructureService {
  private readonly app = inject(FirebaseApp);
  private readonly storage: FirebaseStorage = getStorage(this.app);
  private processedPaths = new Set<string>();

  // 1. ESTRUCTURA CONFIGURABLE
  private readonly structure: StorageFolderStructure[] = [
    {
      page: 'bodas',
      categories: [
        {
          name: 'hibridas',
          packages: ['esencial', 'completo', 'premium', 'luxury'],
        },
        {
          name: 'fotografia-de-bodas',
          packages: ['plan-esencial', 'plan-completo', 'plan-premium'],
        },
        {
          name: 'video-de-bodas',
          packages: [
            'video-esencial',
            'video-completo',
            'video-premium',
            'luxury',
          ],
        },
        {
          name: 'preboda',
          packages: ['preboda-esencial', 'preboda-completa', 'preboda-premium'],
        },
        {
          name: 'postboda',
          packages: ['postboda-esencial', 'postboda-completa', 'postboda-premium'],
        },
        {
          name: 'clientes',
          isDynamic: true, // 4. SOPORTE PARA CARPETAS DINÁMICAS
        },
      ],
    },
    {
      page: 'quinces',
      categories: [
        {
          name: 'fotografia-de-quince',
          packages: ['esencial', 'completo', 'premium'],
        },
        {
          name: 'video-de-quince',
          packages: ['esencial', 'completo', 'premium'],
        },
        {
          name: 'mixto',
          packages: ['esencial', 'completo', 'premium'],
        },
        {
          name: 'clientes',
          isDynamic: true,
        },
      ],
    },
    {
      page: 'prebodas',
      categories: [
        {
          name: 'clientes',
          isDynamic: true,
        },
      ],
    },
    {
      page: 'grados',
      categories: [
        {
          name: 'estudiantes',
          packages: [
            'plan-esencial',
            'plan-marco',
            'plan-memoria',
            'plan-legado',
          ],
        },
        {
          name: 'clientes',
          isDynamic: true,
        },
      ],
    },
    {
      page: 'corporativos',
      categories: [
        { name: 'video-institucional' },
        { name: 'redes' },
        { name: 'eventos' },
        { name: 'marca-personal' },
      ],
    },
    {
      page: 'video',
      categories: [
        {
          name: 'paquetes',
          packages: [
            'basico',
            'intermedio',
            'avanzado',
            'personalizado',
            'cortometraje',
          ],
        },
      ],
    },
    {
      page: 'otros',
      categories: [
        {
          name: 'fotografia',
          subfolders: [
            'foto-sesion-personal',
            'foto-sesion-redes',
            'foto-retrato-profesional',
          ],
        },
        {
          name: 'video',
          subfolders: [
            'video-presentacion-personal',
            'video-mensaje',
            'video-reel-basico',
          ],
        },
        {
          name: 'contenido',
          subfolders: [
            'contenido-plan-mensual',
            'contenido-express',
            'contenido-reel-profesional',
            'contenido-pack',
          ],
        },
        {
          name: 'produccion',
          subfolders: [
            'prod-direccion-creativa',
            'prod-guion-storytelling',
            'prod-video-referencia',
            'prod-cinematografica',
            'prod-video-promocional',
            'prod-entrevista-testimonio',
            'prod-podcast-basico',
          ],
        },
        {
          name: 'estudio',
          subfolders: ['estudio-sesion-foto', 'estudio-video'],
        },
        {
          name: 'momentos',
          subfolders: [
            'momentos-pareja',
            'momentos-cumpleanos',
            'momentos-sorpresa',
          ],
        },
      ],
    },
  ];

  /**
   * Expande una ruta en todos sus niveles jerárquicos.
   */
  expandPath(path: string): string[] {
    const segments = path.split('/').filter(Boolean);
    const result: string[] = [];
    let current = '';

    for (const segment of segments) {
      current = current ? `${current}/${segment}` : segment;
      result.push(current);
    }

    return result;
  }

  /**
   * Crea un archivo .keep en la ruta especificada para simular una carpeta en Firebase Storage.
   * Valida existencia robusta antes de subir.
   */
  async createFolder(path: string): Promise<{
    success: boolean;
    path: string;
    exists?: boolean;
    status: 'created' | 'exists' | 'error';
  }> {
    // 4. VALIDACIÓN DE PATH VACÍO
    if (!path) {
      return { success: false, path, status: 'error' };
    }

    const keepFilePath = `${path}/.keep`;
    const storageRef = ref(this.storage, keepFilePath);

    try {
      // 2. VALIDACIÓN DE EXISTENCIA ROBUSTA
      await getDownloadURL(storageRef);
      if (isDevMode()) console.log(`⚠ existente: ${path}`);
      return { success: true, path, exists: true, status: 'exists' };
    } catch (error: any) {
      // 2. CORRECCIÓN ROBUSTA DE ERRORES (REQUISITO #7)
      const errorCode = error?.code || '';

      if (errorCode === 'storage/object-not-found') {
        try {
          // 3. MEJORAR CREACIÓN DE BLOB (.keep) (REQUISITO #1)
          const blob = new Blob([''], { type: 'application/octet-stream' });
          await uploadBytes(storageRef, blob);
          if (isDevMode()) console.log(`✔ creada: ${path}`);
          return { success: true, path, exists: false, status: 'created' };
        } catch (uploadError) {
          console.error(`❌ error real al subir en ${path}:`, uploadError);
          return { success: false, path, status: 'error' };
        }
      }

      // Si es otro tipo de error (red, auth), no asumimos inexistencia
      console.warn(`⚠ error al verificar: ${path} (Error: ${errorCode})`);
      return { success: false, path, status: 'error' };
    }
  }

  /**
   * Genera la lista de rutas para asegurar visibilidad en Firebase Storage.
   */
  private generatePaths(): string[] {
    const pathSet = new Set<string>();

    for (const item of this.structure) {
      const basePath = `servicios/${item.page}`;

      // 1. ASEGURAR VISIBILIDAD DE CARPETAS BASE
      pathSet.add(basePath);

      // 2. ASEGURAR CARPETA CLIENTES RAÍZ POR SERVICIO (REQUISITO #3)
      pathSet.add(`${basePath}/clientes`);

      if (!item.categories || item.categories.length === 0) {
        continue;
      }

      for (const cat of item.categories) {
        const catPath = `${basePath}/${cat.name}`;

        // 1. ASEGURAR VISIBILIDAD DE CARPETAS DE CATEGORÍA
        pathSet.add(catPath);

        // Si es dinámica (clientes), ya se manejó arriba para la raíz del servicio
        if (cat.isDynamic || (!cat.packages && !cat.subfolders)) {
          continue;
        }

        if (cat.packages) {
          for (const pkg of cat.packages) {
            pathSet.add(`${catPath}/${pkg}`);
          }
        }

        if (cat.subfolders) {
          for (const sub of cat.subfolders) {
            pathSet.add(`${catPath}/${sub}`);
          }
        }
      }
    }

    const finalPaths = Array.from(pathSet);

    if (isDevMode()) {
      console.log(
        `[StorageStructure] Rutas generadas (${finalPaths.length}):`,
        finalPaths,
      );
    }

    // 3. ORDENAMIENTO POR PROFUNDIDAD (Padre -> Hijo)
    return finalPaths.sort((a, b) => a.split('/').length - b.split('/').length);
  }

  /**
   * Retorna los hijos directos (carpetas) de una ruta dada basándose en la estructura estática.
   */
  getStaticChildren(
    path: string,
  ): { name: string; path: string; isPackage?: boolean }[] {
    const normalizedPath = path
      .trim()
      .replace(/\/+/g, '/')
      .replace(/^\/|\/$/g, '')
      .toLowerCase();

    // Si es la raíz (vacío), retornar solo la carpeta "servicios"
    if (!normalizedPath) {
      return [{ name: 'Servicios', path: 'servicios' }];
    }

    // Si es "servicios", retornar las páginas (bodas, quinces, etc.)
    if (normalizedPath === 'servicios') {
      return this.structure
        .filter((s) => s && s.page)
        .map((s) => ({
          name: s.page.charAt(0).toUpperCase() + s.page.slice(1),
          path: `servicios/${s.page}`,
        }));
    }

    const segments = normalizedPath.split('/');
    if (segments[0] !== 'servicios') return [];

    const pageSlug = segments[1];
    const page = this.structure.find((s) => s && s.page === pageSlug);
    if (!page) return [];

    // Si la ruta es servicios/{page}
    if (segments.length === 2) {
      const categories =
        page.categories
          ?.filter((c) => c && c.name)
          .map((c) => ({
            name: c.name
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            path: `servicios/${pageSlug}/${c.name}`,
          })) || [];

      return [
        ...categories,
        { name: 'Clientes', path: `servicios/${pageSlug}/clientes` },
      ];
    }

    // Si la ruta es servicios/{page}/{category}
    if (segments.length === 3) {
      const categoryName = segments[2];
      if (categoryName === 'clientes') return [];

      const category = page.categories?.find(
        (c) => c && c.name === categoryName,
      );
      if (!category) return [];

      const children: { name: string; path: string; isPackage?: boolean }[] =
        [];

      if (category.packages) {
        category.packages
          .filter((p) => !!p)
          .forEach((p) => {
            children.push({
              name: p
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
              path: `servicios/${pageSlug}/${categoryName}/${p}`,
              isPackage: true,
            });
          });
      }

      if (category.subfolders) {
        category.subfolders
          .filter((s) => !!s)
          .forEach((s) => {
            children.push({
              name: s
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
              path: `servicios/${pageSlug}/${categoryName}/${s}`,
            });
          });
      }

      return children;
    }

    return [];
  }

  /**
   * Crea la estructura completa de carpetas de forma secuencial.
   * Retorna progreso y estado detallado.
   */
  createFullStructure(): Observable<{
    total: number;
    current: number;
    path: string;
    success: boolean;
    progress: number;
    status: 'created' | 'exists' | 'error';
  }> {
    this.processedPaths.clear();
    const allPaths = this.generatePaths();
    const total = allPaths.length;

    if (total === 0) {
      return of({
        total: 0,
        current: 0,
        path: '',
        success: true,
        progress: 100,
        status: 'exists',
      });
    }

    return from(allPaths).pipe(
      // 3. EJECUCIÓN SECUENCIAL (REQUISITO #5 y #8)
      concatMap((path, index) => {
        const current = index + 1;
        const progress = Math.round((current / total) * 100);

        return from(this.createFolder(path)).pipe(
          map((result) => ({
            total,
            current,
            path: result.path,
            success: result.success,
            progress,
            status: result.status,
          })),
        );
      }),
    );
  }
}
