<script setup lang="ts">
import { useRouter } from 'nuxt/app'
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

function onClickBack() {
    definePageMeta({
        pageTransition: {
            name: 'slide-left',
            mode: 'out-in'
        },
        middleware: ['slide-direction']
    })
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-right')
    const router = useRouter()
    router.back()
}

function onClickReset() {
    reloadNuxtApp({path: '/'})
}
</script>

<template>
    <div class="flex flex-row justify-evenly mb-12">
        <fwb-button color="green" outline pill>
            <p class="text-2xl">Antibiotic Info</p>
        </fwb-button>
        <fwb-button color="green" outline pill @click="onClickCal">
            <p class="text-2xl">Dose Calculator</p>
        </fwb-button>
        
    </div>
    <div class="flex flex-row justify-between mb-12">
        <LandingButton styleName="outline" className="mx-4" type="button" size="lg" @click="onClickBack">
            <p class="text-xl">Back</p>
        </LandingButton>
        <LandingButton styleName="outline" className="mx-4" type="button" size="lg" @click="onClickReset">
            <p class="text-xl">Reset</p>
        </LandingButton>
    </div>

</template>