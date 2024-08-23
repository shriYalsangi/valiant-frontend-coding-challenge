<script setup>
import { formatCurrency } from '@/utils/numberUtils'

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
