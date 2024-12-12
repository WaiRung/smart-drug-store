<script setup>
import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

const msdcpgDetail = computed(() => {
  const rawmsdcpg = msdcpgStore.getMsdcpg()
  const msdcpg = {
    ...rawmsdcpg,
    // DOSE_CHECK: `${msdcpg.attributes.DOSE_L}${msdcpg.attributes.DOSE_U ? '-' + msdcpg.attributes.DOSE_U : ''} ${msdcpg.attributes.DOSE_UNIT}${msdcpg.attributes.DOSE_LBL} ${msdcpg.attributes.DRUG_RM}`,
    // DOSE_M_CHECK: `${msdcpg.attributes.DOSE_M} ${msdcpg.attributes.DOSE_M_UNIT}${msdcpg.attributes.DOSE_M_LBL}`
  }
  return msdcpg
})

const filterData = computed(() => {
    const filter = msdcpgStore.getFilter()
    return filter
})
</script>

<template>
  <div class="flex justify-between mx-auto max-w-3xl">

    <div class="bg-green-900 px-20 py-2 mt-10 mb-10 max-w-fit rounded-lg flex flex-col items-center text-center">
      <h5 class="text-white text-3xl md:text-2xl">Patient Group : <span class="text-lime-500">{{ filterData.selectedGroup.val }}</span> </h5>
      
    </div>

    <div class="bg-green-900 px-20 py-2 mt-10 mb-10 max-w-fit rounded-lg flex flex-col items-center text-center">
      <h5 class="text-white text-3xl md:text-2xl">Age : <span class="text-lime-500">{{ filterData.selectedAge.val }}</span></h5>
    </div>

  </div>
  <div class="bg-green-900 px-20 py-2 mb-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-white text-3xl md:text-2xl">Indication Summary</h5>
    <p class="text-lime-500 mt-4 text-lg md:text-xl">
      {{ msdcpgDetail.attributes?.INDICATION_LABEL }}
    </p>
  </div>
  <div class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-white text-3xl md:text-2xl">Recommended Antibiotics</h5>
    <p class="text-lime-500 mt-4 text-lg md:text-xl">
      {{ msdcpgDetail.attributes?.ANTIBIOTIC_LABEL }}
    </p>
  </div>

  <h2 v-if="msdcpgDetail.attributes?.RM_RX || msdcpgDetail.attributes?.RM_DURATION" class="mb-2 text-lg font-semibold">
    Remarks </h2>
  <ul class="max-w-md space-y-1 list-disc list-inside">
    <li v-if="msdcpgDetail.attributes?.RM_RX">
      {{ msdcpgDetail.attributes?.RM_RX }}
    </li>
    <li v-if="msdcpgDetail.attributes?.RM_DURATION">
      {{ msdcpgDetail.attributes?.RM_DURATION }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style-position: outside;
  margin-left: 1rem;
}
</style>