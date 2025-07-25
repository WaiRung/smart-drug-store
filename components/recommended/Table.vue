<script setup>
import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
} from 'flowbite-vue'

import { useMsdcpgStore } from '~/stores/msdcpg'
import { useTabATP_CATALOGStore } from '~/stores/tab-atp-catalog'

const msdcpgStore = useMsdcpgStore()
const tabATP_CATALOGStore = useTabATP_CATALOGStore()

const msdcpgData = computed(() => {
    const rawmsdcpgs = msdcpgStore.getMsdcpgs()
    const msdcpgs = rawmsdcpgs.map(msdcpg => {
        const DOSE_L_nodigit = msdcpg.DOSE_L ? msdcpg.DOSE_L.toString().split('.')[0] : ''
        const DOSE_U_nodigit = msdcpg.DOSE_U ? msdcpg.DOSE_U.toString().split('.')[0] : ''

        return {
            ...msdcpg,
            DOSE_CHECK: `${DOSE_L_nodigit}${DOSE_U_nodigit ? '-' + DOSE_U_nodigit : ''} ${msdcpg.DOSE_UNIT || ''}${msdcpg.DOSE_LBL || ''} ${msdcpg.DRUG_RM || ''}`,
            // DOSE_M_CHECK: `${msdcpg.DOSE_M} ${msdcpg.DOSE_M_UNIT}${msdcpg.DOSE_M_LBL}`
        }
    })

    return msdcpgs
})

const msdcpgDetail = computed(() => {
    const rawmsdcpg = msdcpgStore.getMsdcpg()
    const msdcpg = {
        ...rawmsdcpg,
        DOSE_CHECK: `${rawmsdcpg.DOSE_L || ''}${rawmsdcpg.DOSE_U ? '-' + rawmsdcpg.DOSE_U : ''} ${rawmsdcpg.DOSE_UNIT || ''}${rawmsdcpg.DOSE_LBL || ''} ${rawmsdcpg.DRUG_RM || ''}`,
        // DOSE_M_CHECK: `${msdcpg.DOSE_M} ${msdcpg.DOSE_M_UNIT}${msdcpg.DOSE_M_LBL}`
    }
    return msdcpg
})

function isMsdcpgActive(inputId, rowId) {
    if (inputId === rowId) {
        return true
    }
    return false
}

function navigate(msdcpg) {
    msdcpgStore.fetchMsdcpgById(msdcpg.documentId)
    tabATP_CATALOGStore.fetchATPSByGenericRoute(
        msdcpgDetail.value.GENERIC,
        msdcpgDetail.value.ROUTE
    )
    tabATP_CATALOGStore.getAtpByGenericForm(msdcpgDetail.value.GENERIC)

    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    const encodedGeneric = encodeURIComponent(msdcpg.GENERIC);
    navigateTo('/regimen/' + encodedGeneric)
}
</script>

<template>
    <div class="overflow-x-scroll table-width">
        <fwb-table hoverable>
            <fwb-table-head>

                <fwb-table-head-cell class="text-left pl-4">
                    <p class="text-lg">
                        Rx Option
                    </p>
                </fwb-table-head-cell>
                <fwb-table-head-cell class="text-left pl-4 w-64">
                    <p class="text-lg">
                        Generic
                    </p>
                </fwb-table-head-cell>
                <fwb-table-head-cell class="text-left pl-4">
                    <p class="text-lg">
                        RM RX
                    </p>
                </fwb-table-head-cell>
                <fwb-table-head-cell class="text-left pl-4">
                    <p class="text-lg">
                        Antibiotic Label
                    </p>
                </fwb-table-head-cell>
            </fwb-table-head>
            <fwb-table-body>
                <fwb-table-row v-for="msdcpg in msdcpgData" :key="msdcpg.documentId" @click="navigate(msdcpg)"
                    :class="{ 'selected-row': isMsdcpgActive(msdcpgDetail.documentId, msdcpg.documentId) }"
                    class="hover:cursor-pointer">
                    <fwb-table-cell class="pl-4">
                        <p class="text-lg">
                            {{ msdcpg.RX_OPTION }}
                        </p>
                    </fwb-table-cell>
                    <fwb-table-cell class="pl-4">
                        <p class="text-lg">
                            {{ msdcpg.GENERIC }}
                        </p>
                    </fwb-table-cell>
                    <fwb-table-cell class="pl-4">
                        <p class="text-lg">
                            {{ msdcpg.RM_RX }}
                        </p>
                    </fwb-table-cell>
                    <fwb-table-cell class="pl-4">
                        <p class="text-lg">
                            {{ msdcpg.ANTIBIOTIC_LABEL }}
                        </p>
                    </fwb-table-cell>
                </fwb-table-row>
            </fwb-table-body>
        </fwb-table>
    </div>
</template>

<style scoped>
.selected-row {
    background-color: rgb(188, 240, 218);
}

.table-width {
    width: 95vw;
    max-width: 1024px;

}
</style>