<script setup lang="ts">
import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

const msdcpgDetail = computed(() => {
    const rawmsdcpg = msdcpgStore.getMsdcpg()
    const msdcpg = {
        ...rawmsdcpg,
    }
    return msdcpg
})
</script>

<template>
    <div class="bg-green-900 px-20 py-4 sm:py-8 my-10 sm:my-8 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
        <h5 class="text-white text-4xl md:text-3xl">Recommended Antibiotics</h5>
        <p class="text-lime-500 mt-4 text-3xl md:text-2xl">
            {{ msdcpgDetail?.ANTIBIOTIC_LABEL }}
        </p>
    </div>
</template>