import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';

export type PolicyType = 'terms' | 'privacy' | 'signature' | null;

@Component({
  selector: 'tj-policy-modal',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="isOpen" class="tj-policy-overlay" (click)="onOverlayClick($event)">
      <div class="tj-policy-modal-card">
        <header class="tj-policy-header">
          <h2>{{ getTitle() }}</h2>
          <button type="button" class="tj-btn-close" (click)="closeModal.emit()">✕</button>
        </header>

        <div class="tj-policy-content">
          <!-- 1. TÉRMINOS Y CONDICIONES GENERALES -->
          <div *ngIf="policyType === 'terms'">
            <h3>1. OBJETO Y ALCANCE DEL SERVICIO</h3>
            <p>
              TECNOJACK se compromete a prestar los servicios audiovisuales, fotográficos y de producción contratados con los más altos estándares de calidad profesional, utilizando equipos de alta definición (4K/HD) y personal calificado.
            </p>

            <h3>2. TIEMPOS Y CONDICIONES DE ENTREGA</h3>
            <p>
              El material final editado será entregado dentro de los plazos acordados tras la realización del evento (habitualmente entre 15 y 30 días hábiles), previa cancelación del 100% del saldo pendiente. Los archivos se entregan mediante enlace digital privado (Google Drive / Galería Digital) activo durante el tiempo estipulado.
            </p>

            <h3>3. MATERIAL CRUDO (RAW)</h3>
            <p>
              El material sin procesar o archivos RAW son propiedad técnica de TECNOJACK y no se entregan en el servicio estándar salvo que se hayan contratado explícitamente como un adicional.
            </p>

            <h3>4. REPROGRAMACIONES Y FUERZA MAYOR</h3>
            <p>
              En caso de fuerza mayor o caso fortuito debidamente probado, las partes acordarán una nueva fecha sujeta a la disponibilidad de agenda de TECNOJACK sin penalidad.
            </p>
          </div>

          <!-- 2. TRATAMIENTO DE DATOS PERSONALES (HABEAS DATA) -->
          <div *ngIf="policyType === 'privacy'">
            <h3>POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES (LEY 1581 DE 2012)</h3>
            <p>
              De conformidad con la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia, TECNOJACK informa a EL CLIENTE que sus datos personales recolectados en este proceso contractual serán almacenados y tratados de forma segura.
            </p>

            <h3>1. FINALIDAD DEL TRATAMIENTO</h3>
            <p>
              Los datos suministrados (Nombre, Cédula, Correo, Teléfono, Dirección) tienen las siguientes finalidades:
            </p>
            <ul>
              <li>Elaboración, gestión e inmutabilización del contrato de prestación de servicios.</li>
              <li>Coordinación logística de la fecha y locación del evento.</li>
              <li>Facturación, soporte y atención de consultas comerciales.</li>
            </ul>

            <h3>2. DERECHOS DEL TITULAR (HABEAS DATA)</h3>
            <p>
              Como titular de sus datos personales, EL CLIENTE tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos en cualquier momento escribiendo al correo electrónico <strong>tecnojack.films&#64;gmail.com</strong>.
            </p>
          </div>

          <!-- 3. CONDICIONES DE FIRMA ELECTRÓNICA -->
          <div *ngIf="policyType === 'signature'">
            <h3>VALIDEZ Y EFICACIA PROBATORIA DE LA FIRMA ELECTRÓNICA (LEY 527 DE 1999)</h3>
            <p>
              De conformidad con la Ley 527 de 1999 y el Decreto 2364 de 2012 sobre Comercio Electrónico y Firmas Digitales en Colombia, las partes acuerdan otorgar plena validez jurídica a la rúbrica o firma electrónica capturada en esta plataforma.
            </p>

            <h3>1. CONSENTIMIENTO INEQUÍVOCO</h3>
            <p>
              La captura de la rúbrica manuscrita digital o escrita en pantalla, vinculada a los datos de cédula e IP del usuario, constituye manifestación expresa de voluntad vinculante e inalienable.
            </p>

            <h3>2. INTEGRIDAD DEL DOCUMENTO</h3>
            <p>
              El documento firmado genera una huella criptográfica SHA-256 única que garantiza que el contrato no ha sido modificado ni alterado tras su suscripción.
            </p>
          </div>
        </div>

        <footer class="tj-policy-footer">
          <button type="button" class="tj-btn-primary" (click)="closeModal.emit()">
            Entendido y Cerrar
          </button>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .tj-policy-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.82);
      backdrop-filter: blur(8px);
      display: grid;
      place-items: center;
      padding: 20px;
    }
    .tj-policy-modal-card {
      width: min(680px, calc(100vw - 32px));
      max-height: 85vh;
      background: #08141c;
      border: 1px solid rgba(0, 151, 178, 0.4);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      color: #fff;
      overflow: hidden;
    }
    .tj-policy-header {
      padding: 20px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(0, 151, 178, 0.08);
    }
    .tj-policy-header h2 {
      margin: 0;
      font-size: 1.15rem;
      color: #0097b2;
      font-weight: 700;
    }
    .tj-btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 1.3rem;
      cursor: pointer;
      padding: 4px 8px;
    }
    .tj-btn-close:hover { color: #fff; }
    .tj-policy-content {
      padding: 24px;
      overflow-y: auto;
      font-size: 0.9rem;
      line-height: 1.6;
      color: #cbd5e1;
    }
    .tj-policy-content h3 {
      margin: 16px 0 6px;
      font-size: 0.95rem;
      color: #ffb800;
    }
    .tj-policy-content h3:first-child { margin-top: 0; }
    .tj-policy-content p { margin: 0 0 12px; }
    .tj-policy-content ul { margin: 0 0 12px; padding-left: 20px; }
    .tj-policy-footer {
      padding: 16px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: flex-end;
      background: rgba(0, 0, 0, 0.2);
    }
    .tj-btn-primary {
      padding: 10px 24px;
      border-radius: 10px;
      border: none;
      background: #0097b2;
      color: #fff;
      font-weight: 700;
      cursor: pointer;
    }
    .tj-btn-primary:hover { background: #00b4d8; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyModalComponent {
  @Input() isOpen = false;
  @Input() policyType: PolicyType = null;
  @Output() closeModal = new EventEmitter<void>();

  getTitle(): string {
    switch (this.policyType) {
      case 'terms':
        return 'Términos y Condiciones Generales de Servicio';
      case 'privacy':
        return 'Política de Tratamiento de Datos Personales (Habeas Data)';
      case 'signature':
        return 'Condiciones y Validez Legal de la Firma Electrónica';
      default:
        return 'Información Legal';
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('tj-policy-overlay')) {
      this.closeModal.emit();
    }
  }
}
