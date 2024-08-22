import { shallowMount } from '@vue/test-utils'
import LoanForm from '@/components/LoanForm.vue'

describe('LoanForm', () => {
  it('should display the form', () => {
    const wrapper = shallowMount(LoanForm)
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('should validate loan amount input', () => {
    const wrapper = shallowMount(LoanForm)

    wrapper.vm.loanAmount = 'invalid'

    wrapper.vm.validateOnChange()

    expect(wrapper.vm.loanAmountError).toBe('Invalid loan amount. Only numbers are allowed.')

    wrapper.vm.loanAmount = 100000

    wrapper.vm.validateOnChange()

    expect(wrapper.vm.loanAmountError).toBe(null)
  })

  it('should submit the form and emit submitLoanData event', () => {
    const wrapper = shallowMount(LoanForm)

    wrapper.vm.loanAmount = 100000
    wrapper.vm.selectedLoanPurpose = { annualRate: 5 }
    wrapper.vm.selectedLoanRepaymentPeriod = 12
    wrapper.vm.selectedLoanTermMonth = 360

    wrapper.vm.handleSubmit()

    expect(wrapper.emitted('submitLoanData')).toHaveLength(1)
    expect(wrapper.emitted('submitLoanData')[0][0]).toEqual({
      loanAmount: 100000,
      selectedLoanPurposeAnnualRate: { annualRate: 5 },
      selectedLoanRepaymentPeriod: 12,
      selectedLoanTermMonth: 360,
      repaymentPeriodLabel: '',
    })
  })
})
