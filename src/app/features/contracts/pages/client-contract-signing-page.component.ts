import { AsyncPipe, NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ContractClientService } from '../services/contract-client.service';
import {
  ContractAcceptances,
  ContractClientInfo,
  ContractDocument,
  ContractPaymentInfo,
  ContractServiceInfo,
  ContractSignatureInfo,
} from '../models/contract.model';
import { calculatePaymentInfo, formatCurrency } from '../utils/contract-financial.util';
import {
  buildContractText,
  CURRENT_CONTRACT_TEMPLATE_VERSION,
  CURRENT_PRIVACY_VERSION,
  CURRENT_TERMS_VERSION,
} from '../utils/contract-template-builder.util';
import { SignaturePadComponent, SignatureOutput } from '../components/signature-pad.component';
import { PdfViewerModalComponent } from '../components/pdf-viewer-modal.component';
import { PortfolioShellComponent } from '../../portfolio/portfolio-shell.component';
import { PortfolioContentService } from '../../portfolio/services/portfolio-content.service';

@Component({
  selector: 'tj-client-contract-signing-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
    RouterLink,
    SignaturePadComponent,
    PdfViewerModalComponent,
    PortfolioShellComponent,
  ],
  template: `
    <tj-portfolio-shell
      [navItems]="navItems"
      subtitle="Contratación Digital y Firma Electrónica"
      headerCtaLabel="Soporte WhatsApp"
      headerCtaHref="https://wa.me/573145406467">

      <main class="tj-contract-client-page">
        <!-- ESTADO CARGANDO / ERROR -->
        <div *ngIf="isLoading()" class="tj-state-card">
          <p>Cargando plantilla de contratación digital...</p>
        </div>

        <div *ngIf="errorMessage()" class="tj-state-card tj-state-card--error">
          <h2>Enlace no disponible</h2>
          <p>{{ errorMessage() }}</p>
          <a href="/portfolio" class="tj-btn-primary">Volver al Portafolio</a>
        </div>

        <!-- CONTRATO YA FIRMADO PREVIAMENTE -->
        <div *ngIf="isCompleted() && contract() as c" class="tj-state-card tj-state-card--success">
          <div class="tj-success-icon">✓</div>
          <h2>Contrato Firmado Correctamente</h2>
          <p>El contrato <strong>N° {{ c.contractNumber }}</strong> ha sido firmado e inmutabilizado con éxito.</p>
          <p class="tj-text-muted">Se ha procesado tu firma electrónica e incorporado al comprobante oficial.</p>

          <div class="tj-success-actions">
            <a *ngIf="downloadUrl()" [href]="downloadUrl()" target="_blank" download class="tj-btn-primary">
              📥 Descargar Contrato PDF Firmado
            </a>
            <a [href]="buildWhatsappHref(c)" target="_blank" rel="noopener" class="tj-btn-whatsapp">
              💬 Enviar Copia por WhatsApp a TECNOJACK
            </a>
          </div>
        </div>

        <!-- WIZARD DE CONTRATACIÓN (9 PASOS) -->
        <div *ngIf="!isLoading() && !errorMessage() && !isCompleted() && contract() as c" class="tj-wizard-wrap">
          <!-- Indicador de Progreso Visual -->
          <div class="tj-wizard-progress">
            <div class="tj-progress-bar" [style.width.%]="(currentStep() / 8) * 100"></div>
            <div class="tj-steps-labels">
              <span [class.active]="currentStep() === 1">1. Servicio</span>
              <span [class.active]="currentStep() === 2">2. Cliente</span>
              <span [class.active]="currentStep() === 3">3. Pago</span>
              <span [class.active]="currentStep() === 4">4. Contrato</span>
              <span [class.active]="currentStep() === 5">5. Políticas</span>
              <span [class.active]="currentStep() === 6">6. Firma</span>
              <span [class.active]="currentStep() === 7">7. Vista Previa</span>
              <span [class.active]="currentStep() === 8">8. Confirmación</span>
            </div>
          </div>

          <div class="tj-wizard-card">

            <!-- PASO 1: RESUMEN / EDICIÓN DEL SERVICIO -->
            <section *ngIf="currentStep() === 1" class="tj-step-panel">
              <span class="tj-step-tag">Paso 1 de 8 · Servicio Contratado</span>
              <h2>{{ c.service.packageName || 'Servicio Audiovisual' }}</h2>
              <p class="tj-step-lead">Verifica o selecciona los detalles del servicio a contratar.</p>

              <div class="tj-form-grid" *ngIf="isGenericMode()">
                <label class="tj-field">
                  <span>Nombre del servicio o paquete *</span>
                  <input type="text" [(ngModel)]="c.service.packageName" (input)="updateContractSnapshot()" placeholder="Ej. Boda Esencial (Foto + Video)" />
                </label>

                <label class="tj-field">
                  <span>Categoría</span>
                  <select [(ngModel)]="c.service.category" (change)="updateContractSnapshot()">
                    <option value="bodas">Bodas</option>
                    <option value="preboda">Preboda</option>
                    <option value="postboda">Postboda</option>
                    <option value="boda_civil">Boda Civil</option>
                    <option value="peticion_mano">Petición de Mano</option>
                    <option value="quinces">Quinces</option>
                    <option value="grados">Grados</option>
                    <option value="corporativo">Corporativo</option>
                    <option value="otros">Otros</option>
                  </select>
                </label>

                <label class="tj-field">
                  <span>Fecha estimada del evento</span>
                  <input type="date" [(ngModel)]="c.service.eventDate" (change)="updateContractSnapshot()" />
                </label>

                <label class="tj-field">
                  <span>Ciudad o locación</span>
                  <input type="text" [(ngModel)]="c.service.location" (input)="updateContractSnapshot()" placeholder="Ej. Medellín, Rionegro..." />
                </label>
              </div>

              <div class="tj-service-summary-grid" *ngIf="!isGenericMode()">
                <div class="tj-info-box">
                  <span>Categoría:</span>
                  <strong>{{ c.service.category || 'General' }}</strong>
                </div>
                <div class="tj-info-box">
                  <span>Fecha estimada:</span>
                  <strong>{{ c.service.eventDate || 'Por confirmar' }}</strong>
                </div>
                <div class="tj-info-box">
                  <span>Ciudad / Locación:</span>
                  <strong>{{ c.service.location || 'Por definir' }}</strong>
                </div>
              </div>

              <div class="tj-details-list" *ngIf="c.service.features.length">
                <h3>Cobertura y Características del Servicio</h3>
                <ul>
                  <li *ngFor="let f of c.service.features">✓ {{ f }}</li>
                </ul>
              </div>

              <div class="tj-details-list" *ngIf="c.service.deliverables.length">
                <h3>Entregables Incluidos por Contrato</h3>
                <ul>
                  <li *ngFor="let d of c.service.deliverables">📦 {{ d }}</li>
                </ul>
              </div>

              <div class="tj-wizard-actions">
                <div></div>
                <button type="button" class="tj-btn-primary" (click)="nextStep()">
                  Confirmar Servicio y Continuar →
                </button>
              </div>
            </section>

            <!-- PASO 2: DATOS DEL CLIENTE -->
            <section *ngIf="currentStep() === 2" class="tj-step-panel">
              <span class="tj-step-tag">Paso 2 de 8 · Datos del Contratante</span>
              <h2>Confirmación de Datos Personales</h2>
              <p class="tj-step-lead">Por favor verifica o completa tus datos personales para la validez legal del documento.</p>

              <div class="tj-form-grid">
                <label class="tj-field">
                  <span>Nombre completo *</span>
                  <input type="text" [(ngModel)]="clientForm.fullName" (input)="updateContractSnapshot()" placeholder="Tu nombre completo" />
                </label>

                <label class="tj-field">
                  <span>Tipo de documento *</span>
                  <select [(ngModel)]="clientForm.documentType" (change)="updateContractSnapshot()">
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="PASAPORTE">Pasaporte</option>
                    <option value="NIT">NIT</option>
                  </select>
                </label>

                <label class="tj-field">
                  <span>Número de documento *</span>
                  <input type="text" [(ngModel)]="clientForm.documentNumber" (input)="updateContractSnapshot()" placeholder="Número de documento" />
                </label>

                <label class="tj-field">
                  <span>Correo electrónico *</span>
                  <input type="email" [(ngModel)]="clientForm.email" (input)="updateContractSnapshot()" placeholder="correo@ejemplo.com" />
                </label>

                <label class="tj-field">
                  <span>Teléfono / WhatsApp *</span>
                  <input type="tel" [(ngModel)]="clientForm.phone" (input)="updateContractSnapshot()" placeholder="Número de contacto" />
                </label>

                <label class="tj-field">
                  <span>Ciudad de residencia</span>
                  <input type="text" [(ngModel)]="clientForm.city" (input)="updateContractSnapshot()" placeholder="Ej. Medellín" />
                </label>

                <label class="tj-field tj-field--full">
                  <span>Dirección física (opcional)</span>
                  <input type="text" [(ngModel)]="clientForm.address" (input)="updateContractSnapshot()" placeholder="Dirección de correspondencia" />
                </label>
              </div>

              <div class="tj-wizard-actions">
                <button type="button" class="tj-btn-ghost" (click)="prevStep()">← Atrás</button>
                <button type="button" class="tj-btn-primary" [disabled]="!isClientFormValid()" (click)="nextStep()">
                  Confirmar Datos del Cliente →
                </button>
              </div>
            </section>

            <!-- PASO 3: RESUMEN ECONÓMICO -->
            <section *ngIf="currentStep() === 3" class="tj-step-panel">
              <span class="tj-step-tag">Paso 3 de 8 · Resumen Económico</span>
              <h2>Condiciones Económicas y Anticipo Recibido</h2>
              <p class="tj-step-lead">Desglose de valores del contrato y monto abonado.</p>

              <div class="tj-form-grid" *ngIf="isGenericMode()">
                <label class="tj-field">
                  <span>Valor Total del Servicio (COP) *</span>
                  <input type="number" [(ngModel)]="genericTotalAmount" (input)="onGenericFinancialChange()" placeholder="Ej. 1500000" />
                </label>

                <label class="tj-field">
                  <span>Anticipo Abonado (COP) *</span>
                  <input type="number" [(ngModel)]="genericPaidAmount" (input)="onGenericFinancialChange()" placeholder="Ej. 600000" />
                </label>
              </div>

              <div class="tj-financial-box">
                <div class="tj-fin-row">
                  <span>Valor base del servicio:</span>
                  <strong>{{ formatCop(c.payment.baseAmount, c.payment.currency) }}</strong>
                </div>
                <div class="tj-fin-row" *ngIf="c.payment.extrasAmount > 0">
                  <span>Servicios adicionales:</span>
                  <strong>{{ formatCop(c.payment.extrasAmount, c.payment.currency) }}</strong>
                </div>
                <div class="tj-fin-row" *ngIf="c.payment.transportAmount > 0">
                  <span>Transporte y viáticos:</span>
                  <strong>{{ formatCop(c.payment.transportAmount, c.payment.currency) }}</strong>
                </div>
                <div class="tj-fin-row" *ngIf="c.payment.discountAmount > 0">
                  <span>Descuento aplicado:</span>
                  <strong>- {{ formatCop(c.payment.discountAmount, c.payment.currency) }}</strong>
                </div>
                <hr />
                <div class="tj-fin-row tj-fin-total">
                  <span>VALOR TOTAL DEL CONTRATO:</span>
                  <strong>{{ formatCop(c.payment.totalAmount, c.payment.currency) }}</strong>
                </div>
                <div class="tj-fin-row tj-fin-advance">
                  <span>Anticipo recibido y confirmado:</span>
                  <strong class="tj-text-accent">{{ formatCop(c.payment.paidAmount, c.payment.currency) }} ({{ c.payment.paidPercentage }}%)</strong>
                </div>
                <div class="tj-fin-row tj-fin-remaining">
                  <span>Saldo pendiente a cancelar:</span>
                  <strong [class.tj-text-danger]="c.payment.remainingAmount > 0">
                    {{ formatCop(c.payment.remainingAmount, c.payment.currency) }}
                  </strong>
                </div>
              </div>

              <div class="tj-wizard-actions">
                <button type="button" class="tj-btn-ghost" (click)="prevStep()">← Atrás</button>
                <button type="button" class="tj-btn-primary" (click)="nextStep()">
                  Confirmar Resumen Económico →
                </button>
              </div>
            </section>

            <!-- PASO 4: CONTRATO COMPLETO Y ANEXOS -->
            <section *ngIf="currentStep() === 4" class="tj-step-panel">
              <span class="tj-step-tag">Paso 4 de 8 · Texto del Contrato</span>
              <h2>Contrato de Prestación de Servicios</h2>
              <p class="tj-step-lead">Lee detenidamente el clausulado legal oficial de TECNOJACK.</p>

              <div class="tj-contract-text-viewer">
                <pre>{{ c.snapshot.contractText }}</pre>
              </div>

              <p class="tj-terms-link-note">
                📄 Consulta los Términos y Condiciones generales incorporados en
                <a href="https://tecnojack.co/terminos-y-condiciones" target="_blank" rel="noopener">https://tecnojack.co/terminos-y-condiciones</a>.
              </p>

              <div class="tj-wizard-actions">
                <button type="button" class="tj-btn-ghost" (click)="prevStep()">← Atrás</button>
                <button type="button" class="tj-btn-primary" (click)="nextStep()">
                  Entendido y Continuar a Políticas →
                </button>
              </div>
            </section>

            <!-- PASO 5: POLÍTICAS Y AUTORIZACIONES INDEPENDIENTES -->
            <section *ngIf="currentStep() === 5" class="tj-step-panel">
              <span class="tj-step-tag">Paso 5 de 8 · Políticas y Autorizaciones</span>
              <h2>Aceptaciones Legales Independientes</h2>
              <p class="tj-step-lead">Marca cada casilla requerida para otorgar tu consentimiento explícito.</p>

              <div class="tj-acceptances-list">
                <!-- 1. Términos -->
                <label class="tj-accept-card">
                  <input type="checkbox" [(ngModel)]="acceptances.termsAccepted" />
                  <div>
                    <strong>1. Términos y Condiciones *</strong>
                    <p>Declaro que he leído y acepto los Términos y Condiciones de TECNOJACK publicados en https://tecnojack.co/terminos-y-condiciones.</p>
                  </div>
                </label>

                <!-- 2. Tratamiento de Datos -->
                <label class="tj-accept-card">
                  <input type="checkbox" [(ngModel)]="acceptances.privacyAccepted" />
                  <div>
                    <strong>2. Tratamiento de Datos Personales *</strong>
                    <p>Autorizo a TECNOJACK para recolectar, almacenar y tratar mis datos personales suministrados para la gestión del contrato.</p>
                  </div>
                </label>

                <!-- 3. Exactitud -->
                <label class="tj-accept-card">
                  <input type="checkbox" [(ngModel)]="acceptances.informationAccuracyAccepted" />
                  <div>
                    <strong>3. Exactitud de la Información *</strong>
                    <p>Declaro que los datos personales y contractuales mostrados son correctos y corresponden a la negociación realizada.</p>
                  </div>
                </label>

                <!-- 4. Consentimiento Firma -->
                <label class="tj-accept-card">
                  <input type="checkbox" [(ngModel)]="acceptances.electronicSignatureAccepted" />
                  <div>
                    <strong>4. Firma Electrónica *</strong>
                    <p>Acepto utilizar este mecanismo de firma electrónica para manifestar mi consentimiento libre e inequívoco sobre el contrato.</p>
                  </div>
                </label>

                <!-- 5. Uso de Imagen -->
                <div class="tj-accept-card tj-accept-card--image">
                  <strong>5. Autorización sobre Uso de Imagen *</strong>
                  <p>Selecciona una de las 3 opciones respecto al uso promocional del material fotográfico/videográfico:</p>

                  <div class="tj-radio-stack">
                    <label>
                      <input type="radio" name="imageUse" value="authorized" [(ngModel)]="acceptances.imageUseChoice" />
                      <span><strong>Autorizar:</strong> Permitir uso de fotos/videos para portafolio y redes de TECNOJACK.</span>
                    </label>
                    <label>
                      <input type="radio" name="imageUse" value="not_authorized" [(ngModel)]="acceptances.imageUseChoice" />
                      <span><strong>No autorizar:</strong> No utilizar el material públicamente.</span>
                    </label>
                    <label>
                      <input type="radio" name="imageUse" value="restricted" [(ngModel)]="acceptances.imageUseChoice" />
                      <span><strong>Autorizar con restricciones:</strong> Permitir únicamente bajo las siguientes condiciones.</span>
                    </label>
                  </div>

                  <div *ngIf="acceptances.imageUseChoice === 'restricted'" class="tj-field">
                    <span>Especifica tus restricciones de uso:</span>
                    <input type="text" [(ngModel)]="acceptances.imageUseRestrictions" placeholder="Ej. No publicar fotos de menores de edad" />
                  </div>
                </div>
              </div>

              <div class="tj-wizard-actions">
                <button type="button" class="tj-btn-ghost" (click)="prevStep()">← Atrás</button>
                <button type="button" class="tj-btn-primary" [disabled]="!isAcceptancesValid()" (click)="nextStep()">
                  Confirmar Aceptaciones →
                </button>
              </div>
            </section>

            <!-- PASO 6: FIRMA ELECTRÓNICA -->
            <section *ngIf="currentStep() === 6" class="tj-step-panel">
              <span class="tj-step-tag">Paso 6 de 8 · Firma Electrónica</span>
              <h2>Incorporación de Rúbrica o Firma</h2>
              <p class="tj-step-lead">Elige el mecanismo de firma electrónica (dibujada, escrita o cargada) e ingresa tu identificación.</p>

              <tj-signature-pad
                [signerName]="clientForm.fullName"
                [signerDocument]="clientForm.documentType + ' ' + clientForm.documentNumber"
                (signatureChange)="onSignatureChange($event)">
              </tj-signature-pad>

              <div class="tj-wizard-actions">
                <button type="button" class="tj-btn-ghost" (click)="prevStep()">← Atrás</button>
                <button type="button" class="tj-btn-primary" [disabled]="!signatureData?.dataUrl" (click)="openPreviewModal()">
                  Generar Vista Previa del PDF →
                </button>
              </div>
            </section>

            <!-- PASO 7 / 8: VISTA PREVIA Y CONFIRMACIÓN -->
            <section *ngIf="currentStep() === 7 || currentStep() === 8" class="tj-step-panel">
              <span class="tj-step-tag">Paso {{ currentStep() }} de 8 · Confirmación Definitiva</span>
              <h2>Revisión Final antes del Envío</h2>
              <p class="tj-step-lead">Confirma que todos los datos y la firma incorporada estén correctos. Al hacer clic en "Confirmar y Firmar", el documento quedará procesado e inmutabilizado.</p>

              <div class="tj-summary-confirmation">
                <p><strong>Cliente:</strong> {{ clientForm.fullName }} ({{ clientForm.documentType }} {{ clientForm.documentNumber }})</p>
                <p><strong>Correo:</strong> {{ clientForm.email }} | <strong>Teléfono:</strong> {{ clientForm.phone }}</p>
                <p><strong>Paquete:</strong> {{ c.service.packageName }}</p>
                <p><strong>Valor Total:</strong> {{ formatCop(c.payment.totalAmount, c.payment.currency) }}</p>
                <p><strong>Anticipo Confirmado:</strong> {{ formatCop(c.payment.paidAmount, c.payment.currency) }}</p>
                <p><strong>Uso de Imagen:</strong> {{ acceptances.imageUseChoice }}</p>
              </div>

              <div class="tj-wizard-actions">
                <button type="button" class="tj-btn-ghost" (click)="setStep(6)">← Cambiar Firma</button>
                <button type="button" class="tj-btn-primary tj-btn-submit-final" [disabled]="isSubmitting()" (click)="submitFinalSignature()">
                  {{ isSubmitting() ? 'Generando PDF e inmutabilizando...' : '🔒 Confirmar y Firmar Definitivamente' }}
                </button>
              </div>
            </section>
          </div>
        </div>

        <!-- MODAL VISTA PREVIA PRELIMINAR -->
        <tj-pdf-viewer-modal
          [isOpen]="isPreviewModalOpen()"
          title="Vista Previa del Contrato"
          [textContent]="contract()?.snapshot?.contractText || ''"
          (closeModal)="isPreviewModalOpen.set(false)"
          (confirmPdf)="confirmPdfPreview()">
        </tj-pdf-viewer-modal>
      </main>
    </tj-portfolio-shell>
  `,
  styles: [`
    .tj-contract-client-page {
      width: min(1000px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 80px;
      color: #fff;
    }
    .tj-state-card {
      padding: 40px;
      border-radius: 20px;
      border: 1px solid var(--line, rgba(255, 255, 255, 0.12));
      background: rgba(8, 20, 28, 0.85);
      text-align: center;
    }
    .tj-state-card--error h2 { color: #f87171; }
    .tj-state-card--success h2 { color: #34d399; }
    .tj-success-icon {
      width: 60px; height: 60px; border-radius: 50%; background: rgba(16,185,129,0.2); color: #34d399;
      display: grid; place-items: center; font-size: 2rem; margin: 0 auto 16px; font-weight: 900;
    }
    .tj-success-actions { display: flex; justify-content: center; gap: 14px; margin-top: 24px; flex-wrap: wrap; }
    .tj-btn-whatsapp {
      padding: 12px 24px; border-radius: 12px; border: none; background: #25d366; color: #fff; text-decoration: none; font-weight: 700;
    }
    .tj-wizard-wrap { display: grid; gap: 24px; }
    .tj-wizard-progress {
      position: relative; padding: 16px; border-radius: 14px; background: rgba(8, 20, 28, 0.7);
      border: 1px solid var(--line, rgba(255, 255, 255, 0.1)); overflow: hidden;
    }
    .tj-progress-bar {
      position: absolute; top: 0; left: 0; height: 4px; background: var(--portfolio-brand, #0097b2); transition: width 300ms ease;
    }
    .tj-steps-labels { display: flex; justify-content: space-between; font-size: 0.76rem; color: #64748b; overflow-x: auto; gap: 8px; }
    .tj-steps-labels span.active { color: var(--portfolio-brand, #0097b2); font-weight: 700; }
    .tj-wizard-card {
      padding: 32px; border-radius: 24px; border: 1px solid var(--line, rgba(255, 255, 255, 0.12));
      background: rgba(8, 20, 28, 0.75); box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }
    .tj-step-tag { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--portfolio-accent, #ffb800); }
    .tj-step-panel h2 { margin: 6px 0 4px; font-size: 1.8rem; }
    .tj-step-lead { margin: 0 0 24px; color: #94a3b8; font-size: 0.95rem; }
    .tj-service-summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px; }
    .tj-info-box { padding: 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); display: grid; gap: 4px; }
    .tj-info-box span { font-size: 0.78rem; color: #94a3b8; }
    .tj-details-list { margin-top: 18px; }
    .tj-details-list h3 { margin: 0 0 8px; font-size: 1rem; color: var(--portfolio-accent, #ffb800); }
    .tj-details-list ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 6px; color: #cbd5e1; font-size: 0.92rem; }
    .tj-form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
    .tj-field { display: grid; gap: 6px; }
    .tj-field--full { grid-column: 1 / -1; }
    .tj-field span { font-size: 0.82rem; color: #94a3b8; }
    .tj-field input, .tj-field select { padding: 10px 14px; border-radius: 10px; border: 1px solid var(--line, rgba(255,255,255,0.2)); background: rgba(255,255,255,0.05); color: #fff; font-size: 0.95rem; }
    .tj-financial-box { padding: 20px; border-radius: 16px; border: 1px solid rgba(0,151,178,0.3); background: rgba(0,151,178,0.08); display: grid; gap: 10px; }
    .tj-fin-row { display: flex; justify-content: space-between; font-size: 0.95rem; }
    .tj-fin-total { padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.15); font-size: 1.1rem; }
    .tj-fin-remaining { font-size: 1.05rem; }
    .tj-text-accent { color: #34d399; }
    .tj-text-danger { color: #f87171; }
    .tj-contract-text-viewer { max-height: 380px; overflow-y: auto; padding: 20px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); background: #0c1822; }
    .tj-contract-text-viewer pre { white-space: pre-wrap; font-family: inherit; font-size: 0.88rem; line-height: 1.6; margin: 0; color: #cbd5e1; }
    .tj-terms-link-note { margin-top: 12px; font-size: 0.86rem; color: #94a3b8; }
    .tj-terms-link-note a { color: var(--portfolio-brand, #0097b2); }
    .tj-acceptances-list { display: grid; gap: 16px; }
    .tj-accept-card { display: flex; gap: 14px; padding: 16px; border-radius: 14px; border: 1px solid var(--line, rgba(255,255,255,0.12)); background: rgba(255,255,255,0.03); cursor: pointer; }
    .tj-accept-card--image { display: grid; gap: 10px; cursor: default; }
    .tj-accept-card p { margin: 4px 0 0; font-size: 0.86rem; color: #94a3b8; line-height: 1.45; }
    .tj-radio-stack { display: grid; gap: 10px; margin-top: 6px; }
    .tj-radio-stack label { display: flex; gap: 10px; cursor: pointer; font-size: 0.88rem; color: #cbd5e1; }
    .tj-wizard-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; gap: 16px; flex-wrap: wrap; }
    .tj-btn-primary { padding: 12px 28px; border-radius: 12px; border: none; background: var(--portfolio-brand, #0097b2); color: #fff; font-weight: 700; cursor: pointer; font-size: 0.95rem; }
    .tj-btn-primary[disabled] { opacity: 0.5; cursor: not-allowed; }
    .tj-btn-ghost { padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: #fff; cursor: pointer; font-size: 0.9rem; }
    .tj-btn-submit-final { background: linear-gradient(135deg, #0097b2, #00b4d8); font-size: 1.05rem; }
    .tj-summary-confirmation { padding: 20px; border-radius: 14px; border: 1px solid var(--line, rgba(255,255,255,0.15)); background: rgba(255,255,255,0.04); display: grid; gap: 8px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientContractSigningPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly contractClient = inject(ContractClientService);
  private readonly content = inject(PortfolioContentService);

  readonly contract = signal<ContractDocument | null>(null);
  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly isCompleted = signal(false);
  readonly currentStep = signal(1);
  readonly isSubmitting = signal(false);
  readonly isPreviewModalOpen = signal(false);
  readonly isGenericMode = signal(false);
  readonly downloadUrl = signal<string | undefined>(undefined);

  genericTotalAmount = 1500000;
  genericPaidAmount = 600000;

  clientForm: ContractClientInfo = {
    fullName: '',
    documentType: 'CC',
    documentNumber: '',
    email: '',
    phone: '',
    city: 'Medellín',
    address: '',
  };

  acceptances: ContractAcceptances = {
    termsAccepted: false,
    privacyAccepted: false,
    electronicSignatureAccepted: false,
    imageUseChoice: 'authorized',
    imageUseRestrictions: '',
    informationAccuracyAccepted: false,
  };

  signatureData?: SignatureOutput;

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (token && token !== 'generico') {
      this.loadContract(token);
    } else {
      this.initGenericContract();
    }
  }

  initGenericContract(): void {
    this.isGenericMode.set(true);
    const generic = this.buildGenericContractDoc();
    this.contract.set(generic);
    this.isLoading.set(false);
  }

  async loadContract(token: string): Promise<void> {
    this.isLoading.set(true);
    try {
      const doc = await this.contractClient.getContractByToken(token);
      if (!doc) {
        this.initGenericContract();
        return;
      }

      if (doc.status === 'signed' || doc.status === 'completed') {
        this.contract.set(doc);
        this.downloadUrl.set(doc.pdf?.downloadUrl);
        this.isCompleted.set(true);
        return;
      }

      this.contract.set(doc);
      this.clientForm = {
        fullName: doc.client.fullName || '',
        documentType: doc.client.documentType || 'CC',
        documentNumber: doc.client.documentNumber || '',
        email: doc.client.email || '',
        phone: doc.client.phone || '',
        city: doc.client.city || '',
        address: doc.client.address || '',
      };
    } catch (err) {
      console.warn('No se pudo cargar contrato con token. Usando modo genérico...', err);
      this.initGenericContract();
    } finally {
      this.isLoading.set(false);
    }
  }

  onGenericFinancialChange(): void {
    const c = this.contract();
    if (!c) return;

    const total = Math.max(0, this.genericTotalAmount || 0);
    const paid = Math.min(total, Math.max(0, this.genericPaidAmount || 0));
    const paidPercentage = total > 0 ? Number(((paid / total) * 100).toFixed(2)) : 0;
    const remaining = Math.max(0, total - paid);

    const payment: ContractPaymentInfo = {
      ...c.payment,
      baseAmount: total,
      totalAmount: total,
      paidAmount: paid,
      paidPercentage,
      remainingAmount: remaining,
    };

    const updated: ContractDocument = {
      ...c,
      payment,
    };

    this.contract.set(updated);
    this.updateContractSnapshot();
  }

  updateContractSnapshot(): void {
    const c = this.contract();
    if (!c) return;

    const updatedClient: ContractClientInfo = {
      ...c.client,
      ...this.clientForm,
    };

    const contractText = buildContractText({
      contractNumber: c.contractNumber,
      client: updatedClient,
      service: c.service,
      payment: c.payment,
    });

    this.contract.set({
      ...c,
      client: updatedClient,
      snapshot: {
        ...c.snapshot,
        contractText,
      },
    });
  }

  nextStep(): void {
    this.updateContractSnapshot();
    this.currentStep.update((s) => Math.min(8, s + 1));
  }

  prevStep(): void {
    this.currentStep.update((s) => Math.max(1, s - 1));
  }

  setStep(step: number): void {
    this.updateContractSnapshot();
    this.currentStep.set(step);
  }

  isClientFormValid(): boolean {
    return (
      this.clientForm.fullName.trim().length > 1 &&
      this.clientForm.documentNumber.trim().length > 3 &&
      this.clientForm.email.trim().length > 4 &&
      this.clientForm.phone.trim().length > 6
    );
  }

  isAcceptancesValid(): boolean {
    return (
      this.acceptances.termsAccepted &&
      this.acceptances.privacyAccepted &&
      this.acceptances.informationAccuracyAccepted &&
      this.acceptances.electronicSignatureAccepted &&
      !!this.acceptances.imageUseChoice
    );
  }

  onSignatureChange(output: SignatureOutput): void {
    this.signatureData = output;
  }

  openPreviewModal(): void {
    this.updateContractSnapshot();
    this.isPreviewModalOpen.set(true);
  }

  confirmPdfPreview(): void {
    this.isPreviewModalOpen.set(false);
    this.setStep(8);
  }

  async submitFinalSignature(): Promise<void> {
    const c = this.contract();
    if (!c || !this.signatureData?.dataUrl) {
      alert('Por favor completa la firma antes de enviar.');
      return;
    }

    this.isSubmitting.set(true);

    try {
      if (this.isGenericMode()) {
        const now = new Date().toISOString();
        const updated: ContractDocument = {
          ...c,
          status: 'signed',
          client: this.clientForm,
          acceptances: this.acceptances,
          signature: {
            method: this.signatureData.method,
            signerName: this.clientForm.fullName,
            signerDocument: `${this.clientForm.documentType} ${this.clientForm.documentNumber}`,
            signatureDataUrl: this.signatureData.dataUrl,
            signedAt: now,
          },
          snapshot: {
            ...c.snapshot,
            locked: true,
            lockedAt: now,
          },
          updatedAt: now,
        };

        this.contract.set(updated);
        this.downloadUrl.set(this.signatureData.dataUrl);
        this.isCompleted.set(true);
      } else {
        const res = await this.contractClient.signContract({
          token: c.token,
          clientInfo: this.clientForm,
          acceptances: this.acceptances,
          signature: {
            method: this.signatureData.method,
            signerName: this.clientForm.fullName,
            signerDocument: `${this.clientForm.documentType} ${this.clientForm.documentNumber}`,
            signatureDataUrl: this.signatureData.dataUrl,
            signedAt: new Date().toISOString(),
          },
        });

        if (res.success) {
          const updated = await this.contractClient.getContractByToken(c.token);
          this.contract.set(updated || c);
          this.downloadUrl.set(res.downloadUrl || this.signatureData.dataUrl);
          this.isCompleted.set(true);
        }
      }
    } catch (err: any) {
      console.error('Error al firmar contrato:', err);
      alert('No se pudo procesar la firma: ' + (err.message || err));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  formatCop(amount: number, currency = 'COP'): string {
    return formatCurrency(amount, currency);
  }

  buildWhatsappHref(c: ContractDocument): string {
    const msg = `Hola TECNOJACK, he firmado el contrato N° ${c.contractNumber} para ${c.client.fullName} (${c.service.packageName}).`;
    return `https://wa.me/573145406467?text=${encodeURIComponent(msg)}`;
  }

  private buildGenericContractDoc(): ContractDocument {
    const now = new Date().toISOString();
    const defaultClient: ContractClientInfo = {
      fullName: '',
      documentType: 'CC',
      documentNumber: '',
      email: '',
      phone: '',
      city: 'Medellín',
    };

    const defaultService: ContractServiceInfo = {
      page: 'portfolio',
      category: 'bodas',
      packageName: 'Cobertura de Servicio Audiovisual TECNOJACK',
      description: 'Cobertura fotográfica y videográfica profesional para evento.',
      features: [
        'Cobertura audiovisual profesional',
        'Equipo de producción calificado con dirección estética',
        'Edición y postproducción digital en alta resolución',
      ],
      deliverables: [
        'Galería digital privada para descarga',
        'Video resumido en alta definición',
        'Entrega digital dentro de los tiempos estipulados',
      ],
      additionalServices: [],
    };

    const defaultPayment: ContractPaymentInfo = {
      currency: 'COP',
      baseAmount: 1500000,
      extrasAmount: 0,
      transportAmount: 0,
      discountAmount: 0,
      totalAmount: 1500000,
      paidAmount: 600000,
      paidPercentage: 40,
      remainingAmount: 900000,
      selectedOption: 40,
      confirmedManually: true,
      confirmedBy: 'cliente',
      confirmedAt: now,
    };

    const contractNumber = `TJ-${new Date().getFullYear()}-GENERICO`;

    const contractText = buildContractText({
      contractNumber,
      client: defaultClient,
      service: defaultService,
      payment: defaultPayment,
    });

    return {
      id: 'generico',
      contractNumber,
      token: 'generico',
      tokenExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'ready_to_sign',
      templateVersion: CURRENT_CONTRACT_TEMPLATE_VERSION,
      termsVersion: CURRENT_TERMS_VERSION,
      privacyVersion: CURRENT_PRIVACY_VERSION,
      client: defaultClient,
      service: defaultService,
      payment: defaultPayment,
      snapshot: {
        contractText,
        termsText: 'Términos y Condiciones generales incorporados de https://tecnojack.co/terminos-y-condiciones',
        privacyText: 'Política de Tratamiento de Datos Personales de TECNOJACK.',
        serviceSnapshot: defaultService,
        paymentSnapshot: defaultPayment,
        locked: false,
      },
      audit: [],
      createdAt: now,
      updatedAt: now,
    };
  }

  get navItems() {
    return this.content.navItems();
  }
}
