import { inject } from '@angular/core';
import { Firestore as AngularFirestore } from '@angular/fire/firestore';
import { Observable, catchError, defer, map, of } from 'rxjs';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  type Firestore as FirebaseFirestore
} from 'firebase/firestore';
import { CmsEntityBase } from '../models/cms.models';
import { FirestoreCmsAdapter } from '../adapters/firebase-cms-document.adapters';
import { CmsEntityRepository } from '../repositories/cms-entity-repository';

type FirestoreEntityRecord = Record<string, unknown> & { id: string };

export abstract class FirebaseCmsEntityRepositoryBase<TEntity extends CmsEntityBase>
  implements CmsEntityRepository<TEntity>
{
  private readonly firestore = inject<FirebaseFirestore>(AngularFirestore);

  protected abstract readonly collectionPath: string;
  protected abstract readonly adapter: FirestoreCmsAdapter<TEntity>;

  readonly collection$: Observable<TEntity[]> = defer(() => {
    const collectionPath = this.resolveCollectionPath();

    return new Observable<TEntity[]>((subscriber) =>
      onSnapshot(
        this.collectionRef,
        (snapshot) => {
          subscriber.next(
            snapshot.docs.map((record) =>
              this.adapter.fromFirestore({
                id: record.id,
                ...(record.data() as Record<string, unknown>)
              } as FirestoreEntityRecord)
            )
          );
        },
        (error) => subscriber.error(error)
      )
    ).pipe(
      map((records) =>
        records
          .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name))
      ),
      catchError((error) => {
        console.error(`[Firebase CMS] No se pudo leer la colección ${collectionPath}.`, error);
        return of([] as TEntity[]);
      })
    );
  });

  readonly publishedCollection$ = this.collection$.pipe(
    map((items) => items.filter((item) => item.status === 'published' && item.active && !item.deletedAt))
  );

  async create(payload: Partial<TEntity>): Promise<TEntity> {
    await this.beforeCreate(payload);
    const now = new Date().toISOString();
    const created = {
      ...payload,
      createdAt: payload.createdAt ?? now,
      updatedAt: now
    } as Partial<TEntity>;
    const reference = await addDoc(this.collectionRef, this.adapter.toFirestore(created, { create: true }));
    return this.adapter.fromFirestore({ id: reference.id, ...(created as Record<string, unknown>) });
  }

  async update(id: string, payload: Partial<TEntity>): Promise<void> {
    await this.beforeUpdate(id, payload);
    const reference = doc(this.firestore, this.collectionPath, id);
    await updateDoc(reference, this.adapter.toFirestore(payload));
  }

  async delete(id: string): Promise<void> {
    const reference = doc(this.firestore, this.collectionPath, id);
    await deleteDoc(reference);
  }

  async exists(id: string): Promise<boolean> {
    if (!id.trim()) {
      return false;
    }

    const snapshot = await getDoc(doc(this.firestore, this.collectionPath, id));
    return snapshot.exists();
  }

  protected async beforeCreate(_payload: Partial<TEntity>): Promise<void> {}

  protected async beforeUpdate(_id: string, _payload: Partial<TEntity>): Promise<void> {}

  protected async ensureDocumentExists(collectionPath: string, id: string): Promise<boolean> {
    if (!id.trim()) {
      return false;
    }

    const snapshot = await getDoc(doc(this.firestore, collectionPath, id));
    return snapshot.exists();
  }

  protected async getDocumentRecord(collectionPath: string, id: string): Promise<Record<string, unknown> | null> {
    if (!id.trim()) {
      return null;
    }

    const snapshot = await getDoc(doc(this.firestore, collectionPath, id));
    return snapshot.exists() ? (snapshot.data() as Record<string, unknown>) : null;
  }

  protected async ensureAllDocumentsExist(collectionPath: string, ids: string[]): Promise<string[]> {
    const uniqueIds = Array.from(new Set(ids.map((id) => id.trim()).filter(Boolean)));
    const checks = await Promise.all(
      uniqueIds.map(async (id) => ({
        id,
        exists: await this.ensureDocumentExists(collectionPath, id)
      }))
    );

    return checks.filter((entry) => !entry.exists).map((entry) => entry.id);
  }

  protected resolveCollectionPath(): string {
    const collectionPath = String(this.collectionPath ?? '').trim();

    if (!collectionPath) {
      throw new Error('[Firebase CMS] Se intentó usar un repositorio sin collectionPath configurado.');
    }

    return collectionPath;
  }

  private get collectionRef() {
    return collection(this.firestore, this.resolveCollectionPath());
  }
}
