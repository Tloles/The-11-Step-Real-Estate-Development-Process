/**
 * Format a number as USD currency
 */
export function formatCurrency(value, decimals = 0) {
  if (value == null || isNaN(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Format a number as compact currency ($1.2M, $23M, etc.)
 */
export function formatCurrencyCompact(value) {
  if (value == null || isNaN(value)) return '—'
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(1)}B`
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}K`
  return `${sign}$${abs.toFixed(0)}`
}

/**
 * Format as percentage
 */
export function formatPercent(value, decimals = 2) {
  if (value == null || isNaN(value)) return '—'
  return `${value.toFixed(decimals)}%`
}

/**
 * Format basis points
 */
export function formatBP(value) {
  if (value == null || isNaN(value)) return '—'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${Math.round(value)} BP`
}

/**
 * Format a large number with commas
 */
export function formatNumber(value, decimals = 0) {
  if (value == null || isNaN(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
