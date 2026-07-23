import { toNonNegative } from "@/lib/calculators/validation";

export type MulchInput = {
  lengthFeet: number;
  widthFeet: number;
  depthInches: number;
  wastePercent: number;
  bagSizeCubicFeet: number;
  pricePerCubicYard: number;
};

export function calculateMulch(input: MulchInput) {
  const lengthFeet = toNonNegative(input.lengthFeet);
  const widthFeet = toNonNegative(input.widthFeet);
  const depthInches = toNonNegative(input.depthInches);
  const wastePercent = toNonNegative(input.wastePercent);
  const bagSizeCubicFeet = toNonNegative(input.bagSizeCubicFeet);
  const pricePerCubicYard = toNonNegative(input.pricePerCubicYard);
  const baseCubicFeet = lengthFeet * widthFeet * (depthInches / 12);
  const cubicFeet = baseCubicFeet * (1 + wastePercent / 100);
  const cubicYards = cubicFeet / 27;
  const bags = bagSizeCubicFeet > 0 ? cubicFeet / bagSizeCubicFeet : 0;
  const estimatedCost = pricePerCubicYard > 0 ? cubicYards * pricePerCubicYard : 0;

  return {
    cubicFeet,
    cubicYards,
    bags,
    estimatedCost
  };
}
