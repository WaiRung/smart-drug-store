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
        <LandingSitehead />
        <HomeSectionhead />
        <div class="grid gap-10 mx-auto max-w-5xl mt-16">
            <HomeButtons />
        </div>
        
    </LandingContainer>
</template>