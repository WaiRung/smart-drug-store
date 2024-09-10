<script setup lang="ts">
import { useSlideStore } from '@/stores/slide'

function onClickBack() {
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
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-right')
    navigateTo('/dosage')
}
</script>

<template>
    <LandingContainer>
        <LandingSectionhead>
            <template v-slot:title>Dosage</template>
            <template v-slot:desc>Recommended Antibiotics Dosage</template>
        </LandingSectionhead>
    </LandingContainer>
</template>