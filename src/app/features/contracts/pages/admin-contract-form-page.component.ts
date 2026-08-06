import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ContractAdminService } from '../services/contract-admin.service';
import { ContractClientInfo, ContractServiceInfo } from '../models/contract.model';
import { calculatePaymentInfo, formatCurrency } from '../utils/contract-financial.util';
import {
  CONTRACT_CATALOG_CATEGORIES,
  CatalogPackageOption,
} from '../utils/contract-packages-catalog.util';

@Component({
  selector: 'tj-admin-contract-form-page',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, FormsModule, RouterLink],
  template: `
    <div class="tj-admin-form-container">
      <div class="tj-admin-header">
        <a routerLink="/media-admin/contratos" class="tj-admin-back">← Volver al Listado de Contratos</a>
        <h1>{{ isEditMode() ? 'Editar Contrato' : 'Crear Nuevo Contrato' }}</h1>
        <p class="tj-admin-subtitle">Registra la negociación acordada previamente por fuera de la web (WhatsApp/Transferencia).</p>
      </div>

      <form (submit)="saveContract($event)" class="tj-contract-form">
        <!-- 1. DATOS DEL CLIENTE -->
        <section class="tj-form-section">
          <h2>1. Datos del Cliente</h2>
          <div class="tj-form-grid">
            <label class="tj-field">
              <span>Nombre completo *</span>
              <input type="text" [(ngModel)]="client.fullName" name="fullName" required placeholder="Ej. Marcela Gómez" />
            </label>

            <label class="tj-field">
              <span>Tipo de documento *</span>
              <select [(ngModel)]="client.documentType" name="documentType" required>
                <option value="CC">Cédula de Ciudadanía (CC)</option>
                <option value="CE">Cédula de Extranjería (CE)</option>
                <option value="PASAPORTE">Pasaporte</option>
                <option value="NIT">NIT</option>
              </select>
            </label>

            <label class="tj-field">
              <span>Número de documento *</span>
              <input type="text" [(ngModel)]="client.documentNumber" name="documentNumber" required placeholder="Ej. 1020304050" />
            </label>

            <label class="tj-field">
              <span>Correo electrónico *</span>
              <input type="email" [(ngModel)]="client.email" name="email" required placeholder="cliente@correo.com" />
            </label>

            <label class="tj-field">
              <span>Teléfono / WhatsApp *</span>
              <input type="tel" [(ngModel)]="client.phone" name="phone" required placeholder="300 123 4567" />
            </label>

            <label class="tj-field">
              <span>Ciudad *</span>
              <input type="text" [(ngModel)]="client.city" name="city" placeholder="Ej. Medellín" />
            </label>
          </div>
        </section>

        <!-- 2. SELECCIÓN DE CATEGORÍA Y PAQUETE -->
        <section class="tj-form-section">
          <h2>2. Selección de Servicio por Categoría</h2>

          <div class="tj-form-grid">
            <label class="tj-field">
              <span>Tipo de Servicio (Categoría) *</span>
              <select
                [ngModel]="selectedCategoryId()"
                (ngModelChange)="onCategorySelected($event)"
                name="selectedCategoryId">
                <option *ngFor="let cat of catalogCategories" [value]="cat.id">
                  {{ cat.label }}
                </option>
              </select>
            </label>

            <label class="tj-field">
              <span>Paquete o Servicio Exacto *</span>
              <select
                [ngModel]="selectedPackageId()"
                (ngModelChange)="onPackageSelected($event)"
                name="selectedPackageId">
                <option *ngFor="let pkg of availablePackages()" [value]="pkg.id">
                  {{ pkg.packageName }} — {{ formatCop(pkg.priceAmountCop) }}
                </option>
              </select>
            </label>

            <label class="tj-field">
              <span>Fecha del Evento</span>
              <input type="date" [(ngModel)]="service.eventDate" name="eventDate" />
            </label>

            <label class="tj-field">
              <span>Lugar o Locación</span>
              <input type="text" [(ngModel)]="service.location" name="location" placeholder="Ej. Finca Las Palmas, Rionegro" />
            </label>
          </div>

          <div class="tj-field-full">
            <label class="tj-field">
              <span>Características principales (una por línea)</span>
              <textarea [(ngModel)]="featuresText" name="featuresText" rows="4"></textarea>
            </label>
          </div>

          <div class="tj-field-full">
            <label class="tj-field">
              <span>Entregables por contrato (uno por línea)</span>
              <textarea [(ngModel)]="deliverablesText" name="deliverablesText" rows="4"></textarea>
            </label>
          </div>
        </section>

        <!-- 3. RESUMEN ECONÓMICO Y ANTICIPO -->
        <section class="tj-form-section">
          <h2>3. Resumen Económico y Anticipo Recibido</h2>

          <div class="tj-form-grid">
            <label class="tj-field">
              <span>Valor Base Paquete (COP) *</span>
              <input type="number" [(ngModel)]="baseAmount" (input)="recalculate()" name="baseAmount" required min="0" />
            </label>

            <label class="tj-field">
              <span>Adicionales (COP)</span>
              <input type="number" [(ngModel)]="extrasAmount" (input)="recalculate()" name="extrasAmount" min="0" />
            </label>

            <label class="tj-field">
              <span>Transporte / Viáticos (COP)</span>
              <input type="number" [(ngModel)]="transportAmount" (input)="recalculate()" name="transportAmount" min="0" />
            </label>

            <label class="tj-field">
              <span>Descuento Aplicado (COP)</span>
              <input type="number" [(ngModel)]="discountAmount" (input)="recalculate()" name="discountAmount" min="0" />
            </label>
          </div>

          <!-- Selector rápido de porcentaje -->
          <div class="tj-advance-selector">
            <span>Selección rápida de anticipo confirmado:</span>
            <div class="tj-radio-group">
              <label [class.active]="selectedOption === 40">
                <input type="radio" name="advanceOption" [value]="40" [(ngModel)]="selectedOption" (change)="recalculate()" />
                40% (Mínimo recomendado)
              </label>

              <label [class.active]="selectedOption === 80">
                <input type="radio" name="advanceOption" [value]="80" [(ngModel)]="selectedOption" (change)="recalculate()" />
                80%
              </label>

              <label [class.active]="selectedOption === 100">
                <input type="radio" name="advanceOption" [value]="100" [(ngModel)]="selectedOption" (change)="recalculate()" />
                100% (Pago total)
              </label>

              <label [class.active]="selectedOption === 'custom'">
                <input type="radio" name="advanceOption" value="custom" [(ngModel)]="selectedOption" (change)="recalculate()" />
                Otro monto personalizado
              </label>
            </div>
          </div>

          <div class="tj-field" *ngIf="selectedOption === 'custom'">
            <span>Monto del anticipo recibido (COP) *</span>
            <input type="number" [(ngModel)]="customPaidAmount" (input)="recalculate()" name="customPaidAmount" min="0" />
          </div>

          <!-- Calculadora dinámica -->
          <div class="tj-financial-card">
            <div class="tj-fin-row">
              <span>Valor Total del Contrato:</span>
              <strong>{{ formatCop(computedTotalAmount) }}</strong>
            </div>
            <div class="tj-fin-row">
              <span>Anticipo Recibido:</span>
              <strong class="tj-text-accent">{{ formatCop(computedPaidAmount) }} ({{ computedPaidPercentage }}%)</strong>
            </div>
            <div class="tj-fin-row tj-fin-total">
              <span>Saldo Pendiente:</span>
              <strong [class.tj-text-danger]="computedRemainingAmount > 0">{{ formatCop(computedRemainingAmount) }}</strong>
            </div>
          </div>

          <!-- Validación de porcentaje < 40% -->
          <div class="tj-override-box" *ngIf="computedPaidPercentage < 39.99">
            <p class="tj-alert-warning">
              ⚠️ El anticipo recibido ({{ computedPaidPercentage }}%) es inferior al 40% recomendado.
            </p>
            <label class="tj-checkbox-label">
              <input type="checkbox" [(ngModel)]="belowMinimumOverride" name="belowMinimumOverride" />
              <span>Autorizar excepción administrativa para permitir la firma con anticipo inferior al 40%</span>
            </label>
            <div *ngIf="belowMinimumOverride" class="tj-field">
              <span>Motivo obligatorio de la excepción:</span>
              <input type="text" [(ngModel)]="overrideReason" name="overrideReason" placeholder="Ej. Cliente frecuente con acuerdo especial" />
            </div>
          </div>
        </section>

        <!-- ACCIONES FORMULARIO -->
        <div class="tj-form-actions">
          <a routerLink="/media-admin/contratos" class="tj-btn-ghost">Cancelar</a>
          <button type="submit" class="tj-btn-primary" [disabled]="isSubmitting()">
            {{ isSubmitting() ? 'Guardando...' : (isEditMode() ? 'Guardar Cambios' : 'Guardar y Generar Enlace de Firma') }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .tj-admin-form-container {
      width: min(960px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 60px;
      color: #fff;
    }
    .tj-admin-header {
      margin-bottom: 28px;
    }
    .tj-admin-back {
      color: var(--portfolio-brand, #0097b2);
      text-decoration: none;
      font-size: 0.9rem;
    }
    .tj-admin-header h1 {
      margin: 8px 0 4px;
      font-size: 2rem;
    }
    .tj-admin-subtitle {
      margin: 0;
      color: #94a3b8;
    }
    .tj-contract-form {
      display: grid;
      gap: 28px;
    }
    .tj-form-section {
      padding: 24px;
      border-radius: 16px;
      border: 1px solid var(--line, rgba(255, 255, 255, 0.12));
      background: rgba(8, 20, 28, 0.7);
      display: grid;
      gap: 18px;
    }
    .tj-form-section h2 {
      margin: 0 0 4px;
      font-size: 1.25rem;
      color: var(--portfolio-accent, #ffb800);
    }
    .tj-form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }
    .tj-field-full { grid-column: 1 / -1; }
    .tj-field {
      display: grid;
      gap: 6px;
    }
    .tj-field span {
      font-size: 0.82rem;
      color: #94a3b8;
    }
    .tj-field input, .tj-field select, .tj-field textarea {
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--line, rgba(255, 255, 255, 0.18));
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 0.95rem;
    }
    .tj-advance-selector {
      display: grid;
      gap: 8px;
      margin-top: 8px;
    }
    .tj-advance-selector span {
      font-size: 0.85rem;
      color: #94a3b8;
    }
    .tj-radio-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tj-radio-group label {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      cursor: pointer;
      font-size: 0.85rem;
    }
    .tj-radio-group label.active {
      border-color: var(--portfolio-brand, #0097b2);
      background: rgba(0, 151, 178, 0.2);
    }
    .tj-financial-card {
      margin-top: 10px;
      padding: 18px;
      border-radius: 12px;
      background: rgba(0, 151, 178, 0.08);
      border: 1px solid rgba(0, 151, 178, 0.25);
      display: grid;
      gap: 10px;
    }
    .tj-fin-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.95rem;
    }
    .tj-fin-total {
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      font-size: 1.1rem;
    }
    .tj-text-accent { color: #34d399; }
    .tj-text-danger { color: #f87171; }
    .tj-override-box {
      padding: 14px;
      border-radius: 10px;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      display: grid;
      gap: 10px;
    }
    .tj-alert-warning { margin: 0; color: #fbbf24; font-size: 0.88rem; }
    .tj-checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.88rem; }
    .tj-form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
    }
    .tj-btn-primary {
      padding: 12px 28px;
      border-radius: 10px;
      border: none;
      background: var(--portfolio-brand, #0097b2);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
    }
    .tj-btn-ghost {
      padding: 12px 20px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: transparent;
      color: #fff;
      text-decoration: none;
      font-size: 0.9rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContractFormPageComponent implements OnInit {
  private readonly contractAdmin = inject(ContractAdminService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly catalogCategories = CONTRACT_CATALOG_CATEGORIES;
  readonly selectedCategoryId = signal<string>('bodas');
  readonly selectedPackageId = signal<string>('boda-esencial');

  readonly isEditMode = signal(false);
  readonly isSubmitting = signal(false);
  contractId: string | null = null;

  client: ContractClientInfo = {
    fullName: '',
    documentType: 'CC',
    documentNumber: '',
    email: '',
    phone: '',
    city: 'Medellín',
  };

  service: ContractServiceInfo = {
    page: 'portfolio',
    category: 'bodas',
    packageName: '',
    features: [],
    deliverables: [],
    additionalServices: [],
  };

  featuresText = '';
  deliverablesText = '';

  baseAmount = 2500000;
  extrasAmount = 0;
  transportAmount = 0;
  discountAmount = 0;
  selectedOption: 40 | 80 | 100 | 'custom' = 40;
  customPaidAmount = 0;

  computedTotalAmount = 0;
  computedPaidAmount = 0;
  computedPaidPercentage = 0;
  computedRemainingAmount = 0;

  belowMinimumOverride = false;
  overrideReason = '';

  ngOnInit(): void {
    this.contractId = this.route.snapshot.paramMap.get('id');
    if (this.contractId) {
      this.isEditMode.set(true);
      this.loadExistingContract(this.contractId);
    } else {
      this.onPackageSelected('boda-esencial');
    }
  }

  availablePackages(): CatalogPackageOption[] {
    const catId = this.selectedCategoryId();
    const cat = this.catalogCategories.find((c) => c.id === catId);
    return cat ? cat.packages : [];
  }

  onCategorySelected(catId: string): void {
    this.selectedCategoryId.set(catId);
    const pkgs = this.availablePackages();
    if (pkgs.length > 0) {
      this.onPackageSelected(pkgs[0].id);
    }
  }

  onPackageSelected(pkgId: string): void {
    this.selectedPackageId.set(pkgId);
    const pkgs = this.availablePackages();
    const pkg = pkgs.find((p) => p.id === pkgId);
    if (!pkg) return;

    this.service.category = pkg.category;
    this.service.packageName = pkg.packageName;
    this.featuresText = pkg.features.join('\n');
    this.deliverablesText = pkg.deliverables.join('\n');
    this.baseAmount = pkg.priceAmountCop;
    this.recalculate();
  }

  async loadExistingContract(id: string): Promise<void> {
    const existing = await this.contractAdmin.getContractById(id);
    if (!existing) {
      this.router.navigate(['/media-admin/contratos']);
      return;
    }

    this.client = { ...existing.client };
    this.service = { ...existing.service };
    this.featuresText = (existing.service.features || []).join('\n');
    this.deliverablesText = (existing.service.deliverables || []).join('\n');

    this.baseAmount = existing.payment.baseAmount;
    this.extrasAmount = existing.payment.extrasAmount;
    this.transportAmount = existing.payment.transportAmount;
    this.discountAmount = existing.payment.discountAmount;
    this.selectedOption = existing.payment.selectedOption;
    this.customPaidAmount = existing.payment.paidAmount;
    this.belowMinimumOverride = !!existing.payment.belowMinimumOverride;
    this.overrideReason = existing.payment.overrideReason || '';

    this.recalculate();
  }

  recalculate(): void {
    const calc = calculatePaymentInfo({
      baseAmount: this.baseAmount,
      extrasAmount: this.extrasAmount,
      transportAmount: this.transportAmount,
      discountAmount: this.discountAmount,
      selectedOption: this.selectedOption,
      customPaidAmount: this.customPaidAmount,
      confirmedBy: 'admin',
      belowMinimumOverride: this.belowMinimumOverride,
      overrideReason: this.overrideReason,
    });

    this.computedTotalAmount = calc.totalAmount;
    this.computedPaidAmount = calc.paidAmount;
    this.computedPaidPercentage = calc.paidPercentage;
    this.computedRemainingAmount = calc.remainingAmount;
  }

  async saveContract(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.client.fullName.trim() || !this.client.documentNumber.trim() || !this.client.email.trim()) {
      alert('Por favor completa todos los datos obligatorios del cliente.');
      return;
    }

    if (!this.service.packageName.trim()) {
      alert('Por favor ingresa o selecciona el nombre del paquete o servicio.');
      return;
    }

    if (this.computedPaidPercentage < 39.99 && (!this.belowMinimumOverride || !this.overrideReason.trim())) {
      alert('El anticipo recibido es menor al 40%. Debes marcar la excepción administrativa e ingresar un motivo.');
      return;
    }

    this.isSubmitting.set(true);

    const features = this.featuresText.split('\n').map((s) => s.trim()).filter(Boolean);
    const deliverables = this.deliverablesText.split('\n').map((s) => s.trim()).filter(Boolean);

    const serviceData: ContractServiceInfo = {
      ...this.service,
      features,
      deliverables,
    };

    const paymentInput = {
      baseAmount: this.baseAmount,
      extrasAmount: this.extrasAmount,
      transportAmount: this.transportAmount,
      discountAmount: this.discountAmount,
      selectedOption: this.selectedOption,
      customPaidAmount: this.customPaidAmount,
      confirmedBy: 'admin',
      belowMinimumOverride: this.belowMinimumOverride,
      overrideReason: this.overrideReason,
    };

    try {
      if (this.isEditMode() && this.contractId) {
        await this.contractAdmin.updateDraftContract(this.contractId, {
          client: this.client,
          service: serviceData,
          paymentInput,
        });
        alert('Contrato actualizado exitosamente.');
      } else {
        await this.contractAdmin.createContract({
          client: this.client,
          service: serviceData,
          paymentInput,
        });
        alert('Contrato creado exitosamente.');
      }
      this.router.navigate(['/media-admin/contratos']);
    } catch (err: any) {
      alert('Error al guardar el contrato: ' + (err.message || err));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  formatCop(amount: number): string {
    return formatCurrency(amount);
  }
}
