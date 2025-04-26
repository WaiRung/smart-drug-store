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

function navigate(msdcpg) {
  msdcpgStore.fetchMsdcpgById(msdcpg.id)

  tabATP_CATALOGStore.fetchATPSByGenericClass(
    msdcpgDetail.value.attributes.GENERIC
  )
  tabATP_CATALOGStore.getAtpByGeneric(msdcpgDetail.value.attributes.GENERIC)

  const slideStore = useSlideStore()
  slideStore.setDirection('slide-left')
  navigateTo('/regimen')
}

function closeModal() {
  isModalOpen.value = false
  const slideStore = useSlideStore()
  slideStore.setDirection('slide-left')
  msdcpgStore.clearFoundmsdcpg()
  // navigateTo('/time')
}

function onClickNext() {
  msdcpgStore.fetchMsdcpgsByFilter()
  const slideStore = useSlideStore()
  slideStore.setDirection('slide-left')
  navigateTo('/time')
}

function onClickBack() {

  definePageMeta({
    pageTransition: {
      name: 'slide-left',
      mode: 'out-in'
    },
    middleware: ['slide-direction']
  })
  const slideStore = useSlideStore()
  slideStore.setDirection('slide-right')
  const router = useRouter()
  router.back()
}
</script>

<template>
  <!-- <CpgModal btn-text="Search" :class-data="{}" v-if="true" /> -->
  <CpgModal :fixed="true" :show="isModalOpen" title="Antibiotic Result" @close="isModalOpen = false"
    @close-cancel="closeModal">

    <CpgDetails #body />

    <div class="flex justify-evenly">
      <LandingButton type="button" @click="onClickNext" size="lg">
        <p class="text-xl">Dose Calculate</p>
      </LandingButton>
      <LandingButton type="button" @click="onClickBack" size="lg">
        <p class="text-xl">Antibiotic Info</p>
      </LandingButton>
    </div>
  </CpgModal>
  <div class="overflow-x-scroll table-width">
    <fwb-table hoverable>
      <fwb-table-head>
        <fwb-table-head-cell>
          <p class="text-lg">
            Rx
          </p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-lg">
            Generic
          </p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-lg">
            Dose
          </p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-lg">
            Dose Max
          </p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-lg">
            Route
          </p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-lg">
            Frequency
          </p>
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <p class="text-lg">
            Duration
          </p>
        </fwb-table-head-cell>

        <!-- <fwb-table-head-cell>
          <span class="sr-only">Edit</span>
        </fwb-table-head-cell> -->
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row v-for="msdcpg in msdcpgData" :key="msdcpg.id" @click="navigate(msdcpg)"
          :class="{ 'selected-row': isMsdcpgActive(msdcpgDetail.id, msdcpg.id) }" class="hover:cursor-pointer">
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.RX_OPTION }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.GENERIC }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.DOSE_CHECK }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.DOSE_M_CHECK }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.ROUTE }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.FREQ }}
            </p>
          </fwb-table-cell>
          <fwb-table-cell>
            <p class="text-lg">
              {{ msdcpg.attributes.DURATION }}
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