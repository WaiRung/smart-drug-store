<script setup lang="ts">
const route = useRoute()
const { find } = useStrapi()
import {
    FwbCard,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
} from 'flowbite-vue'

import { useMsdcpgStore } from '~/stores/msdcpg'

import type { AdjustItem } from '../../../../types/index'

const msdcpgStore = useMsdcpgStore()

await msdcpgStore.fetchMsdcpgByDocumentId(route.params.documentId)
const msdcpgDetail = computed(() => {
    return msdcpgStore.getMsdcpg()
})

const adjust: any = reactive({
    documentId: '',
    GENERIC: msdcpgDetail.value?.GENERIC,
    IMPARE: null,
    GROUP: null,
    IMPARED_STATUS: null,
    ADJUSTED_DOSAGE: null,
})

const adjust_children = ref<AdjustItem[]>([

])
const adjust_adults = ref<AdjustItem[]>([

])

const filterGeneric: any = {
    'GENERIC': {
        $eqi: msdcpgDetail.value?.GENERIC
    }
}
const { data, pending, refresh, error } = await useAsyncData(
    'atb-info-adjusts',
    () => find<any>('atb-info-adjusts', {
        fields: [
            'GENERIC',
            'IMPAIREMENT',
            'GROUP',
            'IMPAIREMENT_STATUS',
            'ADJUSTED_DOSAGE',
        ],
        filters: filterGeneric,
    })
)
if (data.value && data.value.data && data.value.data.length > 0) {
    // Assign data to reactive alert object
    // Object.assign(alert, data.value.data[0])
    const adjust_children_data = data.value.data.filter(item => item.GROUP === 'Child')
    const adjust_adults_data = data.value.data.filter(item => item.GROUP === 'Adult')

    console.log('adjust_children_data', adjust_children_data);
    console.log('adjust_adults_data', adjust_adults_data);

    // This is not the correct way to assign a ref.
    // To update the value of a ref, assign to its .value property:
    adjust_children.value = adjust_children_data
    adjust_adults.value = adjust_adults_data
    adjust_adults_data.values = adjust_adults_data.values || []
    Object.assign(adjust, adjust_children_data[0])
}

</script>

<template>
    <div class="max-w-xl mx-auto mt-10">
        <h1 class="text-5xl font-bold text-center my-4">{{ adjust.GENERIC }}</h1>
        <h3 class="text-2xl font-bold text-center my-4">Renal Adjustment</h3>
        <fwb-card class="mx-auto bg-white shadow-lg rounded-lg mb-5 !max-w-full">
            <div class="bg-green-700 mb-3 p-4 rounded-t-lg">
                <h1 class="text-2xl font-bold text-white">Adults</h1>
            </div>
            <div v-if="adjust_adults.length > 0" class="overflow-x-scroll">
                <fwb-table hoverable>
                    <fwb-table-head>
                        <fwb-table-head-cell class="text-left pl-4">
                            <p class="text-lg">
                                Impairment Status
                            </p>
                        </fwb-table-head-cell>
                        <fwb-table-head-cell class="text-left pl-4">
                            <p class="text-lg">
                                Adjusted Dosage
                            </p>
                        </fwb-table-head-cell>
                    </fwb-table-head>
                    <fwb-table-body>
                        <fwb-table-row v-for="adjust_adult in adjust_adults" :key="adjust_adult.documentId">
                            <fwb-table-cell class="text-left pl-4">
                                <p class="text-lg">
                                    {{ adjust_adult.IMPAIREMENT_STATUS }}
                                </p>
                            </fwb-table-cell>
                            <fwb-table-cell class="text-left pl-4">
                                <p class="text-lg">
                                    {{ adjust_adult.ADJUSTED_DOSAGE }}
                                </p>
                            </fwb-table-cell>
                        </fwb-table-row>
                    </fwb-table-body>
                </fwb-table>
            </div>
            <div v-else class="p-4 text-center">
                <p class="text-lg text-gray-500">No data found</p>
            </div>
        </fwb-card>

        
        <fwb-card class="mx-auto bg-white shadow-lg rounded-lg mb-5 !max-w-full">
            <div class="bg-green-700 mb-3 p-4 rounded-t-lg">
                <h1 class="text-2xl font-bold text-white">Children</h1>
            </div>
            <div v-if="adjust_children.length > 0" class="overflow-x-scroll">
                <fwb-table hoverable>
                    <fwb-table-head>
                        <fwb-table-head-cell class="text-left pl-4">
                            <p class="text-lg">
                                Impairment Status
                            </p>
                        </fwb-table-head-cell>
                        <fwb-table-head-cell class="text-left pl-4">
                            <p class="text-lg">
                                Adjusted Dosage
                            </p>
                        </fwb-table-head-cell>
                    </fwb-table-head>
                    <fwb-table-body>
                        <fwb-table-row v-for="adjust_child in adjust_children" :key="adjust_child.documentId">
                            <fwb-table-cell class="text-left pl-4">
                                <p class="text-lg">
                                    {{ adjust_child.IMPAIREMENT_STATUS }}
                                </p>
                            </fwb-table-cell>
                            <fwb-table-cell class="text-left pl-4">
                                <p class="text-lg">
                                    {{ adjust_child.ADJUSTED_DOSAGE }}
                                </p>
                            </fwb-table-cell>
                        </fwb-table-row>
                    </fwb-table-body>
                </fwb-table>
            </div>
            <div v-else class="p-4 text-center">
                <p class="text-lg text-gray-500">No data found</p>
            </div>
        </fwb-card>
    </div>
</template>