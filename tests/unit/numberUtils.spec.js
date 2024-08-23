import { formatNumberWithCommas, formatCurrency } from '@/utils/numberUtils'

describe('formatNumberWithCommas', () => {
  it('should format numbers with commas correctly', () => {
    expect(formatNumberWithCommas('1000')).toBe('1,000')
    expect(formatNumberWithCommas('1000000')).toBe('1,000,000')
    expect(formatNumberWithCommas('123456789')).toBe('123,456,789')
    expect(formatNumberWithCommas('0')).toBe('0')
    expect(formatNumberWithCommas('123')).toBe('123')
  })
})

describe('formatCurrency', () => {
  it('should format numbers as currency in AUD correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000')
    expect(formatCurrency(1000000)).toBe('$1,000,000')
    expect(formatCurrency(123456789)).toBe('$123,456,789')
    expect(formatCurrency(0)).toBe('$0')
  })
})
