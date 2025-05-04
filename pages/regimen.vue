<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { useSlideStore } from '@/stores/slide'

import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

const msdcpgData = computed(() => {
  const rawmsdcpgs = msdcpgStore.getMsdcpgs()
  const msdcpgs = rawmsdcpgs.map((msdcpg: any) => ({
    ...msdcpg,
    DOSE_CHECK: `${msdcpg.DOSE_L}${msdcpg.DOSE_U ? '-' + msdcpg.DOSE_U : ''} ${msdcpg.DOSE_UNIT}${msdcpg.DOSE_LBL} ${msdcpg.DRUG_RM}`,
    // DOSE_M_CHECK: `${msdcpg.DOSE_M} ${msdcpg.DOSE_M_UNIT}${msdcpg.DOSE_M_LBL}`
  }))
  console.log(msdcpgs);

  return msdcpgs
})

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
  <LandingContainer>
    <HomeNavbar />
    <LandingSectionhead>
      <template v-slot:title>Antibiotic Dose Calculators (for pediatrics)</template>
      <template v-slot:desc>Summary Selected Antibiotic Regimen</template>
    </LandingSectionhead>
    <!-- <CpgDetails #body /> -->
    <RegimenDetails #body />
    <RegimenButtons />
  </LandingContainer>
</template>