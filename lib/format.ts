export function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: value > 0 && value < 10 ? Math.min(digits, 1) : 0
  }).format(value);
}

export function formatCurrency(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "Not entered";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}
