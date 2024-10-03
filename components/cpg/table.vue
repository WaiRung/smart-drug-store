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
      // DOSE_CHECK: `${msdcpg.attributes.DOSE_L}${msdcpg.attributes.DOSE_U ? '-' + msdcpg.attributes.DOSE_U : ''} ${msdcpg.attributes.DOSE_UNIT}${msdcpg.attributes.DOSE_LBL} ${msdcpg.attributes.DRUG_RM}`,
      // DOSE_M_CHECK: `${msdcpg.attributes.DOSE_M} ${msdcpg.attributes.DOSE_M_UNIT}${msdcpg.attributes.DOSE_M_LBL}`
    }))
    console.log(msdcpgs);
    
    return msdcpgs
})

const msdcpgDetail = computed(() => {
  const rawmsdcpg = msdcpgStore.getMsdcpg()
  const msdcpg = {
    ...rawmsdcpg,
    // DOSE_CHECK: `${msdcpg.attributes.DOSE_L}${msdcpg.attributes.DOSE_U ? '-' + msdcpg.attributes.DOSE_U : ''} ${msdcpg.attributes.DOSE_UNIT}${msdcpg.attributes.DOSE_LBL} ${msdcpg.attributes.DRUG_RM}`,
    // DOSE_M_CHECK: `${msdcpg.attributes.DOSE_M} ${msdcpg.attributes.DOSE_M_UNIT}${msdcpg.attributes.DOSE_M_LBL}`
  }
  return msdcpg
})

const isModalOpen = ref(false)

function isMsdcpgActive(inputId, rowId) {
  if (inputId === rowId) {
    return true
  }
  return false
}

function openModal(msdcpg) {
  msdcpgStore.fetchMsdcpgById(msdcpg.id)  
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  const slideStore = useSlideStore()
  slideStore.setDirection('slide-left')
  msdcpgStore.clearFoundmsdcpg()  
  // navigateTo('/time')
}
</script>

<template>
  <!-- <CpgModal btn-text="Search" :class-data="{}" v-if="true" /> -->
   <CpgModal
    :fixed="true"
    :show="isModalOpen"
    title="Antibiotic Result"
    @close="isModalOpen = false"
    @close-cancel="closeModal">
   
    <CpgDetails #body />
   </CpgModal>
    <fwb-table hoverable>
      <fwb-table-head>
        <fwb-table-head-cell>
          <p class="text-lg">
            Generic
          </p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-lg">
            Rx Option
          </p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-lg">
            Dose Type
          </p>
          </fwb-table-head-cell>
          <fwb-table-head-cell>
          <p class="text-lg">
            Dose Check
          </p>
          </fwb-table-head-cell>

        <!-- <fwb-table-head-cell>
          <span class="sr-only">Edit</span>
        </fwb-table-head-cell> -->
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row
          v-for="msdcpg in msdcpgData"
          :key="msdcpg.id"
          @click="openModal(msdcpg)"
          :class="{ 'selected-row': isMsdcpgActive(msdcpgDetail.id, msdcpg.id) }"
          class="hover:cursor-pointer">
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.GENERIC }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.RX_OPTION }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.DOSE_TYPE }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.DOSE_CHECK }}
            </p>
          </fwb-table-cell>
          <!-- <fwb-table-cell>
            <fwb-a href="#">
              Edit
            </fwb-a>
          </fwb-table-cell> -->

        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
  </template>

<style scoped>
.selected-row {
  background-color: rgb(188, 240, 218);
}
</style>