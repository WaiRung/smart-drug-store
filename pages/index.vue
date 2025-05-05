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
        <HomeSitehead />
        <HomeSectionhead />
        <div class="grid gap-10 mx-auto max-w-5xl mt-16">
            <HomeButtons />
        </div>
        
    </LandingContainer>
</template>