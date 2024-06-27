<script setup>
import { FwbButton, FwbModal } from 'flowbite-vue'
// const valuesAreValid = 

const isDrugmodalOpen = ref(false)
const isLiquid = ref(false)
const selectedDrugId = ref(0)

const values = reactive({
    selectedDrug: {
        isValid: true,
        val: '',
        required: true
    },
    desease: {
        isValid: true,
        val: '',
        required: true
    },
    ageRange: {
        isValid: true,
        val: '',
        required: true
    },
    weight: {
        isValid: true,
        val: '',
        required: true
    },
    concentration: {
        isValid: true,
        val: '',
        required: false
    }
})

function updateDrug(evt) {
    values.selectedDrug.val = evt.name
    selectedDrugId.value = evt.id
};

function clearValidity(fieldName) {
    values[fieldName].isValid = true
}


function onClickCal() {
    isDrugmodalOpen.value = true

    Object.assign(values, validateForm(values)) // equivalent to reassign
    if (isFormValidate(values)) {
        console.log('isFormValidate(values)');
    }

}
</script>

<template>
    <form id="form" class="px-7 md:px-0" novalidate>
        <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
        <input type="checkbox" class="hidden" style="display: none" name="botcheck" />
        <div class="flex md:items-center md:row-reverse justify-between md:justify-normal mb-6"
            :class="{ 'is-invalid': !values.selectedDrug.isValid }">
            <div class="w-10/12 md:w-6/12 flex items-center  ">
                <div class="md:w-4/12"></div>
                <div class="w-10/12 md:w-4/12 md:items-center">
                    <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                        ยาที่ต้องการคำนวน
                    </label>
                </div>
                <div class="w-4/12 md:items-center">
                    <div class="flex">
                        <label data-testid="selected-drug-text"
                            class="block text-green-500 text-xl md:text-left mb-1 md:mb-0 pr-4">
                            {{ values.selectedDrug.val || '-' }}
                        </label>
                        <DrugModal btn-text="ข้อมูลยา" :drug-id="selectedDrugId"
                            v-if="values.selectedDrug.val" />
                    </div>
                </div>
            </div>
            <div class="w-6/12 md:w-2/12 flex flex-row-reverse">
                <div>
                    <WeightSearchdropdown buttonText="ค้นหายา" :isValid="values.selectedDrug.isValid"
                        @selected-value="updateDrug" @btn-clicked="clearValidity('selectedDrug')" />
                    <div v-show="!values.selectedDrug.isValid" class="text-red-400 text-sm mt-1">
                        กรุณาเลือกยา
                    </div>
                </div>

            </div>

        </div>
        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.desease.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    โรค
                </label>
            </div>
            <div class="md:w-1/3">
                <select data-testid="desease-input" v-model="values.desease.val" @blur="clearValidity('desease')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option>Analgesic</option>
                    <option>Antipyretic</option>
                    <option>Juvenile rheumatoid arthritis (JRA)</option>
                </select>
                <div v-show="!values.desease.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือกโรค
                </div>
            </div>
        </div>
        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.ageRange.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    ช่วงอายุ
                </label>
            </div>
            <div class="md:w-1/3">
                <select data-testid="ageRange-input" v-model="values.ageRange.val" @blur="clearValidity('ageRange')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option>อายุ 1 - 3 เดือน</option>
                    <option>อายุ 3 - 6 เดือน</option>
                    <option>อายุ 7 เดือน - 1 ปี</option>
                </select>
                <div v-show="!values.ageRange.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือกช่วงอายุ
                </div>
            </div>
        </div>
        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.weight.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-password">
                    น้ำหนัก (กิโลกรัม)
                </label>
            </div>
            <div class="md:w-1/3">
                <label class="sr-only">Weight</label>
                <input data-testid="weight-input" v-model="values.weight.val" @blur="clearValidity('weight')"
                    type="number" placeholder="สามารถระบุเป็นจุดทศนิยมได้" required
                    class="w-full px-4 py-3 border-2 text-xl placeholder:text-green-800 rounded-md outline-none border-green-200 focus:ring-0 focus:border-green-500 ring-green-100" />
                <!-- <div class="empty-feedback text-red-400 text-sm mt-1">
                    Please provide your email address.
                </div>
                <div class="invalid-feedback text-red-400 text-sm mt-1">
                    Please provide a valid email address.
                </div> -->
                <div v-show="!values.ageRange.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาใส่น้ำหนักให้ถูกต้อง
                </div>
            </div>
        </div>
        <div v-if="isLiquid" class="md:flex md:items-center mb-6"
            :class="{ 'is-invalid': !values.concentration.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    ความเข้มข้น (กรณียาน้ำ)
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="values.concentration.val" @blur="clearValidity('concentration')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-green-500">
                    <option>125mg / 5ml</option>
                    <option>250mg / 1ml</option>
                    <option>250mg / 5ml</option>
                </select>
                <div v-show="!values.concentration.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือกความเข้มข้น
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-12">
            <LandingButton data-testid="submit-weightForm-button" @click="onClickCal" type="button" size="lg">
                <p class="text-xl">คำนวน</p>
            </LandingButton>
            <LandingModal :show="isDrugmodalOpen" title="An error occurred!" @close="isDrugmodalOpen = false"
                @close-cancel="isDrugmodalOpen = false">
                <DrugDetails />
            </LandingModal>
        </div>
        <div id="result" class="mt-3 text-center"></div>
    </form>
</template>

<style>
.invalid-feedback,
.empty-feedback {
    display: none;
}

.is-invalid,
.was-validated :invalid {
    border-color: #dc3545;
}
</style>