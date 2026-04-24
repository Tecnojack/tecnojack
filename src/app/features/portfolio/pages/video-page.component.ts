import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Observable, map, shareReplay, startWith } from 'rxjs';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import {
  MEDIA_PUBLIC_FALLBACK_IMAGE,
  MediaPublicService,
} from '../../../shared/media/media-public.service';
import { PortfolioPlaylistVideo } from '../portfolio.data';
import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';
import {
  VideoAccordionCategory,
  VideoAccordionComponent,
} from './video-accordion.component';
import {
  VideoModalComponent,
  VideoServicePackage,
} from './video-modal.component';

const videoAdditionalServices: VideoServicePackage['additionalServices'] = [
  {
    name: 'Tomas con drone',
    price: 120000,
    description:
      'Planos aéreos para ampliar el impacto visual y la escala del proyecto',
  },
  {
    name: 'Reel adicional para redes',
    price: 70000,
    description:
      'Versión extra en formato vertical pensada para Instagram, TikTok y estados',
  },
  {
    name: 'Miniatura para YouTube / Spotify',
    price: 50000,
    description:
      'Miniatura optimizada para YouTube y portada visual para Spotify',
  },
  {
    name: 'Creación de guión',
    price: 50000,
    description:
      'Desarrollo estructurado de la narrativa del video con enfoque profesional',
  },
  {
    name: 'Conceptualización y storytelling',
    price: 120000,
    description:
      'Construcción de idea creativa, estética y narrativa del video',
  },
  {
    name: 'Video de referencia previo',
    price: 80000,
    description:
      'Video guía con referencias visuales para definir el resultado final antes de grabar',
  },
  {
    name: 'Dirección creativa extendida',
    price: 100000,
    description:
      'Acompañamiento completo en la dirección artística durante todo el rodaje',
  },
  {
    name: 'Planificación de escenas',
    price: 70000,
    description:
      'Organización de tomas y estructura visual para optimizar la grabación',
  },
  {
    name: 'Scouting de locación',
    price: 60000,
    description:
      'Búsqueda y selección de locaciones adecuadas para el proyecto',
  },
];

@Component({
  selector: 'tj-video-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    PortfolioShellComponent,
    VideoAccordionComponent,
    VideoModalComponent,
    FallbackImageDirective,
    RevealOnScrollDirective,
  ],
  templateUrl: './video-page.component.html',
  styleUrl: './video-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPageComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly content = inject(PortfolioContentService);
  private readonly mediaPublic = inject(MediaPublicService);
  private readonly defaultCoverImage = 'assets/images/fotos/default-cover.png';
  private readonly videoPackageCoverCache = new Map<
    string,
    Observable<string>
  >();

  readonly heroCategoryHeroImage$: Observable<string | null> = this.mediaPublic
    .getCoverByFolder('servicios/video')
    .pipe(
      map((url) =>
        url && url !== MEDIA_PUBLIC_FALLBACK_IMAGE ? `url(${url})` : null,
      ),
      startWith(null),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  readonly selectedVideo = signal<PortfolioPlaylistVideo | null>(null);
  readonly selectedVideoPackage = signal<VideoServicePackage | null>(null);

  readonly heroFacts = computed(() => {
    const packageCount = this.videoPackages.length;
    const totalVideos = this.orderedCategories().reduce(
      (sum, cat) => sum + cat.videos.length,
      0,
    );
    const minPrice = Math.min(...this.videoPackages.map((p) => p.price));
    const minLabel = `${this.formatCop(minPrice)} COP`;
    return [
      { label: 'Paquetes', value: String(packageCount) },
      { label: 'Desde', value: minLabel },
      { label: 'Videos realizados', value: String(totalVideos) },
      {
        label: 'Categorías',
        value: String(
          this.orderedCategories().filter((c) => c.videos.length).length,
        ),
      },
    ];
  });

  readonly heroSocialLinks = computed(() => {
    const links = this.content.contactLinks();
    const iconMap: Record<string, string> = {
      whatsapp: 'assets/images/icons/whatsapp.svg',
      instagram: 'assets/images/icons/instagram.svg',
      facebook: 'assets/images/icons/facebook.svg',
      tiktok: 'assets/images/icons/tiktok.svg',
    };
    const order = new Map<string, number>([
      ['whatsapp', 1],
      ['instagram', 2],
      ['tiktok', 3],
      ['facebook', 4],
    ]);
    return links
      .map((link) => ({
        platform: link.platform,
        title: link.title,
        href:
          link.platform === 'whatsapp'
            ? this.content.buildWhatsappHref(
                'Hola TECNOJACK, me interesa conocer más sobre los paquetes de video.',
              )
            : link.href,
        iconSrc: iconMap[link.platform],
      }))
      .sort(
        (a, b) => (order.get(a.platform) ?? 99) - (order.get(b.platform) ?? 99),
      );
  });

  readonly videoPackages: VideoServicePackage[] = [
    {
      name: 'Video Esencial',
      price: 400000,
      categoryTag: 'Musical',
      description:
        'Producción directa, limpia y profesional para artistas que buscan un resultado de calidad sin producción compleja.',
      features: [
        'Grabación en locación natural o entorno básico',
        'Iluminación básica',
        'Producción de hasta 4 horas',
        'Equipo compacto',
        'Asesoría creativa previa a la grabación',
        'Planeación básica de escenas',
      ],
      deliverables: [
        'Video musical hasta 4 minutos',
        'Resolución 4K',
        'Edición básica',
        'Entrega digital',
      ],
      additionalServices: videoAdditionalServices,
    },
    {
      name: 'Video Pro',
      price: 560000,
      categoryTag: 'Musical',
      description:
        'Producción con mayor impacto visual, ideal para artistas que buscan calidad superior y contenido para redes.',
      features: [
        'Incluye todo lo del paquete Esencial',
        'Tomas con drone',
        'Iluminación mejorada',
        'Dirección básica',
        'Mayor control de escena',
        'Producción de hasta 6 horas',
        'Asesoría creativa previa a la grabación',
        'Definición de concepto visual',
        'Dirección creativa durante rodaje',
        'Referencia visual previa del proyecto',
        'Definición de estilo visual y ritmo del video',
      ],
      deliverables: [
        'Video musical hasta 6 minutos',
        'Edición avanzada',
        'Colorización profesional',
        '2 a 3 reels para redes',
        'Portada para Spotify',
        'Miniatura para YouTube',
        'Formatos vertical y horizontal',
      ],
      additionalServices: videoAdditionalServices,
    },
    {
      name: 'Video Cinemático',
      price: 850000,
      isBasePrice: true,
      categoryTag: 'Musical',
      description:
        'Producción narrativa con enfoque cinematográfico para proyectos de alto nivel visual.',
      features: [
        'Múltiples locaciones',
        'Storytelling',
        'Dirección creativa',
        'Producción más elaborada',
        'Asesoría creativa previa a la grabación',
        'Definición de concepto visual',
        'Construcción de storytelling',
        'Desarrollo de idea narrativa',
        'Dirección creativa durante rodaje',
        'Planeación básica de escenas',
        'Acompañamiento en elección de locación',
        'Referencia visual previa del proyecto',
        'Definición de estilo visual y ritmo del video',
      ],
      deliverables: [
        'Video hasta 7 minutos',
        'Edición cinematográfica',
        'Color grading avanzado',
        'Concepto visual definido',
      ],
      additionalServices: videoAdditionalServices,
    },
    {
      name: 'Video Personalizado',
      price: 250000,
      isBasePrice: true,
      categoryTag: 'Musical',
      description:
        'Producción completamente adaptada a las necesidades del cliente.',
      features: [
        'Configuración personalizada',
        'Escalable según presupuesto',
        'Selección libre de servicios',
        'Asesoría creativa previa a la grabación',
        'Definición de concepto visual',
        'Desarrollo de idea narrativa',
        'Acompañamiento en elección de locación',
        'Definición de estilo visual y ritmo del video',
      ],
      deliverables: ['Definidos según propuesta'],
      additionalServices: videoAdditionalServices,
    },
    {
      name: 'Video Cortometraje',
      price: 300000,
      isBasePrice: true,
      categoryTag: 'Cortometraje',
      description:
        'Producción narrativa para cortometrajes, storytelling o proyectos creativos no musicales.',
      features: [
        'Desarrollo de concepto',
        'Dirección creativa',
        'Producción personalizada',
        'Asesoría creativa previa a la grabación',
      ],
      deliverables: [
        'Cortometraje o pieza narrativa',
        'Duración variable',
        'Edición cinematográfica',
        'Adaptación según proyecto',
      ],
      additionalServices: [
        {
          name: 'Guión o estructura narrativa',
          price: 50000,
          description:
            'Desarrollo del guión o estructura narrativa del cortometraje',
        },
        {
          name: 'Múltiples locaciones',
          price: 80000,
          description: 'Rodaje en 2 o más locaciones distintas',
        },
        {
          name: 'Construcción de storytelling',
          price: 70000,
          description:
            'Desarrollo de arco narrativo y estructura emocional del relato',
        },
        {
          name: 'Desarrollo de idea narrativa',
          price: 60000,
          description:
            'Conceptualización de la historia a contar antes del rodaje',
        },
        {
          name: 'Dirección creativa durante rodaje',
          price: 100000,
          description:
            'Acompañamiento artístico completo durante todo el día de grabación',
        },
        {
          name: 'Planificación de escenas',
          price: 70000,
          description:
            'Organización de tomas y estructura visual para optimizar la grabación',
        },
        {
          name: 'Acompañamiento en elección de locación',
          price: 60000,
          description: 'Scouting y selección del lugar ideal para el proyecto',
        },
        {
          name: 'Video de referencia previo',
          price: 80000,
          description:
            'Video guía con referencias visuales para definir el resultado final antes de grabar',
        },
        {
          name: 'Tomas con drone',
          price: 120000,
          description:
            'Planos aéreos para ampliar la escala visual del cortometraje',
        },
      ],
    },
  ];

  private readonly orderedCategories = computed<VideoAccordionCategory[]>(
    () => {
      const categories = this.content.videoCategories();
      const musicales = categories.find(
        (category) => category.key === 'musicales',
      );
      const bodas = categories.find((category) => category.key === 'bodas');
      const otros = categories.find((category) => category.key === 'otros');

      const otrosVideos = otros?.videos ?? [];
      const redesPattern =
        /\b(reel|reels|social|vertical|teaser|redes|lightroom|edici(o|ó)n|edit(ing)?|color grading|gradi[gn]g)\b/i;
      const redesVideos = otrosVideos.filter((video) =>
        redesPattern.test(video.title),
      );
      const eventosVideos = otrosVideos.filter(
        (video) => !redesPattern.test(video.title),
      );

      return [
        {
          key: 'musicales',
          title: 'Videos musicales',
          summary: musicales?.summary ?? '',
          playlistUrl: musicales?.playlistUrl,
          videos: musicales?.videos ?? [],
        },
        {
          key: 'bodas',
          title: 'Video de bodas',
          summary: bodas?.summary ?? '',
          playlistUrl: bodas?.playlistUrl,
          videos: bodas?.videos ?? [],
        },
        {
          key: 'eventos',
          title: 'Video de eventos',
          summary: otros?.summary ?? '',
          playlistUrl: otros?.playlistUrl,
          videos: eventosVideos,
        },
        {
          key: 'redes',
          title: 'Contenido para redes',
          summary: otros?.summary ?? '',
          playlistUrl: otros?.playlistUrl,
          videos: redesVideos,
        },
      ];
    },
  );

  readonly featuredVideos = computed(
    () => this.orderedCategories()[0]?.videos.slice(0, 6) ?? [],
  );

  constructor() {
    effect((onCleanup) => {
      const modalOpen = !!this.selectedVideo() || !!this.selectedVideoPackage();
      this.document.body.classList.toggle(
        'portfolio-request-modal-open',
        modalOpen,
      );
      this.document.documentElement.classList.toggle(
        'portfolio-request-modal-open',
        modalOpen,
      );

      onCleanup(() => {
        this.document.body.classList.remove('portfolio-request-modal-open');
        this.document.documentElement.classList.remove(
          'portfolio-request-modal-open',
        );
      });
    });
  }

  ngOnInit(): void {
    const pageMeta = this.content.getPageMeta(
      'portfolio-videos',
      'TECNOJACK | Videos musicales, bodas y otros proyectos',
      'Explora videos musicales, bodas y proyectos especiales de TECNOJACK. Mira ejemplos reales y descubre el estilo visual ideal para tu historia o tu marca.',
    );
    this.title.setTitle(pageMeta.title);
    this.meta.updateTag({ name: 'description', content: pageMeta.description });
  }

  openVideo(video: PortfolioPlaylistVideo): void {
    this.selectedVideo.set(video);
    this.selectedVideoPackage.set(null);
  }

  openVideoPackage(pkg: VideoServicePackage): void {
    this.selectedVideoPackage.set(pkg);
    this.selectedVideo.set(null);
  }

  closeVideo(): void {
    this.selectedVideo.set(null);
    this.selectedVideoPackage.set(null);
  }

  formatCop(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  priceLabel(pkg: VideoServicePackage): string {
    const value = `$${this.formatCop(pkg.price)}`;
    return pkg.isBasePrice ? `Desde ${value}` : value;
  }

  videoPackageCover$(pkg: VideoServicePackage): Observable<string> {
    const folder = this.videoPackageFolder(pkg);
    const cached = this.videoPackageCoverCache.get(folder);
    if (cached) {
      return cached;
    }

    const image$ = this.mediaPublic.getRealImage(folder).pipe(
      map((url) => (url ? url : this.defaultCoverImage)),
      startWith(this.defaultCoverImage),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.videoPackageCoverCache.set(folder, image$);
    return image$;
  }

  packageHighlights(pkg: VideoServicePackage): string[] {
    const deliverables = pkg.deliverables ?? [];
    const features = pkg.features ?? [];
    const combined = [...deliverables, ...features].filter(Boolean);
    return combined.slice(0, 3);
  }

  get navItems() {
    return this.content.navItems();
  }

  get categories() {
    return this.orderedCategories();
  }

  get headerCtaHref() {
    return this.content.buildWhatsappHref(
      'Hola TECNOJACK, me interesa conocer más sobre los paquetes de video.',
    );
  }

  private videoPackageFolder(pkg: VideoServicePackage): string {
    return `servicios/video/${this.videoPackageSlug(pkg)}`;
  }

  private videoPackageSlug(pkg: VideoServicePackage): string {
    return pkg.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }
}
