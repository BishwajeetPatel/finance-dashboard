export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

export function formatDate(isoDate) {
  if (!isoDate) return '—';
  const d = new Date(isoDate + (isoDate.length === 10 ? 'T12:00:00' : ''));
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

export function formatMonthYear(isoDate) {
  const d = new Date(isoDate + 'T12:00:00');
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(d);
}
