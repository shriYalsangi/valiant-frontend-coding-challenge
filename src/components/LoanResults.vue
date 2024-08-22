<script setup>
defineProps({
  repayments: {
    type: Number,
    required: true,
  },
  totalRepayments: {
    type: Number,
    required: true,
  },
  repaymentPeriodLabel: {
    type: String,
    required: true,
  },
})

const formatCurrency = (value) => {
  return value.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}
</script>

<template>
  <div class="mt-6 rounded-lg border border-gray-300 bg-gray-50 p-4 text-center shadow-md">
    <p
      class="text-lg font-semibold text-lime-600"
      data-test="repayments"
    >
      {{ formatCurrency(repayments) }} {{ repaymentPeriodLabel }} repayments
    </p>
    <p
      class="mt-2 text-lg font-semibold text-stone-500"
      data-test="totalRepayments"
    >
      {{ formatCurrency(totalRepayments) }} Total repayments
    </p>
  </div>
</template>
