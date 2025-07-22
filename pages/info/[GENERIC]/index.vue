<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { FwbButton } from 'flowbite-vue'
import { useSlideStore } from '@/stores/slide'

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

function onclickAdjust() {
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    const encodedGeneric = encodeURIComponent(msdcpgDetail.value.GENERIC);
    navigateTo('/info/' + encodedGeneric + '/adjust')
}

function onclickDrugInteractions() {
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    const encodedGeneric = encodeURIComponent(msdcpgDetail.value.GENERIC);
    navigateTo('/info/' + encodedGeneric + '/dd')
}

function onclickAdverseEvents() {
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    const encodedGeneric = encodeURIComponent(msdcpgDetail.value.GENERIC);
    navigateTo('/info/alert/' + encodedGeneric + '/ae')
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