<script setup lang="ts">
const route = useRoute()
const { find } = useStrapi()

import {
    FwbCard,
} from 'flowbite-vue';

const adverse: any = reactive({
    GENERIC: route.params.GENERIC,
    CONTRAIND: null,
    LIMITATION: null,
    RESIST_AWARE: null,
})

const filterGeneric: any = {
    'GENERIC': {
        $eqi: route.params.GENERIC
    }
}
const { data, pending, refresh, error } = await useAsyncData(
    'atb-info-aes',
    () => find<any>('atb-info-aes', {
        fields: [
            'GENERIC',
            'AE_DESCRIPTION',
        ],
        filters: filterGeneric,
    })
)
if (data.value && data.value.data && data.value.data.length > 0) {
    // Assign data to reactive adverse object
    Object.assign(adverse, data.value.data[0])
}
console.log(adverse);
</script>

<template>
    <div class="max-w-xl mx-auto mt-10">
        <h1 class="text-5xl font-bold text-center my-4">{{ adverse.GENERIC }}</h1>
        <h3 class="text-2xl font-bold text-center my-4">Adverse Events</h3>
         <fwb-card class="mx-auto bg-white shadow-lg rounded-lg mb-5 !max-w-full">
            <div class="bg-green-700 mb-3 p-4 rounded-t-lg">
                <h1 class="text-2xl font-bold text-white">Adverse Events</h1>
            </div>
            <div class="flex items-start p-8">
                <div v-if="adverse.AE_DESCRIPTION" class="text-2xl whitespace-pre-line">{{ adverse.AE_DESCRIPTION }}</div>
                <span v-else class="text-2xl">-</span>
            </div>
        </fwb-card>
    </div>
</template>