import { PACKAGE_SHORT_CODES, packageShortCode, resolvePackageShortCode } from './package-short-codes';
import { getPortfolioPackageDetail, portfolioPackageDetails } from './portfolio.data';

describe('package short codes', () => {
	it('gives every package a short share code', () => {
		const missing = portfolioPackageDetails
			.filter((detail) => !packageShortCode(detail.category, detail.slug))
			.map((detail) => `${detail.category}/${detail.slug}`);
		// New package? Add it to PACKAGE_SHORT_CODES with the next free number of its prefix.
		expect(missing).toEqual([]);
	});

	it('points every code at an existing package', () => {
		const broken = Object.entries(PACKAGE_SHORT_CODES)
			.filter(([code]) => {
				const target = resolvePackageShortCode(code);
				return !target || !getPortfolioPackageDetail(target.category, target.slug);
			})
			.map(([code]) => code);
		expect(broken).toEqual([]);
	});

	it('uses unique targets and the category prefix of each package', () => {
		const prefix: Record<string, string> = { bodas: 'b', quinces: 'q', grados: 'g', preboda: 'p', sesiones: 's', corporativos: 'c', videos: 'v' };
		const targets = Object.values(PACKAGE_SHORT_CODES);
		expect(new Set(targets).size).toBe(targets.length);
		for (const [code, path] of Object.entries(PACKAGE_SHORT_CODES)) {
			expect(code.startsWith(prefix[path.split('/')[0]])).withContext(code).toBeTrue();
		}
	});

	it('resolves codes case-insensitively and rejects unknown ones', () => {
		expect(resolvePackageShortCode('B3')).toEqual(resolvePackageShortCode('b3'));
		expect(resolvePackageShortCode('zz99')).toBeNull();
		expect(resolvePackageShortCode(null)).toBeNull();
	});
});
