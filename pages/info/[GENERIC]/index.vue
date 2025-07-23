<script setup lang="ts">
const route = useRoute()
import { FwbButton } from 'flowbite-vue'
import { useSlideStore } from '@/stores/slide'

const encodedGenericParam: string = encodeURIComponent(
    Array.isArray(route.params.GENERIC) ? route.params.GENERIC[0] : route.params.GENERIC
)

function onclickAdjust() {
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    navigateTo('/info/' + encodedGenericParam + '/adjust')
}

function onclickDrugInteractions() {
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    navigateTo('/info/' + encodedGenericParam + '/dd')
}

function onclickAdverseEvents() {
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    navigateTo('/info/alert/' + encodedGenericParam + '/ae')

}



</script>

<template>
    <LandingContainer>
        <HomeNavbar />
        <div
            :class="['text-center', 'bg-green-700', 'px-20', 'py-8', 'my-20', 'mx-auto', 'max-w-5xl', 'rounded-lg']">
            <h1 class="text-white text-4xl lg:text-5xl font-bold lg:tracking-tight">
                ANTIBIOTIC INFO
            </h1>
        </div>
        <div class="grid gap-10 mx-auto max-w-5xl mt-16">
            <div class="flex flex-col md:flex-row justify-between mb-12">
                <fwb-button color="green" class="mx-2" @click="onclickAdjust">
                    <p class="text-2xl">Adjust Drug Dosage</p>
                </fwb-button>
                <fwb-button color="green" class="mx-2 mt-4 md:my-0" @click="onclickDrugInteractions">
                    <p class="text-2xl">Drug to Drug Interactions</p>
                </fwb-button>
                <fwb-button color="green" class="mx-2 mt-4 md:my-0" @click="onclickAdverseEvents">
                    <p class="text-2xl">Adverse Events</p>
                </fwb-button>
            </div>
        </div>
    </LandingContainer>
</template>