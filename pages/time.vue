<script setup lang="ts">
import { useRouter } from 'nuxt/app'
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
    const router = useRouter()
    router.back()
}
</script>

<template>
    <LandingContainer>
        <LandingSitehead />
        <LandingSectionhead>
            <template v-slot:title>Dosage</template>
            <template v-slot:desc>Recommended Antibiotics Dosage</template>
        </LandingSectionhead>
        <div class="grid gap-10 mx-auto max-w-4xl mt-16">
            <div>
                <TimeSelection />
            </div>
        </div>
    </LandingContainer>
</template>