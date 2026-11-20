import type { PortfolioPackageCategory } from './portfolio.data';

/**
 * Stable short codes for sharing a package: https://tecnojack.co/p/<code>
 *
 * Rules (links are already in clients' chats, so they must never change meaning):
 * - Append-only. Never renumber, reuse or delete a code. If a package is retired, point its code to the
 *   closest replacement package instead of removing it.
 * - New package → next free number of its category prefix:
 *   b = bodas, q = quinces, g = grados, p = preboda, s = sesiones, c = corporativos, v = videos.
 * - The spec `package-short-codes.spec.ts` fails if a package has no code or a code points nowhere.
 */
export const PACKAGE_SHORT_CODES = {
	// bodas
	b1: 'bodas/full-experience-hibrido',
	b2: 'bodas/full-experience-solo-fotos',
	b3: 'bodas/esencial-hibrido-foto-video',
	b4: 'bodas/sencilla-solo-fotos',
	b5: 'bodas/video-bodas-elemental',
	b6: 'bodas/civil-esencial',
	b7: 'bodas/peticion-esencial',
	b8: 'bodas/postboda-esencial',
	b9: 'bodas/completo-hibrido-foto-video',
	b10: 'bodas/completa-solo-fotos',
	b11: 'bodas/video-bodas-completo',
	b12: 'bodas/civil-completa',
	b13: 'bodas/peticion-completa',
	b14: 'bodas/postboda-completa',
	b15: 'bodas/premium-cinematico-foto-video',
	b16: 'bodas/premium-solo-fotos',
	b17: 'bodas/video-bodas-premium',
	b18: 'bodas/civil-hibrida',
	b19: 'bodas/peticion-hibrida',
	b20: 'bodas/postboda-premium',
	b21: 'bodas/luxury-cinematico-foto-video',
	b22: 'bodas/luxury-solo-fotos',
	b23: 'bodas/video-bodas-luxury',
	// quinces
	q1: 'quinces/quince-esencial-recuerdos',
	q2: 'quinces/quince-mixta-esencial-foto-video',
	q3: 'quinces/quince-video-esencial',
	q4: 'quinces/quince-completa-historia',
	q5: 'quinces/quince-mixta-completa-experiencia',
	q6: 'quinces/quince-video-completa',
	q7: 'quinces/quince-premium-experiencia-fotografica',
	q8: 'quinces/quince-mixta-premium-produccion-completa',
	q9: 'quinces/quince-video-premium-cinematica',
	q10: 'quinces/quince-luxury-experiencia-exclusiva',
	q11: 'quinces/quince-mixta-luxury-experiencia-exclusiva',
	// grados
	g1: 'grados/plan-esencial',
	g2: 'grados/plan-marco',
	g3: 'grados/plan-memoria',
	g4: 'grados/plan-legado',
	// preboda
	p1: 'preboda/preboda-esencial',
	p2: 'preboda/preboda-completa',
	p3: 'preboda/preboda-editorial',
	p4: 'preboda/preboda-premium',
	// sesiones
	s1: 'sesiones/sesion-individual-digital',
	s2: 'sesiones/sesion-familiar-digital',
	s3: 'sesiones/sesion-revelacion-genero',
	s4: 'sesiones/sesion-individual-cuadro',
	s5: 'sesiones/sesion-familiar-cuadro',
	s6: 'sesiones/sesion-conciertos',
	s7: 'sesiones/sesion-individual-fotobook',
	s8: 'sesiones/sesion-familiar-fotobook',
	s9: 'sesiones/sesion-recital-grado',
	s10: 'sesiones/sesion-individual-coleccion',
	s11: 'sesiones/sesion-familiar-coleccion',
	s12: 'sesiones/sesion-individual-estudio',
	s13: 'sesiones/sesion-familiar-estudio',
	// corporativos
	c1: 'corporativos/corporativos-video-institucional-esencial',
	c2: 'corporativos/corporativos-redes-start',
	c3: 'corporativos/corporativos-eventos-esencial',
	c4: 'corporativos/corporativos-marca-personal-esencial',
	c5: 'corporativos/corporativos-video-institucional-completo',
	c6: 'corporativos/corporativos-redes-creator',
	c7: 'corporativos/corporativos-eventos-completo',
	c8: 'corporativos/corporativos-marca-personal-completo',
	c9: 'corporativos/corporativos-video-institucional-premium',
	c10: 'corporativos/corporativos-redes-pro-content',
	c11: 'corporativos/corporativos-eventos-premium',
	c12: 'corporativos/corporativos-marca-personal-premium',
	// videos
	v1: 'videos/video-esencial',
	v2: 'videos/video-pro',
	v3: 'videos/video-cinematico',
	v4: 'videos/video-personalizado',
	v5: 'videos/video-cortometraje',
} as const satisfies Record<string, `${PortfolioPackageCategory}/${string}`>;

export type PackageShortCode = keyof typeof PACKAGE_SHORT_CODES;

const CODE_BY_PACKAGE = new Map<string, string>(
	Object.entries(PACKAGE_SHORT_CODES).map(([code, path]) => [path, code]),
);

/** `/portfolio/bodas/esencial-hibrido-foto-video` target for a short code (case-insensitive), or null. */
export function resolvePackageShortCode(code: string | null | undefined): { category: PortfolioPackageCategory; slug: string } | null {
	const path = (PACKAGE_SHORT_CODES as Record<string, string>)[String(code ?? '').trim().toLowerCase()];
	if (!path) return null;
	const [category, slug] = path.split('/') as [PortfolioPackageCategory, string];
	return { category, slug };
}

/** Short code for a package, or null when it has none yet. */
export function packageShortCode(category: string, slug: string): string | null {
	return CODE_BY_PACKAGE.get(`${category}/${slug}`) ?? null;
}
