<script setup>
import { useRouter } from 'nuxt/app'
import { useMsdcpgStore } from '~/stores/msdcpg'

const router = useRouter()
const msdcpgStore = useMsdcpgStore()

const msdcpgDetail = computed(() => {
  const rawmsdcpg = msdcpgStore.getMsdcpg()
  const msdcpg = {
    ...rawmsdcpg,
    DOSE_CHECK: `${rawmsdcpg.DOSE_L}${rawmsdcpg.DOSE_U ? '-' + rawmsdcpg.DOSE_U : ''} ${rawmsdcpg.DOSE_UNIT}${rawmsdcpg.DOSE_LBL} ${rawmsdcpg.DRUG_RM}`,
    // DOSE_M_CHECK: `${msdcpg.DOSE_M} ${msdcpg.DOSE_M_UNIT}${msdcpg.DOSE_M_LBL}`
  }
  console.log('msdcpgDetail', msdcpg);
  
  return msdcpg
})

const filterData = computed(() => {
  const filter = msdcpgStore.getFilter()
  return filter
})
</script>

<template>
  <div class="border-2 px-20 py-2 my-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-green-750 text-3xl md:text-2xl">Indication Summary</h5>
    <p class="text-lime-600 mt-4 text-lg md:text-xl">
      {{ msdcpgDetail?.INDICATION_CRITERIA }}
    </p>
  </div>

  <div class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-white text-3xl md:text-2xl">Selected Antibiotics</h5>
    <p class="text-lime-400 mt-4 text-lg md:text-xl">
      {{ msdcpgDetail?.ANTIBIOTIC_LABEL }}
    </p>
  </div>
  <div v-if="msdcpgDetail?.DOSAGE_REMARK"
    class="border-2 px-20 py-2 my-10 mx-auto max-w-3xl rounded-lg flex flex-col items-center text-center">
    <h5 class="text-green-900 text-3xl md:text-2xl">Dosage Remarks</h5>
    <p class="text-lime-600 mt-4 text-lg md:text-xl">
      {{ msdcpgDetail?.DOSAGE_REMARK }}
    </p>
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