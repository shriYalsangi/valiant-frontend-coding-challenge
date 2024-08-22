<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { fetchData } from '@/utils/fetchData'

// State management
const loanPurposes = ref([])
const loanAmount = ref('')
const loanRepaymentPeriods = ref([])
const loanTermMonths = ref([])
const hasSubmitted = ref(false)
const loanAmountError = ref(null)

const selectedLoanPurpose = ref(null)
const selectedLoanRepaymentPeriod = ref(null)
const selectedLoanTermMonth = ref(null)

// Fetch data on component mount
onMounted(() => {
  fetchData('http://localhost:5000/loan-purposes', loanPurposes, selectedLoanPurpose, 'annualRate')
  fetchData('http://localhost:5000/requested-repayment-periods', loanRepaymentPeriods, selectedLoanRepaymentPeriod, 'value')
  fetchData('http://localhost:5000/requested-term-months', loanTermMonths, selectedLoanTermMonth, 'value')
})

// Validation logic
const validateOnSubmit = () => {
  if (loanAmount.value === '') {
    loanAmountError.value = 'Please enter a loan amount.'
    return
  }
  loanAmountError.value = null
}

const validateOnChange = () => {
  const amount = parseInt(loanAmount.value)

  if (isNaN(amount)) {
    loanAmountError.value = 'Invalid loan amount. Only numbers are allowed.'
  } else if (amount < 1000) {
    loanAmountError.value = 'Loan amount must be at least $1000.'
  } else if (amount > 20000000) {
    loanAmountError.value = 'Loan amount cannot exceed $20,000,000.'
  } else {
    loanAmountError.value = null
  }
}

// Watch for input changes
watch(loanAmount, () => {
  validateOnChange()
})

const emit = defineEmits(['submitLoanData'])

const repaymentPeriodLabel = computed(() => {
  const selectedPeriod = loanRepaymentPeriods.value.find(
    period => period.value === selectedLoanRepaymentPeriod.value
  )
  return selectedPeriod ? selectedPeriod.label : ''
})

const handleSubmit = () => {
  hasSubmitted.value = true
  validateOnSubmit()

  if (!loanAmountError.value) {
    emit('submitLoanData', {
      loanAmount: loanAmount.value,
      selectedLoanPurposeAnnualRate: selectedLoanPurpose.value,
      selectedLoanRepaymentPeriod: selectedLoanRepaymentPeriod.value,
      selectedLoanTermMonth: selectedLoanTermMonth.value,
      repaymentPeriodLabel: repaymentPeriodLabel.value,
    })
  }
}

const handleReset = () => {
  const resetValue = (arr, key) => arr.length > 0 ? arr[0][key] : null
  loanAmount.value = ''
  selectedLoanPurpose.value = resetValue(loanPurposes.value, 'annualRate')
  selectedLoanRepaymentPeriod.value = resetValue(loanRepaymentPeriods.value, 'value')
  selectedLoanTermMonth.value = resetValue(loanTermMonths.value, 'value')
  hasSubmitted.value = false
}

</script>

<template>
  <form
    class="mx-auto grid max-w-lg grid-cols-1 gap-4 space-y-4 rounded-lg bg-white p-4 shadow-md sm:grid-cols-2"
    @submit.prevent="handleSubmit"
  >
    <div class="col-span-2 flex items-center space-x-2">
      <span class="whitespace-nowrap">I need</span>
      <div class="relative grow">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
        <input
          id="loanAmount"
          v-model="loanAmount"
          name="loanAmount"
          type="text"
          class="block w-full rounded border border-gray-300 bg-gray-100 py-2 pl-7 pr-4 text-sm leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
          placeholder="Enter an amount between 1,000 and 20,000,000"
          :class="{ 'border-red-500 focus:border-red-500': loanAmountError }"
          aria-label="Loan Amount"
        >
        <p
          v-if="loanAmountError"
          class="absolute top-full mt-1 text-xs text-red-500"
          data-test="error-message"
          role="alert"
          aria-live="assertive"
        >
          <span class="font-medium">{{ loanAmountError }}</span>
        </p>
      </div>
      <span>for</span>
      <select
        id="loanPurpose"
        v-model="selectedLoanPurpose"
        name="loanPurpose"
        class="grow rounded border border-gray-300 bg-gray-100 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        aria-label="Loan Purpose"
      >
        <option
          v-for="purpose in loanPurposes"
          :key="purpose.value"
          :value="purpose.annualRate"
        >
          {{ purpose.label }}
        </option>
      </select>
    </div>

    <div class="col-span-1 flex items-center space-x-2">
      <span>repaid</span>
      <select
        id="loanRepaymentPeriod"
        v-model="selectedLoanRepaymentPeriod"
        name="loanRepaymentPeriod"
        class="grow rounded border border-gray-300 bg-gray-100 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        aria-label="Loan Repayment Period"
      >
        <option
          v-for="period in loanRepaymentPeriods"
          :key="period.value"
          :value="period.value"
        >
          {{ period.label }}
        </option>
      </select>
    </div>

    <div class="col-span-1 flex items-center space-x-2">
      <span>over</span>
      <select
        id="loanTermMonth"
        v-model="selectedLoanTermMonth"
        name="loanTermMonth"
        class="grow rounded border border-gray-300 bg-gray-100 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        aria-label="Loan Term Month"
      >
        <option
          v-for="term in loanTermMonths"
          :key="term.value"
          :value="term.value"
        >
          {{ term.label }}
        </option>
      </select>
    </div>

    <div class="col-span-2 flex space-x-2">
      <button
        type="button"
        class="grow rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        @click="handleReset"
      >
        Reset Form
      </button>
      <button
        type="submit"
        class="grow rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Calculate Repayment
      </button>
    </div>
  </form>
</template>
