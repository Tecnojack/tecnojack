import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

export type PolicyType = 'terms' | 'privacy' | 'signature' | null;

interface TermsSection {
  title: string;
  content: string;
}

@Component({
  selector: 'tj-policy-modal',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <div *ngIf="isOpen" class="tj-policy-overlay" (click)="onOverlayClick($event)">
      <div class="tj-policy-modal-card">
        <header class="tj-policy-header">
          <h2>{{ getTitle() }}</h2>
          <button type="button" class="tj-btn-close" (click)="closeModal.emit()">✕</button>
        </header>

        <div class="tj-policy-content">
          <!-- 1. TÉRMINOS Y CONDICIONES ORIGINALES COMPLETOS -->
          <div *ngIf="policyType === 'terms'">
            <p class="tj-policy-intro-note">
              A continuación se presentan los Términos y Condiciones oficiales vigentes de TECNOJACK:
            </p>

            <div *ngFor="let section of termsSections" class="tj-terms-section-block">
              <h4>{{ section.title }}</h4>
              <p [innerHTML]="formatContent(section.content)"></p>
            </div>
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
    .tj-policy-intro-note {
      font-style: italic;
      color: #94a3b8;
      margin-bottom: 20px;
      border-left: 3px solid #0097b2;
      padding-left: 10px;
    }
    .tj-terms-section-block {
      margin-bottom: 20px;
      padding-bottom: 14px;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
    }
    .tj-terms-section-block h4 {
      margin: 0 0 6px;
      font-size: 0.95rem;
      color: #ffb800;
      font-weight: 700;
    }
    .tj-terms-section-block p {
      margin: 0;
      white-space: pre-line;
      color: #cbd5e1;
    }
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

  readonly termsSections: TermsSection[] = [
    {
      title: '1. Identificación del Prestador',
      content: 'Los servicios son prestados por TECNOJACK, representada por Jackson Palacios, con sede en Medellín, Antioquia, Colombia.'
    },
    {
      title: '2. Objeto del Servicio',
      content: 'TECNOJACK ofrece servicios audiovisuales que incluyen fotografía, video, producción audiovisual y servicios complementarios para eventos sociales, corporativos y personales. Cada servicio se presta de acuerdo con el paquete o propuesta seleccionada por el cliente.'
    },
    {
      title: '3. Reserva y Pagos',
      content: 'Para confirmar cualquier servicio se requiere un anticipo del 40% del valor total. La fecha solo se considera reservada una vez realizado el anticipo.'
    },
    {
      title: '4. Entregas',
      content: 'Los tiempos de entrega estimados son:\n- Fotografías: entre 1 y 3 semanas.\n- Videos: entre 2 y 6 semanas.\nEstos tiempos pueden variar según la carga de trabajo y complejidad del proyecto. Las entregas se realizan en formato digital mediante plataformas en la nube (Google Drive, WeTransfer, etc.).'
    },
    {
      title: '5. Selección y Edición',
      content: 'Cuando aplique selección de contenido por parte del cliente, éste tendrá un plazo máximo de 2 semanas para realizar su selección. En caso de no recibir respuesta, TECNOJACK realizará la selección de manera autónoma. El estilo de edición se basa en la línea estética de la marca.'
    },
    {
      title: '6. Servicios Adicionales',
      content: 'Cualquier servicio no incluido en el paquete inicial será considerado adicional y tendrá un costo extra. Esto incluye horas adicionales, productos físicos, ediciones extra y coberturas extendidas.'
    },
    {
      title: '7. Horas Adicionales',
      content: 'Las horas adicionales tienen un costo definido según el tipo de servicio contratado. Estas deberán ser aprobadas por el cliente durante el evento o previamente.'
    },
    {
      title: '8. Transporte, Viáticos y Servicio Destination',
      content: 'Los precios publicados no incluyen transporte. Todo desplazamiento requerido para prestar el servicio, incluso dentro del Área Metropolitana de Medellín, se cotiza por separado y es asumido por el cliente.\n\nLa modalidad Destination aplica cuando el servicio se realiza fuera del Área Metropolitana de Medellín, en otra ciudad o país. El cliente deberá cubrir los gastos de transporte, equipaje, peajes, parqueaderos, alimentación, alojamiento y seguros necesarios.'
    },
    {
      title: '9. Condiciones del Evento',
      content: 'El cliente es responsable de garantizar el acceso al lugar del evento, condiciones mínimas de iluminación y espacios adecuados para el trabajo. TECNOJACK aportará el equipo técnico necesario, pero no se responsabiliza por condiciones externas que afecten el resultado (clima, restricciones del lugar, etc.).'
    },
    {
      title: '10. Cancelaciones y Reprogramaciones',
      content: 'Por parte del cliente: el anticipo no es reembolsable. Puede evaluarse una reprogramación según disponibilidad de agenda.\n\nPor parte de TECNOJACK: se realizará la devolución total del anticipo o se podrá asignar un proveedor de calidad equivalente en caso de fuerza mayor.'
    },
    {
      title: '11. Derechos de Imagen',
      content: 'El cliente autoriza a TECNOJACK a utilizar el material capturado para portafolio, redes sociales, página web y promoción comercial, de conformidad con la elección realizada en el formulario de contratación.'
    },
    {
      title: '12. Uso de Música',
      content: 'Los videos se editan con música libre de derechos o licencias adecuadas. TECNOJACK no se hace responsable por el uso de música protegida si el cliente solicita su inclusión sin contar con los permisos correspondientes.'
    },
    {
      title: '13. Alimentación del Equipo',
      content: 'Para eventos de larga duración, el cliente deberá garantizar alimentación básica para el equipo de trabajo (fotógrafo, videógrafo y asistentes).'
    },
    {
      title: '14. Responsabilidad y Fuerza Mayor',
      content: 'TECNOJACK no se responsabiliza por situaciones fuera de su control como condiciones climáticas adversas, fallas de terceros, restricciones de locación o problemas logísticos externos.'
    },
    {
      title: '15. Aceptación',
      content: 'Al contratar cualquiera de los servicios, el cliente declara haber leído y aceptado estos términos y condiciones en su totalidad.'
    }
  ];

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

  formatContent(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('tj-policy-overlay')) {
      this.closeModal.emit();
    }
  }
}
