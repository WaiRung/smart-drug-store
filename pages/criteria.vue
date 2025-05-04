<script setup lang="ts">
import { useSlideStore } from '@/stores/slide'
definePageMeta({
    pageTransition: {
        name: 'slide-left',
        mode: 'out-in'
    },
    middleware: ['slide-direction']
})
defineProps({
  align: {
    default: "center",
  },
});
</script>

<template>
    <LandingContainer>
        <HomeNavbar />
        <LandingSectionhead>
            <template v-slot:title>Antibiotic Dose Calculators (for pediatrics)</template>
            <template v-slot:desc>Clinical Criteria</template>
        </LandingSectionhead>

        <div class="grid gap-10 mx-auto max-w-4xl mt-24">
            <div>
                <CriteriaSelection />
            </div>
        </div>
    </LandingContainer>
</template>