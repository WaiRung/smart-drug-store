<script setup>
import { useMsdcpgStore } from '~/stores/msdcpg'
import { useDosageStore } from '~/stores/dosage'
import { useREF_FREQStore } from '~/stores/ref_freq'
import { useTabATP_CATALOGStore } from '~/stores/tab-atp-catalog'

const msdcpgStore = useMsdcpgStore()
const dosageStore = useDosageStore()
const ref_freqStore = useREF_FREQStore()
const tabATP_CATALOGStore = useTabATP_CATALOGStore()

const filterData = computed(() => {
    const filter = dosageStore.getFilter()
    return filter
})

const msdcpgDetail = computed(() => {
    const rawmsdcpg = msdcpgStore.getMsdcpg()
    const msdcpg = {
        ...rawmsdcpg,
        DOSE_CHECK: `${rawmsdcpg.DOSE_L}${rawmsdcpg.DOSE_U ? '-' + rawmsdcpg.DOSE_U : ''} ${rawmsdcpg.DOSE_UNIT}${rawmsdcpg.DOSE_LBL} ${rawmsdcpg.DRUG_RM}`,
        // DOSE_M_CHECK: `${msdcpg.DOSE_M} ${msdcpg.DOSE_M_UNIT}${msdcpg.DOSE_M_LBL}`
    }
    return msdcpg
})

const formData = computed(() => {
    const forms = tabATP_CATALOGStore.getATPs()
    console.log(forms);

    return forms
})

const frequencyData = computed(() => {
    const frequencies = ref_freqStore.getFrequencies()
    console.log(frequencies);

    return frequencies
})

async function fetchfrequencies(msdcpgFREQ) {
    await ref_freqStore.fetchfrequencies(msdcpgFREQ)
}

await fetchfrequencies(msdcpgDetail.value.FREQ)

function onChangeWeight(evt) {
    dosageStore.onChangeWeight(evt)
}

async function onChangeFrequency(filterObj) {
    dosageStore.onChangeFrequency(filterObj)
};

async function onChangeForm(filterObj) {
    dosageStore.onChangeForm(filterObj)
};

function clearValidity(fieldName) {
    dosageStore.clearValidity(fieldName)
}
</script>

<template>
    <form id="form" class="px-7 md:px-0" novalidate>
        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !filterData.selectedWeight.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Weight (Kg.)
                </label>
            </div>
            <div class="md:w-1/3">
                <input type="text" @input="onChangeWeight($event)"
                    v-model="filterData.selectedWeight.val"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                <div v-show="!filterData.selectedWeight.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Weight ให้ถูกต้อง
                </div>
            </div>
        </div>
        <div class="md:flex md:items-center mb-6"
            :class="{ 'is-invalid': !filterData.selectedFrequency.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Frequency
                </label>
            </div>
            <div class="md:w-1/3 sm:w-full">
                <select v-model="filterData.selectedFrequency.val"
                    @change="onChangeFrequency(filterData.selectedFrequency.val)"
                    @blur="clearValidity('selectedFrequency')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="frequency in frequencyData" :value="frequency.Time">
                        {{ frequency.FREQ_LBL }}
                    </option>
                </select>
                <div v-show="!filterData.selectedFrequency.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Frequency
                </div>
            </div>
        </div>
        <div class="md:flex md:items-center mb-6"
            :class="{ 'is-invalid': !filterData.selectedForm.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Drug Form
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="filterData.selectedForm.val" @change="onChangeForm(filterData.selectedForm.val)"
                    @blur="clearValidity('selectedForm')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="form in formData" :value="form.FORM">
                        {{ form.TRADE_NAME }} {{ form.FORM }}
                    </option>
                </select>
                <div v-show="!filterData.selectedForm.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Frequency
                </div>
            </div>
        </div>
    </form>
</template>