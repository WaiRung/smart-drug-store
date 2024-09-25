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
    <div class="grid order-1 md:grid-cols-2 md:order-0">
        <div class="grid justify-items-center mt-10 order-last md:justify-items-start md:order-first">
            <LandingButton type="button" @click="onClickBack" size="lg">
                <p class="text-xl">Back</p>
            </LandingButton>
        </div>
        <div class="grid justify-items-center md:mt-10 order-first md:justify-items-end md:order-last">
            <LandingButton type="button" @click="onClickBack" size="lg">
                <p class="text-xl">Dose Calulate</p>
            </LandingButton>
        </div>
    </div>
    <div class="grid order-0 md:grid-cols-1 md:order-1">
        <div class="grid justify-items-center mt-0 md:justify-items-end">
            <LandingButton type="button" @click="onClickBack" size="lg">
                <p class="text-xl">Antibiotic Info</p>
            </LandingButton>
        </div>
    </div>
</template>