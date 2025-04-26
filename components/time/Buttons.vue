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
        middleware: ['slide-direction']
    })
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-right')
    const router = useRouter()
    router.back()
}

function onClickReset() {
    // dosageStore.resetFilter()
    reloadNuxtApp({path: '/'})
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