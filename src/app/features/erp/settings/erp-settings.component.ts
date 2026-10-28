import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog, faDatabase, faGlobe, faLock, faPalette, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tj-erp-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './erp-settings.component.html',
  styleUrl: './erp-settings.component.scss'
})
export class ErpSettingsComponent {
  readonly activeTab = signal<'company' | 'billing' | 'notifications' | 'integrations' | 'security'>('company');
  readonly icons = {
    cog: faCog,
    globe: faGlobe,
    palette: faPalette,
    lock: faLock,
    db: faDatabase,
    save: faSave
  };

  studioName = signal('TECNOJACK Studio ERP');
  currency = signal('COP ($)');
  timezone = signal('America/Bogota (UTC-5)');
  themeMode = signal('Orbit Dark (Cinema)');
}
