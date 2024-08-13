<script setup>
import { FwbButton, FwbModal } from 'flowbite-vue'
import Papa from 'papaparse';
const { create } = useStrapi()

const diagnosisStore = useDiagnosisStore()


const diagnosesData = computed(() => {
    const diagnoses = diagnosisStore.getDiagnosesName
    return diagnoses
})

const isDrugmodalOpen = ref(false)
const Duration = ref(0)
const FrequencyPerDay = ref('')
const selectedDrugId = ref(0)

const values = reactive({
    selectedDrug: {
        isValid: true,
        val: '',
        required: true
    },
    diagnosis: {
        isValid: true,
        val: '',
        required: true
    },
    subDiagnosis: {
        isValid: true,
        val: '',
        required: true
    },
    suspectOrganism: {
        isValid: true,
        val: '',
        required: true
    },
    ageRange: {
        isValid: true,
        val: '',
        required: true
    }
})

async function updateDrug(evt) {
    values.selectedDrug.val = evt.name

    values.diagnosis.val = ''
    values.subDiagnosis.val = ''
    values.suspectOrganism.val = ''

    selectedDrugId.value = evt.id
    // await diagnosisStore.fetchDiagnosesByDrug(selectedDrugId.value)
};

async function updateDiagnosis(evt) {
    values.diagnosis.val = evt

    values.subDiagnosis.val = ''
    values.suspectOrganism.val = ''

    // await ageGroupStore.fetchAgeGroupsByDiagnosis(values.diagnosis.val)
}

async function updateSubiagnosis(evt) {
    values.subDiagnosis.val = evt

    values.suspectOrganism.val = ''

    // diagnosisStore.mapSuspectedOrganisms(evt)

    // await ageGroupStore.fetchAgeGroupsByDiagnosis(
    //     values.diagnosis.val,
    //     values.subDiagnosis.val
    // )
}

async function updateSuspectedOrganism(evt) {
    values.suspectOrganism.val = evt;

    // await ageGroupStore.fetchAgeGroupsByDiagnosis(
    //     values.diagnosis.val,
    //     values.subDiagnosis.val,
    //     values.suspectOrganism.val
    // )
}

async function updateAgeGroup(evt) {
    // const dianogsis = diagnosisStore.getDiagnosis(
    //     values.diagnosis.val,
    //     values.subDiagnosis.val,
    //     values.suspectOrganism.val
    // )
    // await dosageStore.fetchDosagesByDrugAgegroup(selectedDrugId.value, evt.id, dianogsis.id)
}

function clearValidity(fieldName) {
    values[fieldName].isValid = true
}


function onClickCal() {

    const numberRegex = /\d+/;
    // const match = dosagesData.value[0].DosagePerDay.match(numberRegex);

    // const doseNum = match ? parseInt(match[0], 10) : null;

    // Duration.value = dosagesData.value[0].Duration
    // FrequencyPerDay.value = dosagesData.value[0].FrequencyPerDay

    // isDrugmodalOpen.value = true

    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    console.log('onClickCal', slideStore.getDirection);
    navigateTo('/cpg')

}

async function inputTAB(event) {
    const file = event.target.files[0]
    let fileData = null
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
            console.log(results.data);
            fileData = results.data
            for (let i = 0; i < fileData.length; i++) {
                const element = fileData[i];
                const response = await create('tab-atp-catalogs', element)
                if (response && response.error) {
                    console.log(response.error);
                }
            }
        }.bind(this)
    })

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
                        <DrugModal btn-text="ข้อมูลยา" :drug-id="selectedDrugId" v-if="values.selectedDrug.val" />
                    </div>
                </div>
            </div>
            <div class="w-6/12 md:w-2/12 flex flex-row-reverse">
                <div>
                    <CriteriaSearchdropdown buttonText="ค้นหายา" :isValid="values.selectedDrug.isValid"
                        @selected-value="updateDrug" @btn-clicked="clearValidity('selectedDrug')" />
                    <div v-show="!values.selectedDrug.isValid" class="text-red-400 text-sm mt-1">
                        กรุณาเลือกยา
                    </div>
                </div>

            </div>

        </div>

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.diagnosis.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    โรค
                </label>
            </div>
            <div class="md:w-1/3">
                <select data-testid="diagnosis-input" v-model="values.diagnosis.val"
                    :disabled="!values.selectedDrug.val" @change="updateDiagnosis(values.diagnosis.val)"
                    @blur="clearValidity('diagnosis')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="diagnosis in diagnosesData" :value="diagnosis">
                        {{ diagnosis }}
                    </option>
                </select>
                <div v-show="!values.diagnosis.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือกโรค
                </div>
            </div>
        </div>
        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.subDiagnosis.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    ลักษณะโรค 1
                </label>
            </div>
            <div class="md:w-1/3">
                <select data-testid="subDiagnosis-input" v-model="values.subDiagnosis.val"
                    :disabled="!values.diagnosis.val" @change="updateSubiagnosis(values.subDiagnosis.val)"
                    @blur="clearValidity('subDiagnosis')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="subDiagnoses in subDiagnosesData" :value="subDiagnoses">
                        {{ subDiagnoses }}
                    </option>
                </select>
                <div v-show="!values.diagnosis.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือกลักษณะโรค 1
                </div>
            </div>
        </div>
        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.suspectOrganism.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    ลักษณะโรค 2
                </label>
            </div>
            <div class="md:w-1/3">
                <select data-testid="suspectOrganism-input" v-model="values.suspectOrganism.val"
                    :disabled="!values.subDiagnosis.val" @change="updateSuspectedOrganism(values.suspectOrganism.val)"
                    @blur="clearValidity('suspectOrganism')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="suspectedOrganism in suspectedOrganismsData" :value="suspectedOrganism">
                        {{ suspectedOrganism }}
                    </option>
                </select>
                <div v-show="!values.diagnosis.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือกลักษณะโรค 2
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
                <select data-testid="ageRange-input" v-model="values.ageRange.val"
                    :disabled="!values.suspectOrganism.val" @change="updateAgeGroup(values.ageRange.val)"
                    @blur="clearValidity('ageRange')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="ageGroup in ageGroupsData" :value="ageGroup">
                        {{ ageGroup.AgeRange }}
                    </option>

                </select>
                <div v-show="!values.ageRange.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือกช่วงอายุ
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-12">
            <!-- <input type="file" @change="inputTAB" multiple> -->
            <LandingButton data-testid="criteria-next-button" @click="onClickCal" type="button" size="lg">
                <p class="text-xl">Next</p>
            </LandingButton>
            <!-- <LandingModal :show="isDrugmodalOpen" title="ผลการคำนวนยา" @close="isDrugmodalOpen = false"
                @close-cancel="isDrugmodalOpen = false">
                <div  style="display: flex; justify-content: center" class="md:w-3/3 text-xl">
                    <h3>
                        <span class="font-bold">ครั้งต่อวัน</span> {{ FrequencyPerDay }}

                    </h3>
                </div>
                <div style="display: flex; justify-content: center" class="md:w-3/3 text-xl">
                    <h3>
                        <span class="font-bold">ระยะเวลา</span> {{ Duration }}
                    </h3>
                </div>
                
                <DrugDetails />
            </LandingModal> -->
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