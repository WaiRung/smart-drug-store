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

const isModalOpen = ref(false)

function openModal(msdcpg) {
  msdcpgStore.fetchMsdcpgById(msdcpg.id)  
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    // console.log('onClickNext', slideStore.getDirection);
    navigateTo('/dosage')
}
</script>

<template>
  <!-- <CpgModal btn-text="Search" :class-data="{}" v-if="true" /> -->
   <LandingModal
    :fixed="true"
    :show="isModalOpen"
    title="Antibiotic Result"
    @close="closeModal"
    @close-cancel="isModalOpen = false">
   
    <CpgDetails #body />
   </LandingModal>
    <fwb-table hoverable>
      <fwb-table-head>
        <fwb-table-head-cell>
          <p class="text-base">Serverity</p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-base">
            Risk Organism
          </p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-base">
            Dose check
          </p>
          </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-base">
            Dose M check
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
          class="hover:cursor-pointer">
          <fwb-table-cell>
            <p class="text-base">
              {{ msdcpg.attributes.SEVERITY }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-base">
              {{ msdcpg.attributes.RISK_ORGANISM }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-base">
              {{ msdcpg.DOSE_CHECK }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-base">
              {{ msdcpg.DOSE_M_CHECK }}
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
