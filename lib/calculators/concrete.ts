export type ConcreteInput = {
  lengthFeet: number;
  widthFeet: number;
  thicknessInches: number;
  wastePercent: number;
  pricePerCubicYard: number;
};

export function calculateConcrete(input: ConcreteInput) {
  const baseCubicFeet = input.lengthFeet * input.widthFeet * (input.thicknessInches / 12);
  const cubicFeet = baseCubicFeet * (1 + input.wastePercent / 100);
  const cubicYards = cubicFeet / 27;
  const estimatedCost = input.pricePerCubicYard > 0 ? cubicYards * input.pricePerCubicYard : 0;

  return {
    cubicFeet,
    cubicYards,
    bags40lb: cubicFeet / 0.3,
    bags60lb: cubicFeet / 0.45,
    bags80lb: cubicFeet / 0.6,
    estimatedCost
  };
}
