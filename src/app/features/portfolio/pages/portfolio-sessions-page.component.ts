import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioServiceCategoryPageComponent } from './portfolio-service-category-page.component';
import { PortfolioPackageCategory } from '../portfolio.data';
import { PortfolioContentService } from '../services/portfolio-content.service';

@Component({
  selector: 'tj-portfolio-sessions-page', standalone: true,
  imports: [PortfolioShellComponent, PortfolioServiceCategoryPageComponent],
  templateUrl: './portfolio-sessions-page.component.html', styleUrl: './portfolio-sessions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSessionsPageComponent {
  private readonly content = inject(PortfolioContentService);
  readonly category: PortfolioPackageCategory = 'sesiones';
  readonly navItems = this.content.navItems();
  readonly editable = false;
}
