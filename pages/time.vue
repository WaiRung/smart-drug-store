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
        <div class="grid gap-10 mx-auto max-w-4xl mt-16 snap-container">
            <div class="snap-section">
                <TimeRecommended />
            </div>
            <div class="snap-section">
                <TimeSelection />
            </div>
            <div class="snap-section">
                <TimeResult />
                <TimeButtons />
            </div>

        </div>
    </LandingContainer>
</template>


<style scoped>
@media not all and (min-width: 768px) {
    .snap-container {
        height: 100vh;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
        -webkit-overflow-scrolling: touch;
        /* For better mobile support */
    }

    /* Optional: Hide scrollbar for cleaner look */
    .snap-container::-webkit-scrollbar {
        display: none;
    }

    .snap-section {
        height: 100vh;
        /* Full viewport height for each section */
        scroll-snap-align: start;
        scroll-snap-stop: always;
        /* Forces snap points */
    }
}
</style>