import { AsyncPipe, NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ContractClientService } from '../services/contract-client.service';
import {
  ContractAcceptances,
  ContractClientInfo,
  ContractDocument,
  ContractPaymentInfo,
  ContractServiceInfo,
  ContractSignatureInfo,
  ContractServiceAddOn,
} from '../models/contract.model';
import { calculatePaymentInfo, formatCurrency } from '../utils/contract-financial.util';
import {
  buildContractText,
  CURRENT_CONTRACT_TEMPLATE_VERSION,
  CURRENT_PRIVACY_VERSION,
  CURRENT_TERMS_VERSION,
} from '../utils/contract-template-builder.util';
import {
  CATALOG_PAGES,
  CatalogPackageItem,
  CatalogAccordionGroup,
  CatalogAddOnItem,
  DEFAULT_CATALOG_ADDONS,
} from '../utils/contract-packages-catalog.util';
import {
  generateClientContractPdf,
  downloadContractPdfFile,
  buildFullWhatsappContractMessage,
} from '../utils/contract-pdf.util';
import { SignaturePadComponent, SignatureOutput } from '../components/signature-pad.component';
import { PdfViewerModalComponent } from '../components/pdf-viewer-modal.component';
import { PolicyModalComponent, PolicyType } from '../components/policy-modal.component';
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
    PolicyModalComponent,
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
          <p>Cargando catálogo oficial de contratación digital...</p>
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
          <p>El contrato <strong>N° {{ c.contractNumber }}</strong> ha sido firmado con éxito y se encuentra registrado en nuestro sistema seguro.</p>
          <p class="tj-text-muted">Se ha procesado tu firma electrónica e incorporado al comprobante oficial en formato PDF.</p>

          <div class="tj-success-actions">
            <!-- BOTÓN DE DESCARGA PDF COMPLETO -->
            <button type="button" class="tj-btn-primary" (click)="downloadPdf(c)">
              📥 Descargar Contrato PDF Firmado
            </button>

            <!-- BOTÓN DE ENVÍO WHATSAPP CON TODA LA INFORMACIÓN -->
            <a [href]="buildWhatsappHref(c)" target="_blank" rel="noopener" class="tj-btn-whatsapp">
              💬 Enviar Copia por WhatsApp a TECNOJACK
            </a>
          </div>
        </div>

        <!-- WIZARD DE CONTRATACIÓN (8 PASOS) -->
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

            <!-- PASO 1: SELECCIÓN DE PÁGINA, SERVICIO Y ADICIONALES SIMPLIFICADOS -->
            <section *ngIf="currentStep() === 1" class="tj-step-panel">
              <span class="tj-step-tag">Paso 1 de 8 · Selección del Servicio</span>
              <h2>Selecciona tu Página de Servicio, Paquete y Adicionales</h2>
              <p class="tj-step-lead">Elige primero la página del servicio, selecciona el paquete principal y agrega los servicios adicionales que desees.</p>

              <div class="tj-form-grid">
                <!-- CASILLA 1: TIPO DE SERVICIO / PÁGINA -->
                <label class="tj-field tj-field--full">
                  <span>1. Tipo de Servicio (Página de Servicio TECNOJACK) *</span>
                  <select
                    [ngModel]="selectedPageId()"
                    (ngModelChange)="onPageSelected($event)">
                    <option *ngFor="let page of catalogPages" [value]="page.id">
                      {{ page.label }}
                    </option>
                  </select>
                </label>

                <!-- CASILLA 2: LISTA DE PAQUETES AGRUPADOS POR EL TÍTULO DEL ACORDEÓN -->
                <label class="tj-field tj-field--full">
                  <span>2. Servicio / Paquete Exacto (Clasificado por Acordeón) *</span>
                  <select
                    [ngModel]="selectedPackageId()"
                    (ngModelChange)="onPackageSelected($event)">
                    <optgroup *ngFor="let group of currentSubServiceGroups()" [label]="'📂 ' + group.accordionTitle">
                      <option *ngFor="let pkg of group.packages" [value]="pkg.id">
                        {{ pkg.title }} — {{ formatCop(pkg.priceAmountCop) }}
                      </option>
                    </optgroup>
                  </select>
                </label>

                <!-- DATOS ADICIONALES DEL EVENTO -->
                <label class="tj-field">
                  <span>Fecha estimada del evento</span>
                  <input type="date" [(ngModel)]="c.service.eventDate" (change)="updateContractSnapshot()" />
                </label>

                <label class="tj-field">
                  <span>Ciudad o locación del evento</span>
                  <input type="text" [(ngModel)]="c.service.location" (input)="updateContractSnapshot()" placeholder="Ej. Medellín, Rionegro..." />
                </label>
              </div>

              <!-- SERVICIOS ADICIONALES SIMPLIFICADOS (2 EN LÍNEA) -->
              <div class="tj-addons-section" *ngIf="currentPackageAddons().length">
                <h3>Servicios Adicionales Disponibles</h3>

                <div class="tj-addons-simple-list">
                  <div
                    *ngFor="let addon of currentPackageAddons()"
                    class="tj-addon-simple-item"
                    [class.added]="isAddonSelected(addon.id)">
                    <div class="tj-addon-simple-info">
                      <strong>{{ addon.name }}</strong>
                    </div>

                    <div class="tj-addon-simple-action">
                      <span class="tj-addon-price" *ngIf="addon.priceAmountCop > 0">{{ formatCop(addon.priceAmountCop) }}</span>
                      <button
                        type="button"
                        class="tj-btn-addon-toggle"
                        [class.added]="isAddonSelected(addon.id)"
                        (click)="toggleAddon(addon)">
                        {{ isAddonSelected(addon.id) ? '✓ Agregado' : '+ Agregar' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- DETALLES DE COBERTURA Y ENTREGABLES PRECARGADOS -->
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
                  <span>Número de documento (Cédula/ID) *</span>
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

            <!-- PASO 3: RESUMEN ECONÓMICO Y ANTICIPO (SOLO NÚMEROS Y OTRO VALOR) -->
            <section *ngIf="currentStep() === 3" class="tj-step-panel">
              <span class="tj-step-tag">Paso 3 de 8 · Resumen Económico</span>
              <h2>Condiciones Económicas y Selección del Anticipo</h2>
              <p class="tj-step-lead">Revisa los valores del servicio y selecciona el porcentaje de anticipo o digita otro valor.</p>

              <!-- SELECTOR DE PORCENTAJE (SOLO NÚMEROS Y OTRO VALOR) -->
              <div class="tj-advance-selector-box">
                <span class="tj-field-label">Selecciona el Porcentaje de Anticipo:</span>
                <div class="tj-pills-row">
                  <button
                    type="button"
                    class="tj-pill-btn"
                    [class.active]="selectedAdvanceOption === 40"
                    (click)="selectAdvanceOption(40)">
                    40%
                  </button>
                  <button
                    type="button"
                    class="tj-pill-btn"
                    [class.active]="selectedAdvanceOption === 50"
                    (click)="selectAdvanceOption(50)">
                    50%
                  </button>
                  <button
                    type="button"
                    class="tj-pill-btn"
                    [class.active]="selectedAdvanceOption === 80"
                    (click)="selectAdvanceOption(80)">
                    80%
                  </button>
                  <button
                    type="button"
                    class="tj-pill-btn"
                    [class.active]="selectedAdvanceOption === 100"
                    (click)="selectAdvanceOption(100)">
                    100%
                  </button>
                  <button
                    type="button"
                    class="tj-pill-btn"
                    [class.active]="selectedAdvanceOption === 'custom'"
                    (click)="selectAdvanceOption('custom')">
                    Otro valor
                  </button>
                </div>

                <!-- CAMPO OTRO VALOR PARA QUE LO DIGITE EL USUARIO -->
                <div *ngIf="selectedAdvanceOption === 'custom'" class="tj-custom-advance-grid">
                  <label class="tj-field">
                    <span>Monto de Anticipo (COP)</span>
                    <input
                      type="number"
                      [ngModel]="c.payment.paidAmount"
                      (ngModelChange)="onCustomAdvanceAmountChange($event)"
                      placeholder="Ej. 700000" />
                  </label>

                  <label class="tj-field">
                    <span>Porcentaje (%)</span>
                    <input
                      type="number"
                      [ngModel]="c.payment.paidPercentage"
                      (ngModelChange)="onCustomAdvancePercentageChange($event)"
                      placeholder="Ej. 45" />
                  </label>
                </div>
              </div>

              <!-- DESGLOSE FINANCIERO COMPLETO -->
              <div class="tj-financial-box">
                <div class="tj-fin-row">
                  <span>Valor base del servicio:</span>
                  <strong>{{ formatCop(c.payment.baseAmount, c.payment.currency) }}</strong>
                </div>

                <!-- SERVICIOS ADICIONALES SELECCIONADOS -->
                <div *ngIf="c.service.additionalServices.length > 0" class="tj-fin-addons-list">
                  <div *ngFor="let add of c.service.additionalServices" class="tj-fin-row tj-fin-subrow">
                    <span>+ {{ add.name }}:</span>
                    <span>{{ formatCop(add.value, c.payment.currency) }}</span>
                  </div>
                </div>

                <div class="tj-fin-row" *ngIf="c.payment.extrasAmount > 0">
                  <span>Subtotal adicionales:</span>
                  <strong>+ {{ formatCop(c.payment.extrasAmount, c.payment.currency) }}</strong>
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
                  <span>Anticipo confirmado a abonar:</span>
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
              <p class="tj-step-lead">Lee detenidamente el clausulado legal oficial de TECNOJACK para {{ c.service.packageName }}.</p>

              <div class="tj-contract-text-viewer">
                <pre>{{ c.snapshot.contractText }}</pre>
              </div>

              <p class="tj-terms-link-note">
                📄 Haz clic en los botones del Paso 5 para leer las políticas completas en un modal interactivo.
              </p>

              <div class="tj-wizard-actions">
                <button type="button" class="tj-btn-ghost" (click)="prevStep()">← Atrás</button>
                <button type="button" class="tj-btn-primary" (click)="nextStep()">
                  Entendido y Continuar a Políticas →
                </button>
              </div>
            </section>

            <!-- PASO 5: POLÍTICAS Y AUTORIZACIONES CON MODAL EMERGENTE -->
            <section *ngIf="currentStep() === 5" class="tj-step-panel">
              <span class="tj-step-tag">Paso 5 de 8 · Políticas y Autorizaciones</span>
              <h2>Aceptaciones Legales Independientes</h2>
              <p class="tj-step-lead">Marca cada casilla requerida para otorgar tu consentimiento explícito. Puedes hacer clic en los enlaces para leer el documento completo en una ventana emergente sin salir de la pantalla.</p>

              <div class="tj-acceptances-list">
                <!-- 1. Términos con Modal Emergente -->
                <label class="tj-accept-card">
                  <input type="checkbox" [(ngModel)]="acceptances.termsAccepted" />
                  <div>
                    <strong>1. Términos y Condiciones *</strong>
                    <p>
                      Declaro que he leído y acepto los
                      <button type="button" class="tj-accept-link-btn" (click)="openPolicyModal('terms', $event)">
                        Términos y Condiciones Generales de TECNOJACK 📖
                      </button>.
                    </p>
                  </div>
                </label>

                <!-- 2. Tratamiento de Datos con Modal Emergente -->
                <label class="tj-accept-card">
                  <input type="checkbox" [(ngModel)]="acceptances.privacyAccepted" />
                  <div>
                    <strong>2. Tratamiento de Datos Personales (Habeas Data) *</strong>
                    <p>
                      Autorizo a TECNOJACK para recolectar y tratar mis datos personales suministrados conforme a la
                      <button type="button" class="tj-accept-link-btn" (click)="openPolicyModal('privacy', $event)">
                        Política de Privacidad y Tratamiento de Datos 📖
                      </button>.
                    </p>
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

                <!-- 4. Consentimiento Firma con Modal Emergente -->
                <label class="tj-accept-card">
                  <input type="checkbox" [(ngModel)]="acceptances.electronicSignatureAccepted" />
                  <div>
                    <strong>4. Firma Electrónica y Validez Legal *</strong>
                    <p>
                      Acepto utilizar este mecanismo de firma electrónica de acuerdo a las
                      <button type="button" class="tj-accept-link-btn" (click)="openPolicyModal('signature', $event)">
                        Condiciones de Validez y Firma Digital 📖
                      </button>.
                    </p>
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
              <p class="tj-step-lead">Confirma que todos los datos y la firma incorporada estén correctos. Al hacer clic en "Confirmar y Firmar", el documento se guardará firmado de forma segura y podrás descargar tu copia en PDF.</p>

              <div class="tj-summary-confirmation">
                <p><strong>Cliente:</strong> {{ clientForm.fullName }} ({{ clientForm.documentType }} {{ clientForm.documentNumber }})</p>
                <p><strong>Correo:</strong> {{ clientForm.email }} | <strong>Teléfono:</strong> {{ clientForm.phone }}</p>
                <p><strong>Paquete:</strong> {{ c.service.packageName }}</p>
                <p *ngIf="c.service.additionalServices.length"><strong>Adicionales:</strong> {{ c.service.additionalServices.length }} servicios seleccionados</p>
                <p><strong>Valor Total:</strong> {{ formatCop(c.payment.totalAmount, c.payment.currency) }}</p>
                <p><strong>Anticipo Confirmado:</strong> {{ formatCop(c.payment.paidAmount, c.payment.currency) }} ({{ c.payment.paidPercentage }}%)</p>
                <p><strong>Uso de Imagen:</strong> {{ acceptances.imageUseChoice }}</p>
              </div>

              <div class="tj-wizard-actions">
                <button type="button" class="tj-btn-ghost" (click)="setStep(6)">← Cambiar Firma</button>
                <button type="button" class="tj-btn-primary tj-btn-submit-final" [disabled]="isSubmitting()" (click)="submitFinalSignature()">
                  {{ isSubmitting() ? 'Guardando contrato firmado de forma segura...' : '🔒 Confirmar y Firmar' }}
                </button>
              </div>
            </section>
          </div>
        </div>

        <!-- MODAL VISTA PREVIA PRELIMINAR -->
        <tj-pdf-viewer-modal
          [isOpen]="isPreviewModalOpen()"
          title="Vista Previa del Contrato PDF"
          [pdfUrl]="previewPdfUrl()"
          [textContent]="contract()?.snapshot?.contractText || ''"
          (closeModal)="isPreviewModalOpen.set(false)"
          (confirmPdf)="confirmPdfPreview()">
        </tj-pdf-viewer-modal>

        <!-- MODAL EMERGENTE DE POLÍTICAS Y TÉRMINOS -->
        <tj-policy-modal
          [isOpen]="isPolicyModalOpen()"
          [policyType]="activePolicyType()"
          (closeModal)="isPolicyModalOpen.set(false)">
        </tj-policy-modal>
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
      padding: 12px 24px; border-radius: 12px; border: none; background: #25d366; color: #fff; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;
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
    .tj-details-list { margin-top: 18px; }
    .tj-details-list h3 { margin: 0 0 8px; font-size: 1rem; color: var(--portfolio-accent, #ffb800); }
    .tj-details-list ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 6px; color: #cbd5e1; font-size: 0.92rem; }
    
    /* ADICIONALES SIMPLIFICADOS ESTILOS (2 EN LÍNEA) */
    .tj-addons-section { margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--line, rgba(255,255,255,0.1)); }
    .tj-addons-section h3 { margin: 0 0 12px; font-size: 1.05rem; color: var(--portfolio-brand, #0097b2); }
    .tj-addons-simple-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; }
    .tj-addon-simple-item {
      display: flex; justify-content: space-between; align-items: center; padding: 12px 18px;
      border-radius: 12px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03);
      transition: all 200ms ease; flex-wrap: wrap; gap: 12px;
    }
    .tj-addon-simple-item.added { border-color: var(--portfolio-brand, #0097b2); background: rgba(0,151,178,0.1); }
    .tj-addon-simple-info strong { font-size: 0.92rem; color: #fff; }
    .tj-addon-simple-action { display: flex; align-items: center; gap: 14px; }
    .tj-addon-price { font-size: 0.9rem; font-weight: 700; color: var(--portfolio-accent, #ffb800); white-space: nowrap; }
    .tj-btn-addon-toggle {
      padding: 6px 16px; border-radius: 8px; border: 1px solid var(--portfolio-brand, #0097b2);
      background: transparent; color: #fff; font-size: 0.82rem; font-weight: 700; cursor: pointer;
      transition: all 200ms ease;
    }
    .tj-btn-addon-toggle:hover { background: rgba(0,151,178,0.2); }
    .tj-btn-addon-toggle.added { background: var(--portfolio-brand, #0097b2); color: #fff; }

    /* SELECCIÓN DE ANTICIPO ESTILOS */
    .tj-advance-selector-box { margin-bottom: 20px; padding: 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); }
    .tj-field-label { display: block; margin-bottom: 10px; font-size: 0.85rem; font-weight: 700; color: #cbd5e1; }
    .tj-pills-row { display: flex; gap: 10px; flex-wrap: wrap; }
    .tj-pill-btn {
      padding: 8px 18px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: #fff;
      font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 200ms ease;
    }
    .tj-pill-btn:hover { border-color: var(--portfolio-brand, #0097b2); }
    .tj-pill-btn.active { border-color: var(--portfolio-brand, #0097b2); background: var(--portfolio-brand, #0097b2); font-weight: 700; }
    .tj-custom-advance-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 14px; padding-top: 14px; border-top: 1px dashed rgba(255,255,255,0.15); }

    .tj-form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
    .tj-field { display: grid; gap: 6px; }
    .tj-field--full { grid-column: 1 / -1; }
    .tj-field span { font-size: 0.82rem; color: #94a3b8; }
    .tj-field input, .tj-field select { padding: 10px 14px; border-radius: 10px; border: 1px solid var(--line, rgba(255,255,255,0.2)); background: rgba(255,255,255,0.05); color: #fff; font-size: 0.95rem; }
    optgroup { background: #0c1822; color: var(--portfolio-accent, #ffb800); font-weight: 700; }
    option { background: #112233; color: #ffffff; font-weight: 400; }
    .tj-financial-box { padding: 20px; border-radius: 16px; border: 1px solid rgba(0,151,178,0.3); background: rgba(0,151,178,0.08); display: grid; gap: 10px; }
    .tj-fin-row { display: flex; justify-content: space-between; font-size: 0.95rem; }
    .tj-fin-subrow { font-size: 0.85rem; color: #cbd5e1; padding-left: 12px; }
    .tj-fin-addons-list { display: grid; gap: 4px; margin: 4px 0; }
    .tj-fin-total { padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.15); font-size: 1.1rem; }
    .tj-fin-remaining { font-size: 1.05rem; }
    .tj-text-accent { color: #34d399; }
    .tj-text-danger { color: #f87171; }
    .tj-contract-text-viewer { max-height: 380px; overflow-y: auto; padding: 20px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); background: #0c1822; }
    .tj-contract-text-viewer pre { white-space: pre-wrap; font-family: inherit; font-size: 0.88rem; line-height: 1.6; color: #cbd5e1; }
    .tj-terms-link-note { margin-top: 12px; font-size: 0.86rem; color: #94a3b8; }
    .tj-acceptances-list { display: grid; gap: 16px; }
    .tj-accept-card { display: flex; gap: 14px; padding: 16px; border-radius: 14px; border: 1px solid var(--line, rgba(255, 255, 255, 0.12)); background: rgba(255,255,255,0.03); cursor: pointer; }
    .tj-accept-card--image { display: grid; gap: 10px; cursor: default; }
    .tj-accept-card p { margin: 4px 0 0; font-size: 0.86rem; color: #94a3b8; line-height: 1.45; }
    .tj-accept-link-btn { background: transparent; border: none; padding: 0; color: var(--portfolio-brand, #0097b2); font-size: inherit; text-decoration: underline; font-weight: 600; cursor: pointer; transition: color 150ms ease; display: inline; }
    .tj-accept-link-btn:hover { color: var(--portfolio-accent, #ffb800); }
    .tj-radio-stack { display: grid; gap: 10px; margin-top: 6px; }
    .tj-radio-stack label { display: flex; gap: 10px; cursor: pointer; font-size: 0.88rem; color: #cbd5e1; }
    .tj-wizard-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; gap: 16px; flex-wrap: wrap; }
    .tj-btn-primary { padding: 12px 28px; border-radius: 12px; border: none; background: var(--portfolio-brand, #0097b2); color: #fff; font-weight: 700; cursor: pointer; font-size: 0.95rem; }
    .tj-btn-primary[disabled] { opacity: 0.5; cursor: not-allowed; }
    .tj-btn-ghost { padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: #fff; cursor: pointer; font-size: 0.9rem; }
    .tj-btn-submit-final { background: linear-gradient(135deg, #0097b2, #00b4d8); font-size: 1.05rem; }
    .tj-summary-confirmation { padding: 20px; border-radius: 14px; border: 1px solid var(--line, rgba(255,255,255,0.15)); background: rgba(255,255,255,0.04); display: grid; gap: 8px; }

    /* ESTILOS DE RESPONSIVIDAD PARA DISPOSITIVOS MÓVILES */
    @media (max-width: 600px) {
      .tj-contract-client-page {
        padding: 16px 0 40px;
      }
      .tj-wizard-card {
        padding: 20px 16px;
        border-radius: 16px;
      }
      .tj-step-panel h2 {
        font-size: 1.4rem;
      }
      .tj-step-lead {
        font-size: 0.88rem;
        margin-bottom: 18px;
      }
      .tj-wizard-actions {
        flex-direction: column-reverse;
        align-items: stretch;
      }
      .tj-wizard-actions button,
      .tj-wizard-actions a {
        width: 100%;
        text-align: center;
      }
      .tj-steps-labels {
        font-size: 0.7rem;
      }
      .tj-addon-simple-item {
        flex-direction: column;
        align-items: flex-start;
        padding: 12px 14px;
        gap: 8px;
      }
      .tj-addon-simple-action {
        width: 100%;
        justify-content: space-between;
      }
      .tj-btn-addon-toggle {
        width: auto;
      }
      .tj-accept-card {
        padding: 12px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientContractSigningPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly contractClient = inject(ContractClientService);
  private readonly content = inject(PortfolioContentService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly catalogPages = CATALOG_PAGES;

  readonly contract = signal<ContractDocument | null>(null);
  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly isCompleted = signal(false);
  readonly currentStep = signal(1);
  readonly isSubmitting = signal(false);
  readonly isPreviewModalOpen = signal(false);
  readonly previewPdfUrl = signal<SafeResourceUrl | null>(null);
  readonly isGenericMode = signal(false);
  readonly downloadUrl = signal<string | undefined>(undefined);

  readonly isPolicyModalOpen = signal(false);
  readonly activePolicyType = signal<PolicyType>(null);

  readonly selectedPageId = signal<string>('bodas');
  readonly selectedPackageId = signal<string>('');
  readonly currentPackageAddons = signal<CatalogAddOnItem[]>([]);

  selectedAdvanceOption: 40 | 50 | 80 | 100 | 'custom' = 40;

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

  openPolicyModal(type: PolicyType, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.activePolicyType.set(type);
    this.isPolicyModalOpen.set(true);
  }

  currentSubServiceGroups(): CatalogAccordionGroup[] {
    const pageId = this.selectedPageId();
    const page = this.catalogPages.find((p) => p.id === pageId);
    return page ? page.subServiceGroups : [];
  }

  onPageSelected(pageId: string): void {
    this.selectedPageId.set(pageId);
    const groups = this.currentSubServiceGroups();
    if (groups.length > 0 && groups[0].packages.length > 0) {
      this.onPackageSelected(groups[0].packages[0].id);
    }
  }

  onPackageSelected(pkgId: string): void {
    this.selectedPackageId.set(pkgId);
    const groups = this.currentSubServiceGroups();

    let foundPkg: CatalogPackageItem | undefined;
    for (const g of groups) {
      const match = g.packages.find((p) => p.id === pkgId);
      if (match) {
        foundPkg = match;
        break;
      }
    }

    if (!foundPkg) return;

    // Cargar adicionales dinámicos específicos del paquete seleccionado
    this.currentPackageAddons.set(foundPkg.availableAddOns || DEFAULT_CATALOG_ADDONS);

    const c = this.contract();
    if (!c) return;

    const baseAmount = foundPkg.priceAmountCop;

    const service: ContractServiceInfo = {
      ...c.service,
      category: foundPkg.category,
      packageName: foundPkg.packageName,
      description: foundPkg.lead,
      features: [...foundPkg.features],
      deliverables: [...foundPkg.deliverables],
      additionalServices: [], // Resetear adicionales seleccionados al cambiar de paquete
    };

    const updated: ContractDocument = {
      ...c,
      service,
      payment: {
        ...c.payment,
        baseAmount,
        extrasAmount: 0,
      },
    };

    this.contract.set(updated);
    this.recalculateFinancials();
  }

  isAddonSelected(addonId: string): boolean {
    const c = this.contract();
    if (!c || !c.service.additionalServices) return false;
    return c.service.additionalServices.some((a) => a.id === addonId);
  }

  toggleAddon(addon: CatalogAddOnItem): void {
    const c = this.contract();
    if (!c) return;

    let addons = [...(c.service.additionalServices || [])];
    const index = addons.findIndex((a) => a.id === addon.id);

    if (index >= 0) {
      addons.splice(index, 1);
    } else {
      addons.push({
        id: addon.id,
        name: addon.name,
        description: addon.description,
        value: addon.priceAmountCop,
      });
    }

    const updated: ContractDocument = {
      ...c,
      service: {
        ...c.service,
        additionalServices: addons,
      },
    };

    this.contract.set(updated);
    this.recalculateFinancials();
  }

  selectAdvanceOption(option: 40 | 50 | 80 | 100 | 'custom'): void {
    this.selectedAdvanceOption = option;
    this.recalculateFinancials();
  }

  onCustomAdvanceAmountChange(amount: number): void {
    const c = this.contract();
    if (!c) return;

    const validAmount = Math.max(0, Math.min(amount || 0, c.payment.totalAmount));
    const percentage = c.payment.totalAmount > 0 ? Math.round((validAmount / c.payment.totalAmount) * 100) : 0;

    const payment: ContractPaymentInfo = {
      ...c.payment,
      paidAmount: validAmount,
      paidPercentage: percentage,
      remainingAmount: c.payment.totalAmount - validAmount,
      selectedOption: 'custom',
    };

    this.contract.set({ ...c, payment });
    this.updateContractSnapshot();
  }

  onCustomAdvancePercentageChange(pct: number): void {
    const c = this.contract();
    if (!c) return;

    const validPct = Math.max(0, Math.min(pct || 0, 100));
    const amount = Math.round((c.payment.totalAmount * validPct) / 100);

    const payment: ContractPaymentInfo = {
      ...c.payment,
      paidAmount: amount,
      paidPercentage: validPct,
      remainingAmount: c.payment.totalAmount - amount,
      selectedOption: 'custom',
    };

    this.contract.set({ ...c, payment });
    this.updateContractSnapshot();
  }

  recalculateFinancials(): void {
    const c = this.contract();
    if (!c) return;

    const baseAmount = c.payment.baseAmount || 0;
    const extrasAmount = (c.service.additionalServices || []).reduce((sum, add) => sum + add.value, 0);
    const transportAmount = c.payment.transportAmount || 0;
    const discountAmount = c.payment.discountAmount || 0;

    const totalAmount = Math.max(0, baseAmount + extrasAmount + transportAmount - discountAmount);

    let paidPercentage = c.payment.paidPercentage || 40;
    if (this.selectedAdvanceOption !== 'custom') {
      paidPercentage = this.selectedAdvanceOption;
    }

    const paidAmount = Math.round((totalAmount * paidPercentage) / 100);
    const remainingAmount = Math.max(0, totalAmount - paidAmount);

    const payment: ContractPaymentInfo = {
      ...c.payment,
      baseAmount,
      extrasAmount,
      transportAmount,
      discountAmount,
      totalAmount,
      paidAmount,
      paidPercentage,
      remainingAmount,
      selectedOption: this.selectedAdvanceOption,
    };

    this.contract.set({
      ...c,
      payment,
    });

    this.updateContractSnapshot();
  }

  initGenericContract(): void {
    this.isGenericMode.set(true);
    const generic = this.buildGenericContractDoc();
    this.contract.set(generic);
    this.isLoading.set(false);

    const groups = this.currentSubServiceGroups();
    if (groups.length > 0 && groups[0].packages.length > 0) {
      this.onPackageSelected(groups[0].packages[0].id);
    }
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
      if (doc.payment.selectedOption) {
        this.selectedAdvanceOption = doc.payment.selectedOption as any;
      }
    } catch (err) {
      console.warn('No se pudo cargar contrato con token. Usando modo genérico...', err);
      this.initGenericContract();
    } finally {
      this.isLoading.set(false);
    }
  }

  updateContractSnapshot(): void {
    const c = this.contract();
    if (!c) return;

    const updatedClient: ContractClientInfo = {
      ...c.client,
      ...this.clientForm,
    };

    const docNumClean = (this.clientForm.documentNumber || '').trim();
    const contractNumber = docNumClean
      ? `TJ-${new Date().getFullYear()}-${docNumClean}`
      : c.contractNumber;

    const contractText = buildContractText({
      contractNumber,
      client: updatedClient,
      service: c.service,
      payment: c.payment,
    });

    this.contract.set({
      ...c,
      contractNumber,
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

  /**
   * Abre la vista previa del contrato generando la vista PDF nativa con la marca de agua preliminar.
   */
  async openPreviewModal(): Promise<void> {
    this.updateContractSnapshot();
    const c = this.contract();
    if (!c) return;

    const previewDoc: ContractDocument = {
      ...c,
      client: this.clientForm,
      acceptances: this.acceptances,
      signature: this.signatureData ? {
        method: this.signatureData.method,
        signerName: this.clientForm.fullName,
        signerDocument: `${this.clientForm.documentType} ${this.clientForm.documentNumber}`,
        signatureDataUrl: this.signatureData.dataUrl,
        signedAt: new Date().toISOString(),
      } : undefined,
    };

    try {
      const pdfRes = await generateClientContractPdf(previewDoc, true); // isWatermarkPreview = true
      const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfRes.downloadUrl);
      this.previewPdfUrl.set(safeUrl);
      this.isPreviewModalOpen.set(true);
    } catch (err) {
      console.warn('No se pudo generar vista previa PDF nativa. Usando fallback text...', err);
      this.isPreviewModalOpen.set(true);
    }
  }

  confirmPdfPreview(): void {
    this.isPreviewModalOpen.set(false);
    this.setStep(8);
  }

  /**
   * Genera y descarga el archivo PDF completo con TODA la información del contrato.
   */
  async downloadPdf(c: ContractDocument): Promise<void> {
    await downloadContractPdfFile(c);
  }

  async submitFinalSignature(): Promise<void> {
    const c = this.contract();
    if (!c || !this.signatureData?.dataUrl) {
      alert('Por favor completa la firma antes de enviar.');
      return;
    }

    this.isSubmitting.set(true);

    try {
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

      // 1. Subir PDF a Firebase Storage y registrar en Firestore
      const uploadRes = await this.contractClient.uploadContractPdfToFirebase(updated);

      if (uploadRes.downloadUrl) {
        updated.pdf = {
          finalStoragePath: `contracts/${new Date().getFullYear()}/${c.id}/contract-signed.pdf`,
          downloadUrl: uploadRes.downloadUrl,
          sha256: uploadRes.sha256Hex,
          generatedAt: now,
        };
      }

      this.contract.set(updated);
      this.downloadUrl.set(uploadRes.downloadUrl);
      this.isCompleted.set(true);

      // Disparar descarga automática del PDF en el navegador
      await downloadContractPdfFile(updated);
    } catch (err: any) {
      console.error('Error al procesar la firma del contrato:', err);
      alert('No se pudo procesar la firma: ' + (err.message || err));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  formatCop(amount: number, currency = 'COP'): string {
    return formatCurrency(amount, currency);
  }

  /**
   * Construye la URL de WhatsApp prellenada con TODA la información del contrato.
   */
  buildWhatsappHref(c: ContractDocument): string {
    const fullMessage = buildFullWhatsappContractMessage(c);
    return `https://wa.me/573145406467?text=${encodeURIComponent(fullMessage)}`;
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
      packageName: 'Esencial – Tu historia en foto y video',
      description: 'Cobertura equilibrada que combina fotografía y video.',
      features: [
        'Cobertura parcial del evento',
        '1 fotógrafo + 1 videógrafo',
        'Duración de 4 a 6 horas',
      ],
      deliverables: [
        'Hasta 150 fotografías editadas en alta resolución',
        'Video principal de 3 a 5 minutos',
        'Galería digital privada por 3 meses',
      ],
      additionalServices: [],
    };

    const defaultPayment: ContractPaymentInfo = {
      currency: 'COP',
      baseAmount: 1650000,
      extrasAmount: 0,
      transportAmount: 0,
      discountAmount: 0,
      totalAmount: 1650000,
      paidAmount: 660000,
      paidPercentage: 40,
      remainingAmount: 990000,
      selectedOption: 40,
      confirmedManually: true,
      confirmedBy: 'cliente',
      confirmedAt: now,
    };

    const contractNumber = `TJ-${new Date().getFullYear()}-DIGITAL`;

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
