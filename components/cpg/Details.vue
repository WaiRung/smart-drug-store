<script setup>
import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

const msdcpgDetail = computed(() => {
  const rawmsdcpg = msdcpgStore.getMsdcpg()
  const msdcpg = {
    ...rawmsdcpg,
    // DOSE_CHECK: `${msdcpg.DOSE_L}${msdcpg.DOSE_U ? '-' + msdcpg.DOSE_U : ''} ${msdcpg.DOSE_UNIT}${msdcpg.DOSE_LBL} ${msdcpg.DRUG_RM}`,
    // DOSE_M_CHECK: `${msdcpg.DOSE_M} ${msdcpg.DOSE_M_UNIT}${msdcpg.DOSE_M_LBL}`
  }
  return msdcpg
})
</script>

<template>
  <div class="bg-green-900 px-20 py-2 mb-10 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-white text-3xl md:text-2xl">Indication Summary</h5>
    <p class="text-lime-500 mt-4 text-lg md:text-xl">
      {{ msdcpgDetail?.INDICATION_LABEL }}
    </p>
  </div>
  <div class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-white text-3xl md:text-2xl">Recommended Antibiotics</h5>
    <p class="text-lime-500 mt-4 text-lg md:text-xl">
      {{ msdcpgDetail?.ANTIBIOTIC_LABEL }}
    </p>
  </div>

  <h2
    v-if="msdcpgDetail?.RM_RX || msdcpgDetail?.RM_DURATION"
    class="mb-2 text-lg font-semibold">Remarks </h2>
  <ul class="max-w-md space-y-1 list-disc list-inside">
    <li v-if="msdcpgDetail?.RM_RX">
      {{ msdcpgDetail?.RM_RX }}
    </li>
    <li v-if=" msdcpgDetail?.RM_DURATION">
      {{ msdcpgDetail?.RM_DURATION }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style-position: outside;
  margin-left: 1rem;
}
</style>