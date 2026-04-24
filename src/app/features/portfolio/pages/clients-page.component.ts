import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientsGridComponent } from '../components/clients-grid.component';

@Component({
  selector: 'app-clients-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ClientsGridComponent],
  template: `
    <div class="clients-page">
      <header class="page-header">
        <h1>Nuestros Clientes</h1>
        <p class="page-subtitle">
          Explora los mejores momentos capturados en cada evento
        </p>
      </header>

      <!-- BODAS -->
      <section class="section">
        <h2 class="section-title">💒 Bodas</h2>
        <p class="section-description">
          Capturamos el amor y la emoción de tu día especial
        </p>
        <app-clients-grid service="bodas" [columnsCount]="3" />
      </section>

      <!-- PREBODAS -->
      <section class="section">
        <h2 class="section-title">💑 Prebodas</h2>
        <p class="section-description">
          Historias previas al gran día, con sesiones auténticas y memorables
        </p>
        <app-clients-grid service="prebodas" [columnsCount]="3" />
      </section>

      <!-- QUINCES -->
      <section class="section">
        <h2 class="section-title">👗 Quinceañeras</h2>
        <p class="section-description">
          Tu entrada a la vida adulta, inmortalizada en imágenes
        </p>
        <app-clients-grid service="quinces" [columnsCount]="3" />
      </section>

      <!-- GRADOS -->
      <section class="section">
        <h2 class="section-title">🎓 Graduaciones</h2>
        <p class="section-description">
          El reflejo de tu esfuerzo y dedicación
        </p>
        <app-clients-grid service="grados" [columnsCount]="3" />
      </section>
    </div>
  `,
  styles: [
    `
      .clients-page {
        background: #fafafa;
        min-height: 100vh;
      }

      .page-header {
        background: linear-gradient(
          135deg,
          #0097b2 0%,
          #00d4ff 100%
        );
        color: white;
        padding: 60px 20px;
        text-align: center;
      }

      .page-header h1 {
        margin: 0 0 12px 0;
        font-size: 48px;
        font-weight: 700;
      }

      .page-subtitle {
        margin: 0;
        font-size: 18px;
        opacity: 0.9;
      }

      .section {
        max-width: 1200px;
        margin: 0 auto;
        padding: 60px 20px;
        border-bottom: 1px solid #e0e0e0;
      }

      .section:last-child {
        border-bottom: none;
      }

      .section-title {
        margin: 0 0 12px 0;
        font-size: 28px;
        font-weight: 700;
        color: #333;
      }

      .section-description {
        margin: 0 0 32px 0;
        font-size: 16px;
        color: #666;
      }
    `,
  ],
})
export class ClientsPageComponent {}
