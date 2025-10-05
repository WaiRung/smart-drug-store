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

import { useGenericStore } from '~/stores/generic';

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
            required: false
        },
        selectedClass: {
            isValid: true,
            val: '',
            required: false
        },
        selectedGeneric: {
            isValid: true,
            val: '',
            required: false
        },
        selectedPatienttype: {
            isValid: true,
            val: '',
            required: false
        },
        selectedHypersensitivity: {
            isValid: true,
            val: '',
            required: false
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

    const isSearchable = computed(() => {
        return () => {
            let return_boolean = true
            const filter = getFilter.value()
            for (const key in filter) {
                if (Object.prototype.hasOwnProperty.call(filter, key)) {
                    const element = filter[key as keyof typeof filter];
                    if (!element.isValid)
                        return_boolean = false
                }
            }
            return return_boolean
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

    function updateValidity(fieldName: string, isValid: any, ): void {
        filter[fieldName as keyof typeof filter].isValid = isValid
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

            const filterGroup: any = filter.selectedGroup.val ? {
                'GROUP': {
                    $containsi: filter.selectedGroup.val
                }
            } : {}

            const filterAge: any = filter.selectedAge.val ? {
                'AGE': {
                    $containsi: filter.selectedAge.val
                }
            } : {}

            const filterInfectsite: any = filter.selectedInfectSite.val ? {
                'INFECT_SITE': {
                    $containsi: filter.selectedInfectSite.val
                }
            } : {}

            const filterDiagnosis: any = filter.selectedDiagnosis.val ? {
                'DIAGNOSIS': {
                    $containsi: filter.selectedDiagnosis.val
                }
            } : {}

            const filterServerity: any = filter.selectedServerity.val ? {
                'SEVERITY': {
                    $containsi: filter.selectedServerity.val
                }
            } : {}

            const filterriskOrgnaism: any = filter.selectedRiskorganism.val ? {
                'RISK_ORGANISM': {
                    $containsi: filter.selectedRiskorganism.val
                }
            } : {}

            const filterHypersensitivity: any = filter.selectedHypersensitivity.val ? {
                'HYPERSENSITIVITY': {
                    $containsi: filter.selectedHypersensitivity.val
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
            }
            const response = await find<any>('msd-cpgs', {
                fields: [
                    'GENERIC',
                    'RX_OPTION',
                    'DOSE_TYPE',

                    // 'DOSE_CHECK',
                    // 'DOSE_M_CHECK',
                    'HYPERSENSITIVITY',
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

                    'RX_REMARK',
                    'DOSAGE_REMARK',

                    'INDICATION_CRITERIA',
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
                    ...msdcpg,
                    DOSE_CHECK: `${msdcpg.DOSE_L || ''}${msdcpg.DOSE_U ? '-' + msdcpg.DOSE_U : ''} ${msdcpg.DOSE_UNIT || ''}${msdcpg.DOSE_LBL || ''} ${msdcpg.DRUG_RM || ''}`,
                    DOSE_M_CHECK: `${msdcpg.DOSE_M || ''} ${msdcpg.DOSE_M_UNIT || ''}${msdcpg.DOSE_M_LBL || ''}`,
                    // INDICATION_CRITERIA: `${msdcpg.SEVERITY || '-'}${msdcpg.RISK_ORGANISM ? ' / ' + msdcpg.RISK_ORGANISM : ''}`,

                }))
                msdcpgs.value = calculatedMmsdcpgs

            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }
    async function fetchMsdcpgByDocumentId(documentId: string) {
        try {
            const response = await findOne<any>('msd-cpgs', documentId);
            if (response) {
                console.log('fetchMsdcpgByDocumentId response', response);
                
                const calculatedMmsdcpg = response.data ? {
                    ...response.data,
                    DOSE_CHECK: `${response.data.DOSE_L || ''}${response.data.DOSE_U ? '-' + response.data.DOSE_U : ''} ${response.data.DOSE_UNIT || ''}${response.data.DOSE_LBL || ''} ${response.data.DRUG_RM || ''}`,
                    DOSE_M_CHECK: `${response.data.DOSE_M || ''} ${response.data.DOSE_M_UNIT || ''}${response.data.DOSE_M_LBL || ''}`,
                    // INDICATION_CRITERIA: `${response.data.SEVERITY || '-'}${response.data.RISK_ORGANISM ? ' / ' + response.data.RISK_ORGANISM : ''}`,
                } : {}
                Object.assign(msdcpg, calculatedMmsdcpg)
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }
    async function getMsdcpgById(ID: string) {
        try {
            const foundMsdcpg = msdcpgs.value.find((msdcpg: { documentId: string }) => msdcpg.documentId === ID);
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
            Object.assign(msdcpg, null)

        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }


    return {
        getFilter,
        getMsdcpgs,
        getMsdcpg,
        isSearchable,
        updateGroup,
        updateAge,
        updatePatienttype,
        updateInfectsite,
        updateDiagnosis,
        updateServerity,
        updateRiskOrganism,
        updateHypersensitivity,
        updateValidity,
        clearValidity,
        resetMsdcpgs,
        fetchMsdcpgsByFilter,
        fetchMsdcpgByDocumentId,
        getMsdcpgById,
        clearFoundmsdcpg,
    }
})