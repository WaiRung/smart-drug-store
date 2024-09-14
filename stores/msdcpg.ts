import { defineStore } from 'pinia'
import { useErrorStore } from './error'

import { useTabATP_CATALOGStore } from '#imports'
import { useGroupStore } from '#imports'
import { useAgeStore } from '#imports'
import { useInfectsiteStore } from '#imports'
import { useDiagnosisStore } from '#imports'
import { useServerityStore } from '#imports';
import { useRiskorganismStore } from '#imports';
import { useHypersensitivityStore } from '#imports'
import { usePatienttypeStore } from '#imports'

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

    const msdcpgs: any = ref([])
    const msdcpg: any = reactive({})

    const getFilter = computed(() => {
        return () => {
            return filter
        }
    })

    const getMsdcpgs = computed(() => {
        return () => {
            return msdcpgs.value
        }
    })

    const getMsdcpg = computed(() => {
        return () => {
            return msdcpg
        }
    })

    async function updateGroup(evt: any) {
        filter.selectedGroup.val = evt

        const nullKeys = [
            'selectedGeneric',
            'selectedClass',
            'selectedAge',
            'selectedPatienttype',
            'selectedInfectSite',
            'selectedDiagnosis',
            'selectedServerity',
            'selectedRiskorganism',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await ageStore.fetchAgesByGroup(
            filter.selectedGroup.val
        )
    }

    async function updateAge(evt: any) {
        filter.selectedAge.val = evt

        const nullKeys = [
            'selectedGeneric',
            'selectedClass',
            'selectedPatienttype',
            'selectedInfectSite',
            'selectedDiagnosis',
            'selectedServerity',
            'selectedRiskorganism',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        // await patientTypeStore.fetchPatientypeByGenericGroupAge(
        //     filter.selectedGeneric.val, 
        //     filter.selectedGroup.val,
        //     filter.selectedAge.val
        // )

        await infectSiteStore.fetchInfectsiteByGroupAge(
            filter.selectedGroup.val,
            filter.selectedAge.val,
        )
    }

    async function updateInfectsite(evt: any) {
        filter.selectedInfectSite.val = evt

        const nullKeys = [
            'selectedGeneric',
            'selectedClass',
            'selectedPatienttype',
            'selectedDiagnosis',
            'selectedServerity',
            'selectedRiskorganism',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await diagnosisStore.fetchDiagnosisByGroupAgeInfectsite(
            filter.selectedGroup.val,
            filter.selectedAge.val,
            filter.selectedInfectSite.val
        )
    }

    async function updateDiagnosis(evt: any) {
        filter.selectedDiagnosis.val = evt

        const nullKeys = [
            'selectedGeneric',
            'selectedClass',
            'selectedPatienttype',
            'selectedServerity',
            'selectedRiskorganism',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await serverityStore.fetchServerityByGroupAgeInfectedsiteDiagNosis(
            filter.selectedGroup.val,
            filter.selectedAge.val,
            filter.selectedInfectSite.val,
            filter.selectedDiagnosis.val
        )
    }

    async function updateServerity(evt: any) {
        filter.selectedServerity.val = evt

        const nullKeys = [
            'selectedGeneric',
            'selectedClass',
            'selectedPatienttype',
            'selectedRiskorganism',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await riskOrganismStore.fetchRiskorganismByGroupAgeInfectedsiteDiagnisisServerity(
            filter.selectedGroup.val,
            filter.selectedAge.val,
            filter.selectedInfectSite.val,
            filter.selectedDiagnosis.val,
            filter.selectedServerity.val
        )
    }

    async function updateRiskOrganism(evt: any) {
        filter.selectedRiskorganism.val = evt

        const nullKeys = [
            'selectedGeneric',
            'selectedClass',
            'selectedPatienttype',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }


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

        await infectSiteStore.fetchInfectsiteByGroupAge(
            filter.selectedGroup.val,
            filter.selectedAge.val,
        )
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
        filter.selectedGeneric.val = evt

        const nullKeys = [
            'selectedGroup',
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

        await tabATP_CATALOGStore.fetchClassesByGeneric(filter.selectedGeneric.val)
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
            // const filterGeneric: any = {
            //     'GENERIC': {
            //         $eqi: filter.selectedGeneric.val ? filter.selectedGeneric.val : ''
            //     }
            // }

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

            const filterObj = {
                // ...filterGeneric,
                ...filterGroup,
                ...filterAge,
                ...filterInfectsite,
                ...filterDiagnosis,
                ...filterServerity,
                ...filterriskOrgnaism,
                ...filterHypersensitivity,
            }
            const response = await find<any>('msd-cpgs', {
                fields: [
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

                    'INDICATION_LABEL',
                    'ANTIBIOTIC_LABEL',
                    'RM_RX',
                    'RM_DURATION'
                ],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            });
            if (response) {
                msdcpgs.value = response.data
                
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

    return {
        getFilter,
        getMsdcpgs,
        getMsdcpg,
        updateClass,
        updateGeneric,
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
    }
})