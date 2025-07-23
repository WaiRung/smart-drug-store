<script setup lang="ts">
const route = useRoute()
const { find } = useStrapi()

import {
    FwbCard,
} from 'flowbite-vue';

const alert: any = reactive({
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
    'atb-info-alerts',
    () => find<any>('atb-info-alerts', {
        fields: [
            'GENERIC',
            'CONTRAIND',
            'LIMITATION',
            'RESIST_AWARE',
        ],
        filters: filterGeneric,
    })
)
if (data.value && data.value.data && data.value.data.length > 0) {
    // Assign data to reactive alert object
    Object.assign(alert, data.value.data[0])
}
console.log(alert);
</script>

<template>
    <div class="max-w-xl mx-auto mt-10">
        <h1 class="text-5xl font-bold text-center my-8">{{ alert.GENERIC }}</h1>
         <fwb-card class="mx-auto bg-white shadow-lg rounded-lg mb-5 !max-w-full">
            <div class="bg-green-700 mb-3 p-4 rounded-t-lg">
                <h1 class="text-2xl font-bold text-white">Contraindications</h1>
            </div>
            <div class="flex items-start p-8">
                <div v-if="alert.CONTRAIND" class="text-2xl whitespace-pre-line">{{ alert.CONTRAIND }}</div>
                <span v-else class="text-2xl">-</span>
            </div>
        </fwb-card>

        <fwb-card class="mx-auto bg-white shadow-lg rounded-lg mb-5 !max-w-full">
            <div class="bg-green-700 mb-3 p-4 rounded-t-lg">
                <h1 class="text-2xl font-bold text-white">Limitations</h1>
            </div>
            <div class="flex items-start p-8">
                <div v-if="alert.LIMITATION" class="text-2xl whitespace-pre-line">{{ alert.LIMITATION }}</div>
                <span v-else class="text-2xl">-</span>
            </div>
        </fwb-card>
        <!-- Header -->
        <fwb-card class="mx-auto bg-white shadow-lg rounded-lg mb-5 !max-w-full">
            <div class="bg-green-700 mb-3 p-4 rounded-t-lg">
                <h1 class="text-2xl font-bold text-white">Resistance Awareness</h1>
            </div>
            <div class="flex items-start p-8">
                <div v-if="alert.RESIST_AWARE" class="text-2xl whitespace-pre-line">{{ alert.RESIST_AWARE }}</div>
                <span v-else class="text-2xl">-</span>
            </div>

        </fwb-card>
    </div>
</template>