<script setup>
import { useTabATP_CATALOGStore } from '~/stores/tab-atp-catalog'
import { useDosageStore } from '~/stores/dosage';

const TabATPStore = useTabATP_CATALOGStore()
const dosageStore = useDosageStore()

const getTotalDailyDosage = computed(() => {
    const totalDailyDosage = dosageStore.getTotalDailyDosage()
    // console.log('getTotalDailyDosage : ', getTotalDailyDosage);
    
    return totalDailyDosage
})

const getAmountPerdose = computed(() => {
    const totalDailyDosage = dosageStore.amountPerDose()
    return totalDailyDosage
})

</script>

<template>
    <div class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
        <p
            v-if="getTotalDailyDosage.lowerLimit"
            class="text-white text-3xl md:text-2xl"
            >Total Daily Dosage : {{ getTotalDailyDosage.lowerLimit }} - {{  getTotalDailyDosage.upperLimit }} mg, g or MU</p>
        <p
            v-else
            class="text-white text-3xl md:text-2xl"
            >Total Daily Dosage : -</p>
    </div>

    <div class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
        <p
           
            class="text-white text-3xl md:text-2xl"
            >Amount Per Dose :
            <span  v-if="getAmountPerdose.lowerLimit">
                {{ getAmountPerdose.lowerLimit }} - {{  getAmountPerdose.upperLimit }} mg, g or MU
            </span>
            <span v-else>
                Total Daily Dosage : {{ getAmountPerdose }}
            </span>
        </p>
    </div>
</template>