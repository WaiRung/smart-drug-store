<script setup>
import { useTabATP_CATALOGStore } from '~/stores/tab-atp-catalog'
import { useDosageStore } from '~/stores/dosage';

const TabATPStore = useTabATP_CATALOGStore()
const dosageStore = useDosageStore()

const getTotalDailyDosage = computed(() => {
    const totalDailyDosage = dosageStore.getTotalDailyDosage()
    return totalDailyDosage
})

</script>

<template>
    <p>{{ getTotalDailyDosage }}</p>
</template>