export function formatToNaira(price) {
  const config = {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol'
  }
  return new Intl.NumberFormat('en-NG', config).format(price)
}