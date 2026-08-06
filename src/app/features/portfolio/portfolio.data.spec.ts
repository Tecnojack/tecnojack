import {
  getPortfolioPackageDetail,
  getPortfolioPackageDetailsByCategory,
  preweddingPlans,
} from './portfolio.data';

describe('prewedding package catalog', () => {
  it('exposes one consolidated family of four packages', () => {
    expect(preweddingPlans.map((plan) => plan.slug)).toEqual([
      'preboda-esencial',
      'preboda-completa',
      'preboda-editorial',
      'preboda-premium',
    ]);
    expect(getPortfolioPackageDetailsByCategory('preboda').length).toBe(4);
  });

  it('keeps at least two hours and 50 final edited photographs in every package', () => {
    for (const plan of preweddingPlans) {
      const allText = [...plan.items, ...plan.features, ...plan.deliverables].join(' ');
      const durationMatch = allText.match(/Duraci.n de (\d+) horas/i);
      const photoMatch = allText.match(/(\d+) fotograf.as finales, seleccionadas y editadas/i);

      expect(durationMatch).withContext(plan.name).not.toBeNull();
      expect(Number(durationMatch?.[1])).withContext(plan.name).toBeGreaterThanOrEqual(2);
      expect(photoMatch).withContext(plan.name).not.toBeNull();
      expect(Number(photoMatch?.[1])).withContext(plan.name).toBeGreaterThanOrEqual(50);
    }
  });

  it('resolves legacy package slugs to their canonical packages', () => {
    expect(getPortfolioPackageDetail('preboda', 'plan-sencilla')?.slug).toBe('preboda-esencial');
    expect(getPortfolioPackageDetail('preboda', 'plan-completa')?.slug).toBe('preboda-completa');
    expect(getPortfolioPackageDetail('preboda', 'plan-especial')?.slug).toBe('preboda-editorial');
    expect(getPortfolioPackageDetail('preboda', 'plan-premium')?.slug).toBe('preboda-premium');
  });
});
