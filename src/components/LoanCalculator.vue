<script setup>
import { ref, computed } from 'vue'
import LoanForm from './LoanForm.vue'
import LoanResults from './LoanResults.vue'
import PMT from '../utils/PMT'

const loanData = ref({
  selectedLoanPurposeAnnualRate: 0,
  selectedLoanRepaymentPeriod: 1,
  selectedLoanTermMonth: 0,
  loanAmount: 0,
  repaymentPeriodLabel: '',
})

const repayments = computed(() => {
  if (!loanData.value.selectedLoanPurposeAnnualRate ||
      !loanData.value.selectedLoanRepaymentPeriod ||
      !loanData.value.selectedLoanTermMonth ||
      !loanData.value.loanAmount) {
    return null
  }
  const rate = loanData.value.selectedLoanPurposeAnnualRate / loanData.value.selectedLoanRepaymentPeriod
  const nper = loanData.value.selectedLoanTermMonth
  const pv = loanData.value.loanAmount

  const result = PMT(rate, nper, pv)
  const roundedResult = Math.round((result * 100) / 100)

  return roundedResult
})

const totalRepayments = computed(() => {
  if (!repayments.value) return null
  const roundedResult = Math.round(repayments.value * loanData.value.selectedLoanTermMonth)
  return roundedResult
})

</script>

<template>
  <div class="mx-auto w-full max-w-2xl rounded-lg border border-green-500 bg-white p-6 shadow-lg">
    <h1 class="mb-8 text-center text-3xl font-bold">
      Loan Repayment Calculator
    </h1>
    <LoanForm @submit-loan-data="loanData = $event" />
    <LoanResults
      :repayments="Math.abs(repayments)"
      :total-repayments="Math.abs(totalRepayments)"
      :repayment-period-label="loanData.repaymentPeriodLabel"
    />
  </div>
</template>
