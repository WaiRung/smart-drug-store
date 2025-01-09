<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { useSlideStore } from '@/stores/slide'
import { useMsdcpgStore } from '~/stores/msdcpg'

function onClickCal() {
    // isDrugmodalOpen.value = true
    // msdcpgStore.fetchMsdcpgsByFilter()
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    // console.log('onClickCal', slideStore.getDirection);
    navigateTo('/time')
}



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
    <div class="flex flex-row justify-between mb-12">
        <LandingButton styleName="outline" className="mx-4" type="button" size="lg" @click="onClickBack">
            <p class="text-xl">Back</p>
        </LandingButton>
        <LandingButton styleName="outline" className="mr-2" type="button" size="lg">
            <p class="text-xl">Antibiotic Info</p>
        </LandingButton>
        <LandingButton styleName="outline" className="ml-2" type="button" size="lg" @click="onClickCal">
            <p class="text-xl">Dose Calculator</p>
        </LandingButton>
        <LandingButton styleName="outline" className="mx-4" type="button" size="lg">
            <p class="text-xl">Reset</p>
        </LandingButton>
    </div>

</template>