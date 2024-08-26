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

const areAllLoanDataFieldsFilled = () => {
  return (
    loanData.value.selectedLoanPurposeAnnualRate !== 0 &&
    loanData.value.selectedLoanRepaymentPeriod !== 1 &&
    loanData.value.selectedLoanTermMonth !== 0 &&
    loanData.value.loanAmount !== 0
  )
}

const nper = computed(() => {
  if (!areAllLoanDataFieldsFilled()) {
    return null
  }
  // Round off the nper value
  return Math.round(loanData.value.selectedLoanTermMonth * (loanData.value.selectedLoanRepaymentPeriod / 12))
})

const repayments = computed(() => {
  if (!nper.value) {
    return null
  }

  let rate = loanData.value.selectedLoanPurposeAnnualRate / loanData.value.selectedLoanRepaymentPeriod
  rate = parseFloat(rate.toFixed(6))
  const pv = loanData.value.loanAmount

  const result = PMT(rate, nper.value, pv)
  return Math.round((result * 100) / 100)
})

const totalRepayments = computed(() => {
  if (!repayments.value || !nper.value) return null
  return Math.round(repayments.value) * nper.value
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
