import { defineStore } from 'pinia'
import { useErrorStore } from './error'

export const useHypersensitivityStore = defineStore('useHypersensitivityStore', () => {
    const { find } = useStrapi()

    const hypersensitivities: any = ref([])

    const getHypersensitivities = computed(() => {
        return () => {
            return hypersensitivities.value
        }
    })

    async function fetcHypersensitivityByGenericGroupAgePatienttypeInfectsiteDiagnosis(
        generic: string,
        group: string,
        age: string,
        patient_type: string,
        infect_site: string,
        diagnosis: string
    ) {
        try {
            const filterGeneric: any = {
                'GENERIC': {
                    $containsi: generic ? generic : ''
                }
            }

            const filterGroup: any = {
                'GROUP': {
                    $containsi: group ? group : ''
                }
            }

            const filterAge: any = {
                'AGE': {
                    $containsi: age ? age : ''
                }
            }

            const filterPatienttype: any = {
                'PATIENT_TYPE': {
                    $containsi: patient_type ? patient_type : ''
                }
            }

            const filterInfectsite: any = {
                'INFECT_SITE': {
                    $containsi: infect_site ? infect_site : ''
                }
            }

            const filterDiagnosis: any = {
                'DIAGNOSIS': {
                    $containsi: diagnosis ? diagnosis : ''
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
                fields: ['HYPERSENSITIVITY'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            });
            if (response) {
                hypersensitivities.value = response.data
            }
            mapHypersensitivities()
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function mapHypersensitivities() {
        if (hypersensitivities.value) {
            try {
                const stringHypersensitivities = hypersensitivities.value.map((age: { attributes: { HYPERSENSITIVITY: string; }; }) => age.attributes.HYPERSENSITIVITY);
                const uniq = [...new Set(stringHypersensitivities)]

                hypersensitivities.value = uniq
            } catch (error) {
                const errorStore = useErrorStore()
                errorStore.setError(error)
            }
        } else {
            return []
        }
    }

    return {
        getHypersensitivities,
        fetcHypersensitivityByGenericGroupAgePatienttypeInfectsiteDiagnosis
    }
})