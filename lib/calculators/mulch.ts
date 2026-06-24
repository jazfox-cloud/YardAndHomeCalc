export type MulchInput = {
  lengthFeet: number;
  widthFeet: number;
  depthInches: number;
  wastePercent: number;
  bagSizeCubicFeet: number;
  pricePerCubicYard: number;
};

export function calculateMulch(input: MulchInput) {
  const baseCubicFeet = input.lengthFeet * input.widthFeet * (input.depthInches / 12);
  const cubicFeet = baseCubicFeet * (1 + input.wastePercent / 100);
  const cubicYards = cubicFeet / 27;
  const bags = input.bagSizeCubicFeet > 0 ? cubicFeet / input.bagSizeCubicFeet : 0;
  const estimatedCost = input.pricePerCubicYard > 0 ? cubicYards * input.pricePerCubicYard : 0;

  return {
    cubicFeet,
    cubicYards,
    bags,
    estimatedCost
  };
}
