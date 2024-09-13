import { defineStore } from 'pinia'
import { useErrorStore } from './error'

import { useGenericStore } from '#imports'
import { useTabATP_CATALOGStore } from '#imports'
import { useGroupStore } from '#imports'
import { useAgeStore } from '#imports'
import { usePatienttypeStore } from '#imports'
import { useInfectsiteStore } from '#imports'
import { useDiagnosisStore } from '#imports'
import { useHypersensitivityStore } from './hypersenstivity'

export const useMsdcpgStore = defineStore('useMsdcpgStore', () => {
    const { find, findOne } = useStrapi()

    const genericStore = useGenericStore()
    const tabATP_CATALOGStore = useTabATP_CATALOGStore()
    const groupStore = useGroupStore()
    const ageStore = useAgeStore()
    const patientTypeStore = usePatienttypeStore()
    const infectSiteStore = useInfectsiteStore()
    const diagnosisStore = useDiagnosisStore()
    const hypersenstivityStore = useHypersensitivityStore()

    const filter = reactive({
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
        selectedDiagnosis: {
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

    async function updateClass(evt: any) {
        filter.selectedClass.val = evt

        const nullKeys = [
            'selectedGeneric',
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
        await groupStore.fetchGroupsByGeneric(filter.selectedGeneric.val)
    }

    async function updateGroup(evt: any) {
        filter.selectedGroup.val = evt

        const nullKeys = [
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

        await ageStore.fetchAgesByGenericGroup(
            filter.selectedGeneric.val,
            filter.selectedGroup.val
        )
    }

    async function updateAge(evt: any) {
        filter.selectedAge.val = evt

        const nullKeys = [
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

        await patientTypeStore.fetchPatientypeByGenericGroupAge(
            filter.selectedGeneric.val, 
            filter.selectedGroup.val,
            filter.selectedAge.val
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

        await infectSiteStore.fetchInfecttypeByGenericGroupAgePatienttype(
            filter.selectedGeneric.val, 
            filter.selectedGroup.val,
            filter.selectedAge.val,
            filter.selectedPatienttype.val
        )
    }

    async function updateInfectsite(evt: any) {
        filter.selectedInfectSite.val = evt

        const nullKeys = [
            'selectedDiagnosis',
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await diagnosisStore.fetchDiagnosisByGenericGroupAgePatienttypeInfectsite(
            filter.selectedGeneric.val, 
            filter.selectedGroup.val,
            filter.selectedAge.val,
            filter.selectedPatienttype.val,
            filter.selectedInfectSite.val
        )
    }

    async function updateDiagnosis(evt: any) {
        filter.selectedDiagnosis.val = evt

        const nullKeys = [
            'selectedHypersensitivity'
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }

        await hypersenstivityStore.fetcHypersensitivityByGenericGroupAgePatienttypeInfectsiteDiagnosis(
            filter.selectedGeneric.val, 
            filter.selectedGroup.val,
            filter.selectedAge.val,
            filter.selectedPatienttype.val,
            filter.selectedInfectSite.val,
            filter.selectedDiagnosis.val
        )
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
            const filterGeneric: any = {
                'GENERIC': {
                    $eqi: filter.selectedGeneric.val ? filter.selectedGeneric.val : ''
                }
            }

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

            const filterPatienttype: any = {
                'PATIENT_TYPE': {
                    $containsi: filter.selectedPatienttype.val ? filter.selectedPatienttype.val : ''
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
            const filterObj = {
                ...filterGroup,
                ...filterGeneric,
                ...filterAge,
                ...filterPatienttype,
                ...filterInfectsite,
                ...filterDiagnosis
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
        updateHypersensitivity,
        clearValidity,
        resetMsdcpgs,
        fetchMsdcpgsByFilter,
        fetchMsdcpgById,
    }
})