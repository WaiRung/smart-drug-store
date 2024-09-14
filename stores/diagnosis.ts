import { defineStore } from 'pinia'
import { useErrorStore } from './error'

export const useDiagnosisStore = defineStore('useDiagnosisStore', () => {
    const { find } = useStrapi()

    const diagnoses: any = ref([])

    const getDiagnoses = computed(() => {
        return () => {
            return diagnoses.value
        }
    })

    async function fetchDiagnosisByGroupAgeInfectsite(
        group: string,
        age: string,
        infect_site: string
    ) {
        try {

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

            const filterInfectsite: any = {
                'INFECT_SITE': {
                    $containsi: infect_site ? infect_site : ''
                }
            }

            const filterObj = {
                ...filterGroup,
                ...filterAge,
                ...filterInfectsite
            }

            const response = await find<any>('msd-cpgs', {
                fields: ['DIAGNOSIS'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            });
            if (response) {
                diagnoses.value = response.data
                mapDiagnoses()
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function mapDiagnoses() {
        if (diagnoses.value) {
            try {
                const stringDiagnoses = diagnoses.value.map((age: { attributes: { DIAGNOSIS: string; }; }) => age.attributes.DIAGNOSIS);
                const uniq = [...new Set(stringDiagnoses)]

                diagnoses.value = uniq
            } catch (error) {
                const errorStore = useErrorStore()
              errorStore.setError(error)
            }
        } else {
            return []
        }
    }

    return {
        getDiagnoses,
        fetchDiagnosisByGroupAgeInfectsite
    }
})