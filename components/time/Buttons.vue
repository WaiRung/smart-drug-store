<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { useSlideStore } from '@/stores/slide'
import { useDosageStore } from '~/stores/dosage'

const dosageStore = useDosageStore()

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

function onClickReset() {
    dosageStore.resetFilter()
}

</script>

<template>
    <div class="flex flex-row justify-between mb-12">
        <LandingButton styleName="outline" type="button" size="lg" @click="onClickBack">
            <p class="text-xl">Back</p>
        </LandingButton>
        <LandingButton styleName="outline" type="button" size="lg">
            <p class="text-xl">Antibiotic Info</p>
        </LandingButton>
        <LandingButton styleName="outline" type="button" size="lg" @click="onClickReset">
            <p class="text-xl">Reset</p>
        </LandingButton>
    </div>
</template>