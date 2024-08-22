export function formatNumberWithCommas (value) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
