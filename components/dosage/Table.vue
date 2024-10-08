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

import { useTabATP_CATALOGStore } from '~/stores/tab-atp-catalog'

const TabATPStore = useTabATP_CATALOGStore()

const TabATPData = computed(() => {
    const tabatps = TabATPStore.getATPs()
    return tabatps
})

const isModalOpen = ref(false)

function openModal(msdcpg) {
    // msdcpgStore.fetchMsdcpgById(msdcpg.id)
    TabATPStore.getAtpByGeneric(msdcpg.attributes.GENERIC)
    isModalOpen.value = true
}

function closeModal() {
    isModalOpen.value = false
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    // console.log('onClickNext', slideStore.getDirection);
    navigateTo('/time')
}
</script>

<template>
    <LandingModal :fixed="true" :show="isModalOpen" title="Antibiotic Result" @close="closeModal"
        @close-cancel="isModalOpen = false">
        <!-- <CpgDetails #body /> -->
         <DosageDetails #body />
    </LandingModal>
    <fwb-table hoverable>
      <fwb-table-head>
        <fwb-table-head-cell>
          <p class="text-base">Trade name</p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-base">
            Form label
          </p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-base">
            Content
          </p>
          </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-base">
            Route
          </p>
        </fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row
          v-for="tabatp in TabATPData"
          :key="tabatp.id"
          @click="openModal(tabatp)"
          class="hover:cursor-pointer">
          <fwb-table-cell>
            <p class="text-base">
              {{ tabatp.attributes.TRADE_NAME }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-base">
              {{ tabatp.attributes.FORM_LABEL }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-base">
              {{ tabatp.attributes.CONTENT }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-base">
              {{ tabatp.attributes.ROUTE }}
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