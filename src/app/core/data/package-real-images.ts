export interface PackageRealImage {
  path: string;
  imageUrl: string;
  type: 'photo' | 'video' | 'production';
  intent: string;
}

const pexelsImage = (photoId: number): string =>
  `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop`;

function realImage(
  path: string,
  imageUrl: string,
  type: PackageRealImage['type'],
  intent: string,
): PackageRealImage {
  return {
    path,
    imageUrl,
    type,
    intent,
  };
}

export const PACKAGE_REAL_IMAGES: PackageRealImage[] = [
  realImage(
    'servicios/video/video-esencial',
    pexelsImage(29379918),
    'video',
    'basic video production with cinema camera setup filmmaking gear and technical scene',
  ),
  realImage(
    'servicios/video/video-pro',
    pexelsImage(30697924),
    'video',
    'professional camera rig in use during filming with real production setup',
  ),
  realImage(
    'servicios/video/video-cinematico',
    pexelsImage(28613680),
    'video',
    'cinematic video production with stabilizer rig lens and filmmaking equipment',
  ),
  realImage(
    'servicios/video/video-personalizado',
    pexelsImage(9179882),
    'video',
    'custom video production with camera equipment lenses and production tools on set',
  ),
  realImage(
    'servicios/video/video-cortometraje',
    pexelsImage(1327099),
    'video',
    'short film concept with cinema lens detail and filmmaking equipment',
  ),
  realImage(
    'servicios/corporativos/video-institucional/corporativos-video-institucional-esencial',
    pexelsImage(6954174),
    'video',
    'video production team filming interview corporate camera lighting real set',
  ),
  realImage(
    'servicios/corporativos/video-institucional/corporativos-video-institucional-completo',
    pexelsImage(7212455),
    'video',
    'corporate interview production with camera lighting and operator in action',
  ),
  realImage(
    'servicios/corporativos/video-institucional/corporativos-video-institucional-premium',
    pexelsImage(8147704),
    'video',
    'cinematic corporate filming with crew lighting and interview subject',
  ),
  realImage(
    'servicios/corporativos/redes/corporativos-redes-start',
    pexelsImage(7676406),
    'video',
    'content creator filming with phone ring light vertical reel social media production',
  ),
  realImage(
    'servicios/corporativos/redes/corporativos-redes-creator',
    pexelsImage(8489034),
    'video',
    'creator recording vertical social content with camera and compact lights',
  ),
  realImage(
    'servicios/corporativos/redes/corporativos-redes-pro-content',
    pexelsImage(8799698),
    'video',
    'professional content production for social media with camera and lighting',
  ),
  realImage(
    'servicios/corporativos/eventos/corporativos-eventos-esencial',
    pexelsImage(28238676),
    'production',
    'corporate event coverage stage lights crowd video production real event',
  ),
  realImage(
    'servicios/corporativos/eventos/corporativos-eventos-completo',
    pexelsImage(18799380),
    'production',
    'conference videography with audience stage lights and live event action',
  ),
  realImage(
    'servicios/corporativos/eventos/corporativos-eventos-premium',
    pexelsImage(19224452),
    'production',
    'large event production with stage lighting cameras and audience coverage',
  ),
  realImage(
    'servicios/corporativos/marca-personal/corporativos-marca-personal-esencial',
    pexelsImage(15760815),
    'photo',
    'personal branding photoshoot photographer lighting setup real portrait direction',
  ),
  realImage(
    'servicios/corporativos/marca-personal/corporativos-marca-personal-completo',
    pexelsImage(30697767),
    'photo',
    'professional portrait session with lighting setup and photographer direction',
  ),
  realImage(
    'servicios/corporativos/marca-personal/corporativos-marca-personal-premium',
    pexelsImage(31444894),
    'photo',
    'premium personal branding session with controlled lighting and photographer',
  ),
  realImage(
    'servicios/otros/fotografia/foto-sesion-personal',
    pexelsImage(18102854),
    'photo',
    'photographer shooting personal portrait with real direction and natural light',
  ),
  realImage(
    'servicios/otros/fotografia/foto-sesion-redes',
    pexelsImage(16974331),
    'photo',
    'portrait content shoot for social media with photographer working in action',
  ),
  realImage(
    'servicios/otros/fotografia/foto-retrato-profesional',
    pexelsImage(4463953),
    'photo',
    'professional portrait studio lighting business portrait realistic session',
  ),
  realImage(
    'servicios/otros/video/video-presentacion-personal',
    pexelsImage(8359955),
    'video',
    'person talking to camera recording video presentation interview lighting setup',
  ),
  realImage(
    'servicios/otros/video/video-mensaje',
    pexelsImage(13092014),
    'video',
    'direct to camera video message with microphone camera and compact lighting',
  ),
  realImage(
    'servicios/otros/video/video-reel-basico',
    pexelsImage(12125701),
    'video',
    'vertical reel production with phone ring light and creator in action',
  ),
  realImage(
    'servicios/otros/contenido/contenido-plan-mensual',
    pexelsImage(7669546),
    'video',
    'social media video production setup creator recording reels vertical content day',
  ),
  realImage(
    'servicios/otros/contenido/contenido-express',
    pexelsImage(13709176),
    'video',
    'fast content capture for social media with smartphone and light in action',
  ),
  realImage(
    'servicios/otros/contenido/contenido-reel-profesional',
    pexelsImage(13709182),
    'video',
    'professional short form reel production with camera movement and vertical framing',
  ),
  realImage(
    'servicios/otros/contenido/contenido-pack',
    pexelsImage(10396745),
    'video',
    'multi piece content session with production setup lights and camera workflow',
  ),
  realImage(
    'servicios/otros/produccion/prod-direccion-creativa',
    pexelsImage(7172701),
    'production',
    'film set behind the scenes crew cinema camera cinematography lighting filming',
  ),
  realImage(
    'servicios/otros/produccion/prod-guion-storytelling',
    pexelsImage(27559553),
    'production',
    'audiovisual preproduction with storyboard references and storytelling planning',
  ),
  realImage(
    'servicios/otros/produccion/prod-video-referencia',
    pexelsImage(17313422),
    'production',
    'video reference planning with screen references camera and production prep',
  ),
  realImage(
    'servicios/otros/produccion/prod-cinematografica',
    pexelsImage(27254851),
    'production',
    'cinematography crew filming on set with professional camera and lights',
  ),
  realImage(
    'servicios/otros/produccion/prod-video-promocional',
    pexelsImage(11234293),
    'production',
    'commercial video production with active filming camera lighting and direction',
  ),
  realImage(
    'servicios/otros/produccion/prod-entrevista-testimonio',
    pexelsImage(10159389),
    'video',
    'interview recording camera guest testimonial real production conversation',
  ),
  realImage(
    'servicios/otros/produccion/prod-podcast-basico',
    pexelsImage(32007691),
    'production',
    'podcast recording studio microphone headphones audio setup realistic production',
  ),
  realImage(
    'servicios/otros/estudio/estudio-sesion-foto',
    pexelsImage(15760815),
    'photo',
    'photo studio session with lighting modifiers and photographer in action',
  ),
  realImage(
    'servicios/otros/estudio/estudio-video',
    pexelsImage(31726658),
    'production',
    'video studio black background lighting setup tripod backdrop professional set',
  ),
  realImage(
    'servicios/otros/momentos/momentos-pareja',
    pexelsImage(16668561),
    'photo',
    'couple photoshoot natural photographer working capturing real moment outdoor',
  ),
  realImage(
    'servicios/otros/momentos/momentos-cumpleanos',
    pexelsImage(25489310),
    'photo',
    'birthday photoshoot real celebration photographer capturing moment',
  ),
  realImage(
    'servicios/otros/momentos/momentos-sorpresa',
    pexelsImage(19960164),
    'photo',
    'surprise session with photographer capturing authentic emotional moment',
  ),
];

const imageByPath = new Map<string, PackageRealImage>(
  PACKAGE_REAL_IMAGES.map((entry) => [normalizePath(entry.path), entry]),
);

const imageByUrl = new Map<string, PackageRealImage>(
  PACKAGE_REAL_IMAGES.map((entry) => [normalizeUrl(entry.imageUrl), entry]),
);

const keywordGroups = [
  [
    'video',
    'filming',
    'grabacion',
    'recording',
    'camera',
    'camara',
    'interview',
    'entrevista',
  ],
  [
    'production',
    'crew',
    'set',
    'lighting',
    'studio',
    'backstage',
    'rodaje',
    'cinematography',
  ],
  ['photo', 'photographer', 'portrait', 'photoshoot', 'retrato', 'sesion'],
  [
    'social',
    'redes',
    'reel',
    'vertical',
    'phone',
    'celular',
    'ring',
    'creator',
    'content',
  ],
  ['event', 'evento', 'crowd', 'audience', 'conference', 'stage', 'publico'],
  ['podcast', 'microphone', 'mic', 'headphones', 'audio'],
  [
    'couple',
    'pareja',
    'birthday',
    'cumpleanos',
    'surprise',
    'sorpresa',
    'moment',
  ],
];

export function getRealImageDefinition(
  path: string | null | undefined,
): PackageRealImage | null {
  const normalized = normalizePath(path);
  return normalized ? (imageByPath.get(normalized) ?? null) : null;
}

export function getRealImageUrlByPath(
  path: string | null | undefined,
): string | null {
  return getRealImageDefinition(path)?.imageUrl ?? null;
}

export function validateImageIntent(
  imageUrl: string | null | undefined,
  intent: string | null | undefined,
): boolean {
  const normalizedUrl = normalizeUrl(imageUrl);
  const normalizedIntent = normalizeText(intent);
  if (!normalizedUrl || !normalizedIntent) {
    return false;
  }

  const metadata = imageByUrl.get(normalizedUrl);
  if (!metadata) {
    return false;
  }

  const sourceIntent = normalizeText(metadata.intent);
  const exactTokenMatch = getTokens(normalizedIntent).some((token) =>
    getTokens(sourceIntent).includes(token),
  );

  if (exactTokenMatch) {
    return true;
  }

  return keywordGroups.some((group) => {
    const targetHasGroup = group.some(
      (keyword) =>
        normalizedIntent.includes(keyword) || sourceIntent.includes(keyword),
    );
    if (!targetHasGroup) {
      return false;
    }

    return group.some(
      (keyword) =>
        normalizedIntent.includes(keyword) && sourceIntent.includes(keyword),
    );
  });
}

function getTokens(value: string): string[] {
  return normalizeText(value)
    .split(/\s+/)
    .filter((token) => token.length >= 4);
}

function normalizePath(path: string | null | undefined): string {
  return String(path ?? '')
    .trim()
    .toLowerCase()
    .replace(/\\+/g, '/')
    .replace(/\/{2,}/g, '/')
    .replace(/^\/+|\/+$/g, '');
}

function normalizeUrl(url: string | null | undefined): string {
  return String(url ?? '')
    .trim()
    .toLowerCase();
}

function normalizeText(value: string | null | undefined): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
