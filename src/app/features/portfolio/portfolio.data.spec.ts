import {
  getPortfolioPackageDetail,
  getPortfolioPackageDetailsByCategory,
  preweddingPlans,
  weddingCivilPlans,
  weddingPostweddingPlans,
  weddingProposalPlans,
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

  it('keeps two hours and a 50-photo scope or higher in every package', () => {
    for (const plan of preweddingPlans) {
      const allText = [...plan.items, ...plan.features, ...plan.deliverables].join(' ');
      const durationMatch = allText.match(/Duraci.n de (\d+) horas/i);
      const photoMatch = allText.match(/Hasta (\d+) fotograf.as finales, seleccionadas y editadas/i);

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

  it('links related experiences to their canonical package names and prices', () => {
    const hybrid = getPortfolioPackageDetail('bodas', 'esencial-hibrido-foto-video');
    const relatedOptions = hybrid?.requestOptionGroups.flatMap((group) =>
      group.options.filter((option) => option.linkedPackageSlug),
    );

    expect(relatedOptions?.length).toBe(13);

    for (const option of relatedOptions ?? []) {
      const linked = getPortfolioPackageDetail(
        option.linkedPackageCategory,
        option.linkedPackageSlug,
      );

      expect(linked).withContext(option.id).toBeDefined();
      expect(option.label).withContext(option.id).toBe(linked?.title ?? '');
      expect(option.priceAmountCop).withContext(option.id).toBe(
        linked?.baseQuoteOptions[0]?.amountCop,
      );
    }
  });
});

describe('civil wedding package catalog', () => {
  it('uses the approved order, prices, durations and photo scopes', () => {
    expect(weddingCivilPlans.map((plan) => plan.name)).toEqual([
      'Civil Esencial',
      'Civil Completa',
      'Civil Híbrida',
    ]);
    expect(weddingCivilPlans.map((plan) => plan.amountCop)).toEqual([
      550000,
      850000,
      1350000,
    ]);
    expect(weddingCivilPlans.map((plan) => plan.features[1])).toEqual([
      'Duración de 2 horas',
      'Duración de 3 horas',
      'Duración de 4 horas',
    ]);
    expect(weddingCivilPlans.map((plan) => plan.deliverables[0])).toEqual([
      'Hasta 50 fotografías finales, seleccionadas y editadas',
      'Hasta 100 fotografías finales, seleccionadas y editadas',
      'Hasta 120 fotografías finales, seleccionadas y editadas',
    ]);
  });

  it('publishes all civil packages in bodas and keeps the hybrid crew explicit', () => {
    const civilPackages = getPortfolioPackageDetailsByCategory('bodas').filter(
      (plan) => plan.packageTypeLabel === 'Boda civil',
    );

    expect(civilPackages.length).toBe(3);
    expect(weddingCivilPlans[2]?.features).toContain('1 fotógrafo y 1 videógrafo');
  });
});

describe('marriage proposal package catalog', () => {
  it('uses three scaled packages with coherent prices and deliverables', () => {
    expect(weddingProposalPlans.map((plan) => plan.name)).toEqual([
      'Petición Esencial',
      'Petición Completa',
      'Petición Híbrida',
    ]);
    expect(weddingProposalPlans.map((plan) => plan.amountCop)).toEqual([
      450000,
      750000,
      1150000,
    ]);
    expect(weddingProposalPlans.map((plan) => plan.deliverables[0])).toEqual([
      'Hasta 50 fotografías finales, seleccionadas y editadas',
      'Hasta 80 fotografías finales, seleccionadas y editadas',
      'Hasta 100 fotografías finales, seleccionadas y editadas',
    ]);
  });

  it('keeps planning in every tier and the production team explicit at the top', () => {
    for (const plan of weddingProposalPlans) {
      expect(plan.features.join(' ')).withContext(plan.name).toMatch(/planeación/i);
    }

    expect(weddingProposalPlans[2]?.features).toContain(
      '1 fotógrafo, 1 videógrafo y 1 asistente',
    );
    expect(
      getPortfolioPackageDetailsByCategory('bodas').filter(
        (plan) => plan.packageTypeLabel === 'Petición de mano',
      ).length,
    ).toBe(3);
  });
});

describe('postwedding package catalog', () => {
  it('uses the approved direct names and increasing photo scopes', () => {
    expect(weddingPostweddingPlans.map((plan) => plan.name)).toEqual([
      'Postboda Esencial',
      'Postboda Completa',
      'Postboda Editorial',
    ]);
    expect(weddingPostweddingPlans.map((plan) => plan.deliverables[0])).toEqual([
      'Hasta 50 fotografías finales, seleccionadas y editadas',
      'Hasta 80 fotografías finales, seleccionadas y editadas',
      'Hasta 120 fotografías finales, seleccionadas y editadas',
    ]);
  });

  it('includes an assistant in the top postwedding package', () => {
    expect(weddingPostweddingPlans[2]?.features).toContain('1 fotógrafo y 1 asistente');
  });
});
