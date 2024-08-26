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
  <div class="mt-6 rounded-lg bg-gray-800 p-4 text-center text-zinc-200 opacity-90 shadow-md sm:p-6">
    <p
      class="text-lg font-semibold text-emerald-300"
      data-test="repayments"
    >
      <span class="text-3xl">{{ formatCurrency(repayments) }}</span> {{ repaymentPeriodLabel }} repayments
    </p>
    <p
      class="mt-2 text-lg font-semibold text-stone-300"
      data-test="totalRepayments"
    >
      <span class="text-2xl">{{ formatCurrency(totalRepayments) }}</span> Total repayments
    </p>
  </div>
</template>
