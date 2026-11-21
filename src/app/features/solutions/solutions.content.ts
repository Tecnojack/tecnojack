/**
 * Content for /soluciones — a software-first landing page (web & software development, with TECNOJACK's
 * audiovisual production as the differentiator). Kept apart from the component so copy can be edited safely.
 *
 * Stock photos come from Pexels (free for commercial use, no attribution required) and are served resized by
 * Pexels' CDN. They illustrate services only; they are never presented as TECNOJACK portfolio work.
 */

/** Pexels image URL resized by its CDN (auto WebP/compression). */
export function stockPhoto(id: number, width = 900): string {
	return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const STOCK = {
	perfumePedestal: 12402368,
	amberBottles: 8789616,
	perfumeGold: 11711833,
	videoStudio: 17094507,
	barber: 32329615,
	clothingStore: 8311880,
	cafeOwner: 8475171,
	corporatePortrait: 30133734,
	smilingHeadshot: 12311572,
	teamMeeting: 7693692,
	developerDesk: 9553905,
} as const;

export const HERO = {
	eyebrow: 'TECNOJACK Studio · Desarrollo web y software',
	title: 'Creamos el sitio web que hace crecer tu negocio.',
	lead:
		'Diseño, desarrollo y contenido audiovisual en un solo equipo: landing pages, tiendas en línea, portales de citas y sistemas a medida, con fotos y video hechos por nosotros.',
	stackLabel: 'Trabajamos con la tecnología que tu proyecto necesite',
	stack: [
		'Angular',
		'React',
		'Next.js',
		'TypeScript',
		'JavaScript',
		'Node.js',
		'NestJS',
		'PostgreSQL',
		'MongoDB',
		'Firebase',
		'Tailwind CSS',
		'Three.js',
		'GSAP',
	],
};

/**
 * Code "typed" by scroll in the hero editor. Each line belongs to a `step`; once every line of a step is
 * written, the matching piece of the live site appears in the browser beside it.
 * Steps: 1 nav · 2 hero photo · 3 headline · 4 CTA · 5 product grid · 6 booking · 7 WhatsApp · 8 footer.
 */
export const HERO_CODE: Array<{ text: string; step: number }> = [
	{ text: '<header class="nav">', step: 1 },
	{ text: '  <a class="logo">Tu Marca</a>', step: 1 },
	{ text: '  <nav>Tienda · Citas · Contacto</nav>', step: 1 },
	{ text: '</header>', step: 1 },
	{ text: '<section class="hero">', step: 2 },
	{ text: '  <img src="producto.webp" />', step: 2 },
	{ text: '  <h1>Hecho para destacar</h1>', step: 3 },
	{ text: '  <p>Envíos a todo el país</p>', step: 3 },
	{ text: '  <button (click)="comprar()">', step: 4 },
	{ text: '    Comprar ahora', step: 4 },
	{ text: '  </button>', step: 4 },
	{ text: '</section>', step: 4 },
	{ text: '<section class="productos">', step: 5 },
	{ text: '  <card *ngFor="let p of productos"', step: 5 },
	{ text: '        [foto]="p.foto" [precio]="p.precio" />', step: 5 },
	{ text: '</section>', step: 5 },
	{ text: '<section class="citas">', step: 6 },
	{ text: '  <h2>Agenda tu cita</h2>', step: 6 },
	{ text: '  <agenda [horarios]="libres" />', step: 6 },
	{ text: '</section>', step: 6 },
	{ text: '<whatsapp-boton numero="+57 300" />', step: 7 },
	{ text: '<footer>© Tu Marca · Medellín</footer>', step: 8 },
];

/** Build log shown while the code is written: one label per step of HERO_CODE (index = step - 1). */
export const HERO_STEPS = [
	'Estructura y navegación',
	'Fotografía de producto',
	'El mensaje que vende',
	'Botón de compra',
	'Catálogo de productos',
	'Agenda de citas',
	'WhatsApp directo',
	'Listo para publicar',
];

/** Phones: one short line per build step, shown under the build while it is being written. */
export const HERO_STEP_NOTES = [
	'Todo empieza con una estructura clara: tu cliente encuentra lo que busca en segundos.',
	'Fotos de producto hechas por nosotros: tu marca se ve como lo que vale.',
	'Un mensaje directo que explica por qué elegirte.',
	'Un botón que lleva a la compra sin rodeos.',
	'Tu catálogo, fácil de recorrer desde el celular.',
	'Tus clientes reservan solos, a cualquier hora.',
	'Un toque y te escriben por WhatsApp.',
	'Publicado, rápido y listo para vender.',
];

/** Demo products shown in the live preview (stock photos, demo prices of the fictional "Tu Marca"). */
export const HERO_PRODUCTS = [
	{ name: 'Perfume Oro', price: '$189.000', photo: 11711833 },
	{ name: 'Sérum Ámbar', price: '$96.000', photo: 8789616 },
	{ name: 'Aceite Facial', price: '$74.000', photo: 6955179 },
];

export const PRINCIPLES = [
	{ title: 'Rápida en el celular', text: 'Optimizamos cada imagen y cada línea de código para que tu web cargue rápido incluso con datos móviles.' },
	{ title: 'Fácil de administrar', text: 'Cuando lo necesitas, incluimos un panel para que cambies precios, fotos y servicios sin depender de nadie.' },
	{ title: 'Conectada a tus ventas', text: 'WhatsApp, reservas, pedidos y analítica para saber de dónde llegan tus clientes y qué funciona.' },
];

export type ServiceMock = 'landing' | 'corporate' | 'store' | 'booking' | 'system' | 'redesign';

export const SERVICES: Array<{ title: string; text: string; mock: ServiceMock }> = [
	{ title: 'Landing pages', text: 'Una página enfocada en vender un producto, un servicio o una campaña, con un solo objetivo claro.', mock: 'landing' },
	{ title: 'Sitios corporativos', text: 'Tu empresa presentada con claridad: servicios, equipo, casos y contacto en un sitio a tu medida.', mock: 'corporate' },
	{ title: 'Tiendas y catálogos', text: 'Productos con fotos profesionales, categorías y pedidos por WhatsApp o pasarela de pago.', mock: 'store' },
	{ title: 'Portales de citas', text: 'Tus clientes eligen servicio, día y hora; tú ves y organizas tu agenda desde un panel.', mock: 'booking' },
	{ title: 'Sistemas a medida', text: 'Paneles administrativos, inventarios, ERP y procesos internos con front-end y back-end propios.', mock: 'system' },
	{ title: 'Rediseño y optimización', text: 'Tu sitio actual, más rápido, más claro y mejor preparado para aparecer en Google.', mock: 'redesign' },
];

/** Exploded-view chapter: layers from bottom (strategy) to top (audiovisual content). */
export const ANATOMY_LAYERS = [
	{ key: 'strategy', label: 'Estrategia', title: 'Primero, qué tiene que vender.', text: 'Definimos objetivo, público y el camino que hará tu cliente hasta escribirte o comprar.' },
	{ key: 'code', label: 'Código', title: 'Después, la ingeniería.', text: 'Front-end y back-end propios: rápido, seguro y listo para crecer contigo.' },
	{ key: 'design', label: 'Diseño', title: 'Una interfaz con tu identidad.', text: 'Diseño a la medida de tu marca, pensado primero para el celular.' },
	{ key: 'content', label: 'Contenido', title: 'Y fotos y video propios.', text: 'Producimos el contenido audiovisual para que tu web se vea como tu marca merece.' },
] as const;

export const MEDIA_SERVICES = [
	'Fotografía de producto en estudio',
	'Retratos corporativos y de equipo',
	'Fotos de tu local y su ambiente',
	'Video para tu web y redes',
	'Dirección de arte para tu marca',
];

export type IndustryMock = 'slots' | 'products' | 'menu' | 'dashboard' | 'profile';

export const INDUSTRIES: Array<{
	key: string;
	label: string;
	title: string;
	text: string;
	points: string[];
	photo: number;
	mock: IndustryMock;
}> = [
	{
		key: 'barberias',
		label: 'Barberías y salones',
		title: 'Tu agenda se llena sola.',
		text: 'Una landing con tus servicios y precios, y un portal donde el cliente reserva su cita sin escribirte a las 11 de la noche.',
		points: ['Reserva de citas en línea', 'Servicios, precios y equipo', 'Galería de tus mejores cortes'],
		photo: STOCK.barber,
		mock: 'slots',
	},
	{
		key: 'tiendas',
		label: 'Tiendas',
		title: 'Tu vitrina abierta las 24 horas.',
		text: 'Catálogo con fotos de producto profesionales, categorías y pedidos que llegan ordenados a tu WhatsApp.',
		points: ['Catálogo por categorías', 'Pedidos por WhatsApp o pago en línea', 'Sesión de fotos de producto'],
		photo: STOCK.clothingStore,
		mock: 'products',
	},
	{
		key: 'restaurantes',
		label: 'Restaurantes y cafés',
		title: 'Que se antojen antes de llegar.',
		text: 'Menú digital siempre actualizado, fotos del plato y del lugar, ubicación, horarios y reservas.',
		points: ['Menú digital con código QR', 'Foto y video del plato y del lugar', 'Reservas y domicilios'],
		photo: STOCK.cafeOwner,
		mock: 'menu',
	},
	{
		key: 'empresas',
		label: 'Empresas',
		title: 'Tecnología a la medida de tu operación.',
		text: 'Sitio corporativo, portales para clientes y sistemas internos que ordenan procesos, inventario y ventas.',
		points: ['Rediseño del sitio corporativo', 'Portales y paneles administrativos', 'Retratos del equipo y video institucional'],
		photo: STOCK.teamMeeting,
		mock: 'dashboard',
	},
	{
		key: 'marca-personal',
		label: 'Marca personal',
		title: 'Un enlace que vende por ti.',
		text: 'Página personal con tu historia, servicios y portafolio, y retratos profesionales que generan confianza.',
		points: ['Landing personal con portafolio', 'Retratos profesionales', 'Contacto directo para contratarte'],
		photo: STOCK.smilingHeadshot,
		mock: 'profile',
	},
];

export const PROCESS = [
	{ title: 'Diagnóstico', text: 'Entendemos tu negocio, tus clientes y lo que la web tiene que lograr.', deliverable: 'Propuesta con alcance y valor' },
	{ title: 'Diseño', text: 'Estructura y diseño visual de tu sitio, que revisas antes de programar.', deliverable: 'Prototipo navegable' },
	{ title: 'Producción', text: 'Programamos tu sitio o sistema y producimos las fotos y el video.', deliverable: 'Sitio funcionando + contenido' },
	{ title: 'Lanzamiento', text: 'Publicamos, conectamos dominio, WhatsApp y analítica, y te acompañamos.', deliverable: 'Tu web en línea y medida' },
];

/** Facts measured on this very site (see docs/migration/IMPLEMENTATION_STATUS.md). */
export const PROOF = {
	title: 'Este sitio es la prueba.',
	text: 'Lo diseñamos, lo programamos y producimos sus fotos nosotros. Estas son mejoras reales que le hicimos:',
	facts: [
		{ value: '21 MB → 516 KB', label: 'peso de imágenes del inicio en el celular' },
		{ value: '3 tamaños', label: 'por foto, según la pantalla de quien visita' },
		{ value: 'tecnojack.co/p/b3', label: 'enlaces cortos para compartir cada paquete' },
		{ value: 'GA4', label: 'analítica de cada paquete visto y cada contacto' },
	],
};

export const FAQ = [
	{
		q: '¿Cuánto cuesta un sitio web?',
		a: 'Depende del alcance: no es lo mismo una landing page que un portal de citas o un sistema a medida. En el diagnóstico definimos lo que necesitas y te enviamos una propuesta clara con alcance y valor.',
	},
	{
		q: '¿Cuánto tiempo toma?',
		a: 'Una landing page toma mucho menos que un sistema a medida. Desde la propuesta te damos un cronograma por etapas para que sepas qué recibes y cuándo.',
	},
	{
		q: '¿Puedo actualizar mi sitio yo mismo?',
		a: 'Sí. Cuando lo necesitas, incluimos un panel de administración para cambiar textos, fotos, precios o servicios sin saber programar.',
	},
	{
		q: '¿Las fotos y el video están incluidos?',
		a: 'Puedes contratar la solución completa con sesión de fotos y video, o solo el desarrollo si ya tienes tu contenido.',
	},
	{
		q: '¿Trabajan sobre mi sitio actual?',
		a: 'Sí. Lo revisamos, te decimos qué mejorar y lo optimizamos, lo rediseñamos o lo reconstruimos según lo que convenga.',
	},
];

export type SolutionKind = 'landing' | 'web' | 'store' | 'booking' | 'system' | 'redesign' | 'media' | 'complete';

export const SOLUTION_OPTIONS: Array<{ value: SolutionKind; label: string }> = [
	{ value: 'landing', label: 'Landing page' },
	{ value: 'web', label: 'Sitio web corporativo' },
	{ value: 'store', label: 'Tienda o catálogo' },
	{ value: 'booking', label: 'Portal de citas' },
	{ value: 'system', label: 'Sistema a medida' },
	{ value: 'redesign', label: 'Rediseño de mi sitio' },
	{ value: 'complete', label: 'Web + fotos y video' },
	{ value: 'media', label: 'Solo fotos y video' },
];
