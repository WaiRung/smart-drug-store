<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { useSlideStore } from '@/stores/slide'
import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

const msdcpgData = computed(() => {
    const msdcpg = msdcpgStore.getMsdcpg()
    return msdcpg
})

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
        </div>
        <div class="grid justify-items-center md:mt-10 order-first md:justify-items-end md:order-last">
            <!-- <LandingButton
                :disabled="!msdcpgData.documentId"
                type="button" @click="onClickNext" size="lg">
                <p class="text-xl">Dose Calculate</p>
            </LandingButton> -->
        </div>
    </div>
    <div class="grid order-0 md:grid-cols-1 md:order-1">
        <div class="grid justify-items-center mt-0 md:justify-items-end">
            <!-- <LandingButton
                :disabled="!msdcpgData.documentId"
                type="button" @click="onClickBack" size="lg">
                <p class="text-xl">Antibiotic Info</p>
            </LandingButton> -->
        </div>
    </div>
</template>