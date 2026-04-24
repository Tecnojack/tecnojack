import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';

type TermsSection = {
  title: string;
  content: string;
};

@Component({
  selector: 'tj-terms-and-conditions-page',
  standalone: true,
  imports: [NgFor, NgIf, PortfolioShellComponent],
  templateUrl: './terms-and-conditions-page.component.html',
  styleUrl: './terms-and-conditions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsAndConditionsPageComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly heroTitle = 'Términos y Condiciones';
  readonly heroDescription =
    'Conoce las condiciones bajo las cuales prestamos nuestros servicios audiovisuales. Este documento establece los lineamientos, responsabilidades y acuerdos aplicables a todos nuestros clientes.';

  readonly lastUpdatedText = '21 de abril de 2026';

  /**
   * IMPORTANTE:
   * Pega aquí el texto exacto que me compartiste previamente.
   * No se resumirá ni se modificará; se mostrará en secciones.
   */
  readonly sections: TermsSection[] = [
    {
      title: '1. Identificación del Prestador',
      content: `Los servicios son prestados por **TECNOJACK**, representada por Jackson Palacios, con sede en Medellín, Antioquia, Colombia.`
    },
    {
      title: '2. Objeto del Servicio',
      content: `TECNOJACK ofrece servicios audiovisuales que incluyen fotografía, video, producción audiovisual y servicios complementarios para eventos sociales, corporativos y personales.

Cada servicio se presta de acuerdo con el paquete o propuesta seleccionada por el cliente.`
    },
    {
      title: '3. Reserva y Pagos',
      content: `Para confirmar cualquier servicio se requiere un anticipo del **40% del valor total**.

El esquema de pagos estándar es:

* 40% para reservar la fecha
* 40% el día del evento o al finalizar el servicio
* 20% contra entrega del material final

La fecha solo se considera reservada una vez realizado el anticipo.`
    },
    {
      title: '4. Entregas',
      content: `Los tiempos de entrega estimados son:

* Fotografías: entre 1 y 3 semanas
* Videos: entre 2 y 6 semanas

Estos tiempos pueden variar según la carga de trabajo y complejidad del proyecto.

Las entregas se realizan en formato digital mediante plataformas como Google Drive, WeTransfer u otros servicios en la nube.

La entrega en medios físicos (USB, discos, etc.) tiene un costo adicional.`
    },
    {
      title: '5. Selección y Edición',
      content: `Cuando aplique selección de contenido:

* El cliente tendrá un plazo máximo de **2 semanas** para realizar su selección
* En caso de no recibir respuesta, TECNOJACK realizará la selección de manera autónoma

El estilo de edición se basa en la línea estética de la marca.`
    },
    {
      title: '6. Servicios Adicionales',
      content: `Cualquier servicio no incluido en el paquete inicial será considerado adicional y tendrá un costo extra.

Esto incluye, pero no se limita a:

* Horas adicionales
* Productos físicos
* Ediciones extra
* Coberturas extendidas`
    },
    {
      title: '7. Horas Adicionales',
      content: `Las horas adicionales tienen un costo definido según el tipo de servicio contratado.

Estas deberán ser aprobadas por el cliente durante el evento o previamente.`
    },
    {
      title: '8. Viáticos y Desplazamientos',
      content: `Para eventos fuera de Medellín:

El cliente deberá cubrir:

* Transporte
* Alimentación
* Alojamiento (si aplica)`
    },
    {
      title: '9. Condiciones del Evento',
      content: `El cliente es responsable de garantizar:

* Acceso al lugar del evento
* Condiciones mínimas de iluminación
* Espacios adecuados para el trabajo

TECNOJACK aportará equipo técnico, pero no se responsabiliza por condiciones externas que afecten el resultado (clima, restricciones del lugar, etc.).`
    },
    {
      title: '10. Cancelaciones y Reprogramaciones',
      content: `### Por parte del cliente:

* El anticipo no es reembolsable
* Puede evaluarse reprogramación según disponibilidad

### Por parte de TECNOJACK:

* Se realizará devolución total del anticipo
* En caso de fuerza mayor, se podrá asignar un proveedor de calidad equivalente`
    },
    {
      title: '11. Derechos de Imagen',
      content: `El cliente autoriza a TECNOJACK a utilizar el material capturado (fotografías y videos) para:

* Portafolio
* Redes sociales
* Página web
* Promoción comercial

Si el cliente desea restringir este uso, deberá indicarlo por escrito antes del evento.`
    },
    {
      title: '12. Uso de Música',
      content: `Los videos se editan con:

* Música libre de derechos
* O música con licencias adecuadas

TECNOJACK no se hace responsable por el uso de música protegida si el cliente solicita su inclusión sin contar con los permisos correspondientes.`
    },
    {
      title: '13. Alimentación del Equipo',
      content: `Para eventos de larga duración, el cliente deberá garantizar alimentación básica para el equipo de trabajo (fotógrafo, videógrafo, asistentes).`
    },
    {
      title: '14. Responsabilidad y Fuerza Mayor',
      content: `TECNOJACK no se responsabiliza por situaciones fuera de su control como:

* Condiciones climáticas
* Fallas de terceros
* Restricciones del evento
* Problemas logísticos externos

En estos casos se buscarán soluciones razonables dentro de lo posible.`
    },
    {
      title: '15. Aceptación',
      content: `Al contratar cualquiera de los servicios, el cliente declara haber leído y aceptado estos términos y condiciones en su totalidad.`
    }
  ];

  constructor() {
    effect(() => {
      const pageMeta = this.content.getPageMeta(
        'terminos-y-condiciones',
        'TECNOJACK | Términos y Condiciones',
        this.heroDescription
      );
      this.title.setTitle(pageMeta.title);
      this.meta.updateTag({ name: 'description', content: pageMeta.description });
    });
  }

  get navItems() {
    return this.content.navItems();
  }

  get headerCtaHref() {
    return this.content.buildWhatsappHref('Hola TECNOJACK, tengo una consulta sobre sus términos y condiciones.');
  }

  get editable(): boolean {
    return false;
  }

  getParagraphs(content: string): string[] {
    const normalized = (content ?? '').replace(/\r\n/g, '\n').trim();
    if (!normalized) return [];

    return normalized
      .split(/\n\s*\n/g)
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
