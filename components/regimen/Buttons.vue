<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import { useSlideStore } from '@/stores/slide'
import { useMsdcpgStore } from '~/stores/msdcpg'

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
    
}

</script>

<template>
    <div class="flex flex-row justify-evenly mb-12">
        <fwb-button color="green" class="mx-2" outline pill>
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
    <div class="flex flex-row justify-between mb-12">
    </div>

</template>