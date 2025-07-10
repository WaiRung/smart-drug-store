<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import { useSlideStore } from '@/stores/slide'
import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

const msdcpgDetail = computed(() => {
  const rawmsdcpg = msdcpgStore.getMsdcpg()
  const msdcpg = {
    ...rawmsdcpg,
    DOSE_CHECK: `${rawmsdcpg.DOSE_L}${rawmsdcpg.DOSE_U ? '-' + rawmsdcpg.DOSE_U : ''} ${rawmsdcpg.DOSE_UNIT}${rawmsdcpg.DOSE_LBL} ${rawmsdcpg.DRUG_RM}`,
    // DOSE_M_CHECK: `${msdcpg.DOSE_M} ${msdcpg.DOSE_M_UNIT}${msdcpg.DOSE_M_LBL}`
  }
  console.log('misdcpgDetail', msdcpg.ROUTE);
  
  return msdcpg
})

function onClickCal() {
    // isDrugmodalOpen.value = true
    // msdcpgStore.fetchMsdcpgsByFilter()
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    // console.log('onClickCal', slideStore.getDirection);
    navigateTo('/time')
}

function onClickInfo() {
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    const encodedGeneric = encodeURIComponent(msdcpgDetail.value.GENERIC);
    navigateTo('/info/' + encodedGeneric)
}

</script>

<template>
    <div v-if="msdcpgDetail.ROUTE && msdcpgDetail.ROUTE.includes('PO')"
        class="flex flex-row justify-evenly mb-12">
        <fwb-button color="green" class="mx-2" outline pill @click="onClickInfo">
            <p class="text-2xl">
                <Icon name="flowbite:info-circle-outline" class="-mb-1.5" />
                Antibiotic Info
            </p>
        </fwb-button>
        <fwb-button color="green" class="mx-2" outline pill @click="onClickCal">
            <p class="text-2xl">
                <Icon name="ic:outline-calculate" class="-mb-1.5" />
                Dose Calculator
            </p>
        </fwb-button>
        
    </div>
    
    <div v-else
        class="flex flex-row justify-center mb-12">
        <fwb-button color="green" class="mx-2" outline pill @click="onClickInfo">
            <p class="text-2xl">
                <Icon name="flowbite:info-circle-outline" class="-mb-1.5" />
                Antibiotic Info
            </p>
        </fwb-button>
    </div>

</template>