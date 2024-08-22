import { shallowMount } from '@vue/test-utils'
import LoanResults from '@/components/LoanResults.vue'

describe('LoanResults', () => {
  it('should render correctly with valid props', () => {
    const wrapper = shallowMount(LoanResults, {
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

  it('should not render if repayments prop is null', () => {
    const wrapper = shallowMount(LoanResults, {
      props: {
        repayments: null,
        totalRepayments: 12000,
        repaymentPeriodLabel: 'Monthly',
      },
    })

    expect(wrapper.html()).toBe('<!--v-if-->')
  })

  it('should format currency correctly', () => {
    const wrapper = shallowMount(LoanResults, {
      props: {
        repayments: 12345.67,
        totalRepayments: 87654.32,
        repaymentPeriodLabel: 'Monthly',
      },
    })

    expect(wrapper.text()).toContain('$12,346')
    expect(wrapper.text()).toContain('$87,654')
  })
})
