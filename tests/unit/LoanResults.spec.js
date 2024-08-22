import { mount } from '@vue/test-utils'
import LoanResults from '@/components/LoanResults.vue'

describe('LoanResults', () => {
  it('should render correctly with valid props', () => {
    const wrapper = mount(LoanResults, {
      props: {
        repayments: 1000,
        totalRepayments: 12000,
        repaymentPeriodLabel: 'Monthly',
      },
    })

    expect(wrapper.text()).toContain('Monthly repayments')
    expect(wrapper.text()).toContain('Total repayments')
    expect(wrapper.text()).toContain('$1,000')
    expect(wrapper.text()).toContain('$12,000')
  })

  it('should format currency correctly', () => {
    const wrapper = mount(LoanResults, {
      props: {
        repayments: 12345,
        totalRepayments: 87654,
        repaymentPeriodLabel: 'Monthly',
      },
    })

    expect(wrapper.text()).toContain('$12,345 Monthly repayments $87,654 Total repayments')
  })
})
