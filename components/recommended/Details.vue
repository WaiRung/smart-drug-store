<script setup>
defineProps({
  align: {
    default: "center",
  },
});

import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()


const filterData = computed(() => {
  const filter = msdcpgStore.getFilter()
  return filter
})

const summaryLabel = computed(() => {
  const filter = msdcpgStore.getFilter()
  const parts = [
    filter.selectedDiagnosis?.val,
    filter.selectedRiskorganism?.val,
    filter.selectedHypersensitivity?.val
  ].filter(Boolean)
  
  const label = parts.length > 0 ? parts.join(' ; ') : 'No data available'
  return label
})
</script>

<template>
  <div :class="['mt-16', align === 'center' && 'text-center']">
    <h1 class="text-4xl lg:text-5xl font-bold lg:tracking-tight">
      <slot name="title">Summary of Recommended Antibiotics</slot>
    </h1>
  </div>

  <div class="md:flex justify-end mx-auto max-w-3xl">
    <div
      class="pl-10 py-2 mt-10 mb-5 mx-auto md:mx-0 md:mb-10 max-w-fit rounded-lg flex flex-col text-right items-end">
      <h5 class="text-3xl md:text-2xl">Patient Group : <span class="text-lime-600">{{
        filterData.selectedGroup.val }}</span> </h5>

    </div>

    <div
      class="pl-10 py-2 mt-10 mb-10 mx-auto md:mx-0 md:mt-10 max-w-fit rounded-lg flex flex-col items-center text-center">
      <h5 class="text-3xl md:text-2xl">Age : <span class="text-lime-600">{{ filterData.selectedAge.val
          }}</span></h5>
    </div>
  </div>

  <div class="bg-green-900 px-20 py-2 mb-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-white text-3xl md:text-2xl">Indication Summary</h5>
    <p class="text-lime-400 mt-4 text-lg md:text-xl">
      {{ summaryLabel }}
    </p>
  </div>
</template>