export const formatNumberWithCommas = (value) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatCurrency = (value) => {
  return value.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}
