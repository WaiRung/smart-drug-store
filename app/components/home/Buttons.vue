<script setup lang="ts">
import { useRouter, navigateTo } from 'nuxt/app'
import { FwbButton } from 'flowbite-vue'
import { useSlideStore } from '@/stores/slide'

function onClickPediatric() {
    definePageMeta({
        pageTransition: {
            name: 'slide-left',
            mode: 'out-in'
        },
        middleware: ['slide-direction']
    })
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-right')
    navigateTo('/criteria')
}

function onclickRenal() {

}

</script>

<template>
    <div class="flex flex-col md:flex-row justify-between">
        <fwb-button color="green" class="mx-2" @click="onClickPediatric">
            <p class="text-2xl">Antibiotic Dose Calculator <br> <span>PEDIATRICS</span></p>
        </fwb-button>
        <fwb-button color="green" class="mx-2 mt-4 md:my-0" @click="navigateTo('/import')">
            <p class="text-2xl">Import Data</p>
        </fwb-button>
        <fwb-button color="green" class="mx-2 mt-4 md:my-0 disabled" @click="onclickRenal">
            <p class="text-2xl">Antibiotic Dose Calculator <br> <span>RENAL IMPAIRMENT</span></p>
        </fwb-button>
    </div>
    <div class="text-red-500 -mt-10 flex justify-end md:me-16">ยังอยู่ระหว่างการปรับปรุง</div>
</template>

<style scoped>
.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>