<script setup>
import Papa from 'papaparse';
import ConditionalSelect from '~/components/generic/ConditionalSelect.vue';
import NBInfo from '~/components/criteria/NBInfo.vue';
const { create } = useStrapi()
import { useRouter } from 'nuxt/app'
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

const router = useRouter()

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

// Original Viral Pneumonia logic - keeping for reference and complex logic
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

const isSearchable = computed(() => {
    return msdcpgStore.isSearchable()
})

const showNBInfo = computed(() => {
    const selectedGroup = filterData.value.selectedGroup.val
    if (selectedGroup && selectedGroup.startsWith('NB:')) {
        return true
    } else {
        return false
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

function updateFormValidity() {
    let return_bool = true
    const filter = msdcpgStore.getFilter()
    for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
            const element = filter[key];
            const data = element.val || ''
            const isRequired = element.required
            const hasValue = data !== ''

            // You can access the options data based on the field key
            let optionsData = []
            switch (key) {
                case 'selectedInfectSite':
                    optionsData = infectsiteData.value
                    break
                case 'selectedDiagnosis':
                    optionsData = diagnosisData.value
                    break
                case 'selectedGroup':
                    optionsData = groupData.value
                    break
                case 'selectedAge':
                    optionsData = ageData.value
                    break
                case 'selectedServerity':
                    optionsData = serverityData.value
                    break
                case 'selectedRiskorganism':
                    optionsData = riskOrgnaismData.value
                    break
                case 'selectedHypersensitivity':
                    optionsData = hypersenstivityData.value
                    break
                case 'selectedPatienttype':
                    optionsData = patienttypeData.value
                    break
                default:
                    optionsData = []
            }
            if (isRequired) {
                if (optionsData.length > 0) {
                    if (!hasValue || !optionsData.includes(data)) {
                        element.isValid = false
                        return_bool = false
                        break
                    } else {
                        element.isValid = true
                    }
                } else {
                    // If optionsData is empty, we can consider it valid
                    element.isValid = true
                }
            }
        }
    }
    return return_bool

}

function onClickNext() {
    updateFormValidity()
    if (isSearchable.value === false) {
        return
    }
    msdcpgStore.fetchMsdcpgsByFilter()
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-left')
    // navigateTo('/cpg')
    const query = {}
    query.selectedInfectSite = filterData.value.selectedInfectSite.val || ''
    query.selectedDiagnosis = filterData.value.selectedDiagnosis.val || ''
    query.selectedGroup = filterData.value.selectedGroup.val || ''
    query.selectedAge = filterData.value.selectedAge.val || ''
    query.selectedServerity = filterData.value.selectedServerity.val || ''
    query.selectedRiskorganism = filterData.value.selectedRiskorganism.val || ''
    query.selectedHypersensitivity = filterData.value.selectedHypersensitivity.val || ''
    const queryString = query
    router.push({
        path: '/recommended',
        query: queryString
    })
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

        <ConditionalSelect
            :field-data="filterData.selectedInfectSite"
            :options="infectsiteData"
            label="Infect Site"
            error-message="กรุณาเลือก Infect Site"
            :filter-data="filterData"
            @change="updateInfectsite"
            @blur="() => clearValidity('selectedInfectSite')"
        />

        <ConditionalSelect
            :field-data="filterData.selectedDiagnosis"
            :options="diagnosisData"
            label="Diagnosis"
            error-message="กรุณาเลือก Diagnosis"
            depends-on="selectedInfectSite"
            :filter-data="filterData"
            :dependent-options-data="infectsiteData"
            @change="updateDiagnosis"
            @blur="() => clearValidity('selectedDiagnosis')"
        />

        <ConditionalSelect
            :field-data="filterData.selectedGroup"
            :options="groupData"
            label="Group"
            error-message="กรุณาเลือก Group"
            depends-on="selectedDiagnosis"
            :filter-data="filterData"
            :dependent-options-data="diagnosisData"
            @change="updateGroup"
            @blur="() => clearValidity('selectedGroup')"
        />

        <NBInfo :show="showNBInfo" />

        <ConditionalSelect
            :field-data="filterData.selectedAge"
            :options="ageData"
            label="Age"
            error-message="กรุณาเลือก Age"
            depends-on="selectedGroup"
            :filter-data="filterData"
            :dependent-options-data="groupData"
            :custom-disabled="ageDisabled"
            @change="updateAge"
            @blur="() => clearValidity('selectedAge')"
        />

        <ConditionalSelect
            :field-data="filterData.selectedServerity"
            :options="serverityData"
            label="Serverity"
            error-message="กรุณาเลือก Serverity"
            depends-on="selectedAge"
            :filter-data="filterData"
            :dependent-options-data="ageData"
            :custom-disabled="serverityDisabled"
            @change="updateServerity"
            @blur="() => clearValidity('selectedServerity')"
        />

        <ConditionalSelect
            :field-data="filterData.selectedRiskorganism"
            :options="riskOrgnaismData"
            label="Risk Organism"
            error-message="กรุณาเลือก Risk Organism"
            depends-on="selectedServerity"
            :filter-data="filterData"
            :dependent-options-data="serverityData"
            @change="updateRiskorganism"
            @blur="() => clearValidity('selectedRiskorganism')"
        />

        <ConditionalSelect
            :field-data="filterData.selectedHypersensitivity"
            :options="hypersenstivityData"
            label="Hypersensitivity"
            error-message="กรุณาเลือก Hypersensitivity"
            depends-on="selectedRiskorganism"
            :filter-data="filterData"
            :dependent-options-data="riskOrgnaismData"
            :custom-disabled="hypersenstivitiesDisabled"
            @change="updateHypersensitivity"
            @blur="() => clearValidity('selectedHypersensitivity')"
        />

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
            <LandingButton :disabled="!isSearchable" @click="onClickNext" type="button" size="lg">
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