import { mount } from '@vue/test-utils'
import LoanForm from '@/components/LoanForm.vue'

vi.mock('@/utils/fetchData', () => ({
  fetchData: vi.fn()
    .mockResolvedValueOnce([{ label: 'Day-to-day capital', annualRate: 0.1 }]) // For loanPurposes
    .mockResolvedValueOnce([{ label: 'Monthly', value: 12 }]) // For loanRepaymentPeriods
    .mockResolvedValueOnce([{ label: '12 months', value: 360 }]), // For loanTermMonths
}))

describe('LoanForm', () => {
  it('should display the form', () => {
    const wrapper = mount(LoanForm)
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('should validate loan amount input', () => {
    const wrapper = mount(LoanForm)

    // Empty string (sets loan amount to 0)
    wrapper.vm.loanAmount = ''
    wrapper.vm.handleInputChange({ target: { value: '' } })
    expect(wrapper.vm.loanAmount).toBe('0')
    expect(wrapper.vm.loanAmountError).toBe('Loan amount must be at least $1000.')

    // Exceeds maximum limit
    wrapper.vm.loanAmount = 20000001
    wrapper.vm.handleInputChange({ target: { value: '20000001' } })
    expect(wrapper.vm.loanAmountError).toBe('Loan amount cannot exceed $20,000,000.')

    // Valid input
    wrapper.vm.loanAmount = 100000
    wrapper.vm.handleInputChange({ target: { value: '100000' } })
    expect(wrapper.vm.loanAmountError).toBe(null)
  })

  it('should format loan amount input with commas', async () => {
    const wrapper = mount(LoanForm)

    const input = wrapper.find('input[id="loanAmount"]')
    await input.setValue('123456')

    expect(wrapper.vm.loanAmount).toBe('123,456')
    expect(input.element.value).toBe('123,456')
  })

  it('should emit submitLoanData on initial values and changes', async () => {
    const wrapper = mount(LoanForm)

    await wrapper.vm.$nextTick()
    // Allow time for async operations to complete, which is wierd because the nextTick should ideally take care of it
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(wrapper.emitted('submitLoanData')).toBeTruthy()
    expect(wrapper.emitted('submitLoanData')).toHaveLength(1)

    wrapper.vm.loanAmount = '120000'
    wrapper.vm.selectedLoanPurpose = { annualRate: 6 }
    wrapper.vm.selectedLoanRepaymentPeriod = 24
    wrapper.vm.selectedLoanTermMonth = 480

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('submitLoanData')).toHaveLength(2)
  })
})
