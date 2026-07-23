import { toNonNegative } from "@/lib/calculators/validation";

export type ConcreteInput = {
  lengthFeet: number;
  widthFeet: number;
  thicknessInches: number;
  wastePercent: number;
  pricePerCubicYard: number;
};

export function calculateConcrete(input: ConcreteInput) {
  const lengthFeet = toNonNegative(input.lengthFeet);
  const widthFeet = toNonNegative(input.widthFeet);
  const thicknessInches = toNonNegative(input.thicknessInches);
  const wastePercent = toNonNegative(input.wastePercent);
  const pricePerCubicYard = toNonNegative(input.pricePerCubicYard);
  const baseCubicFeet = lengthFeet * widthFeet * (thicknessInches / 12);
  const cubicFeet = baseCubicFeet * (1 + wastePercent / 100);
  const cubicYards = cubicFeet / 27;
  const estimatedCost = pricePerCubicYard > 0 ? cubicYards * pricePerCubicYard : 0;

  return {
    cubicFeet,
    cubicYards,
    bags40lb: cubicFeet / 0.3,
    bags60lb: cubicFeet / 0.45,
    bags80lb: cubicFeet / 0.6,
    estimatedCost
  };
}
