<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { useSlideStore } from '@/stores/slide'

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
</script>

<template>
    <LandingContainer>
        <HomeNavbar />
        <LandingSectionhead>
            <template v-slot:title>Antibiotic Dose Calculators for Pediatrics</template>
            <template v-slot:desc>List of Recommended Antibiotics</template>
        </LandingSectionhead>

        <!-- <LandingLoadingsquare /> -->
        <div class="grid gap-10 mx-auto max-w-5xl mt-12">
            <div>
                <CpgTable />
            </div>
            <CpgButtons />
        </div>
    </LandingContainer>
</template>