<script setup>
import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

const msdcpgDetail = computed(() => {
  const rawmsdcpg = msdcpgStore.getMsdcpg()
  const msdcpg = {
    ...rawmsdcpg,
    DOSE_CHECK: `${rawmsdcpg.DOSE_L}${rawmsdcpg.DOSE_U ? '-' + rawmsdcpg.DOSE_U : ''} ${rawmsdcpg.DOSE_UNIT}${rawmsdcpg.DOSE_LBL} ${rawmsdcpg.DRUG_RM}`,
    // DOSE_M_CHECK: `${msdcpg.DOSE_M} ${msdcpg.DOSE_M_UNIT}${msdcpg.DOSE_M_LBL}`
  }
  return msdcpg
})

const filterData = computed(() => {
  const filter = msdcpgStore.getFilter()
  return filter
})
</script>

<template>
  <div class="md:flex justify-between mx-auto max-w-3xl">

    <div
      class="bg-green-900 px-20 py-2 mt-10 mb-10 mx-auto md:mx-0 max-w-fit rounded-lg flex flex-col items-center text-center">
      <h5 class="text-white text-3xl md:text-2xl">Patient Group : <span class="text-lime-500">{{
        filterData.selectedGroup.val }}</span> </h5>

    </div>

    <div
      class="bg-green-900 px-20 py-2 mt-10 mb-10 mx-auto md:mx-0 max-w-fit rounded-lg flex flex-col items-center text-center">
      <h5 class="text-white text-3xl md:text-2xl">Age : <span class="text-lime-500">{{ filterData.selectedAge.val
          }}</span></h5>
    </div>

  </div>
  <div class="bg-green-900 px-20 py-2 mb-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-white text-3xl md:text-2xl">Indication Summary</h5>
    <p class="text-lime-500 mt-4 text-lg md:text-xl">
      {{ msdcpgDetail?.INDICATION_LABEL }}
    </p>
  </div>
  <div class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-white text-3xl md:text-2xl">Recommended Antibiotics</h5>
    <p class="text-lime-500 mt-4 text-lg md:text-xl">
      {{ msdcpgDetail?.ANTIBIOTIC_LABEL }}
    </p>
  </div>
  <div v-if="msdcpgDetail?.RM_RX || msdcpgDetail?.RM_DURATION"
    class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-white text-3xl md:text-2xl">Remarks</h5>
    <ul class="max-w-md space-y-1 list-disc list-inside text-lime-500">
      <li v-if="msdcpgDetail?.RM_RX">
        <p class=" mt-4 text-lg md:text-xl">
          {{ msdcpgDetail?.RM_RX }}
        </p>
        
      </li>
      <li v-if="msdcpgDetail?.RM_DURATION">
        <p class=" mt-4 text-lg md:text-xl">
          {{ msdcpgDetail?.RM_DURATION }}
        </p>
        
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-position: outside;
  margin-left: 1rem;
}
</style>