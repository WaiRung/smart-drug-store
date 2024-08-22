<script setup>
import { FwbButton, FwbModal } from 'flowbite-vue'
import Papa from 'papaparse';
const { create } = useStrapi()
import { useTabATP_CATALOGStore } from '@/stores/tab-atp-catalog'
import { useGenericStore } from '~/stores/generic'
import { useGroupStore } from '~/stores/group'
import { useAgeStore } from '~/stores/age'
import { usePatienttypeStore } from '~/stores/patient_type'
import { useInfectsiteStore } from '~/stores/infect_site'

const genericStore = useGenericStore()
const tabATP_CATALOGStore = useTabATP_CATALOGStore()
const groupStore = useGroupStore()
const ageStore = useAgeStore()
const patientTypeStore = usePatienttypeStore()
const infectSiteStore = useInfectsiteStore()

const groupData = computed(() => {
    const groups = groupStore.getGroups()
    return groups
})

const ageData = computed(() => {
    const ages = ageStore.getAges()
    return ages
})

const patienttypeData = computed(() => {
    const patienttypes = patientTypeStore.getPatienttypes()
    return patienttypes
})

const infectsiteData = computed(() => {
    const infectsites = infectSiteStore.getInfectsites()
    return infectsites
})

const values = reactive({
    selectedClass: {
        isValid: true,
        val: '',
        required: true
    },
    selectedGeneric: {
        isValid: true,
        val: '',
        required: true
    },
    selectedGroup: {
        isValid: true,
        val: '',
        required: true
    },
    selectedAge: {
        isValid: true,
        val: '',
        required: true
    },
    selectedPatienttype: {
        isValid: true,
        val: '',
        required: true
    },
    selectedInfectSite: {
        isValid: true,
        val: '',
        required: true
    },
})

async function updateClass(evt) {

    values.selectedClass.val = evt

    values.selectedGeneric.val = ''
    values.selectedGroup.val = ''
    values.selectedPatienttype.val = ''
    values.selectedInfectSite.val = ''

    

    await genericStore.fetchGenerics(evt)
};

async function updateGeneric(evt) {
    values.selectedGeneric.val = evt

    values.selectedGroup.val = ''
    values.selectedAge.val = ''
    values.selectedPatienttype.val = ''
    values.selectedInfectSite.val = ''

    await tabATP_CATALOGStore.fetchClasses(evt)
    
    await groupStore.fetchGroupsByGeneric(evt)
}

async function updateGroup(evt) {
    values.selectedGroup.val = evt

    values.selectedAge.val = ''
    values.selectedPatienttype.val = ''
    values.selectedInfectSite.val = ''


    
    await ageStore.fetchAgesByGenericGroup(values.selectedGeneric.val, evt)
}

async function updateAge(evt) {
    values.selectedAge.val = evt

    values.selectedPatienttype.val = ''
    values.selectedInfectSite.val = ''

    await patientTypeStore.fetchPatientypeByGenericGroupAge(
        values.selectedGeneric.val, 
        values.selectedGroup.val,
        values.selectedAge.val
    )
}

async function updatePatienttype(evt) {
    values.selectedPatienttype.val = evt

    values.selectedInfectSite.val = ''

    await infectSiteStore.fetchInfecttypeByGenericGroupAgePatienttype(
        values.selectedGeneric.val, 
        values.selectedGroup.val,
        values.selectedAge.val,
        values.selectedPatienttype.val
    )
}

async function updateInfectsite(evt) {
    values.selectedInfectSite.val = evt


}

function clearValidity(fieldName) {
    values[fieldName].isValid = true
}


function onClickNext() {

    const numberRegex = /\d+/;
    // const match = dosagesData.value[0].DosagePerDay.match(numberRegex);

    // const doseNum = match ? parseInt(match[0], 10) : null;

    // Duration.value = dosagesData.value[0].Duration
    // FrequencyPerDay.value = dosagesData.value[0].FrequencyPerDay

    // isDrugmodalOpen.value = true

    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    console.log('onClickNext', slideStore.getDirection);
    navigateTo('/cpg')

}

async function inputTAB(event) {
    const file = event.target.files[0]
    let fileData = null
    Papa.parse(file, {
        header: true,
        encoding: "ISO-8859-1",
        skipEmptyLines: true,
        complete: async function (results) {
            console.log(results.data);
            fileData = results.data
            for (let i = 0; i < fileData.length; i++) {
                const element = fileData[i];
                // const response = await create('tab-atp-catalogs', element)
                // if (response && response.error) {
                //     console.log(response.error);
                // }
                console.log(element);

            }
        }.bind(this)
    })
}

async function inputMSD(event) {
    var reader = new FileReader();
    reader.onload = async function (event) {
        var jsonObj = JSON.parse(event.target.result);
        
        for (let i = 0; i < jsonObj.length; i++) {
            const element = jsonObj[i];
            console.log(element);
            // const response = await create('msd-cpgs', element)
            //     if (response && response.error) {
            //         console.log(response.error);
            //     }
        }
    }
    reader.readAsText(event.target.files[0]);
}
</script>

<template>
    <form id="form" class="px-7 md:px-0" novalidate>
        <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
        <input type="checkbox" class="hidden" style="display: none" name="botcheck" />

        <div class="flex md:items-center md:row-reverse justify-between md:justify-normal mb-6"
            :class="{ 'is-invalid': !values.selectedClass.isValid }">
            <div class="w-10/12 md:w-6/12 flex items-center  ">
                <div class="md:w-4/12"></div>
                <div class="w-10/12 md:w-4/12 md:items-center">
                    <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Class
                    </label>
                </div>
                <div class="w-4/12 md:items-center">
                    <div class="flex">
                        <label data-testid="selected-drug-text"
                            class="block text-green-500 text-xl md:text-left mb-1 md:mb-0 pr-4">
                            {{ values.selectedClass.val || '-' }}
                        </label>
                        <!-- <ClassModal btn-text="Search Class" :class-data="selectedClass" v-if="values.selectedClass.val" /> -->
                    </div>
                </div>
            </div>
            <div class="w-6/12 md:w-2/12 flex flex-row-reverse">
                <div>
                    <ClassSearchdropdown buttonText="Search Class" :isValid="values.selectedClass.isValid"
                        @selected-value="updateClass" @btn-clicked="clearValidity('selectedClass')" />
                    <div v-show="!values.selectedClass.isValid" class="text-red-400 text-sm mt-1">
                        กรุณาเลือก Class
                    </div>
                </div>
            </div>

        </div>

        <div class="flex md:items-center md:row-reverse justify-between md:justify-normal mb-6"
            :class="{ 'is-invalid': !values.selectedGeneric.isValid }">
            <div class="w-10/12 md:w-6/12 flex items-center  ">
                <div class="md:w-4/12"></div>
                <div class="w-10/12 md:w-4/12 md:items-center">
                    <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Generic
                    </label>
                </div>
                <div class="w-4/12 md:items-center">
                    <div class="flex">
                        <label class="block text-green-500 text-xl md:text-left mb-1 md:mb-0 pr-4">
                            {{ values.selectedGeneric.val || '-' }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="w-6/12 md:w-2/12 flex flex-row-reverse">
                <div>
                    <GenericSearchDropdown buttonText="Search Generic" :isValid="values.selectedGeneric.isValid"
                        @selected-value="updateGeneric" @btn-clicked="clearValidity('selectedGeneric')" />
                    <div v-show="!values.selectedGeneric.isValid" class="text-red-400 text-sm mt-1">
                        กรุณาเลือก Generic
                    </div>
                </div>
            </div>
        </div>
        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.selectedGroup.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Group
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="values.selectedGroup.val" @change="updateGroup(values.selectedGroup.val)"
                    @blur="clearValidity('selectedGroup')"
                    :disabled="!values.selectedGeneric.val"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="group in groupData" :value="group">
                        {{ group }}
                    </option>
                </select>
                <div v-show="!values.selectedGroup.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Group
                </div>
            </div>
        </div>

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.selectedAge.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Age
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="values.selectedAge.val" @change="updateAge(values.selectedAge.val)"
                    @blur="clearValidity('selectedAge')"
                    :disabled="!values.selectedGroup.val"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="age in ageData" :value="age">
                        {{ age }}
                    </option>
                </select>
                <div v-show="!values.selectedGroup.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Age
                </div>
            </div>
        </div>

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.selectedAge.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Patient Type
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="values.selectedPatienttype.val" @change="updatePatienttype(values.selectedPatienttype.val)"
                    @blur="clearValidity('selectedPatienttype')"
                    :disabled="!values.selectedAge.val"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="patienttype in patienttypeData" :value="patienttype">
                        {{ patienttype }}
                    </option>
                </select>
                <div v-show="!values.selectedPatienttype.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Patient Type
                </div>
            </div>
        </div>

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.selectedAge.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Infect Site
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="values.selectedInfectSite.val" @change="updateInfectsite(values.selectedInfectSite.val)"
                    @blur="clearValidity('selectedInfectSite')"
                    :disabled="!values.selectedPatienttype.val"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="infectsite in infectsiteData" :value="infectsite">
                        {{ infectsite }}
                    </option>
                </select>
                <div v-show="!values.selectedInfectSite.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Infect Site
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-12">
            <!-- <input type="file" @change="inputTAB" multiple> -->
            <!-- <input type="file" @change="inputMSD" multiple> -->
            <LandingButton data-testid="criteria-next-button" @click="onClickNext" type="button" size="lg">
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
                
                <ClassDetails />
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