<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { useSlideStore } from '@/stores/slide'
import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

const msdcpgData = computed(() => {
    const msdcpg = msdcpgStore.getMsdcpg()
    return msdcpg
})

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

function onClickNext() {
    msdcpgStore.fetchMsdcpgsByFilter()
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    navigateTo('/time')
}
</script>

<template>
    <div class="grid order-1 md:grid-cols-2 md:order-0">
        <div class="grid justify-items-center mt-10 order-last md:justify-items-start md:order-first">
            <LandingButton
                type="button" @click="onClickBack" size="lg">
                <p class="text-xl">Back</p>
            </LandingButton>
        </div>
        <div class="grid justify-items-center md:mt-10 order-first md:justify-items-end md:order-last">
            <!-- <LandingButton
                :disabled="!msdcpgData.id"
                type="button" @click="onClickNext" size="lg">
                <p class="text-xl">Dose Calculate</p>
            </LandingButton> -->
        </div>
    </div>
    <div class="grid order-0 md:grid-cols-1 md:order-1">
        <div class="grid justify-items-center mt-0 md:justify-items-end">
            <!-- <LandingButton
                :disabled="!msdcpgData.id"
                type="button" @click="onClickBack" size="lg">
                <p class="text-xl">Antibiotic Info</p>
            </LandingButton> -->
        </div>
    </div>
</template>