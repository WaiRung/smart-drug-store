<script setup lang="ts">
import { useSlideStore } from '@/stores/slide'
definePageMeta({
    pageTransition: {
        name: 'slide-left',
        mode: 'out-in'
    },
    middleware(to, from) {
        const slideStore = useSlideStore()
        if (to.meta.pageTransition && typeof to.meta.pageTransition !== 'boolean') {
            to.meta.pageTransition.name = slideStore.getDirection
        }
    }
})
defineProps({
  align: {
    default: "center",
  },
});
</script>

<template>
    <LandingContainer>
        <!-- <LandingSectionhead>
            <template v-slot:title>Antibiotic Dose Calculators</template>
            <template v-slot:desc>Clinical Criteria</template>
        </LandingSectionhead> -->

        <div :class="['mt-16', align === 'center' && 'text-center']">
            <h1 class="text-3xl lg:text-4xl font-bold lg:tracking-tight">
                <slot name="title">Antibiotic Dose Calculators (for pediatrics)</slot>
            </h1>
            <p class="text-2xl mt-4 text-green-600">
                <slot name="desc">Clinical Criteria</slot>
            </p>
        </div>

        <div class="grid gap-10 mx-auto max-w-4xl mt-16">
            <div>
                <CriteriaSelection />
            </div>
        </div>
    </LandingContainer>
</template>