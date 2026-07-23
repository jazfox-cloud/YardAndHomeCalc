export function toNonNegative(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}
