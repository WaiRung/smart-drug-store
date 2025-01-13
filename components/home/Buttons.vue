<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { useSlideStore } from '@/stores/slide'

function onClickPediatric() {
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
    navigateTo('/criteria')
}

function onclickRenal() {
    
}

</script>

<template>
    <div class="flex flex-col md:flex-row justify-between mb-12">
        <LandingButton type="button" size="lg" @click="onClickPediatric">
            <p class="text-2xl">Antibiotic Dose Calculator <br> <span>PEDIATRICS</span></p>
        </LandingButton>
        <LandingButton type="button" size="lg" className="mt-4 md:my-0" @click="onclickRenal">
            <p class="text-2xl">Antibiotic Dose Calculator <br> <span>RENAL IMPAIRMENT</span></p>
        </LandingButton>
    </div>
</template>