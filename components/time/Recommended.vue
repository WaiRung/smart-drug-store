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
    <div class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
        <h5 class="text-white text-3xl md:text-2xl">Recommended Antibiotics</h5>
        <p class="text-lime-500 mt-4 text-lg md:text-xl">
            {{ msdcpgDetail.attributes?.ANTIBIOTIC_LABEL }}
        </p>
    </div>
</template>