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

const msdcpgStore = useMsdcpgStore()

const msdcpgData = computed(() => {
    const rawmsdcpgs = msdcpgStore.getMsdcpgs()
    const msdcpgs = rawmsdcpgs.map(msdcpg => ({
      ...msdcpg,
      DOSE_CHECK: `${msdcpg.attributes.DOSE_L}${msdcpg.attributes.DOSE_U ? '-' + msdcpg.attributes.DOSE_U : ''} ${msdcpg.attributes.DOSE_UNIT}${msdcpg.attributes.DOSE_LBL} ${msdcpg.attributes.DRUG_RM}`,
      DOSE_M_CHECK: `${msdcpg.attributes.DOSE_M} ${msdcpg.attributes.DOSE_M_UNIT}${msdcpg.attributes.DOSE_M_LBL}`
    }))
    return msdcpgs
})
</script>

<template>
    <fwb-table hoverable>
      <fwb-table-head>
        <fwb-table-head-cell>Serverity</fwb-table-head-cell>
        <fwb-table-head-cell>Risk Organism</fwb-table-head-cell>
        <fwb-table-head-cell>Dose check</fwb-table-head-cell>
        <fwb-table-head-cell>Dose M check</fwb-table-head-cell>
        <!-- <fwb-table-head-cell>
          <span class="sr-only">Edit</span>
        </fwb-table-head-cell> -->
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row v-for="msdcpg in msdcpgData" :key="msdcpg.id" class="hover:cursor-pointer">
          <fwb-table-cell>{{ msdcpg.attributes.SEVERITY }}</fwb-table-cell>
          <fwb-table-cell>{{ msdcpg.attributes.RISK_ORGANISM }}</fwb-table-cell>
          <fwb-table-cell>{{ msdcpg.DOSE_CHECK }}</fwb-table-cell>
          <fwb-table-cell>{{ msdcpg.DOSE_M_CHECK }}</fwb-table-cell>
          <!-- <fwb-table-cell>
            <fwb-a href="#">
              Edit
            </fwb-a>
          </fwb-table-cell> -->
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
  </template>
