<script setup lang="ts">
import { useDosageStore } from '~/stores/dosage';
import { useMsdcpgStore } from '~/stores/msdcpg'
import { useTabATP_CATALOGStore } from '~/stores/tab-atp-catalog'

const dosageStore = useDosageStore()
const msdcpgStore = useMsdcpgStore()

const filterData = computed(() => {
    const filter = dosageStore.getFilter()
    return filter
})

const msdcpgData = computed(() => {
    const rawmsdcpg = msdcpgStore.getMsdcpg()
    console.log('msdcpgData : ', rawmsdcpg);

    return rawmsdcpg
})

const getTotalDailyDosage = computed(() => {
    const totalDailyDosage = dosageStore.getTotalDailyDosage()
    // console.log('getTotalDailyDosage : ', getTotalDailyDosage);

    return totalDailyDosage
})

const getAmountPerdose = computed(() => {
    const totalDailyDosage = dosageStore.amountPerDose()
    return totalDailyDosage
})

const getmlPerDose = computed(() => {
    const mlPerDose = dosageStore.mlPerDose()
    return mlPerDose
})

function isDisplaySingleValue(dosageObject: any) {
    let returnBoolean = false
    if (dosageObject.lowerLimit === dosageObject.upperLimit) {
        returnBoolean = true
    }
    if (!dosageObject.upperLimit) {
        returnBoolean = true
        
    }
    if (dosageObject.upperLimit === 0) {
        returnBoolean = true
    }
   return returnBoolean
}
</script>

<template>
    <div v-if="filterData.selectedFrequency.val && filterData.selectedWeight.val">
        <div class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
            <p v-if="getTotalDailyDosage.lowerLimit" class="text-white text-3xl md:text-2xl">Total Daily Dosage :
                <span v-if="isDisplaySingleValue(getTotalDailyDosage)" class="text-lime-300">
                    {{ getTotalDailyDosage.lowerLimit }} {{ getTotalDailyDosage.unit }}
                </span>
                <span v-else class="text-lime-300">
                    <!-- {{ getTotalDailyDosage.lowerLimit }} - {{ getTotalDailyDosage.upperLimit }} mg, g or MU -->
                    {{ getTotalDailyDosage.lowerLimit }} - {{ getTotalDailyDosage.upperLimit }} {{
                    getTotalDailyDosage.unit }}
                </span>
            </p>
            <p v-else class="text-white text-3xl md:text-2xl">Total Daily Dosage : -</p>
        </div>

        <div class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
            <p v-if="getAmountPerdose.lowerLimit" class="text-white text-3xl md:text-2xl">Amount per Dose :
                <span v-if="isDisplaySingleValue(getAmountPerdose)" class="text-lime-300">
                    {{ getAmountPerdose.lowerLimit }} {{ getAmountPerdose.unit }}
                </span>
                <span v-else class="text-lime-300">
                    <!-- {{ getAmountPerdose.lowerLimit }} - {{ getAmountPerdose.upperLimit }} mg, g or MU -->
                    {{ getAmountPerdose.lowerLimit }} - {{ getAmountPerdose.upperLimit }} {{ getAmountPerdose.unit }}
                </span>
            </p>
            <p v-else class="text-white text-3xl md:text-2xl">
                <span>
                    Amount per Dose :
                    <span class="text-lime-300">
                        {{ getAmountPerdose.DOSE_CHECK }}
                    </span>
                </span>
            </p>
        </div>

        <div v-if="msdcpgData.ROUTE === 'PO' && getmlPerDose.tabATP && getmlPerDose.tabATP.STR_CONTENT === 'mL'"
            class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
            <p v-if="isDisplaySingleValue(getmlPerDose)" class="text-white text-3xl md:text-2xl">
                <span>
                    ml per Dose :
                    <span class="text-lime-300">
                        {{ getmlPerDose.lowerLimit }} ml
                    </span>
                </span>
            </p>
            <p v-else-if="getmlPerDose.lowerLimit" class="text-white text-3xl md:text-2xl">ml per dose :
                <span class="text-lime-300">
                    {{ getmlPerDose.lowerLimit }} - {{ getmlPerDose.upperLimit }} ml
                </span>
            </p>
            <p v-else class="text-white text-3xl md:text-2xl">
                <span>
                    ml per Dose :
                    <span class="text-lime-300">
                        {{ getmlPerDose.mlPerDose }}
                    </span>
                </span>
            </p>
        </div>
        <div v-else
            class="bg-green-900 px-20 py-2 my-10 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
            <p class="text-white text-3xl md:text-2xl">
                คำนวณเฉพาะยารับประทานชนิดน้ำเท่านั้น
            </p>
        </div>
    </div>
</template>