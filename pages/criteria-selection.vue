<script setup lang="ts">
import { useSlideStore } from '@/stores/slide'
definePageMeta({
    pageTransition: {
        name: 'slide-left',
        mode: 'out-in'
    },
    middleware(to, from) {
        if (to.meta.pageTransition && typeof to.meta.pageTransition !== 'boolean') {
            const slideStore = useSlideStore()
            to.meta.pageTransition.name = slideStore.getDirection
        }
    }
})
</script>


<template>
    <LandingContainer>
        <LandingSectionhead>
            <template v-slot:title>Criteria</template>
            <template v-slot:desc>Criteria Selection</template>
        </LandingSectionhead>
        <div class="grid gap-10 mx-auto max-w-4xl mt-16">
            <div>
                <CriteriaSelection />
            </div>
        </div>
    </LandingContainer>


</template>