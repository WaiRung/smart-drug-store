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
navigateTo('/time')

}
</script>
<template>
<LandingContainer>
    <div class="grid gap-10 mx-auto max-w-4xl mt-12">
            <div>
                <DosageTable />
            </div>
            <div>
                <LandingButton type="button" @click="onClickBack" size="lg">
                    <p class="text-xl">back</p>
                </LandingButton>
            </div>

        </div>
</LandingContainer>
</template>