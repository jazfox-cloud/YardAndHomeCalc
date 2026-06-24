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
  const perimeter = 2 * (input.roomLengthFeet + input.roomWidthFeet);
  const wallArea = perimeter * input.wallHeightFeet;
  const openingArea = input.doors * 21 + input.windows * 15;
  const paintableArea = Math.max(wallArea - openingArea, 0);
  const gallons =
    input.coveragePerGallon > 0
      ? (paintableArea * input.coats * (1 + input.wastePercent / 100)) / input.coveragePerGallon
      : 0;
  const estimatedCost = input.pricePerGallon > 0 ? gallons * input.pricePerGallon : 0;

  return {
    wallArea,
    paintableArea,
    gallons,
    estimatedCost
  };
}
