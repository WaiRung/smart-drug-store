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
</script>

<template>
  <div
      class="bg-green-900 px-20 py-2 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center"
    >
      <h5 class="text-white text-3xl md:text-2xl">Indication Summary</h5>
      <p class="text-lime-500 mt-4 text-lg md:text-xl">
        {{ msdcpgDetail.attributes?.INDICATION_LABEL }}
      </p>
    </div>
    <div
      class="bg-green-900 px-20 py-2 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center"
    >
      <h5 class="text-white text-3xl md:text-2xl">Recommended Antibiotics</h5>
      <p class="text-lime-500 mt-4 text-lg md:text-xl">
        {{ msdcpgDetail.attributes?.INDICATION_LABEL }}
      </p>
    </div>
</template>