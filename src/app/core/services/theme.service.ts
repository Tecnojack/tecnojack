import { Injectable } from '@angular/core';

type ThemeVars = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themes: Record<string, ThemeVars> = {
    travel: {
      '--primary': '#6E7F67',
      '--primary-dark': '#3F4F44',
      '--background': '#F3EFE6',
      '--text': '#1E2F36',
      '--accent-gold': '#C6A75E',
      '--surface': '#FFFFFF'
    }
  };

  applyTheme(themeName: string): void {
    const key = (themeName || '').trim().toLowerCase();
    const theme = this.themes[key];
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme).forEach(([variable, value]) => {
      root.style.setProperty(variable, value);
    });
  }
}
