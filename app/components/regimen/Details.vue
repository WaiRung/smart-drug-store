<script setup>
import { useRoute } from 'nuxt/app'
import { useMsdcpgStore } from '~/stores/msdcpg'

const route = useRoute()
const msdcpgStore = useMsdcpgStore()

const msdcpgDetail = computed(() => {
  const rawmsdcpg = msdcpgStore.getMsdcpg()
  const msdcpg = {
    ...rawmsdcpg,
    DOSE_CHECK: `${rawmsdcpg.DOSE_L}${rawmsdcpg.DOSE_U ? '-' + rawmsdcpg.DOSE_U : ''} ${rawmsdcpg.DOSE_UNIT}${rawmsdcpg.DOSE_LBL} ${rawmsdcpg.DRUG_RM}`,
    // DOSE_M_CHECK: `${msdcpg.DOSE_M} ${msdcpg.DOSE_M_UNIT}${msdcpg.DOSE_M_LBL}`
  }
  return msdcpg
})

const filterData = computed(() => {
  const filter = msdcpgStore.getFilter()
  return filter
})

onMounted(() => {
  const params = route.params
  msdcpgStore.fetchMsdcpgByDocumentId(params.documentId)
})
</script>

<template>
  <div class="pl-10 py-2 mt-10 mb-5 mx-auto max-w-3xl">
    <h5 class="text-2xl md:text-xl">Indication Summary : <span class="text-lime-600">{{ msdcpgDetail?.INDICATION_CRITERIA }}</span>
    </h5>
  </div>

  <div class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <!-- <h5 class="text-white text-3xl md:text-2xl">Selected Antibiotics</h5> -->
    <p class="text-lime-200 font-semibold my-4 text-2xl md:text-3xl">
      {{ msdcpgDetail?.ANTIBIOTIC_LABEL }}
    </p>
  </div>
  <!-- <div v-if="msdcpgDetail?.DOSAGE_REMARK"
    class="border-2 px-20 py-2 my-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-green-900 text-3xl md:text-2xl">Dosage Remarks</h5>
    <p class="text-lime-600 mt-4 text-lg md:text-xl">
      {{ msdcpgDetail?.DOSAGE_REMARK }}
    </p>
  </div> -->
  <div class="pl-10 py-2 mt-10 mb-5 mx-auto max-w-3xl">
    <h5 class="text-2xl md:text-xl">Dosage Remarks : <span class="text-lime-600">{{ msdcpgDetail?.DOSAGE_REMARK }}</span>
    </h5>
  </div>
  <!-- <div v-if="msdcpgDetail?.RX_REMARK || msdcpgDetail?.DOSAGE_REMARK"
    class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-white text-3xl md:text-2xl">Remarks</h5>
    <ul class="max-w-md space-y-1 list-disc list-inside text-lime-500">
      <li v-if="msdcpgDetail?.RX_REMARK">
        <p class=" mt-4 text-lg md:text-xl">
          {{ msdcpgDetail?.RX_REMARK }}
        </p>
        
      </li>
      <li v-if="msdcpgDetail?.DOSAGE_REMARK">
        <p class=" mt-4 text-lg md:text-xl">
          {{ msdcpgDetail?.DOSAGE_REMARK }}
        </p>
        
      </li>
    </ul>
  </div> -->
</template>

<style scoped>
ul {
  list-style-position: outside;
  margin-left: 1rem;
}
</style>