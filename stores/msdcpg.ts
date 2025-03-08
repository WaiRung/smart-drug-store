import { defineStore } from 'pinia'
import { useErrorStore } from './error'

import { useTabATP_CATALOGStore } from '~/stores/tab-atp-catalog'
import { useGroupStore } from '~/stores/group'
import { useAgeStore } from '~/stores/age'
import { useInfectsiteStore } from '~/stores/infect_site'
import { useDiagnosisStore } from '~/stores/diagnosis'
import { useServerityStore } from '~/stores/serverity'
import { useRiskorganismStore } from '~/stores/risk_organism'
import { useHypersensitivityStore } from '~/stores/hypersenstivity'
import { usePatienttypeStore } from '~/stores/patient_type'

import { useGenericStore } from '#imports'

export const useMsdcpgStore = defineStore('useMsdcpgStore', () => {
    const { find, findOne } = useStrapi()

    const tabATP_CATALOGStore = useTabATP_CATALOGStore()
    const groupStore = useGroupStore()
    const ageStore = useAgeStore()
    const infectSiteStore = useInfectsiteStore()
    const diagnosisStore = useDiagnosisStore()
    const serverityStore = useServerityStore()
    const riskOrganismStore = useRiskorganismStore()
    const hypersenstivityStore = useHypersensitivityStore()
    const patientTypeStore = usePatienttypeStore()
    const genericStore = useGenericStore()

    const filter = reactive({
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
        selectedInfectSite: {
            isValid: true,
            val: '',
            required: true
        },
        selectedDiagnosis: {
            isValid: true,
            val: '',
            required: true
        },
        selectedServerity: {
            isValid: true,
            val: '',
            required: true
        },
        selectedRiskorganism: {
            isValid: true,
            val: '',
            required: true
        },
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
        selectedPatienttype: {
            isValid: true,
            val: '',
            required: true
        },
        selectedHypersensitivity: {
            isValid: true,
            val: '',
            required: true
        }
    })

    const tableFilter = reactive({
        selectedGeneric: {
            isValid: true,
            val: '',
            required: true
        },
        selectedRxoption: {
            isValid: true,
            val: '',
            required: true
        },
        selectedDosagetype: {
            isValid: true,
            val: '',
            required: true
        },
        selectedDosagecheck: {
            isValid: true,
            val: '',
            serverVal: '',
            required: true
        },
        selectedDosagemax: {
            isValid: true,
            val: '',
            serverVal: '',
            required: true
        },
    })

    const msdcpgs: any = ref([])
    const msdcpg: any = reactive({})

    const getFilter = computed(() => {
        return () => {
            return filter
        }
    })

    const getTablefilter = computed(() => {
        return () => {
            return tableFilter
        }
    })

    const getMsdcpgs = computed(() => {
        return () => {
            return msdcpgs.value
        }
    })

    const getMsdCpgTableFilter = computed(() => {
        return (property: string) => {
            const uniqueProperty = [...new Set(msdcpgs.value.map((item: { attributes: { [x: string]: any } }) => item.attributes[property]))];
            return uniqueProperty
        }
    })

    const getMsdcpg = computed(() => {
        return () => {
            return msdcpg
        }
    })


    async function updateInfectsite(evt: any) {
        filter.selectedInfectSite.val = evt

        const nullKeys = [
            'selectedDiagnosis',
            'selectedGroup',
            'selectedAge',
            'selectedServerity',
            'selectedRiskorganism',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await diagnosisStore.fetchDiagnosisByInfectsite(
            filter.selectedInfectSite.val
        )
    }

    async function updateDiagnosis(evt: any) {
        filter.selectedDiagnosis.val = evt

        const nullKeys = [
            'selectedGroup',
            'selectedAge',
            'selectedServerity',
            'selectedRiskorganism',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await groupStore.fetchGroupsByInfectsiteDiagnosis(
            filter.selectedInfectSite.val,
            filter.selectedDiagnosis.val
        )
    }

    async function updateGroup(evt: any) {
        filter.selectedGroup.val = evt

        const nullKeys = [
            'selectedAge',
            'selectedServerity',
            'selectedRiskorganism',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await ageStore.fetchAgesByInfectsiteDiagnosisGroup(
            filter.selectedInfectSite.val,
            filter.selectedDiagnosis.val,
            filter.selectedGroup.val
        )
    }

    async function updateAge(evt: any) {
        filter.selectedAge.val = evt

        const nullKeys = [
            'selectedServerity',
            'selectedRiskorganism',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await serverityStore.fetchServerityByInfectedsiteDiagNosisGroupAge(
            filter.selectedInfectSite.val,
            filter.selectedDiagnosis.val,
            filter.selectedGroup.val,
            filter.selectedAge.val,
        )
    }

    async function updateServerity(evt: any) {
        filter.selectedServerity.val = evt

        const nullKeys = [
            'selectedRiskorganism',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await riskOrganismStore.fetchRiskorganismByInfectedsiteDiagNosisGroupAgeServerity(
            filter.selectedInfectSite.val,
            filter.selectedDiagnosis.val,
            filter.selectedGroup.val,
            filter.selectedAge.val,
            filter.selectedServerity.val,
        )
    }

    async function updateRiskOrganism(evt: any) {
        filter.selectedRiskorganism.val = evt

        const nullKeys = [
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await hypersenstivityStore.fetcHypersensitivityByInfectedsiteDiagNosisGroupAgeServerityRiskorganism(
            filter.selectedInfectSite.val,
            filter.selectedDiagnosis.val,
            filter.selectedGroup.val,
            filter.selectedAge.val,
            filter.selectedServerity.val,
            filter.selectedRiskorganism.val

        )
    }

    async function updatePatienttype(evt: any) {
        filter.selectedPatienttype.val = evt

        const nullKeys = [
            'selectedInfectSite',
            'selectedDiagnosis',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        // await infectSiteStore.fetchInfectsiteByGroupAge(
        //     filter.selectedGroup.val,
        //     filter.selectedAge.val,
        // )
    }

    async function updateClass(evt: any) {
        filter.selectedClass.val = evt

        const nullKeys = [
            'selectedGroup',
            'selectedGeneric',
            'selectedAge',
            'selectedPatienttype',
            'selectedInfectSite',
            'selectedDiagnosis',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await genericStore.fetchGenericsByClass(filter.selectedClass.val)
    }

    async function updateGeneric(evt: any) {
        tableFilter.selectedGeneric.val = evt.target.value
        // const nullKeys = [
        //     'selectedGroup',
        //     'selectedAge',
        //     'selectedPatienttype',
        //     'selectedInfectSite',
        //     'selectedDiagnosis',
        //     'selectedHypersensitivity'
        // ]

        // for (let i = 0; i < nullKeys.length; i++) {
        //     const key = nullKeys[i];
        //     const prop = filter[key as keyof typeof filter]
        //     prop.val = ''
        // }

        // await tabATP_CATALOGStore.fetchClassesByGeneric(filter.selectedGeneric.val)

        await fetchMsdcpgsByFilter()
    }

    async function updateRX(evt: any) {
        tableFilter.selectedRxoption.val = evt.target.value

        await fetchMsdcpgsByFilter()
    }

    async function updateDosetype(evt: any) {
        tableFilter.selectedDosagetype.val = evt.target.value

        await fetchMsdcpgsByFilter()
    }

    async function updateDosagecheck(evt: any) {
        const DOSE_L = evt.target.value.split(" ")[0]
        
        tableFilter.selectedDosagecheck.val = evt.target.value
        tableFilter.selectedDosagecheck.serverVal = DOSE_L

        await fetchMsdcpgsByFilter()
    }

    async function updateDosagemax(evt: any) {
        const DOSE_M = evt.target.value.split(" ")[0]
        console.log(evt.target.value);
        
        tableFilter.selectedDosagemax.val = evt.target.value
        tableFilter.selectedDosagemax.serverVal = DOSE_M

        await fetchMsdcpgsByFilter()
    }

    async function updateHypersensitivity(evt: any) {
        filter.selectedHypersensitivity.val = evt

        const nullKeys: string | any[] = [

        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }
    }

    function clearValidity(fieldName: string) {
        filter[fieldName as keyof typeof filter].isValid = true
    }

    function resetMsdcpgs() {
        try {
            msdcpgs.value = []
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    async function fetchMsdcpgsByFilter() {
        try {

            const filterGroup: any = {
                'GROUP': {
                    $containsi: filter.selectedGroup.val ? filter.selectedGroup.val : ''
                }
            }

            const filterAge: any = {
                'AGE': {
                    $containsi: filter.selectedAge.val ? filter.selectedAge.val : ''
                }
            }

            const filterInfectsite: any = {
                'INFECT_SITE': {
                    $containsi: filter.selectedInfectSite.val ? filter.selectedInfectSite.val : ''
                }
            }

            const filterDiagnosis: any = {
                'DIAGNOSIS': {
                    $containsi: filter.selectedDiagnosis.val ? filter.selectedDiagnosis.val : ''
                }
            }

            const filterServerity: any = {
                'SEVERITY': {
                    $containsi: filter.selectedServerity.val ? filter.selectedServerity.val : ''
                }
            }

            const filterriskOrgnaism: any = {
                'RISK_ORGANISM': {
                    $containsi: filter.selectedRiskorganism.val ? filter.selectedRiskorganism.val : ''
                }
            }

            const filterHypersensitivity: any = {
                'HYPERSENSITIVITY': {
                    $containsi: filter.selectedHypersensitivity.val ? filter.selectedHypersensitivity.val : ''
                }
            }

            const filtertableGeneric: any = tableFilter.selectedGeneric.val ? {
                'GENERIC': {
                    $eqi: tableFilter.selectedGeneric.val
                }
            } : {}
            const filtertableRxoperation: any = tableFilter.selectedRxoption.val ? {
                'RX_OPTION': {
                    $containsi: tableFilter.selectedRxoption.val
                }
            } : {}

            const filtertableDosagetype: any = tableFilter.selectedDosagetype.val ? {
                'DOSE_TYPE': {
                    $containsi: tableFilter.selectedDosagetype.val
                }
            } : {}

            const filtertableDosagecheck: any = tableFilter.selectedDosagecheck.serverVal ? {
                'DOSE_L': {
                    $containsi: tableFilter.selectedDosagecheck.serverVal
                }
            } : {}

            const filtertableDosagemax: any = tableFilter.selectedDosagemax.serverVal ? {
                'DOSE_M': {
                    $containsi: tableFilter.selectedDosagemax.serverVal
                }
            } : {}

            const filterObj = {
                // ...filterGeneric,
                ...filterGroup,
                ...filterAge,
                ...filterInfectsite,
                ...filterDiagnosis,
                ...filterServerity,
                ...filterriskOrgnaism,
                ...filterHypersensitivity,

                ...filtertableGeneric,
                ...filtertableRxoperation,
                ...filtertableDosagetype,
                ...filtertableDosagecheck,
                ...filtertableDosagemax
            }
            const response = await find<any>('msd-cpgs', {
                fields: [
                    'GENERIC',
                    'RX_OPTION',
                    'DOSE_TYPE',

                    // 'DOSE_CHECK',
                    // 'DOSE_M_CHECK',

                    'SEVERITY',
                    'RISK_ORGANISM',
                    'DOSE_L',
                    'DOSE_U',
                    'DOSE_UNIT',
                    'DOSE_LBL',
                    'DRUG_RM',
                    'DOSE_M',
                    'DOSE_M_UNIT',
                    'DOSE_M_LBL',
                    'ROUTE',
                    'FREQ',
                    'DURATION',

                    'RM_RX',
                    'RM_DURATION',

                    'INDICATION_LABEL',
                    'ANTIBIOTIC_LABEL',
                ],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            });
            if (response) {

                const calculatedMmsdcpgs = response.data.map(msdcpg => ({
                    id: msdcpg.id,
                    attributes: {
                        ...msdcpg.attributes,
                        DOSE_CHECK: `${msdcpg.attributes.DOSE_L}${msdcpg.attributes.DOSE_U ? '-' + msdcpg.attributes.DOSE_U : ''} ${msdcpg.attributes.DOSE_UNIT}${msdcpg.attributes.DOSE_LBL} ${msdcpg.attributes.DRUG_RM}`,
                        DOSE_M_CHECK: `${msdcpg.attributes.DOSE_M} ${msdcpg.attributes.DOSE_M_UNIT}${msdcpg.attributes.DOSE_M_LBL}`
                    },

                }))
                msdcpgs.value = calculatedMmsdcpgs

            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }
    async function fetchMsdcpgById(ID: string) {
        try {
            const foundMsdcpg = msdcpgs.value.find((msdcpg: { id: string }) => msdcpg.id === ID);
            if (foundMsdcpg) {
                Object.assign(msdcpg, foundMsdcpg)
            }

        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }
    function clearFoundmsdcpg() {
        try {
            Object.assign(msdcpg, {
                attributes: null,
                id: null
            })
            
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }
    

    return {
        getFilter,
        getTablefilter,
        getMsdcpgs,
        getMsdCpgTableFilter,
        getMsdcpg,
        updateClass,
        updateGeneric,
        updateRX,
        updateDosetype,
        updateDosagecheck,
        updateDosagemax,
        updateGroup,
        updateAge,
        updatePatienttype,
        updateInfectsite,
        updateDiagnosis,
        updateServerity,
        updateRiskOrganism,
        updateHypersensitivity,
        clearValidity,
        resetMsdcpgs,
        fetchMsdcpgsByFilter,
        fetchMsdcpgById,
        clearFoundmsdcpg,
    }
})