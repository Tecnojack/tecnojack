import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CMS_COLLECTION_CONFIGS } from './config/admin-cms.config';
import { FirebaseCmsMediaUploadService } from './firebase/firebase-cms-media-upload.service';
import { AdminFieldConfig, CmsCollectionKey, CmsEntityBase, CmsEntityRecord, CmsEntityStatus } from './models/cms.models';
import { CMS_BACKEND_MODE, CmsBackendMode } from './repositories/cms-database-repository';
import { CmsMediaService } from './services/cms-media.service';
import { MockCmsStoreService } from './services/mock-cms-store.service';

function slugify(value: string): string {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function humanizeServiceScope(value: string): string {
  const normalized = String(value ?? '').trim().toLowerCase();
  const map: Record<string, string> = {
    bodas: 'Bodas',
    boda: 'Bodas',
    quinces: 'Quinces',
    quince: 'Quinces',
    cumpleanos: 'Cumpleaños',
    'cumpleaños': 'Cumpleaños',
    grados: 'Grados',
    grado: 'Grados',
    preboda: 'Preboda',
    prebodas: 'Preboda',
    videos: 'Videos',
    video: 'Videos',
    general: 'General'
  };

  if (map[normalized]) {
    return map[normalized];
  }

  return normalized
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function isCmsCollectionKey(value: string | null): value is CmsCollectionKey {
  return !!value && value in CMS_COLLECTION_CONFIGS;
}

type StatusFilter = 'all' | CmsEntityStatus;

interface FieldGroup {
  key: string;
  title: string;
  description: string;
  fields: AdminFieldConfig[];
}

@Component({
  selector: 'app-admin-collection-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './admin-collection-page.component.html',
  styleUrl: './admin-collection-page.component.scss'
})
export class AdminCollectionPageComponent {
  readonly search = signal('');
  readonly statusFilter = signal<StatusFilter>('all');
  readonly editorOpen = signal(false);
  readonly editorMode = signal<'create' | 'edit'>('create');
  readonly selectedId = signal<string | null>(null);
  readonly relationSearch = signal<Record<string, string>>({});
  readonly relationDraft = signal<Record<string, string>>({});
  readonly chipDraft = signal<Record<string, string>>({});
  readonly formError = signal('');

  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(MockCmsStoreService);
  private readonly backendMode = inject<CmsBackendMode>(CMS_BACKEND_MODE);
  private readonly mediaUpload = inject(FirebaseCmsMediaUploadService);
  private readonly media = inject(CmsMediaService);
  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  private readonly state = toSignal(this.store.state$, { initialValue: this.store.getSnapshot() });

  readonly form: FormGroup = this.fb.group({});

  readonly collectionKey = computed<CmsCollectionKey>(() => {
    const candidate = this.routeParams().get('collection');
    return isCmsCollectionKey(candidate) ? candidate : 'pages';
  });

  readonly config = computed(() => CMS_COLLECTION_CONFIGS[this.collectionKey()]);
  readonly pagesById = computed(() => new Map((this.state().pages as CmsEntityRecord[]).map((page) => [page.id, page])));
  readonly servicesById = computed(() => new Map((this.state().services as CmsEntityRecord[]).map((service) => [service.id, service])));

  readonly items = computed(() => {
    const collection = this.state()[this.collectionKey()] as CmsEntityRecord[];
    return [...collection].sort((left, right) => left.order - right.order || left.name.localeCompare(right.name));
  });

  readonly summaryStats = computed(() => ({
    total: this.items().length,
    draft: this.items().filter((item) => item.status === 'draft').length,
    published: this.items().filter((item) => item.status === 'published').length,
    archived: this.items().filter((item) => item.status === 'archived').length
  }));

  readonly filteredItems = computed(() => {
    const query = this.search().trim().toLowerCase();
    const status = this.statusFilter();

    const byStatus = this.items().filter((item) => {
      if (status !== 'all') {
        return item.status === status;
      }

      return true;
    });

    if (!query) {
      return byStatus;
    }

    return byStatus.filter((item) => JSON.stringify(item).toLowerCase().includes(query));
  });

  readonly selectedItem = computed(() => this.items().find((item) => item.id === this.selectedId()) ?? null);

  readonly fieldGroups = computed<FieldGroup[]>(() => this.buildFieldGroups(this.config().fields));

  constructor() {
    effect(() => {
      this.collectionKey();
      this.editorOpen.set(false);
      this.selectedId.set(null);
      this.search.set('');
      this.statusFilter.set('all');
      this.relationSearch.set({});
      this.relationDraft.set({});
      this.chipDraft.set({});
      this.formError.set('');
    });
  }

  updateSearch(value: string): void {
    this.search.set(value);
  }

  updateStatusFilter(value: StatusFilter): void {
    this.statusFilter.set(value);
  }

  openCreate(): void {
    this.editorMode.set('create');
    this.selectedId.set(null);
    this.editorOpen.set(true);
    this.resetEditorHelpers();
    this.resetForm(this.buildDraft());
  }

  editItem(item: CmsEntityRecord): void {
    this.editorMode.set('edit');
    this.selectedId.set(item.id);
    this.editorOpen.set(true);
    this.resetEditorHelpers();
    this.resetForm(this.toRecord(item));
  }

  async duplicateItem(item: CmsEntityRecord): Promise<void> {
    try {
      await this.store.duplicate(this.collectionKey(), item.id);
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo duplicar el registro.'));
    }
  }

  closeEditor(): void {
    this.editorOpen.set(false);
    this.formError.set('');
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formError.set('');

    try {
      const payload = this.serializeForm();
      if (this.editorMode() === 'create') {
        const created = await this.store.create(this.collectionKey(), payload);
        this.selectedId.set(created.id);
        this.editorMode.set('edit');
        this.resetForm(this.toRecord(created));
      } else if (this.selectedId()) {
        await this.store.update(this.collectionKey(), this.selectedId()!, payload);
        const next = this.items().find((item) => item.id === this.selectedId());
        if (next) {
          this.resetForm(this.toRecord(next));
        }
      }
    } catch (error) {
      this.formError.set(error instanceof Error ? error.message : 'No se pudo guardar el registro.');
    }
  }

  async deleteItem(item: CmsEntityRecord): Promise<void> {
    if (!this.canDelete(item)) {
      return;
    }

    const shouldDelete = window.confirm(`Archivar y ocultar ${item.name}? Esta acción conservará el registro en la base para poder restaurarlo después.`);
    if (!shouldDelete) {
      return;
    }

    try {
      await this.store.delete(this.collectionKey(), item.id);
      if (this.selectedId() === item.id) {
        this.closeEditor();
      }
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo archivar el registro.'));
    }
  }

  async toggleActive(item: CmsEntityRecord): Promise<void> {
    try {
      await this.store.toggleActive(this.collectionKey(), item.id);
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo actualizar el estado activo.'));
    }
  }

  async publishItem(item: CmsEntityRecord): Promise<void> {
    try {
      await this.store.publish(this.collectionKey(), item.id);
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo publicar el registro.'));
    }
  }

  async restoreItem(item: CmsEntityRecord): Promise<void> {
    try {
      await this.store.restore(this.collectionKey(), item.id);
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo restaurar el registro.'));
    }
  }

  async drop(event: CdkDragDrop<CmsEntityRecord[]>): Promise<void> {
    if (this.search().trim() || this.statusFilter() !== 'all') {
      return;
    }

    const ordered = [...this.items()];
    moveItemInArray(ordered, event.previousIndex, event.currentIndex);
    try {
      await this.store.reorder(this.collectionKey(), ordered.map((item) => item.id));
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, 'No se pudo reordenar la colección.'));
    }
  }

  canDelete(item: CmsEntityRecord): boolean {
    return !(this.collectionKey() === 'generalSettings' && this.items().length === 1 && item.id === 'settings-primary');
  }

  hasControl(name: string): boolean {
    return this.form.contains(name);
  }

  control(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  getFieldOptions(field: AdminFieldConfig): Array<{ label: string; value: string }> {
    if (field.options) {
      return field.options;
    }

    const relationKey = field.relationCollection ?? (this.controlValue(field.dynamicRelationField ?? '') as CmsCollectionKey | undefined);
    if (!relationKey || !(relationKey in this.state())) {
      return [];
    }

    const collection = this.state()[relationKey] as CmsEntityBase[];
    return collection.map((item) => ({ label: this.entityDisplayName(item, relationKey), value: item.id }));
  }

  fieldHelp(field: AdminFieldConfig): string {
    if (field.type === 'multiselect') {
      return field.hint ?? 'Relaciona registros existentes o crea uno nuevo sin salir del editor.';
    }

    if (field.type === 'chips') {
      return field.hint ?? 'Agrega valores uno por uno para mantenerlos claros y reutilizables.';
    }

    if (field.type === 'file') {
      return field.hint ?? 'La subida mock guarda el archivo en localStorage como data URL.';
    }

    if (field.type === 'json') {
      return field.hint ?? 'Usa este bloque solo cuando la estructura necesite algo avanzado fuera del flujo visual.';
    }

    return field.hint ?? '';
  }

  fieldHint(field: AdminFieldConfig): string {
    if (field.type === 'chips') {
      return 'Puedes borrar cada item individualmente.';
    }

    if (field.type === 'json') {
      return 'Si el JSON es inválido, se guardará vacío.';
    }

    return field.hint ?? '';
  }

  async onFileSelected(field: AdminFieldConfig, event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    const config = field.fileConfig;
    if (!file || !config) {
      return;
    }

    if (this.backendMode === 'firebase') {
      try {
        const uploaded = await this.mediaUpload.uploadFile(file, {
          alt: file.name.replace(/\.[^.]+$/, ''),
          folder: 'cms/uploads'
        });

        this.form.patchValue({
          [config.urlKey]: uploaded.url,
          [config.altKey ?? 'alt']: uploaded.alt,
          [config.mimeTypeKey ?? 'mimeType']: uploaded.mimeType,
          [config.sizeKey ?? 'sizeLabel']: uploaded.sizeLabel,
          [config.mockFlagKey ?? 'isMockUpload']: false
        });

        if (this.hasControl('mediaType')) {
          this.control('mediaType').setValue(uploaded.mediaType);
        }

        if (this.hasControl('folder')) {
          this.control('folder').setValue(uploaded.folder);
        }

        if (this.hasControl('name') && !this.control('name').value) {
          this.control('name').setValue(file.name);
        }
      } catch (error) {
        this.formError.set(this.resolveErrorMessage(error, 'No se pudo subir el archivo a Firebase Storage.'));
      } finally {
        target.value = '';
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({
        [config.urlKey]: String(reader.result ?? ''),
        [config.altKey ?? 'alt']: file.name.replace(/\.[^.]+$/, ''),
        [config.mimeTypeKey ?? 'mimeType']: file.type || 'application/octet-stream',
        [config.sizeKey ?? 'sizeLabel']: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        [config.mockFlagKey ?? 'isMockUpload']: true
      });

      if (this.hasControl('mediaType')) {
        this.control('mediaType').setValue(file.type.startsWith('image/') ? 'image' : 'other');
      }

      if (this.hasControl('folder') && !this.control('folder').value) {
        this.control('folder').setValue('uploads/local');
      }

      if (this.hasControl('name') && !this.control('name').value) {
        this.control('name').setValue(file.name);
      }
    };
    reader.readAsDataURL(file);
  }

  previewUrl(): string {
    const mediaId = String(this.controlValue('mediaId') ?? '');
    const resolved = this.media.resolveUrl(mediaId);
    if (resolved) {
      return resolved;
    }

    return String(this.controlValue('url') ?? '');
  }

  relationPreview(field: AdminFieldConfig): string {
    const selected = this.getSelectedRelationOptions(field);
    if (!selected.length) {
      return 'Nada vinculado todavía';
    }

    return `${selected.length} vinculados`;
  }

  isInvalid(field: AdminFieldConfig): boolean {
    const control = this.control(field.key);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  isStateField(field: AdminFieldConfig): boolean {
    return ['active', 'enabled', 'featured'].includes(field.key);
  }

  isAdvancedGroup(group: FieldGroup): boolean {
    return group.key === 'advanced';
  }

  selectedBadges(): string[] {
    const item = this.selectedItem();
    if (!item) {
      return [];
    }

    const record = this.toRecord(item);
    const badges = [`Orden ${item.order}`, this.statusLabel(item.status), item.active ? 'Activo' : 'Inactivo'];
    ['slug', 'routePath', 'pageType', 'type'].forEach((key) => {
      const value = record[key];
      if (value) {
        badges.push(String(value));
      }
    });

    const categories = this.categorySummary(record['categoryIds']);
    if (categories) {
      badges.push(categories);
    }

    return badges.slice(0, 5);
  }

  cardFacts(item: CmsEntityRecord): string[] {
    const record = this.toRecord(item);
    const facts: string[] = [];
    ['routePath', 'slug', 'pageType', 'type', 'priceLabel', 'folder'].forEach((key) => {
      const value = record[key];
      if (value && facts.length < 2) {
        facts.push(String(value));
      }
    });

    const categories = this.categorySummary(record['categoryIds']);
    if (categories && facts.length < 2) {
      facts.push(categories);
    }

    const relationshipKeys = ['sectionIds', 'pageIds', 'serviceIds', 'entityIds', 'videoIds', 'featureIds', 'mediaIds'];
    relationshipKeys.forEach((key) => {
      const value = record[key];
      if (Array.isArray(value) && value.length && facts.length < 4) {
        facts.push(`${value.length} relaciones`);
      }
    });

    return facts;
  }

  contentSnippet(item: CmsEntityRecord): string {
    const record = this.toRecord(item);
    const candidates = ['description', 'summary', 'subtitle', 'title', 'body', 'defaultDescription'];
    for (const key of candidates) {
      const value = record[key];
      if (typeof value === 'string' && value.trim()) {
        return value.length > 140 ? `${value.slice(0, 137)}...` : value;
      }
    }

    return '';
  }

  getSelectedRelationOptions(field: AdminFieldConfig): Array<{ label: string; value: string }> {
    const selectedIds = this.getRelationValues(field.key);
    const options = this.getFieldOptions(field);
    return options.filter((option) => selectedIds.includes(option.value));
  }

  getAvailableRelationOptions(field: AdminFieldConfig): Array<{ label: string; value: string }> {
    const selectedIds = this.getRelationValues(field.key);
    const search = this.relationSearchValue(field.key).trim().toLowerCase();
    return this.getFieldOptions(field)
      .filter((option) => !selectedIds.includes(option.value))
      .filter((option) => !search || option.label.toLowerCase().includes(search));
  }

  addRelationValue(field: AdminFieldConfig, value: string): void {
    if (!value) {
      return;
    }

    const current = this.getRelationValues(field.key);
    if (current.includes(value)) {
      return;
    }

    this.control(field.key).setValue([...current, value]);
    this.control(field.key).markAsDirty();
  }

  setRelationValue(field: AdminFieldConfig, value: string): void {
    if (!value) {
      return;
    }

    this.control(field.key).setValue(value);
    this.control(field.key).markAsDirty();
  }

  removeRelationValue(field: AdminFieldConfig, value: string): void {
    const current = this.getRelationValues(field.key).filter((item) => item !== value);
    this.control(field.key).setValue(current);
    this.control(field.key).markAsDirty();
  }

  updateRelationSearch(fieldKey: string, value: string): void {
    this.relationSearch.update((current) => ({ ...current, [fieldKey]: value }));
  }

  relationSearchValue(fieldKey: string): string {
    return this.relationSearch()[fieldKey] ?? '';
  }

  relationDraftValue(fieldKey: string): string {
    return this.relationDraft()[fieldKey] ?? '';
  }

  updateRelationDraft(fieldKey: string, value: string): void {
    this.relationDraft.update((current) => ({ ...current, [fieldKey]: value }));
  }

  relationCollectionKey(field: AdminFieldConfig): CmsCollectionKey | null {
    const relationKey = field.relationCollection ?? String(this.controlValue(field.dynamicRelationField ?? '') ?? '');
    if (!relationKey || !(relationKey in CMS_COLLECTION_CONFIGS)) {
      return null;
    }

    return relationKey as CmsCollectionKey;
  }

  relationCreateLabel(field: AdminFieldConfig): string {
    const relationKey = this.relationCollectionKey(field);
    return relationKey ? `Crear ${CMS_COLLECTION_CONFIGS[relationKey].singularLabel}` : 'Crear relacionado';
  }

  async createRelationRecord(field: AdminFieldConfig, mode: 'select' | 'multiselect'): Promise<void> {
    const relationKey = this.relationCollectionKey(field);
    const draft = this.relationDraftValue(field.key).trim();
    if (!relationKey || !draft) {
      return;
    }

    try {
      const created = await this.store.create(relationKey, this.buildQuickRelationPayload(relationKey, draft));
      if (mode === 'select') {
        this.setRelationValue(field, created.id);
      } else {
        this.addRelationValue(field, created.id);
      }

      this.updateRelationDraft(field.key, '');
    } catch (error) {
      this.formError.set(this.resolveErrorMessage(error, `No se pudo crear el registro relacionado en ${relationKey}.`));
    }
  }

  chipValues(fieldKey: string): string[] {
    const value = this.controlValue(fieldKey);
    return Array.isArray(value) ? value.map((item) => String(item)) : [];
  }

  chipDraftValue(fieldKey: string): string {
    return this.chipDraft()[fieldKey] ?? '';
  }

  updateChipDraft(fieldKey: string, value: string): void {
    this.chipDraft.update((current) => ({ ...current, [fieldKey]: value }));
  }

  addChipValue(field: AdminFieldConfig): void {
    const draft = this.chipDraftValue(field.key).trim();
    if (!draft) {
      return;
    }

    const current = this.chipValues(field.key);
    this.control(field.key).setValue([...current, draft]);
    this.control(field.key).markAsDirty();
    this.updateChipDraft(field.key, '');
  }

  removeChipValue(field: AdminFieldConfig, index: number): void {
    const next = this.chipValues(field.key).filter((_item, itemIndex) => itemIndex !== index);
    this.control(field.key).setValue(next);
    this.control(field.key).markAsDirty();
  }

  addChipFromKeyboard(field: AdminFieldConfig, event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ',') {
      return;
    }

    event.preventDefault();
    this.addChipValue(field);
  }

  relationCollectionSelected(field: AdminFieldConfig): boolean {
    if (field.relationCollection) {
      return true;
    }

    const value = this.controlValue(field.dynamicRelationField ?? '');
    return !!value;
  }

  relationLabel(field: AdminFieldConfig): string {
    const relationKey = field.relationCollection ?? String(this.controlValue(field.dynamicRelationField ?? '') ?? '');
    if (!relationKey || !(relationKey in CMS_COLLECTION_CONFIGS)) {
      return 'Selecciona primero la colección a vincular';
    }

    return `Disponible en ${CMS_COLLECTION_CONFIGS[relationKey as CmsCollectionKey].label.toLowerCase()}`;
  }

  subtitleFor(item: CmsEntityRecord): string {
    const subtitleKey = this.config().subtitleKey;
    if (!subtitleKey) {
      return '';
    }

    const value = this.toRecord(item)[subtitleKey];
    if (Array.isArray(value)) {
      return `${value.length} items`;
    }

    if (typeof value === 'object' && value) {
      return 'Objeto JSON';
    }

    return String(value ?? '');
  }

  statusLabel(status: CmsEntityStatus): string {
    return status === 'draft' ? 'Draft' : status === 'published' ? 'Published' : 'Archived';
  }

  trackById(_index: number, item: CmsEntityRecord): string {
    return item.id;
  }

  displayName(item: CmsEntityRecord): string {
    return this.entityDisplayName(item, this.collectionKey());
  }

  private resetForm(source: Record<string, unknown>): void {
    const controls = this.config().fields.reduce<Record<string, FormControl>>((accumulator, field) => {
      const initialValue = this.prepareValueForForm(source[field.key], field);
      accumulator[field.key] = new FormControl(initialValue, field.required ? Validators.required : []);
      return accumulator;
    }, {});

    const nextForm = this.fb.group(controls);
    Object.keys(this.form.controls).forEach((key) => this.form.removeControl(key));
    Object.entries(nextForm.controls).forEach(([key, control]) => this.form.addControl(key, control));
  }

  private buildDraft(): Record<string, unknown> {
    return this.config().fields.reduce<Record<string, unknown>>((accumulator, field) => {
      accumulator[field.key] = field.defaultValue ?? this.defaultValueByField(field.type);
      return accumulator;
    }, {});
  }

  private serializeForm(): Record<string, unknown> {
    return this.config().fields.reduce<Record<string, unknown>>((accumulator, field) => {
      const rawValue = this.controlValue(field.key);
      accumulator[field.key] = this.normalizeFieldValue(rawValue, field);
      return accumulator;
    }, {});
  }

  private controlValue(name: string): unknown {
    return this.hasControl(name) ? this.control(name).value : undefined;
  }

  private prepareValueForForm(value: unknown, field: AdminFieldConfig): unknown {
    if (value === undefined || value === null || value === '') {
      return field.defaultValue ?? this.defaultValueByField(field.type);
    }

    if (field.type === 'chips') {
      return Array.isArray(value)
        ? value.map((item) => String(item))
        : String(value)
            .split(/\r?\n|,/)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    if (field.type === 'json') {
      return JSON.stringify(value, null, 2);
    }

    if (field.type === 'multiselect') {
      return Array.isArray(value) ? value : value ? [value] : [];
    }

    return value;
  }

  private normalizeFieldValue(value: unknown, field: AdminFieldConfig): unknown {
    if (field.type === 'chips') {
      return Array.isArray(value)
        ? value.map((item) => String(item).trim()).filter(Boolean)
        : String(value ?? '')
            .split(/\r?\n|,/)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    if (field.type === 'number') {
      return Number(value ?? 0);
    }

    if (field.type === 'json') {
      try {
        return value ? JSON.parse(String(value)) : {};
      } catch {
        return {};
      }
    }

    if (field.type === 'multiselect') {
      return Array.isArray(value) ? value : value ? [value] : [];
    }

    return value;
  }

  private defaultValueByField(type: AdminFieldConfig['type']): unknown {
    switch (type) {
      case 'boolean':
        return false;
      case 'number':
        return 0;
      case 'multiselect':
        return [];
      case 'chips':
        return [];
      case 'json':
        return '{}';
      default:
        return '';
    }
  }

  private getRelationValues(fieldKey: string): string[] {
    const value = this.controlValue(fieldKey);
    return Array.isArray(value) ? value.map((item) => String(item)) : [];
  }

  private buildQuickRelationPayload(collection: CmsCollectionKey, name: string): Record<string, unknown> {
    const slug = slugify(name);
    const relatedPageId = this.firstSelectedId(['pageId', 'pageIds']) ?? this.firstCollectionId('pages');
    const relatedSectionId = this.firstSelectedId(['sectionId', 'sectionIds']) ?? this.firstCollectionId('sections');
    const relatedServiceIds = this.selectedIds(['serviceIds']);
    const relatedPageIds = this.selectedIds(['pageIds'], ['pageId']);
    const relatedSectionIds = this.selectedIds(['sectionIds'], ['sectionId']);

    switch (collection) {
      case 'pages':
        return {
          name,
          slug,
          routePath: `/${slug || 'nueva-pagina'}`,
          pageType: 'custom',
          description: 'Página creada desde relación rápida.',
          metaTitle: name,
          metaDescription: '',
          sectionIds: []
        };
      case 'sections':
        return {
          name,
          pageId: relatedPageId ?? '',
          type: 'custom',
          sectionDataId: '',
          entityCollection: '',
          entityIds: [],
          enabled: true
        };
      case 'sectionsData':
        return {
          name,
          pageId: relatedPageId ?? '',
          sectionType: 'custom',
          title: name,
          subtitle: '',
          body: '',
          mediaIds: [],
          data: {}
        };
      case 'services':
        return {
          name,
          slug,
          description: 'Servicio creado desde relación rápida.',
          mediaId: '',
          href: relatedPageId ? this.pageRouteFromId(relatedPageId) : '',
          ctaLabel: 'Ver más',
          points: [],
          categoryIds: this.defaultCategoryIds('service'),
          pageIds: relatedPageIds,
          sectionIds: relatedSectionIds
        };
      case 'additionalServices':
        return {
          name,
          priceLabel: 'A medida',
          basePrice: 0,
          description: 'Servicio adicional creado desde relación rápida.',
          serviceIds: relatedServiceIds
        };
      case 'packages':
        return {
          name,
          slug,
          categoryIds: this.defaultCategoryIds('package'),
          packageTypeLabel: 'Paquete',
          summary: 'Paquete creado desde relación rápida.',
          mediaId: '',
          priceLabel: 'A medida',
          basePrice: 0,
          priceLines: [],
          featured: false,
          serviceIds: relatedServiceIds,
          additionalServiceIds: [],
          featureIds: [],
          pageIds: relatedPageIds,
          sectionIds: relatedSectionIds,
          notes: [],
          advancedData: {}
        };
      case 'packageFeatures':
        return {
          name,
          description: name,
          categoryIds: this.defaultCategoryIds('package'),
          value: name
        };
      case 'galleryItems':
        return {
          name,
          title: name,
          categoryIds: [],
          alt: name,
          mediaId: '',
          variant: 'default',
          tags: [],
          pageIds: relatedPageIds,
          sectionIds: relatedSectionIds
        };
      case 'stories':
        return {
          name,
          categoryIds: [],
          clientName: name,
          location: '',
          subtitle: '',
          mediaId: '',
          mediaIds: [],
          pageIds: relatedPageIds,
          sectionIds: relatedSectionIds
        };
      case 'videoCategories':
        return {
          name,
          key: slug,
          summary: '',
          playlistId: '',
          playlistUrl: '',
          mediaId: '',
          videoIds: []
        };
      case 'videos':
        return {
          name,
          videoId: slug || `video-${Date.now()}`,
          description: '',
          duration: '',
          format: '',
          mediaId: '',
          categoryIds: this.selectedIds(['categoryIds']),
          featuredOnLanding: false
        };
      case 'media':
        return {
          name,
          mediaType: 'image',
          url: '',
          alt: name,
          folder: 'uploads',
          mimeType: 'image/*',
          sizeLabel: 'mock',
          isMockUpload: false
        };
      default:
        return { name };
    }
  }

  private buildFieldGroups(fields: AdminFieldConfig[]): FieldGroup[] {
    const registry: Record<string, FieldGroup> = {
      basics: {
        key: 'basics',
        title: 'Identidad',
        description: 'Define qué es este registro y cómo se reconoce dentro del sistema.',
        fields: []
      },
      content: {
        key: 'content',
        title: 'Contenido',
        description: 'Escribe el texto, listas y detalles visibles del registro.',
        fields: []
      },
      relations: {
        key: 'relations',
        title: 'Relaciones',
        description: 'Vincula este registro con páginas, secciones u otras entidades existentes.',
        fields: []
      },
      media: {
        key: 'media',
        title: 'Media',
        description: 'Asocia imágenes, thumbnails, archivos o recursos visuales.',
        fields: []
      },
      settings: {
        key: 'settings',
        title: 'Estado y orden',
        description: 'Controla publicación, visibilidad y prioridad en listados.',
        fields: []
      },
      advanced: {
        key: 'advanced',
        title: 'Avanzado',
        description: 'Opciones técnicas para estructuras complejas o casos especiales.',
        fields: []
      }
    };

    fields.forEach((field) => {
      registry[this.resolveFieldGroup(field)].fields.push(field);
    });

    return ['basics', 'content', 'relations', 'media', 'settings', 'advanced']
      .map((key) => registry[key])
      .filter((group) => group.fields.length > 0);
  }

  private resolveFieldGroup(field: AdminFieldConfig): string {
    const mediaPattern = /(image|cover|thumbnail|media|mime|folder|url)/i;
    const relationKeys = ['pageId', 'pageIds', 'sectionIds', 'sectionDataId', 'entityCollection', 'entityIds', 'serviceIds', 'additionalServiceIds', 'featureIds', 'categoryIds', 'videoIds', 'mediaIds', 'mediaId'];
    const settingKeys = ['status', 'publishedAt', 'deletedAt', 'active', 'enabled', 'featured', 'order'];
    const advancedKeys = ['data', 'advancedData'];
    const contentKeys = ['description', 'summary', 'subtitle', 'body', 'footerText', 'whatsappMessage', 'notes', 'points', 'priceLines', 'imageUrls', 'tags'];

    if (advancedKeys.includes(field.key) || field.type === 'json') {
      return 'advanced';
    }

    if (settingKeys.includes(field.key)) {
      return 'settings';
    }

    if (relationKeys.includes(field.key) || field.type === 'multiselect') {
      return 'relations';
    }

    if (field.type === 'file' || mediaPattern.test(field.key)) {
      return 'media';
    }

    if (contentKeys.includes(field.key) || field.type === 'textarea' || field.type === 'chips') {
      return 'content';
    }

    return 'basics';
  }

  private resetEditorHelpers(): void {
    this.relationSearch.set({});
    this.relationDraft.set({});
    this.chipDraft.set({});
  }

  private selectedIds(multiFieldCandidates: string[], singleFieldCandidates: string[] = []): string[] {
    for (const key of multiFieldCandidates) {
      const value = this.controlValue(key);
      if (Array.isArray(value) && value.length) {
        return value.map((item) => String(item));
      }
    }

    for (const key of singleFieldCandidates) {
      const value = this.controlValue(key);
      if (value) {
        return [String(value)];
      }
    }

    return [];
  }

  private firstSelectedId(candidates: string[]): string | null {
    for (const key of candidates) {
      const value = this.controlValue(key);
      if (Array.isArray(value) && value.length) {
        return String(value[0]);
      }

      if (value) {
        return String(value);
      }
    }

    return null;
  }

  private firstCollectionId(collection: CmsCollectionKey): string | null {
    const items = this.state()[collection] as CmsEntityBase[];
    return items.length ? items[0].id : null;
  }

  private pageRouteFromId(pageId: string): string {
    const page = (this.state().pages as Array<CmsEntityBase & { routePath?: string }>).find((item) => item.id === pageId);
    return String(page?.routePath ?? '');
  }

  private entityDisplayName(item: CmsEntityBase, collection: CmsCollectionKey): string {
    const record = this.toRecord(item) as Record<string, unknown>;

    if (collection === 'packages') {
      const scope = this.packageScopeLabel(record);
      return scope ? `${item.name} - ${scope}` : item.name;
    }

    if (collection === 'additionalServices') {
      const scope = this.additionalServiceScopeLabel(record);
      return scope ? `${item.name} - ${scope}` : item.name;
    }

    if (collection === 'packageFeatures') {
      const formatted = this.categorySummary(record['categoryIds']);
      return formatted && formatted !== 'General' ? `${item.name} - ${formatted}` : item.name;
    }

    return item.name;
  }

  private packageScopeLabel(record: Record<string, unknown>): string {
    const category = this.categorySummary(record['categoryIds']);
    if (category && category !== 'General') {
      return category;
    }

    const pageIds = Array.isArray(record['pageIds']) ? record['pageIds'].map((item) => String(item)) : [];
    const linkedPage = pageIds
      .map((pageId) => this.pagesById().get(pageId))
      .find((page) => {
        if (!page) {
          return false;
        }

        const pageRecord = this.toRecord(page);
        return String(pageRecord['pageType'] ?? '') !== 'landing' && String(pageRecord['pageType'] ?? '') !== 'brand';
      });

    if (linkedPage) {
      const pageRecord = this.toRecord(linkedPage);
      const cleaned = String(pageRecord['name'] ?? '')
        .replace(/^portfolio\s+/i, '')
        .replace(/^pagina\s+/i, '')
        .trim();

      return humanizeServiceScope(cleaned || String(pageRecord['slug'] ?? '') || String(pageRecord['pageType'] ?? ''));
    }

    return category;
  }

  private additionalServiceScopeLabel(record: Record<string, unknown>): string {
    const serviceIds = Array.isArray(record['serviceIds']) ? record['serviceIds'].map((item) => String(item)) : [];
    const scopes = Array.from(
      new Set(
        serviceIds
          .map((serviceId) => this.servicesById().get(serviceId))
          .flatMap((service) => {
            if (!service) {
              return [];
            }

            const serviceRecord = this.toRecord(service);
            const pageIds = Array.isArray(serviceRecord['pageIds']) ? serviceRecord['pageIds'].map((item) => String(item)) : [];
            return pageIds
              .map((pageId) => this.pagesById().get(pageId))
              .filter(Boolean)
              .map((page) => {
                const pageRecord = this.toRecord(page);
                const cleaned = String(pageRecord['name'] ?? '')
                  .replace(/^portfolio\s+/i, '')
                  .replace(/^pagina\s+/i, '')
                  .trim();

                return humanizeServiceScope(cleaned || String(pageRecord['slug'] ?? '') || String(pageRecord['pageType'] ?? ''));
              });
          })
          .filter(Boolean)
      )
    );

    if (!scopes.length) {
      return '';
    }

    if (scopes.length === 1) {
      return scopes[0];
    }

    return `${scopes[0]} +${scopes.length - 1}`;
  }

  private toRecord(value: unknown): Record<string, unknown> {
    return value as unknown as Record<string, unknown>;
  }

  private categorySummary(categoryIds: unknown): string {
    const names = (Array.isArray(categoryIds) ? categoryIds : [])
      .map((categoryId) => this.state().categories.find((item) => item.id === String(categoryId))?.name)
      .filter((name): name is string => typeof name === 'string' && !!name);

    if (!names.length) {
      return '';
    }

    return names.length === 1 ? names[0] : `${names[0]} +${names.length - 1}`;
  }

  private defaultCategoryIds(type: 'service' | 'package' | 'video'): string[] {
    return this.state().categories
      .filter((category) => category.type === type)
      .slice(0, 1)
      .map((category) => category.id);
  }

  private resolveErrorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
  }
}
