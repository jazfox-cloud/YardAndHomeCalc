import { toNonNegative } from "@/lib/calculators/validation";

export type PaintInput = {
  roomLengthFeet: number;
  roomWidthFeet: number;
  wallHeightFeet: number;
  doors: number;
  windows: number;
  coats: number;
  coveragePerGallon: number;
  wastePercent: number;
  pricePerGallon: number;
};

export function calculatePaint(input: PaintInput) {
  const roomLengthFeet = toNonNegative(input.roomLengthFeet);
  const roomWidthFeet = toNonNegative(input.roomWidthFeet);
  const wallHeightFeet = toNonNegative(input.wallHeightFeet);
  const doors = toNonNegative(input.doors);
  const windows = toNonNegative(input.windows);
  const coats = toNonNegative(input.coats);
  const coveragePerGallon = toNonNegative(input.coveragePerGallon);
  const wastePercent = toNonNegative(input.wastePercent);
  const pricePerGallon = toNonNegative(input.pricePerGallon);
  const perimeter = 2 * (roomLengthFeet + roomWidthFeet);
  const wallArea = perimeter * wallHeightFeet;
  const openingArea = doors * 21 + windows * 15;
  const paintableArea = Math.max(wallArea - openingArea, 0);
  const gallons =
    coveragePerGallon > 0
      ? (paintableArea * coats * (1 + wastePercent / 100)) / coveragePerGallon
      : 0;
  const estimatedCost = pricePerGallon > 0 ? gallons * pricePerGallon : 0;

  return {
    wallArea,
    paintableArea,
    gallons,
    estimatedCost
  };
}
