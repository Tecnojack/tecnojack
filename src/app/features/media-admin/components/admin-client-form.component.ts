import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client, ClientInput, ClientService } from '../../../core/models/client.model';
import { ClientAdminService } from '../client-admin.service';

@Component({
  selector: 'app-admin-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="client-form">
      <div class="client-form__header">
        <h2>{{ isEditing ? 'Editar Cliente' : 'Crear Nuevo Cliente' }}</h2>
        <button class="btn-close" (click)="handleCancel.emit()">✕</button>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="client-form__body">
        <!-- Campos Comunes -->
        <div class="form-group">
          <label for="name">Nombre Completo*</label>
          <input
            id="name"
            type="text"
            formControlName="name"
            placeholder="Ej: Juan Pablo Gómez"
            class="form-input" />
          <span *ngIf="form.get('name')?.hasError('required')" class="form-error">
            El nombre es obligatorio
          </span>
        </div>

        <div class="form-group">
          <label for="service">Tipo de Servicio*</label>
          <select
            id="service"
            formControlName="service"
            class="form-select"
            [disabled]="isEditing">
            <option value="">-- Seleccionar --</option>
            <option value="bodas">💒 Bodas</option>
            <option value="prebodas">💑 Prebodas</option>
            <option value="quinces">👗 Quinces</option>
            <option value="grados">🎓 Grados</option>
          </select>
          <span *ngIf="form.get('service')?.hasError('required')" class="form-error">
            Selecciona un servicio
          </span>
        </div>

        <div class="form-group">
          <label for="eventDate">Fecha del Evento</label>
          <input
            id="eventDate"
            type="date"
            formControlName="eventDate"
            class="form-input" />
        </div>

        <div class="form-group">
          <label for="location">Ubicación</label>
          <input
            id="location"
            type="text"
            formControlName="location"
            placeholder="Ej: Medellín, Antioquia"
            class="form-input" />
        </div>

        <!-- Campos Específicos para Grados -->
        <div *ngIf="isGraduationService" class="form-section">
          <h3>Información de Graduación</h3>

          <div class="form-group">
            <label for="institution">Institución Educativa</label>
            <input
              id="institution"
              type="text"
              formControlName="institution"
              placeholder="Ej: Universidad Nacional"
              class="form-input" />
          </div>

          <div class="form-group">
            <label for="career">Carrera / Programa</label>
            <input
              id="career"
              type="text"
              formControlName="career"
              placeholder="Ej: Ingeniería de Sistemas"
              class="form-input" />
          </div>

          <div class="form-group">
            <label for="graduationYear">Año de Graduación</label>
            <input
              id="graduationYear"
              type="text"
              formControlName="graduationYear"
              placeholder="Ej: 2026"
              class="form-input" />
          </div>
        </div>

        <!-- Estado -->
        <div class="form-group">
          <label>
            <input type="checkbox" formControlName="isPublished" class="form-checkbox" />
            <span>Publicar inmediatamente</span>
          </label>
        </div>

        <!-- Botones -->
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" (click)="handleCancel.emit()">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary" [disabled]="form.invalid || isSubmitting">
            {{ isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Cliente' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .client-form {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 100%;
      }

      .client-form__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        border-bottom: 1px solid #e0e0e0;
      }

      .client-form__header h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
      }

      .btn-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
      }

      .btn-close:hover {
        color: #333;
      }

      .client-form__body {
        padding: 24px;
      }

      .form-section {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #e0e0e0;
      }

      .form-section h3 {
        margin: 0 0 16px 0;
        font-size: 14px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .form-group {
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
      }

      .form-group label {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 6px;
        color: #333;
      }

      .form-input,
      .form-select {
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
        transition: border-color 0.2s;
      }

      .form-input:focus,
      .form-select:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
      }

      .form-checkbox {
        margin-right: 8px;
      }

      .form-error {
        font-size: 12px;
        color: #d32f2f;
        margin-top: 4px;
      }

      .form-actions {
        display: flex;
        gap: 12px;
        margin-top: 24px;
      }

      .btn {
        flex: 1;
        padding: 12px 16px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-primary {
        background: #007bff;
        color: white;
      }

      .btn-primary:hover:not(:disabled) {
        background: #0056b3;
      }

      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .btn-secondary {
        background: #f0f0f0;
        color: #333;
      }

      .btn-secondary:hover {
        background: #e0e0e0;
      }
    `,
  ],
})
export class AdminClientFormComponent implements OnInit {
  @Input() client?: Client;
  @Output() handleCancel = new EventEmitter<void>();
  @Output() handleSave = new EventEmitter<ClientInput>();

  private readonly fb = inject(FormBuilder);
  private readonly clientAdmin = inject(ClientAdminService);

  form: FormGroup;
  isSubmitting = false;
  isEditing = false;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      service: ['', Validators.required],
      eventDate: [''],
      location: [''],
      institution: [''],
      career: [''],
      graduationYear: [''],
      isPublished: [false],
    });
  }

  ngOnInit(): void {
    if (this.client) {
      this.isEditing = true;
      this.form.patchValue({
        name: this.client.name,
        service: this.client.service,
        eventDate: this.client.eventDate,
        location: this.client.location,
        institution: this.client.institution,
        career: this.client.career,
        graduationYear: this.client.graduationYear,
        isPublished: this.client.status === 'published',
      });
      // Deshabilitar servicio en edición
      this.form.get('service')?.disable();
    }
  }

  get isGraduationService(): boolean {
    return this.form.get('service')?.value === 'grados';
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    this.isSubmitting = true;

    try {
      const formValue = this.form.getRawValue();

      const input: ClientInput = {
        name: formValue.name,
        service: formValue.service,
        eventDate: formValue.eventDate || undefined,
        location: formValue.location || undefined,
        institution: formValue.institution || undefined,
        career: formValue.career || undefined,
        graduationYear: formValue.graduationYear || undefined,
        status: formValue.isPublished ? 'published' : 'draft',
      };

      if (this.isEditing && this.client) {
        await this.clientAdmin.updateClient(this.client.id, input);
      }

      this.handleSave.emit(input);
    } finally {
      this.isSubmitting = false;
    }
  }
}
