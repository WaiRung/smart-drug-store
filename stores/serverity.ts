import { defineStore } from 'pinia'
import { useErrorStore } from './error'

export const useServerityStore = defineStore('useServerityStore', () => {
    const { find } = useStrapi()

    const serverities: any = ref([])

    const getServerities = computed(() => {
        return () => {
            return serverities.value
        }
    })

    async function fetchServerityByGroupAgeInfectedsiteDiagNosis(
        group: string,
        age: string,
        infect_site: string,
        diagnosis: string
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

            const filterDiagnosis: any = {
                'DIAGNOSIS': {
                    $containsi: diagnosis ? diagnosis : ''
                }
            }

            const filterObj = {
                ...filterGroup,
                ...filterAge,
                ...filterInfectsite,
                ...filterDiagnosis
            }
            const response = await find<any>('msd-cpgs', {
                fields: ['SEVERITY'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            });

            if (response) {
                serverities.value = response.data
                mapServerities()
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function mapServerities() {
        if (serverities.value) {
            try {
                const stringDiagnoses = serverities.value.map((age: { attributes: { SEVERITY: string; }; }) => age.attributes.SEVERITY);
                const uniq = [...new Set(stringDiagnoses)]

                serverities.value = uniq
            } catch (error) {
                const errorStore = useErrorStore()
              errorStore.setError(error)
            }
        } else {
            return []
        }
    }

    return {
        getServerities,
        fetchServerityByGroupAgeInfectedsiteDiagNosis
    }
})