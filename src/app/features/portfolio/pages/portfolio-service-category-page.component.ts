import { AsyncPipe, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, combineLatest, map, of, shareReplay, startWith, switchMap, catchError } from 'rxjs';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { LazyImgComponent } from '../../../shared/images/lazy-img.component';
import {
  MEDIA_PUBLIC_FALLBACK_IMAGE,
  MediaPublicService,
  type MediaPublicState,
} from '../../../shared/media/media-public.service';
import { TjImageFallbackPipe } from '../../../shared/media/tj-image-fallback.pipe';
import { Client } from '../../../core/models/client.model';
import { PortfolioCategoryAccordionComponent } from '../components/portfolio-category-accordion.component';
import {
  PortfolioPackageCategory,
  PortfolioPackageDetail,
  PortfolioRequestOption,
  PortfolioRequestOptionGroup,
  PortfolioServicePageConfig,
  PortfolioServiceStory,
  PortfolioServiceStoryImage,
} from '../portfolio.data';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { ClientPublicService } from '../services/client-public.service';
import { resolvePortfolioPackageMediaFolder } from '../utils/portfolio-media-folder.util';
import { optimizeImage } from '../../../core/utils/image-optimizer.util';

type ServiceModalStep = 'detail' | 'request';
type RequestMode = 'base' | 'custom';
type PackageCardViewModel = {
  detail: PortfolioPackageDetail;
  displayName: string;
  tagline: string;
  displayPrice: string;
  displayTypeLabel: string;
  highlights: string[];
  packageTypeLabel: string;
  groupKey: PackageCardGroupViewModel['key'];
  sortOrder: number;
};
type PackageCardGroupViewModel = {
  key: 'photo-video' | 'photo-only' | 'custom' | 'session';
  title: string;
  lead: string;
  cards: PackageCardViewModel[];
};
type AccordionSectionViewModel = {
  title: string;
  lead?: string;
  cards: PackageCardViewModel[];
};
type ExperienceSection = {
  title: string;
  items: string[];
};

type UpsellSummaryItem = {
  name: string;
  priceLabel: string;
  priceAmountCop?: number;
};

type HeroFact = {
  label: string;
  value: string;
};

type HeroSocialLink = {
  platform: string;
  title: string;
  href: string;
  iconSrc?: string;
};

const deliverablePattern =
  /(foto|fotos|video|reel|tr[aá]iler|trailer|pel[ií]cula|book|fotobook|impresa|impresas|digital|raw|jpg|retablo|entrega|archivos|descarga|almacenamiento)/i;
const extraPattern =
  /(dron|asistente|equipo|humo|burbujas|entrevista|efectos|cambio extra|vestuario|sesi[oó]n previa|sesi[oó]n de preboda|sesi[oó]n de pareja)/i;

@Component({
  selector: 'tj-portfolio-service-category-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    ScrollingModule,
    RevealOnScrollDirective,
    FallbackImageDirective,
    LazyImgComponent,
    PortfolioCategoryAccordionComponent,
    TjImageFallbackPipe,
  ],
  templateUrl: './portfolio-service-category-page.component.html',
  styleUrl: './portfolio-service-category-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioServiceCategoryPageComponent {
  private static readonly INITIAL_VISIBLE_IMAGES = 19;
  private static readonly VISIBLE_IMAGE_STEP = 20;
  private static readonly INITIAL_VISIBLE_STORIES = 20;
  private static readonly VISIBLE_STORIES_STEP = 20;
  private static readonly INITIAL_VISIBLE_STORY_THUMBS = 20;
  private static readonly VISIBLE_STORY_THUMBS_STEP = 20;
  readonly placeholderImage = 'assets/images/placeholder.jpg';
  private readonly document = inject(DOCUMENT);
  private readonly content = inject(PortfolioContentService);
  private readonly mediaPublic = inject(MediaPublicService);
  private readonly clientPublic = inject(ClientPublicService);
  private readonly categoryState = signal<PortfolioPackageCategory>('bodas');

  /** URL CSS de la imagen hero de categoría leída desde Firebase, o null si usa el fallback estático. */
  readonly heroCategoryHeroImage$: Observable<string | null> = toObservable(
    this.categoryState,
  ).pipe(
    switchMap((category) =>
      this.mediaPublic.getCoverByFolder(`servicios/${category}`).pipe(
        map((url) =>
          url && url !== MEDIA_PUBLIC_FALLBACK_IMAGE ? `url(${url})` : null,
        ),
        startWith(null),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private readonly corporativosAdditionalGroup =
    computed<PortfolioRequestOptionGroup>(() => ({
      title: 'Adicionales corporativos',
      description: 'Suma extras para ampliar el alcance de la producción.',
      selectable: true,
      options: [
        {
          id: 'corporativos-addon-video-extra',
          label: 'Video extra||Producción adicional de video',
          priceLabel: '250.000 COP',
          priceAmountCop: 250000,
        },
        {
          id: 'corporativos-addon-reel-adicional',
          label: 'Reel adicional||Contenido corto para redes',
          priceLabel: '120.000 COP',
          priceAmountCop: 120000,
        },
        {
          id: 'corporativos-addon-sesion-adicional',
          label: 'Sesión adicional||Sesión extra de grabación',
          priceLabel: '300.000 COP',
          priceAmountCop: 300000,
        },
        {
          id: 'corporativos-addon-entrevista-adicional',
          label: 'Entrevista adicional||Grabación de entrevistas',
          priceLabel: '150.000 COP',
          priceAmountCop: 150000,
        },
        {
          id: 'corporativos-addon-dron',
          label: 'Tomas con drone||Planos aéreos profesionales',
          priceLabel: '100.000 COP',
          priceAmountCop: 200000,
        },
      ],
    }));

  private readonly categoryLookupOrder: PortfolioPackageCategory[] = [
    'bodas',
    'quinces',
    'grados',
    'preboda',
    'corporativos',
  ];

  @Input() editable = false;

  @Input({ required: true })
  set category(value: PortfolioPackageCategory) {
    this.categoryState.set(value);
  }

  readonly selectedPackageSlug = signal<string | null>(null);
  readonly modalStep = signal<ServiceModalStep>('detail');
  readonly requestMode = signal<RequestMode>('base');
  readonly selectedBaseQuoteId = signal('');
  readonly requestSelections = signal<Record<string, boolean>>({});
  readonly customerName = signal('');
  readonly customerPhone = signal('');
  readonly eventDate = signal('');
  readonly eventCity = signal('');
  readonly venueName = signal('');
  readonly guestCount = signal('');
  readonly customerNotes = signal('');
  readonly hasAcceptedTerms = signal(false);
  readonly activeStoryIndex = signal<number | null>(null);
  readonly activeStoryImageIndex = signal(0);
  readonly isMobileStories = signal(false);
  readonly visiblePackageImages = signal(
    PortfolioServiceCategoryPageComponent.INITIAL_VISIBLE_IMAGES,
  );
  readonly visibleStoriesCount = signal(
    PortfolioServiceCategoryPageComponent.INITIAL_VISIBLE_STORIES,
  );
  readonly visibleStoryThumbsCount = signal(
    PortfolioServiceCategoryPageComponent.INITIAL_VISIBLE_STORY_THUMBS,
  );

  readonly pageConfig = computed<PortfolioServicePageConfig | undefined>(() =>
    this.content.getServicePageConfig(this.categoryState()),
  );

  private readonly firestoreStories$ = toObservable(this.categoryState).pipe(
    switchMap((category) => {
      const services = this.mapCategoryToClientServices(category);
      if (!services.length) {
        return of<PortfolioServiceStory[] | null>(null);
      }

      return combineLatest(
        services.map((service) => this.clientPublic.getByServiceAnyStatus$(service)),
      ).pipe(
        map((groups) =>
          groups
            .flat()
            .sort((a, b) =>
              String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? '')),
            ),
        ),
        switchMap((clients) => {
          if (!clients.length) {
            return of<PortfolioServiceStory[]>([]);
          }

          const storiesByClient$ = clients.map((client) =>
            this.clientPublic
              .getClientGallery$(client.folder)
              .pipe(map((galleryUrls) => this.mapClientToStory(client, galleryUrls))),
          );

          return combineLatest(storiesByClient$);
        }),
        catchError(() => of<PortfolioServiceStory[]>([])),
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private readonly firestoreStories = toSignal(this.firestoreStories$, {
    initialValue: null as PortfolioServiceStory[] | null,
  });

  readonly stories = computed<PortfolioServiceStory[]>(() => {
    const category = this.categoryState();
    const isFirebaseCategory =
      category === 'bodas' || category === 'quinces' || category === 'grados';

    if (isFirebaseCategory) {
      return this.firestoreStories() ?? [];
    }

    const dynamic = this.firestoreStories();
    if (dynamic !== null) {
      return dynamic;
    }

    return this.pageConfig()?.stories ?? [];
  });

  readonly visibleStories = computed(() =>
    this.stories().slice(0, this.visibleStoriesCount()),
  );

  readonly packageCards = computed<PackageCardViewModel[]>(() =>
    this.content
      .getPackageDetailsByCategory(this.categoryState())
      .map((detail) => this.buildPackageCard(detail))
      .sort((left, right) => {
        const groupOrder =
          this.getGroupOrder(left.groupKey) -
          this.getGroupOrder(right.groupKey);
        if (groupOrder !== 0) {
          return groupOrder;
        }

        if (left.sortOrder !== right.sortOrder) {
          return left.sortOrder - right.sortOrder;
        }

        if (left.detail.featured !== right.detail.featured) {
          return left.detail.featured ? -1 : 1;
        }

        return left.detail.title.localeCompare(right.detail.title, 'es');
      }),
  );

  private readonly prebodaPackageCards = computed<PackageCardViewModel[]>(() =>
    this.content
      .getPackageDetailsByCategory('preboda')
      .map((detail) => this.buildPackageCard(detail))
      .sort((left, right) => {
        if (left.sortOrder !== right.sortOrder) {
          return left.sortOrder - right.sortOrder;
        }

        if (left.detail.featured !== right.detail.featured) {
          return left.detail.featured ? -1 : 1;
        }

        return left.detail.title.localeCompare(right.detail.title, 'es');
      }),
  );

  private readonly postbodaPackageCards = computed<PackageCardViewModel[]>(() =>
    this.content
      .getPackageDetailsByCategory('bodas')
      .filter((detail) => detail.packageTypeLabel === 'Sesión postboda')
      .map((detail) => this.buildPackageCard(detail))
      .sort((left, right) => {
        if (left.sortOrder !== right.sortOrder) {
          return left.sortOrder - right.sortOrder;
        }

        if (left.detail.featured !== right.detail.featured) {
          return left.detail.featured ? -1 : 1;
        }

        return left.detail.title.localeCompare(right.detail.title, 'es');
      }),
  );

  readonly accordionSections = computed<AccordionSectionViewModel[] | null>(
    () => {
      const category = this.categoryState();
      const cards = this.packageCards();
      const prebodaCards = this.prebodaPackageCards();

      if (category === 'preboda') {
        const postbodaCards = this.postbodaPackageCards();

        return [
          { title: 'Sesión de preboda', cards },
          { title: 'Sesión postboda', cards: postbodaCards },
        ];
      }

      if (category === 'bodas') {
        const photoOnly = cards.filter(
          (item) => item.groupKey === 'photo-only',
        );
        const hybrid = cards.filter((item) => item.groupKey === 'photo-video');
        const videoOnly = cards.filter(
          (item) =>
            this.isVideoPackage(item) && item.groupKey !== 'photo-video',
        );
        const postwedding = cards.filter(
          (item) => item.detail.packageTypeLabel === 'Sesión postboda',
        );
        const prebodaForBodas = prebodaCards.filter((item) =>
          item.detail.slug.startsWith('preboda-'),
        );

        return [
          { title: 'Boda híbrida (Foto + video)', cards: hybrid },
          { title: 'Fotografía de bodas', cards: photoOnly },
          { title: 'Video de bodas', cards: videoOnly },
          { title: 'Sesión de preboda', cards: prebodaForBodas },
          { title: 'Sesión postboda', cards: postwedding },
        ];
      }

      if (category === 'quinces') {
        const photoOnly = cards.filter(
          (item) => item.groupKey === 'photo-only',
        );
        const hybrid = cards.filter((item) => item.groupKey === 'photo-video');
        const videoOnly = cards.filter(
          (item) =>
            this.isVideoPackage(item) && item.groupKey !== 'photo-video',
        );

        return [
          { title: 'Cobertura mixta (foto + video)', cards: hybrid },
          { title: 'Fotografía de quince', cards: photoOnly },
          { title: 'Video de quince', cards: videoOnly },
        ].filter((section) => section.cards.length > 0);
      }

      if (category === 'grados') {
        const videoOnly = cards.filter((item) => this.isVideoPackage(item));
        const photoCards = cards.filter((item) => !this.isVideoPackage(item));

        const sections: AccordionSectionViewModel[] = [
          {
            title: 'Fotografía de grado',
            cards: photoCards.length ? photoCards : cards,
          },
        ];

        if (videoOnly.length) {
          sections.push({ title: 'Video de grados', cards: videoOnly });
        }

        return sections;
      }

      if (category === 'corporativos') {
        const normalizeType = (value: string) =>
          String(value ?? '')
            .trim()
            .toLowerCase();

        // 1) Clasificación determinística por `packageTypeLabel` (la data corporativa la define así).
        const byType = (typeLabel: string) =>
          cards.filter(
            (item) =>
              normalizeType(item.detail.packageTypeLabel) ===
              normalizeType(typeLabel),
          );

        const institutionalByType = byType('Video institucional');
        const socialByType = byType('Contenido para redes');
        const eventsByType = byType('Eventos corporativos');
        const personalByType = byType('Marca personal');

        // 2) Fallback heurístico si aún no hay data consistente.
        const institutional: PackageCardViewModel[] = [...institutionalByType];
        const social: PackageCardViewModel[] = [...socialByType];
        const events: PackageCardViewModel[] = [...eventsByType];
        const personal: PackageCardViewModel[] = [...personalByType];

        const used = new Set<string>(
          [...institutional, ...social, ...events, ...personal].map(
            (item) => item.detail.slug,
          ),
        );

        const normalizeText = (item: PackageCardViewModel) =>
          `${item.detail.title} ${item.detail.packageTypeLabel} ${item.detail.eyebrow}`.toLowerCase();

        for (const item of cards) {
          if (used.has(item.detail.slug)) {
            continue;
          }

          const text = normalizeText(item);

          if (/marca\s+personal/.test(text) || /\bpersonal\b/.test(text)) {
            personal.push(item);
            continue;
          }

          if (/evento/.test(text) || /cobertura/.test(text)) {
            events.push(item);
            continue;
          }

          if (/redes/.test(text) || /contenido/.test(text)) {
            social.push(item);
            continue;
          }

          institutional.push(item);
        }

        if (
          cards.length &&
          !institutional.length &&
          !social.length &&
          !events.length &&
          !personal.length
        ) {
          institutional.push(...cards);
        }

        return [
          { title: 'Video institucional', cards: institutional },
          { title: 'Contenido para redes', cards: social },
          { title: 'Eventos corporativos', cards: events },
          { title: 'Marca personal', cards: personal },
        ];
      }

      return null;
    },
  );

  readonly packageCardGroups = computed<PackageCardGroupViewModel[]>(() => {
    const cards = this.packageCards();
    const grouped = new Map<
      PackageCardGroupViewModel['key'],
      PackageCardViewModel[]
    >();

    cards.forEach((card) => {
      const key = card.groupKey;
      const current = grouped.get(key) ?? [];
      current.push(card);
      grouped.set(key, current);
    });

    return ['photo-video', 'photo-only', 'custom', 'session']
      .filter((key) => grouped.has(key as PackageCardGroupViewModel['key']))
      .map((key) => {
        const typedKey = key as PackageCardGroupViewModel['key'];
        return {
          key: typedKey,
          title: this.getGroupTitle(typedKey),
          lead: this.getGroupLead(typedKey),
          cards: grouped.get(typedKey) ?? [],
        };
      });
  });

  readonly heroWhatsappHref = computed(() => {
    const config = this.pageConfig();
    return config
      ? this.content.buildWhatsappHref(config.hero.whatsappMessage)
      : '/portfolio';
  });

  readonly heroFacts = computed<HeroFact[]>(() => {
    const cards = this.packageCards();
    const packageCount = cards.length;
    const config = this.pageConfig();

    const baseAmounts = cards
      .flatMap((card) => card.detail.baseQuoteOptions ?? [])
      .map((option) => option.amountCop)
      .filter(
        (amount): amount is number =>
          typeof amount === 'number' && Number.isFinite(amount) && amount > 0,
      );

    const minAmount = baseAmounts.length ? Math.min(...baseAmounts) : null;
    const minLabel =
      minAmount !== null ? `${this.formatCop(minAmount)} COP` : 'A convenir';

    const clientCount = this.stories().length;
    const clientLabel = clientCount > 0 ? String(clientCount) : '—';

    const categoryCount = this.content.servicePageCategories().length;

    return [
      { label: 'Paquetes', value: String(packageCount) },
      { label: 'Desde', value: minLabel },
      { label: 'Clientes', value: clientLabel },
      { label: 'Categorías', value: String(categoryCount) },
    ];
  });

  readonly heroSocialLinks = computed<HeroSocialLink[]>(() => {
    const links = this.content.contactLinks();

    const iconMap: Record<string, string> = {
      whatsapp: 'assets/images/icons/whatsapp.svg',
      instagram: 'assets/images/icons/instagram.svg',
      facebook: 'assets/images/icons/facebook.svg',
      tiktok: 'assets/images/icons/tiktok.svg',
    };

    const mapped = links.map((link) => ({
      platform: link.platform,
      title: link.title,
      href: link.platform === 'whatsapp' ? this.heroWhatsappHref() : link.href,
      iconSrc: iconMap[link.platform],
    }));

    // Mantener primero WhatsApp e Instagram (tienen ícono en el repo).
    const order = new Map<string, number>([
      ['whatsapp', 1],
      ['instagram', 2],
      ['tiktok', 3],
      ['facebook', 4],
    ]);

    return mapped.sort(
      (a, b) => (order.get(a.platform) ?? 99) - (order.get(b.platform) ?? 99),
    );
  });

  readonly selectedPackage = computed(() => {
    const slug = this.selectedPackageSlug();
    if (!slug) {
      return undefined;
    }

    return (
      this.content.getPackageDetail(this.categoryState(), slug) ??
      this.findPackageDetailBySlug(slug)
    );
  });

  readonly selectedPackagePriceLabel = computed(() => {
    const detail = this.selectedPackage();
    if (!detail?.priceLines?.length) {
      return 'Cotización personalizada';
    }

    const formatted = detail.priceLines
      .map((value) => this.formatPriceLabel(value))
      .filter((value) => value.trim().length > 0);

    return formatted.length
      ? formatted.join(' · ')
      : 'Cotización personalizada';
  });

  readonly detailSections = computed<ExperienceSection[]>(() => {
    const detail = this.selectedPackage();
    return detail ? this.buildExperienceSections(detail) : [];
  });

  readonly detailPrimarySections = computed<ExperienceSection[]>(() => {
    const primaryTitles = new Set(['Qué incluye', 'Cobertura del evento']);
    return this.detailSections().filter((section) =>
      primaryTitles.has(section.title),
    );
  });

  readonly detailSecondarySections = computed<ExperienceSection[]>(() => {
    const primaryTitles = new Set(['Qué incluye', 'Cobertura del evento']);
    return this.detailSections().filter(
      (section) => !primaryTitles.has(section.title),
    );
  });

  readonly packageVisuals = computed(() => {
    const detail = this.selectedPackage();
    if (!detail) {
      return [];
    }

    return detail.visuals?.length
      ? detail.visuals.map((item) => ({
          src: item.image,
          alt: item.title,
          title: item.title,
        }))
      : [{ src: detail.image, alt: detail.title, title: detail.title }];
  });

  readonly fixedIncludedGroups = computed<PortfolioRequestOptionGroup[]>(
    () =>
      this.selectedPackage()?.requestOptionGroups.filter(
        (group) => !group.selectable,
      ) ?? [],
  );

  readonly customAdditionalGroups = computed<PortfolioRequestOptionGroup[]>(
    () => {
      const baseGroups =
        this.selectedPackage()?.requestOptionGroups.filter(
          (group) => group.selectable,
        ) ?? [];
      const detail = this.selectedPackage();
      const shouldIncludeCorporateAdditionals =
        detail?.category === 'corporativos';

      return shouldIncludeCorporateAdditionals
        ? [...baseGroups, this.corporativosAdditionalGroup()]
        : baseGroups;
    },
  );

  readonly selectedBaseQuote = computed(() => {
    const detail = this.selectedPackage();
    if (!detail) {
      return undefined;
    }

    return (
      detail.baseQuoteOptions.find(
        (option) => option.id === this.selectedBaseQuoteId(),
      ) ?? detail.baseQuoteOptions[0]
    );
  });

  readonly selectedAdditionalOptions = computed<PortfolioRequestOption[]>(
    () => {
      const selected = this.requestSelections();
      return this.customAdditionalGroups().flatMap((group) =>
        group.options.filter((option) => selected[option.id]),
      );
    },
  );

  readonly selectedIncludedOptions = computed<PortfolioRequestOption[]>(() => {
    const selected = this.requestSelections();
    return this.fixedIncludedGroups().flatMap((group) =>
      group.options.filter((option) => selected[option.id]),
    );
  });

  readonly requestSummaryServices = computed(() =>
    this.requestMode() === 'base'
      ? this.fixedIncludedGroups().flatMap((group) =>
          group.options.map((option) => option.label),
        )
      : this.selectedIncludedOptions().map((option) => option.label),
  );

  readonly requestSummaryAdditionals = computed(() =>
    this.selectedAdditionalOptions().map((option) => option.label),
  );

  readonly requestSummaryAdditionalsDetailed = computed<UpsellSummaryItem[]>(
    () =>
      this.selectedAdditionalOptions().map((option) => {
        const { name } = this.parseUpsellLabel(option.label);
        const priceLabel =
          option.priceLabel ??
          (option.priceAmountCop
            ? `${this.formatCop(option.priceAmountCop)} COP`
            : '');
        return {
          name,
          priceLabel,
          priceAmountCop: option.priceAmountCop,
        };
      }),
  );

  readonly requestTotalAmountCop = computed<number | null>(() => {
    if (this.requestMode() !== 'base') {
      return null;
    }

    const baseAmount = this.selectedBaseQuote()?.amountCop;
    if (typeof baseAmount !== 'number') {
      return null;
    }

    const additionalsTotal = this.selectedAdditionalOptions().reduce(
      (total, option) => {
        return total + (option.priceAmountCop ?? 0);
      },
      0,
    );

    return baseAmount + additionalsTotal;
  });

  readonly requestTotalLabel = computed(() => {
    const total = this.requestTotalAmountCop();
    if (total === null) {
      return '';
    }

    return `${this.formatCop(total)} COP`;
  });

  readonly requestSubmitLabel = computed(() =>
    this.requestMode() === 'base' ? 'Enviar por WhatsApp' : 'Enviar propuesta',
  );

  readonly requestWhatsappHref = computed(() => {
    const detail = this.selectedPackage();
    if (!detail) {
      return '/portfolio';
    }

    const isBase = this.requestMode() === 'base';
    const lines = [
      `Hola TECNOJACK, quiero ${isBase ? 'solicitar' : 'personalizar'} el paquete ${detail.title}.`,
      '',
      `Tipo de evento: ${detail.categoryLabel}`,
      `Solicitud: ${isBase ? 'Usar paquete base' : 'Personalizar paquete'}`,
    ];

    if (this.customerName().trim()) {
      lines.push(`Nombre: ${this.customerName().trim()}`);
    }
    if (this.customerPhone().trim()) {
      lines.push(`Teléfono: ${this.customerPhone().trim()}`);
    }
    if (this.eventCity().trim()) {
      lines.push(`Ciudad: ${this.eventCity().trim()}`);
    }
    if (this.eventDate().trim()) {
      lines.push(`Fecha estimada: ${this.eventDate().trim()}`);
    }
    if (this.venueName().trim()) {
      lines.push(`Lugar: ${this.venueName().trim()}`);
    }
    if (this.guestCount().trim()) {
      lines.push(`Invitados: ${this.guestCount().trim()}`);
    }
    if (this.selectedBaseQuote()?.label) {
      lines.push(`Referencia base: ${this.selectedBaseQuote()?.label}`);
    }

    const services = this.requestSummaryServices();
    if (services.length) {
      lines.push('', 'Servicios elegidos:');
      services.forEach((item) => lines.push(`- ${item}`));
    }

    const additionals = this.requestSummaryAdditionals();
    const additionalsDetailed = this.requestSummaryAdditionalsDetailed();
    if (additionalsDetailed.length) {
      lines.push('', 'Adicionales:');
      additionalsDetailed.forEach((item) =>
        lines.push(
          `- ${item.name}${item.priceLabel ? ` — ${item.priceLabel}` : ''}`,
        ),
      );
    }

    const totalLabel = this.requestTotalLabel();
    if (totalLabel) {
      lines.push('', `Total estimado: ${totalLabel}`);
    }

    if (this.customerNotes().trim()) {
      lines.push('', `Notas: ${this.customerNotes().trim()}`);
    }

    return this.content.buildWhatsappHref(lines.join('\n'));
  });

  readonly currentStory = computed<PortfolioServiceStory | undefined>(() => {
    const stories = this.stories();
    const index = this.activeStoryIndex();

    if (index === null || !stories[index]) {
      return undefined;
    }

    return stories[index];
  });

  readonly currentStoryImage = computed(() => {
    const story = this.currentStory();
    return story?.images[this.activeStoryImageIndex()] ?? undefined;
  });

  readonly storyImageCounter = computed(() => {
    const story = this.currentStory();
    if (!story) {
      return '0 / 0';
    }

    return `${this.activeStoryImageIndex() + 1} / ${story.images.length}`;
  });

  constructor() {
    this.updateStoriesViewportMode();

    effect((onCleanup) => {
      const overlayOpen = !!this.selectedPackage() || !!this.currentStory();
      const body = this.document.body;
      const root = this.document.documentElement;

      body.classList.toggle('portfolio-request-modal-open', overlayOpen);
      root.classList.toggle('portfolio-request-modal-open', overlayOpen);

      onCleanup(() => {
        body.classList.remove('portfolio-request-modal-open');
        root.classList.remove('portfolio-request-modal-open');
      });
    });
  }

  @HostListener('window:resize')
  handleResize(): void {
    this.updateStoriesViewportMode();
  }

  private updateStoriesViewportMode(): void {
    const width = this.document.defaultView?.innerWidth ?? 1024;
    this.isMobileStories.set(width <= 767);
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.currentStory()) {
      this.closeStoryModal();
      return;
    }

    if (this.selectedPackage()) {
      this.closePackageModal();
    }
  }

  @HostListener('document:keydown.arrowright')
  handleArrowRight(): void {
    if (this.currentStory()) {
      this.showNextStoryImage();
    }
  }

  @HostListener('document:keydown.arrowleft')
  handleArrowLeft(): void {
    if (this.currentStory()) {
      this.showPreviousStoryImage();
    }
  }

  openPackageModal(slug: string): void {
    const detail =
      this.content.getPackageDetail(this.categoryState(), slug) ??
      this.findPackageDetailBySlug(slug);
    if (!detail) {
      return;
    }

    this.selectedPackageSlug.set(slug);
    this.modalStep.set('detail');
    this.visiblePackageImages.set(
      PortfolioServiceCategoryPageComponent.INITIAL_VISIBLE_IMAGES,
    );
    this.resetRequestState(detail);
  }

  private findPackageDetailBySlug(
    slug: string,
  ): PortfolioPackageDetail | undefined {
    for (const category of this.categoryLookupOrder) {
      const detail = this.content.getPackageDetail(category, slug);
      if (detail) {
        return detail;
      }
    }

    return undefined;
  }

  closePackageModal(): void {
    this.selectedPackageSlug.set(null);
    this.modalStep.set('detail');
    this.visiblePackageImages.set(
      PortfolioServiceCategoryPageComponent.INITIAL_VISIBLE_IMAGES,
    );
  }

  loadMorePackageImages(): void {
    this.visiblePackageImages.update(
      (current) =>
        current + PortfolioServiceCategoryPageComponent.VISIBLE_IMAGE_STEP,
    );
  }

  loadMoreStories(): void {
    this.visibleStoriesCount.update(
      (current) => current + PortfolioServiceCategoryPageComponent.VISIBLE_STORIES_STEP,
    );
  }

  hasMoreStories(): boolean {
    return this.stories().length > this.visibleStoriesCount();
  }

  getVisiblePackageGalleryItems(
    galleryUrls: string[],
  ): Array<{ id: string; url: string }> {
    return galleryUrls
      .slice(1, this.visiblePackageImages() + 1)
      .map((url, index) => ({ id: `${index}-${url}`, url }));
  }

  getPackageGalleryViewportHeight(galleryUrls: string[]): string {
    const visibleItems = this.getVisiblePackageGalleryItems(galleryUrls).length;

    if (visibleItems <= 0) {
      return '0px';
    }

    const estimatedHeight = visibleItems * 260 + Math.max(visibleItems - 1, 0) * 10;
    return `${Math.min(estimatedHeight, 760)}px`;
  }

  hasMorePackageImages(galleryUrls: string[]): boolean {
    return galleryUrls.length > this.visiblePackageImages() + 1;
  }

  optimizeImage(url: string, width = 400): string {
    return optimizeImage(url, width);
  }

  trackById(index: number, item: { id: string }): string {
    return item.id;
  }

  trackByStoryImage(
    index: number,
    image: PortfolioServiceStoryImage,
  ): string {
    return image.src || String(index);
  }

  trackByStoryId(index: number, story: PortfolioServiceStory): string {
    return `${story.clientName}-${story.subtitle}-${index}`;
  }

  startRequest(mode: RequestMode): void {
    this.requestMode.set(mode);
    this.hasAcceptedTerms.set(false);
    this.modalStep.set('request');
  }

  returnToDetail(): void {
    this.modalStep.set('detail');
  }

  guardRequestSubmit(event: MouseEvent): void {
    console.log('[WA_FLOW][SERVICE_CATEGORY] click:guard', {
      hasAcceptedTerms: this.hasAcceptedTerms(),
      href: this.requestWhatsappHref(),
      requestMode: this.requestMode(),
      nameLen: this.customerName().trim().length,
      phoneLen: this.customerPhone().trim().length,
    });

    if (this.hasAcceptedTerms()) {
      console.log('[WA_FLOW][SERVICE_CATEGORY] allowed:navigate-whatsapp');
      return;
    }

    console.log('[WA_FLOW][SERVICE_CATEGORY] blocked:terms-not-accepted');
    event.preventDefault();
    event.stopPropagation();
  }

  openStoryModal(storyIndex: number): void {
    const story = this.stories()[storyIndex];
    if (!story || story.images.length === 0) {
      return;
    }

    this.activeStoryIndex.set(storyIndex);
    this.activeStoryImageIndex.set(0);
    this.visibleStoryThumbsCount.set(
      PortfolioServiceCategoryPageComponent.INITIAL_VISIBLE_STORY_THUMBS,
    );
  }

  closeStoryModal(): void {
    this.activeStoryIndex.set(null);
    this.activeStoryImageIndex.set(0);
    this.visibleStoryThumbsCount.set(
      PortfolioServiceCategoryPageComponent.INITIAL_VISIBLE_STORY_THUMBS,
    );
  }

  getVisibleStoryThumbs(story: PortfolioServiceStory): PortfolioServiceStoryImage[] {
    return story.images.slice(0, this.visibleStoryThumbsCount());
  }

  hasMoreStoryThumbs(story: PortfolioServiceStory): boolean {
    return story.images.length > this.visibleStoryThumbsCount();
  }

  loadMoreStoryThumbs(): void {
    this.visibleStoryThumbsCount.update(
      (current) =>
        current + PortfolioServiceCategoryPageComponent.VISIBLE_STORY_THUMBS_STEP,
    );
  }

  showNextStoryImage(): void {
    const story = this.currentStory();
    if (!story) {
      return;
    }

    this.activeStoryImageIndex.update(
      (index) => (index + 1) % story.images.length,
    );
  }

  showPreviousStoryImage(): void {
    const story = this.currentStory();
    if (!story) {
      return;
    }

    this.activeStoryImageIndex.update(
      (index) => (index - 1 + story.images.length) % story.images.length,
    );
  }

  updateRequestMode(mode: RequestMode): void {
    this.requestMode.set(mode);
  }

  updateBaseQuote(optionId: string): void {
    this.selectedBaseQuoteId.set(optionId);
  }

  toggleRequestOption(optionId: string, checked: boolean): void {
    this.requestSelections.update((current) => ({
      ...current,
      [optionId]: checked,
    }));
  }

  isOptionSelected(optionId: string): boolean {
    return !!this.requestSelections()[optionId];
  }

  getUpsellName(label: string): string {
    return this.parseUpsellLabel(label).name;
  }

  getUpsellDescription(label: string): string {
    return this.parseUpsellLabel(label).description;
  }

  private parseUpsellLabel(label: string): {
    name: string;
    description: string;
  } {
    const [name, description] = label.split('||');
    return {
      name: (name ?? label).trim(),
      description: (description ?? '').trim(),
    };
  }

  private formatCop(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  formatPriceLabel(label: string): string {
    const raw = (label ?? '').trim();
    if (!raw) {
      return '';
    }

    if (/cotizaci[oó]n/i.test(raw)) {
      return raw;
    }

    const rawWithoutCop = raw.replace(/\bCOP\b/gi, '').trim();
    if (/[a-záéíóúñ]/i.test(rawWithoutCop)) {
      return raw;
    }

    const digitsOnly = raw.replace(/[^\d]/g, '');
    if (!digitsOnly) {
      return raw;
    }

    const amount = Number(digitsOnly);
    if (!Number.isFinite(amount) || amount <= 0) {
      return raw;
    }

    return `${this.formatCop(amount)} COP`;
  }

  updateCustomerName(value: string): void {
    this.customerName.set(value);
  }

  updateCustomerPhone(value: string): void {
    this.customerPhone.set(value);
  }

  updateEventDate(value: string): void {
    this.eventDate.set(value);
  }

  updateEventCity(value: string): void {
    this.eventCity.set(value);
  }

  updateVenueName(value: string): void {
    this.venueName.set(value);
  }

  updateGuestCount(value: string): void {
    this.guestCount.set(value);
  }

  updateCustomerNotes(value: string): void {
    this.customerNotes.set(value);
  }

  getStoryPreviewImages(
    story: PortfolioServiceStory,
  ): PortfolioServiceStoryImage[] {
    return story.images.slice(0, 3);
  }

  getStoryEmptySlots(story: PortfolioServiceStory): number[] {
    return Array.from({ length: Math.max(0, 3 - story.images.length) }, (_, index) => index);
  }

  private mapCategoryToClientServices(
    category: PortfolioPackageCategory,
  ): Array<'bodas' | 'prebodas' | 'quinces' | 'grados'> {
    switch (category) {
      case 'bodas':
        return ['bodas', 'prebodas'];
      case 'quinces':
        return ['quinces'];
      case 'grados':
        return ['grados'];
      case 'preboda':
        return ['prebodas'];
      default:
        return [];
    }
  }

  private mapClientToStory(
    client: Client,
    galleryUrls: string[],
  ): PortfolioServiceStory {
    const safeImages: PortfolioServiceStoryImage[] = galleryUrls
      .filter((url) => !!url)
      .slice(0, 12)
      .map((url, index) => ({
        src: url,
        alt: `Galería de ${client.name} · imagen ${index + 1}`,
      }));

    return {
      clientName: client.name,
      location: client.location ?? 'Ubicación por confirmar',
      title: this.getClientServiceLabel(client),
      subtitle: client.eventDate?.trim() || '',
      images: safeImages,
    };
  }

  private getClientServiceLabel(client: Client): string {
    if (client.serviceLabel?.trim()) {
      return client.serviceLabel.trim();
    }

    switch (client.service) {
      case 'bodas':
        return 'BODA';
      case 'prebodas':
        return 'PREBODA';
      case 'quinces':
        return 'QUINCE';
      case 'grados':
        return 'GRADO';
      default:
        return 'SERVICIO';
    }
  }

  private resetRequestState(detail: PortfolioPackageDetail): void {
    const selections = Object.fromEntries(
      detail.requestOptionGroups.flatMap((group) =>
        group.options.map((option) => [
          option.id,
          group.selectable ? option.selectedByDefault === true : true,
        ]),
      ),
    );

    if (detail.category === 'corporativos') {
      for (const option of this.corporativosAdditionalGroup().options) {
        selections[option.id] = option.selectedByDefault === true;
      }
    }

    this.requestSelections.set(selections);
    this.selectedBaseQuoteId.set(
      detail.baseQuoteOptions.find(
        (option) => option.selectedByDefault !== false,
      )?.id ??
        detail.baseQuoteOptions[0]?.id ??
        '',
    );
    this.requestMode.set('base');
    this.customerName.set('');
    this.customerPhone.set('');
    this.eventDate.set('');
    this.eventCity.set('');
    this.venueName.set('');
    this.guestCount.set('');
    this.customerNotes.set('');
    this.hasAcceptedTerms.set(false);
  }

  private buildCardHighlights(detail: PortfolioPackageDetail): string[] {
    const sections = this.buildExperienceSections(detail);
    const primary =
      sections.find((section) => section.title === 'Qué incluye')?.items ?? [];
    const coverage =
      sections.find((section) => section.title === 'Cobertura del evento')
        ?.items ?? [];
    const deliverables =
      sections.find((section) => section.title === 'Entregables')?.items ?? [];

    return Array.from(
      new Set([
        ...primary.slice(0, 3),
        ...deliverables.slice(0, 2),
        ...coverage.slice(0, 1),
      ]),
    ).slice(0, 6);
  }

  private buildExperienceSections(
    detail: PortfolioPackageDetail,
  ): ExperienceSection[] {
    const coverage = detail.sections
      .filter((section) => /momento|cobertura/i.test(section.title))
      .flatMap((section) => section.items);

    const sourceItems = detail.sections
      .filter((section) => !/momento|cobertura/i.test(section.title))
      .flatMap((section) => section.items);

    const deliverables = sourceItems.filter((item) =>
      deliverablePattern.test(item),
    );
    const extras = sourceItems.filter(
      (item) => !deliverablePattern.test(item) && extraPattern.test(item),
    );
    const includes = sourceItems.filter(
      (item) => !deliverablePattern.test(item) && !extraPattern.test(item),
    );

    return [
      { title: 'Qué incluye', items: includes },
      { title: 'Cobertura del evento', items: coverage },
      { title: 'Entregables', items: deliverables },
      { title: 'Extras incluidos', items: extras },
    ].filter((section) => section.items.length > 0);
  }

  private buildPackageDisplayName(detail: PortfolioPackageDetail): string {
    if (detail.category === 'grados') {
      return detail.title;
    }

    if (detail.category === 'corporativos') {
      return detail.title;
    }

    const { tier } = this.splitPlanName(detail.title);

    const categoryPrefix = (() => {
      if (detail.category === 'bodas') {
        if (/postboda/i.test(detail.packageTypeLabel)) {
          return 'Postboda';
        }

        if (detail.packageGroup === 'photo-video') {
          return 'Híbrida';
        }

        if (
          detail.packageGroup === 'custom' &&
          /\bvideo\b/i.test(detail.packageTypeLabel)
        ) {
          return 'Video';
        }

        return 'Boda';
      }

      if (detail.category === 'quinces') {
        if (detail.packageGroup === 'photo-video') {
          return 'Cobertura mixta';
        }

        if (
          detail.packageGroup === 'custom' &&
          /\bvideo\b/i.test(detail.packageTypeLabel)
        ) {
          return 'Video de quince';
        }

        if (detail.packageGroup === 'photo-only') {
          return 'Fotografía de quince';
        }

        return 'Quince';
      }

      return 'Preboda';
    })();

    const normalizedTier = tier.replace(/^Plan\s+/i, '').trim();
    return `${categoryPrefix} ${normalizedTier}`.trim();
  }

  private buildPackageTagline(detail: PortfolioPackageDetail): string {
    const { tagline } = this.splitPlanName(detail.title);
    return tagline || '';
  }

  private splitPlanName(value: string): { tier: string; tagline: string } {
    const cleaned = (value ?? '').trim();
    const match = cleaned.split(/\s+[–-]\s+/);
    if (match.length >= 2) {
      const [tier, ...rest] = match;
      return {
        tier: (tier ?? cleaned).trim(),
        tagline: rest.join(' – ').trim(),
      };
    }

    return { tier: cleaned, tagline: '' };
  }

  private normalizePackageTypeLabel(label: string): string {
    if (/solo fotograf/i.test(label)) {
      return 'Solo fotos';
    }

    if (/foto\s*\+\s*video/i.test(label)) {
      return 'Foto + video';
    }

    return label;
  }

  private getGroupOrder(key: PackageCardGroupViewModel['key']): number {
    switch (key) {
      case 'photo-video':
        return 1;
      case 'photo-only':
        return 2;
      case 'custom':
        return 3;
      case 'session':
        return 4;
      default:
        return 99;
    }
  }

  private getGroupTitle(key: PackageCardGroupViewModel['key']): string {
    if (this.categoryState() === 'grados' && key === 'photo-only') {
      return 'Paqueticos de grados';
    }

    switch (key) {
      case 'photo-video':
        return 'Foto + video';
      case 'photo-only':
        return 'Solo fotografía';
      case 'custom':
        return 'Servicio personalizable';
      case 'session':
        return 'Sesiones preboda';
      default:
        return 'Paquetes';
    }
  }

  private getGroupLead(key: PackageCardGroupViewModel['key']): string {
    if (this.categoryState() === 'grados' && key === 'photo-only') {
      return 'Aquí se presentan cuatro opciones base de fotografía para grados. El video no viene incluido en el precio base y se suma aparte como adicional desde 150.000 COP.';
    }

    switch (key) {
      case 'photo-video':
        return 'Estas propuestas combinan fotografía y video en una sola cobertura, y quedan arriba para priorizar la lectura comercial.';
      case 'photo-only':
        return 'Estas propuestas se enfocan únicamente en fotografía y quedan separadas debajo para no mezclar tipos de servicio.';
      case 'custom':
        return 'Aquí la cotización parte de una base, pero puede ajustarse bastante según fotos, impresos y video.';
      case 'session':
        return 'Sesiones previas con distintos niveles de duración, vestuario y entregables.';
      default:
        return 'Propuestas organizadas por tipo de servicio.';
    }
  }

  private buildPackageCard(
    detail: PortfolioPackageDetail,
  ): PackageCardViewModel {
    return {
      detail,
      displayName: this.buildPackageDisplayName(detail),
      tagline: this.buildPackageTagline(detail),
      displayPrice: detail.priceLines?.length
        ? this.formatPriceLabel(detail.priceLines[0] ?? '')
        : 'Cotización personalizada',
      displayTypeLabel: this.normalizePackageTypeLabel(detail.packageTypeLabel),
      highlights: this.buildCardHighlights(detail),
      packageTypeLabel: detail.packageTypeLabel,
      groupKey: detail.packageGroup,
      sortOrder: detail.sortOrder ?? this.inferSortOrder(detail),
    };
  }

  coverByDetail(detail: PortfolioPackageDetail | null | undefined) {
    return this.mediaPublic.getRealImage(
      resolvePortfolioPackageMediaFolder(detail),
    );
  }

  mediaStateByDetail(detail: PortfolioPackageDetail | null | undefined) {
    return this.mediaPublic.getResolvedMediaStateByFolder(
      resolvePortfolioPackageMediaFolder(detail),
    );
  }

  private inferSortOrder(detail: PortfolioPackageDetail): number {
    const { tier } = this.splitPlanName(detail.title);
    const normalized = (tier ?? '').toLowerCase();

    if (/\besencial\b/.test(normalized)) {
      return 1;
    }

    if (/\bsencilla\b/.test(normalized)) {
      return 1;
    }

    if (/\bcompleta\b|\bcompleto\b/.test(normalized)) {
      return 2;
    }

    if (/\bpremium\b/.test(normalized)) {
      return 3;
    }

    if (/\bluxury\b/.test(normalized)) {
      return 4;
    }

    return 999;
  }

  private isVideoPackage(card: PackageCardViewModel): boolean {
    const label = `${card.packageTypeLabel} ${card.displayTypeLabel}`;
    return /\bvideo\b|reel|tr[aá]iler|trailer/i.test(label);
  }
}
