<script setup>
import { FwbButton } from 'flowbite-vue'
import { useDosageStore } from '~/stores/dosage'
import { useREF_FREQStore } from '~/stores/ref_freq'
import { useTabATP_CATALOGStore } from '~/stores/tab-atp-catalog'

const dosageStore = useDosageStore()
const ref_freqStore = useREF_FREQStore()
const tabATP_CATALOGStore = useTabATP_CATALOGStore()

const filterData = computed(() => {
    const filter = dosageStore.getFilter()
    return filter
})

function onChangeWeight(evt) {
    dosageStore.onChangeWeight(evt)
}

async function onChangeFrequency(filterObj) {
    dosageStore.onChangeFrequency(filterObj)
};

function clearFrequency() {
    filterData.value.selectedFrequency.val = ''
}

function clearValidity(fieldName) {
    dosageStore.clearValidity(fieldName)
}

function onClickNext() {
    // isDrugmodalOpen.value = true
    tabATP_CATALOGStore.fetchATPSByGenericClass()
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    // console.log('onClickNext', slideStore.getDirection);
    navigateTo('/dosage')
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
                <input
                    type="text"
                    @input="onChangeWeight($event)"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500"
                >
                <div v-show="!filterData.selectedWeight.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Weight ให้ถูกต้อง
                </div>
            </div>
        </div>
        <div class="flex md:items-center md:row-reverse justify-between md:justify-normal mb-6"
            :class="{ 'is-invalid': !filterData.selectedFrequency.isValid }">
            <div class="w-10/12 md:w-6/12 flex items-center  ">
                <div class="md:w-4/12"></div>
                <div class="w-10/12 md:w-4/12 md:items-center">
                    <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Frequency
                    </label>
                </div>
                <div class="w-4/12 md:items-center">
                    <div class="flex">
                        <label
                            class="block text-green-500 text-xl md:text-left mb-1 md:mb-0 pr-4">
                            {{ filterData.selectedFrequency.val || '-' }} <span v-if="filterData.selectedFrequency.val"> ครั้งต่อวัน</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="w-6/12 md:w-2/12 flex flex-row-reverse">
                <div>
                    <fwb-button
                        v-if="filterData.selectedFrequency.val"
                        @click.prevent="clearFrequency"
                        size="xs" color="light" pill
                        class="text-red-500 hover:text-white border-red-500 hover:bg-red-500 focus:outline-none mr-1">
                        <div class="flex">
                          <Icon class="" name="f7:clear" />
                        </div>
                    </fwb-button>
                    <FrequencySearchdropdown buttonText="Search" :isValid="filterData.selectedFrequency.isValid"
                        @selected-value="onChangeFrequency" @btn-clicked="clearValidity('selectedFrequency')" />
                    <div v-show="!filterData.selectedFrequency.isValid" class="text-red-400 text-sm mt-1">
                        กรุณาเลือก Frequency
                    </div>
                </div>
            </div>

        </div>

        <div class="flex justify-center mt-12">
            <LandingButton
                :disabled="!filterData.selectedFrequency.val && !filterData.selectedWeight.val"
                @click="onClickNext" type="button" size="lg">
                <p class="text-xl">Search</p>
            </LandingButton>
        </div>
    </form>
</template>