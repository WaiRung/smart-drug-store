<script setup>
import { FwbButton, FwbModal } from 'flowbite-vue'
import Papa from 'papaparse';
const { create } = useStrapi()
import { useTabATP_CATALOGStore } from '@/stores/tab-atp-catalog'
import { useGenericStore } from '~/stores/generic'
import { useGroupStore } from '~/stores/group'
import { useAgeStore } from '~/stores/age'

const genericStore = useGenericStore()
const tabATP_CATALOGStore = useTabATP_CATALOGStore()
const groupStore = useGroupStore()
const ageStore = useAgeStore()

const groupData = computed(() => {
    const groups = groupStore.getGroups()
    return groups
})

const ageData = computed(() => {
    const ages = ageStore.getAges()
    return ages
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
    group: {
        isValid: true,
        val: '',
        required: true
    },
    age: {
        isValid: true,
        val: '',
        required: true
    },
    infectSite: {
        isValid: true,
        val: '',
        required: true
    },
    suspectOrganism: {
        isValid: true,
        val: '',
        required: true
    },
})

async function updateClass(evt) {

    values.selectedClass.val = evt

    values.selectedGeneric.val = ''
    values.group.val = ''
    values.suspectOrganism.val = ''
    

    await genericStore.fetchGenerics(evt)
};

async function updateGeneric(evt) {
    values.selectedGeneric.val = evt

    values.group.val = ''
    values.suspectOrganism.val = ''

    await tabATP_CATALOGStore.fetchClasses(evt)
    

    await groupStore.fetchGroupsByGeneric(evt)
}

async function updateGroup(evt) {
    values.group.val = evt

    values.suspectOrganism.val = ''

    
    await ageStore.fetchAgesByGroup(evt)
}

async function updateAge(evt) {
    values.age.val = evt
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
        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.group.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Group
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="values.group.val" @change="updateGroup(values.group.val)"
                    @blur="clearValidity('group')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="group in groupData" :value="group">
                        {{ group }}
                    </option>
                </select>
                <div v-show="!values.selectedGeneric.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Group
                </div>
            </div>
        </div>

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !values.age.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Age
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="values.age.val" @change="updateAge(values.age.val)"
                    @blur="clearValidity('age')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="age in ageData" :value="age">
                        {{ age }}
                    </option>
                </select>
                <div v-show="!values.selectedGeneric.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Age
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