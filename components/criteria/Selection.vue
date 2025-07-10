<script setup>
import Papa from 'papaparse';
const { create } = useStrapi()
import { useTabATP_CATALOGStore } from '@/stores/tab-atp-catalog'
import { useGenericStore } from '~/stores/generic';
import { useGroupStore } from '~/stores/group'
import { useAgeStore } from '~/stores/age'
import { usePatienttypeStore } from '~/stores/patient_type'
import { useInfectsiteStore } from '~/stores/infect_site'
import { useDiagnosisStore } from '~/stores/diagnosis'
import { useServerityStore } from '~/stores/serverity'
import { useRiskorganismStore } from '~/stores/risk_organism'
import { useHypersensitivityStore } from '~/stores/hypersenstivity'
import { useMsdcpgStore } from '~/stores/msdcpg'

const tabATP_CATALOGStore = useTabATP_CATALOGStore()
const genericStore = useGenericStore()
const groupStore = useGroupStore()
const ageStore = useAgeStore()
const patientTypeStore = usePatienttypeStore()
const infectSiteStore = useInfectsiteStore()
const diagnosisStore = useDiagnosisStore()
const serverityStore = useServerityStore()
const riskOrganismStore = useRiskorganismStore()
const hypersenstivityStore = useHypersensitivityStore()
const msdcpgStore = useMsdcpgStore()

const groupData = computed(() => {
    const groups = groupStore.getGroups()
    if (filterData.value.selectedDiagnosis.val === 'Viral Pneumonia') {
        return groups
            .filter(
                group => !['NB', 'NB: Preterm <30 wk', 'NB: Preterm 30-34 wk', 'NB: Near-term >34 wk']
                    .includes(group)
            )
            .concat('ADULT');
    }
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

const diagnosisData = computed(() => {
    const diagnoses = diagnosisStore.getDiagnoses()
    return diagnoses
})

const serverityData = computed(() => {
    const serverities = serverityStore.getServerities()
    return serverities
})

const riskOrgnaismData = computed(() => {
    const riskOrganisms = riskOrganismStore.getRiskOrganisms()
    return riskOrganisms
})

const hypersenstivityData = computed(() => {
    const hypersenstivities = hypersenstivityStore.getHypersensitivities()
    return hypersenstivities
})

const filterData = computed(() => {
    const filter = msdcpgStore.getFilter()
    return filter
})

const ageDisabled = computed(() => {
    const isViralPneumonia = (
        filterData.value.selectedDiagnosis.val === 'Viral Pneumonia'
    )
    const isGroupisEmpty = filterData.value.selectedGroup.val === ''
    const isAgeDataEmpty = ageData.value.length === 0
    if (isViralPneumonia) {
        return true
    } else {
        return isGroupisEmpty || isAgeDataEmpty
    }
})

const serverityDisabled = computed(() => {
    const isViralPneumonia = (
        filterData.value.selectedDiagnosis.val === 'Viral Pneumonia'
    )
    const isGroupisEmpty = filterData.value.selectedGroup.val === ''
    const isServerityDataEmpty = serverityData.value.length === 0

    const isAgeisEmpty = ageData.value.length === 0
    
    if (isViralPneumonia) {
        return isGroupisEmpty || isServerityDataEmpty
    } else {
        return isAgeisEmpty || isServerityDataEmpty
    }
})

const hypersenstivitiesDisabled = computed(() => {
    const isViralPneumonia = (
        filterData.value.selectedDiagnosis.val === 'Viral Pneumonia'
    )

    const isHypersensitivityDataEmpty = hypersenstivityData.value.length === 0
    const isHypersensitivityDataisBlank = (
        hypersenstivityData.value.length === 1 &&
        hypersenstivityData.value[0] === ''
    )

    if (isViralPneumonia) {
        return true
        
    } else {
        return isHypersensitivityDataEmpty || isHypersensitivityDataisBlank
    }

})

async function fetchInfectsite() {
    await infectSiteStore.fetchInfectsite()
}
fetchInfectsite()


async function updateGroup(evt) {
    msdcpgStore.updateGroup(evt)
    const isViralPneumonia = (
        filterData.value.selectedDiagnosis.val === 'Viral Pneumonia'
    )
    if (isViralPneumonia) {
        msdcpgStore.updateAge('')
    }
}

async function updateAge(evt) {
    msdcpgStore.updateAge(evt)
}

async function updatePatienttype(evt) {
    msdcpgStore.updatePatienttype(evt)
}

async function updateInfectsite(evt) {
    msdcpgStore.updateInfectsite(evt)
}

async function updateDiagnosis(evt) {
    serverityStore.clearServerity()
    msdcpgStore.updateDiagnosis(evt)
}

async function updateServerity(evt) {
    msdcpgStore.updateServerity(evt)
}

async function updateRiskorganism(evt) {
    msdcpgStore.updateRiskOrganism(evt)
}

async function updateHypersensitivity(evt) {
    msdcpgStore.updateHypersensitivity(evt)
}

function clearValidity(fieldName) {
    msdcpgStore.clearValidity(fieldName)
}


function onClickNext() {
    msdcpgStore.fetchMsdcpgsByFilter()
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    // navigateTo('/cpg')
    navigateTo('/recommended')
}

async function inputTAB(event) {
    const file = event.target.files[0]
    let fileData = null
    Papa.parse(file, {
        header: true,
        encoding: "ISO-8859-1",
        skipEmptyLines: true,
        complete: async function (results) {
            console.log('results.data', results.data);
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

// https://tableconvert.com/excel-to-json
async function inputMSD(event) {
    var reader = new FileReader();
    reader.onload = async function (event) {
        var jsonObj = JSON.parse(event.target.result);

        for (let i = 0; i < jsonObj.length; i++) {
            const element = jsonObj[i];
            console.log(i, element);
            const response = await create('msd-cpgs', element)
            if (response && response.error) {
                console.log(response.error);
            }
        }
    }
    reader.readAsText(event.target.files[0]);
}

async function inputATB_INFO_ADJUST(event) {
    var reader = new FileReader();
    reader.onload = async function (event) {
        var jsonObj = JSON.parse(event.target.result);

        for (let i = 0; i < jsonObj.length; i++) {
            const element = jsonObj[i];
            console.log(element);
            // const response = await create('atb-info-adjusts', element)
            //     if (response && response.error) {
            //         console.log(response.error);
            //     }
        }
    }
    reader.readAsText(event.target.files[0]);
}

async function inputATB_INFO_ALERT(event) {
    var reader = new FileReader();
    reader.onload = async function (event) {
        var jsonObj = JSON.parse(event.target.result);

        for (let i = 0; i < jsonObj.length; i++) {
            const element = jsonObj[i];
            console.log(element);
            // const response = await create('atb-info-alerts', element)
            //     if (response && response.error) {
            //         console.log(response.error);
            //     }
        }
    }
    reader.readAsText(event.target.files[0]);
}

async function inputATB_INFO_DDI(event) {
    var reader = new FileReader();
    reader.onload = async function (event) {
        var jsonObj = JSON.parse(event.target.result);

        for (let i = 0; i < jsonObj.length; i++) {
            const element = jsonObj[i];
            console.log(element);
            // const response = await create('atb-info-ddis', element)
            //     if (response && response.error) {
            //         console.log(response.error);
            //     }
        }
    }
    reader.readAsText(event.target.files[0]);
}

async function inputATB_INFO_AE(event) {
    var reader = new FileReader();
    reader.onload = async function (event) {
        var jsonObj = JSON.parse(event.target.result);

        for (let i = 0; i < jsonObj.length; i++) {
            const element = jsonObj[i];
            console.log(element);
            const response = await create('atb-info-aes', element)
            if (response && response.error) {
                console.log(response.error);
            }
        }
    }
    reader.readAsText(event.target.files[0]);
}
</script>

<template>
    <form id="form" class="px-7 md:px-0" novalidate>
        <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
        <input type="checkbox" class="hidden" style="display: none" name="botcheck" />

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !filterData.selectedInfectSite.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Infect Site
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="filterData.selectedInfectSite.val"
                    @change="updateInfectsite(filterData.selectedInfectSite.val)"
                    @blur="clearValidity('selectedInfectSite')"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="infectsite in infectsiteData" :value="infectsite">
                        {{ infectsite }}
                    </option>
                </select>
                <div v-show="!filterData.selectedInfectSite.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Infect Site
                </div>
            </div>
        </div>

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !filterData.selectedDiagnosis.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Diagnosis
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="filterData.selectedDiagnosis.val"
                    @change="updateDiagnosis(filterData.selectedDiagnosis.val)"
                    @blur="clearValidity('selectedDiagnosis')"
                    :disabled="!filterData.selectedInfectSite.val || diagnosisData.length === 0"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="diagnosis in diagnosisData" :value="diagnosis">
                        {{ diagnosis }}
                    </option>
                </select>
                <div v-show="!filterData.selectedDiagnosis.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Diagnosis
                </div>
            </div>
        </div>

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !filterData.selectedGroup.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Group
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="filterData.selectedGroup.val" @change="updateGroup(filterData.selectedGroup.val)"
                    @blur="clearValidity('selectedGroup')"
                    :disabled="!filterData.selectedDiagnosis.val || groupData.length === 0"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="group in groupData" :value="group">
                        {{ group }}
                    </option>
                </select>
                <div v-show="!filterData.selectedGroup.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Group
                </div>
            </div>
        </div>

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !filterData.selectedAge.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Age
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="filterData.selectedAge.val" @change="updateAge(filterData.selectedAge.val)"
                    @blur="clearValidity('selectedAge')"
                    :disabled="ageDisabled"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="age in ageData" :value="age">
                        {{ age }}
                    </option>
                </select>
                <div v-show="!filterData.selectedAge.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Age
                </div>
            </div>
        </div>

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !filterData.selectedServerity.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Serverity
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="filterData.selectedServerity.val"
                    @change="updateServerity(filterData.selectedServerity.val)"
                    @blur="clearValidity('selectedServerity')"
                    :disabled="serverityDisabled"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="serverity in serverityData" :value="serverity">
                        {{ serverity }}
                    </option>
                </select>
                <div v-show="!filterData.selectedServerity.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Serverity
                </div>
            </div>
        </div>

        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !filterData.selectedRiskorganism.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Risk Organism
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="filterData.selectedRiskorganism.val"
                    @change="updateRiskorganism(filterData.selectedRiskorganism.val)"
                    @blur="clearValidity('selectedRiskorganism')"
                    :disabled="!filterData.selectedServerity.val || riskOrgnaismData.length === 0"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="riskOrganism in riskOrgnaismData" :value="riskOrganism">
                        {{ riskOrganism }}
                    </option>
                </select>
                <div v-show="!filterData.selectedRiskorganism.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Risk Organism
                </div>
            </div>
        </div>

        <div class="md:flex md:items-center mb-6"
            :class="{ 'is-invalid': !filterData.selectedHypersensitivity.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Hypersensitivity
                </label>
            </div>
            <div class="md:w-1/3">
                <p></p>
                <select v-model="filterData.selectedHypersensitivity.val"
                    @change="updateHypersensitivity(filterData.selectedHypersensitivity.val)"
                    @blur="clearValidity('selectedHypersensitivity')" :disabled="hypersenstivitiesDisabled"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="hypersenstivity in hypersenstivityData" :value="hypersenstivity">
                        {{ hypersenstivity }}
                    </option>
                </select>
                <div v-show="!filterData.selectedHypersensitivity.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Hypersensitivity
                </div>
            </div>
        </div>

        <!-- <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !filterData.selectedPatienttype.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Patient Type
                </label>
            </div>
            <div class="md:w-1/3">
                <select v-model="filterData.selectedPatienttype.val" @change="updatePatienttype(filterData.selectedPatienttype.val)"
                    @blur="clearValidity('selectedPatienttype')"
                    :disabled="!filterData.selectedAge.val"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option v-for="patienttype in patienttypeData" :value="patienttype">
                        {{ patienttype }}
                    </option>
                </select>
                <div v-show="!filterData.selectedPatienttype.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Patient Type
                </div>
            </div>
        </div> -->

        <div class="flex justify-center mt-12">
            <!-- <input type="file" @change="inputTAB" multiple> -->
            <!-- <input type="file" @change="inputMSD" multiple> -->
            <!-- <input type="file" @change="inputATB_INFO_ADJUST" multiple> -->
            <!-- <input type="file" @change="inputATB_INFO_ALERT" multiple> -->
            <!-- <input type="file" @change="inputATB_INFO_DDI" multiple> -->
            <!-- <input type="file" @change="inputATB_INFO_AE" multiple> -->
            <LandingButton :disabled="!filterData.selectedGroup.val" @click="onClickNext" type="button" size="lg">
                <p class="text-xl">Search</p>
            </LandingButton>
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