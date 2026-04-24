import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientAdminService } from '../client-admin.service';
import { AdminClientsListComponent } from './admin-clients-list.component';
import { AdminClientFormComponent } from './admin-client-form.component';
import { Client, ClientInput, ClientService } from '../../../core/models/client.model';

@Component({
  selector: 'app-admin-clients-shell',
  standalone: true,
  imports: [CommonModule, AdminClientsListComponent, AdminClientFormComponent],
  template: `
    <div class="admin-clients">
      <div class="admin-clients__header">
        <h1>Gestión de Clientes</h1>
        <button class="admin-clients__create-btn" (click)="openCreateModal()">
          + Crear Cliente
        </button>
      </div>

      <div class="admin-clients__tabs">
        <button
          *ngFor="let tab of tabs"
          [class.admin-clients__tab--active]="tab === activeTab()"
          (click)="activeTab.set(tab)"
          class="admin-clients__tab">
          {{ getTabLabel(tab) }}
        </button>
      </div>

      <div class="admin-clients__content">
        <app-admin-clients-list
          [service]="activeTab()"
          (handleView)="openViewModal($event)"
          (handleEdit)="openEditModal($event)"
          (handleDelete)="onDeleteClient($event)" />
      </div>

      <!-- Modal para crear/editar -->
      <div *ngIf="showForm()" class="admin-clients__modal">
        <div class="admin-clients__modal-overlay" (click)="closeModal()"></div>
        <div class="admin-clients__modal-content">
          <app-admin-client-form
            [client]="editingClient()"
            (handleCancel)="closeModal()"
            (handleSave)="onSaveClient($event)" />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .admin-clients {
        padding: 24px;
      }

      .admin-clients__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }

      .admin-clients__header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
      }

      .admin-clients__create-btn {
        padding: 10px 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
      }

      .admin-clients__create-btn:hover {
        background: #0056b3;
      }

      .admin-clients__tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
        border-bottom: 1px solid #e0e0e0;
      }

      .admin-clients__tab {
        padding: 12px 16px;
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #666;
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
      }

      .admin-clients__tab:hover {
        color: #333;
      }

      .admin-clients__tab--active {
        color: #007bff;
        border-bottom-color: #007bff;
      }

      .admin-clients__content {
        min-height: 200px;
      }

      .admin-clients__modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .admin-clients__modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }

      .admin-clients__modal-content {
        position: relative;
        z-index: 1001;
      }
    `,
  ],
})
export class AdminClientsShellComponent {
  private readonly clientAdmin = inject(ClientAdminService);
  private readonly router = inject(Router);

  tabs: ClientService[] = ['bodas', 'prebodas', 'quinces', 'grados'];
  activeTab = signal<ClientService>('bodas');
  showForm = signal(false);
  editingClient = signal<Client | undefined>(undefined);

  getTabLabel(service: ClientService): string {
    const labels: Record<ClientService, string> = {
      bodas: '💒 Bodas',
      prebodas: '💑 Prebodas',
      quinces: '👗 Quinces',
      grados: '🎓 Grados',
    };

    return labels[service];
  }

  openCreateModal(): void {
    this.editingClient.set(undefined);
    this.showForm.set(true);
  }

  openEditModal(client: Client): void {
    this.editingClient.set(client);
    this.showForm.set(true);
  }

  openViewModal(client: Client): void {
    const folder = String(client.folder ?? '').trim();
    if (!folder) {
      return;
    }

    void this.router.navigate(['/media-admin'], {
      queryParams: { path: folder },
    });
  }

  closeModal(): void {
    this.showForm.set(false);
    this.editingClient.set(undefined);
  }

  async onSaveClient(input: ClientInput): Promise<void> {
    try {
      if (this.editingClient()) {
        await this.clientAdmin.updateClient(this.editingClient()!.id, input);
      } else {
        await this.clientAdmin.createClient(input);
      }
      this.closeModal();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  }

  async onDeleteClient(client: Client): Promise<void> {
    if (!confirm(`¿Estás seguro de eliminar a ${client.name}?`)) return;

    try {
      await this.clientAdmin.deleteClient(client.id);
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  }
}
