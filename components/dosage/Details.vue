<script setup>
import { useTabATP_CATALOGStore } from '~/stores/tab-atp-catalog'
import { useDosageStore } from '~/stores/dosage';

const TabATPStore = useTabATP_CATALOGStore()
const dosageStore = useDosageStore()

const getTotalDailyDosage = computed(() => {
    const totalDailyDosage = dosageStore.getTotalDailyDosage()
    console.log('getTotalDailyDosage : ', getTotalDailyDosage);
    
    return totalDailyDosage
})

</script>

<template>
    <p v-if="getTotalDailyDosage.lowerLimit">{{ getTotalDailyDosage.lowerLimit }} - {{  getTotalDailyDosage.upperLimit }} mg, g or MU</p>
    <p v-else></p>
</template>