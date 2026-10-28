import { Injectable, computed, effect, signal } from '@angular/core';

export type ColorThemeMode = 'dark' | 'light' | 'system';
type ThemeVars = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'tj_color_theme';
  readonly themeMode = signal<ColorThemeMode>(this.getInitialThemeMode());
  readonly systemPrefersDark = signal<boolean>(this.checkSystemPrefersDark());

  /**
   * Resolved theme active right now: either 'dark' or 'light'.
   */
  readonly activeTheme = computed<'dark' | 'light'>(() => {
    const mode = this.themeMode();
    if (mode === 'system') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return mode;
  });

  readonly isDark = computed(() => this.activeTheme() === 'dark');
  readonly isLight = computed(() => this.activeTheme() === 'light');

  // Legacy theme variable mapping preserved for backwards compatibility
  private readonly legacyThemes: Record<string, ThemeVars> = {
    travel: {
      '--primary': '#6E7F67',
      '--primary-dark': '#3F4F44',
      '--background': '#F3EFE6',
      '--text': '#1E2F36',
      '--accent-gold': '#C6A75E',
      '--surface': '#FFFFFF'
    }
  };

  constructor() {
    this.initSystemListener();

    effect(() => {
      const mode = this.themeMode();
      const resolved = this.activeTheme();
      if (typeof window !== 'undefined') {
        try {
          if (mode === 'system') {
            localStorage.removeItem(this.storageKey);
          } else {
            localStorage.setItem(this.storageKey, mode);
          }
        } catch {
          // Ignore storage restrictions
        }

        // Apply data-theme attribute on root document
        const root = document.documentElement;
        root.setAttribute('data-theme', resolved);
        root.setAttribute('data-color-mode', mode);

        // Update meta color-scheme
        const meta = document.querySelector('meta[name="color-scheme"]');
        if (meta) {
          meta.setAttribute('content', mode === 'system' ? 'light dark' : resolved);
        }
      }
    });
  }

  setThemeMode(mode: ColorThemeMode): void {
    this.themeMode.set(mode);
  }

  toggleTheme(): void {
    // Cycles between dark and light
    this.themeMode.update((current) => {
      const resolved = this.activeTheme();
      return resolved === 'dark' ? 'light' : 'dark';
    });
  }

  // Preserved legacy method
  applyTheme(themeName: string): void {
    const key = (themeName || '').trim().toLowerCase();
    const theme = this.legacyThemes[key];
    if (!theme) return;

    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      Object.entries(theme).forEach(([variable, value]) => {
        root.style.setProperty(variable, value);
      });
    }
  }

  private getInitialThemeMode(): ColorThemeMode {
    if (typeof window === 'undefined') {
      return 'dark';
    }
    try {
      const saved = localStorage.getItem(this.storageKey) as ColorThemeMode | null;
      if (saved === 'dark' || saved === 'light' || saved === 'system') {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'dark'; // Dark mode as default premium cinematic baseline
  }

  private checkSystemPrefersDark(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return true;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private initSystemListener(): void {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    try {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        this.systemPrefersDark.set(e.matches);
      };
      if (media.addEventListener) {
        media.addEventListener('change', listener);
      } else if ((media as unknown as { addListener?: (cb: (e: MediaQueryListEvent) => void) => void }).addListener) {
        (media as unknown as { addListener: (cb: (e: MediaQueryListEvent) => void) => void }).addListener(listener);
      }
    } catch {
      // Ignore media query errors
    }
  }
}
