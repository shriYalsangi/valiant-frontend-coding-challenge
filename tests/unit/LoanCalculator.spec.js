import { shallowMount } from '@vue/test-utils'
import LoanCalculator from '@/components/LoanCalculator.vue'
import LoanForm from '@/components/LoanForm.vue'
import LoanResults from '@/components/LoanResults.vue'

describe('LoanCalculator', () => {
  it('should calculate repayments correctly', () => {
    const wrapper = shallowMount(LoanCalculator, {
      global: {
        components: { LoanForm, LoanResults },
      },
    })

    wrapper.vm.loanData.selectedLoanPurposeAnnualRate = 0.1
    wrapper.vm.loanData.selectedLoanRepaymentPeriod = 12
    wrapper.vm.loanData.selectedLoanTermMonth = 24
    wrapper.vm.loanData.loanAmount = 30000

    wrapper.vm.$emit('submitLoanData')

    expect(wrapper.emitted('submitLoanData')).toHaveLength(1)
    expect(wrapper.vm.repayments).toBe(-1384)
    expect(wrapper.vm.totalRepayments).toBe(-33216)
  })
})
