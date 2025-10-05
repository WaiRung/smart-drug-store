<script setup lang="ts">
const route = useRoute()
const { find } = useStrapi()

import {
    FwbCard,
} from 'flowbite-vue';

import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

await msdcpgStore.fetchMsdcpgByDocumentId(route.params.documentId)
const msdcpgDetail = computed(() => {
    return msdcpgStore.getMsdcpg()
})

const interaction: any = reactive({
    GENERIC: msdcpgDetail.value?.GENERIC,
    DDI_CONTRAIND: null,
    DDI_CAUSION: null,
})

const filterGeneric: any = {
    'GENERIC': {
        $eqi: msdcpgDetail.value?.GENERIC
    }
}
const { data, pending, refresh, error } = await useAsyncData(
    'atb-info-ddis',
    () => find<any>('atb-info-ddis', {
        fields: [
            'GENERIC',
            'DDI_CONTRAIND',
            'DDI_CAUSION',
        ],
        filters: filterGeneric,
    })
)

if (data.value && data.value.data && data.value.data.length > 0) {
    // Assign data to reactive alert object
    Object.assign(interaction, data.value.data[0])
}
console.log(interaction);
</script>

<template>
    <div class="max-w-xl mx-auto mt-10">
        <h1 class="text-5xl font-bold text-center my-4">{{ interaction.GENERIC }}</h1>
        <h3 class="text-2xl font-bold text-center my-4">Drug to Drugs Interactions</h3>
        <fwb-card class="mx-auto bg-white shadow-lg rounded-lg mb-5 !max-w-full">
            <div class="bg-green-700 mb-3 p-4 rounded-t-lg">
                <h1 class="text-2xl font-bold text-white">Drug-to-Drug Contraindication</h1>
            </div>
            <div class="flex items-start p-8">
                <div v-if="interaction.DDI_CONTRAIND" class="text-2xl whitespace-pre-line">{{ interaction.DDI_CONTRAIND }}</div>
                <span v-else class="text-2xl">-</span>
            </div>
        </fwb-card>

        <fwb-card class="mx-auto bg-white shadow-lg rounded-lg mb-5 !max-w-full">
            <div class="bg-green-700 mb-3 p-4 rounded-t-lg">
                <h1 class="text-2xl font-bold text-white">Drug-to-Drug Serious Caution</h1>
            </div>
            <div class="flex items-start p-8">
                <div v-if="interaction.DDI_CAUSION" class="text-2xl whitespace-pre-line">{{ interaction.DDI_CAUSION }}</div>
                <span v-else class="text-2xl">-</span>
            </div>
        </fwb-card>
    </div>
</template>