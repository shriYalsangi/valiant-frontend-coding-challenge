<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { fetchData } from '@/utils/fetchData'
import { formatNumberWithCommas } from '@/utils/numberUtils'
import { apiUrls } from '@/config'

// State management
const loanPurposes = ref([])
const loanAmount = ref('30,000')
const loanRepaymentPeriods = ref([])
const loanTermMonths = ref([])
const loanAmountError = ref(null)

const selectedLoanPurpose = ref(null)
const selectedLoanRepaymentPeriod = ref(null)
const selectedLoanTermMonth = ref(null)

const emit = defineEmits(['submitLoanData'])

// Fetch data on component mount
onMounted(async () => {
  await Promise.all([
    fetchData(apiUrls.loanPurposes, loanPurposes, selectedLoanPurpose, 'annualRate'),
    fetchData(apiUrls.loanRepaymentPeriods, loanRepaymentPeriods, selectedLoanRepaymentPeriod, 'value'),
    fetchData(apiUrls.loanTermMonths, loanTermMonths, selectedLoanTermMonth, 'value'),
  ])

  // Emit the data after the initial data has been fetched and set
  emitLoanData()
})

const repaymentPeriodLabel = computed(() => {
  const selectedPeriod = loanRepaymentPeriods.value.find(
    period => period.value === selectedLoanRepaymentPeriod.value
  )
  return selectedPeriod ? selectedPeriod.label : ''
})

// Emit loan data to parent component
const emitLoanData = () => {
  const amount = parseInt(loanAmount.value.replace(/,/g, ''), 10)
  emit('submitLoanData', {
    loanAmount: amount,
    selectedLoanPurposeAnnualRate: selectedLoanPurpose.value,
    selectedLoanRepaymentPeriod: selectedLoanRepaymentPeriod.value,
    selectedLoanTermMonth: selectedLoanTermMonth.value,
    repaymentPeriodLabel: repaymentPeriodLabel.value,
  })
}

// Real-time validation and calculation logic
const validateLoanAmount = () => {
  const amount = parseInt(loanAmount.value.replace(/,/g, ''), 10)

  if (amount < 1000) {
    loanAmountError.value = 'Loan amount must be at least $1000.'
  } else if (amount > 20000000) {
    loanAmountError.value = 'Loan amount cannot exceed $20,000,000.'
  } else {
    loanAmountError.value = null
  }

  if (!loanAmountError.value) {
    emitLoanData()
  }
}

// Handle input event to format the value
const handleInputChange = (event) => {
  let value = event.target.value.replace(/[^\d]/g, '') // Remove all non-digit characters
  value = value === '' ? '0' : formatNumberWithCommas(value)
  loanAmount.value = value
  validateLoanAmount()
}

// Watch for changes and validate in real-time
watch([loanAmount, selectedLoanPurpose, selectedLoanRepaymentPeriod, selectedLoanTermMonth], validateLoanAmount)

</script>

<template>
  <form
    :class="[loanFormClasses]"
    @submit.prevent
  >
    <div class="col-span-1 flex flex-col items-start space-y-2 sm:col-span-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
      <label
        for="loanAmount"
        class="whitespace-nowrap"
      >I need</label>
      <div class="relative w-full sm:grow">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
        <input
          id="loanAmount"
          v-model="loanAmount"
          name="loanAmount"
          type="text"
          class="block w-full rounded border border-gray-300 bg-gray-100 py-2 pl-7 pr-4 text-lg font-semibold leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
          placeholder="Enter an amount between 1,000 and 20,000,000"
          :class="{ 'border-red-500 focus:border-red-500': loanAmountError }"
          aria-label="Loan Amount"
          @input="handleInputChange"
        >
      </div>
      <label for="loanPurpose">for</label>
      <select
        id="loanPurpose"
        v-model="selectedLoanPurpose"
        name="loanPurpose"
        class="w-full grow rounded border border-gray-300 bg-gray-100 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
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

    <div class="col-span-1 flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
      <label for="loanRepaymentPeriod">repaid</label>
      <select
        id="loanRepaymentPeriod"
        v-model="selectedLoanRepaymentPeriod"
        name="loanRepaymentPeriod"
        class="w-full grow rounded border border-gray-300 bg-gray-100 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
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

    <div class="col-span-1 flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
      <label for="loanTermMonth">over</label>
      <select
        id="loanTermMonth"
        v-model="selectedLoanTermMonth"
        name="loanTermMonth"
        class="w-full grow rounded border border-gray-300 bg-gray-100 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
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
  </form>
</template>
