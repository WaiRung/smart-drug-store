<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { useSlideStore } from '@/stores/slide'

import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

const msdcpgData = computed(() => {
  const rawmsdcpgs = msdcpgStore.getMsdcpgs()
  const msdcpgs = rawmsdcpgs.map((msdcpg: any) => ({
    ...msdcpg,
    // DOSE_CHECK: `${msdcpg.attributes.DOSE_L}${msdcpg.attributes.DOSE_U ? '-' + msdcpg.attributes.DOSE_U : ''} ${msdcpg.attributes.DOSE_UNIT}${msdcpg.attributes.DOSE_LBL} ${msdcpg.attributes.DRUG_RM}`,
    // DOSE_M_CHECK: `${msdcpg.attributes.DOSE_M} ${msdcpg.attributes.DOSE_M_UNIT}${msdcpg.attributes.DOSE_M_LBL}`
  }))
  console.log(msdcpgs);

  return msdcpgs
})

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
    <LandingContainer>
      <LandingSitehead />
        <LandingSectionhead>
            <template v-slot:title>Antibiotic Dose Calculators (for pediatrics)</template>
            <template v-slot:desc>Summary Selected Antibiotic Regimen</template>
        </LandingSectionhead>
        <!-- <CpgDetails #body /> -->
         <RegimenDetails #body />
    </LandingContainer>
</template>