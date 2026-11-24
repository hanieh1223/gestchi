export function formatCurrency(value) {
  return `${Number(value || 0).toLocaleString("fa-IR")} تومان`;
}

export function formatNumber(value) {
  return Number(value || 0).toLocaleString("fa-IR");
}
