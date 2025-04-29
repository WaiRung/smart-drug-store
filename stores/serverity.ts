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

    async function fetchServerityByInfectedsiteDiagNosisGroupAge(
        infect_site: string,
        diagnosis: string,
        group: string,
        age: string,
    ) {
        try {

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
                const stringServerities = serverities.value.map((age:  { SEVERITY: string; }) => age.SEVERITY);
                const uniq = [...new Set(stringServerities)]

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
        fetchServerityByInfectedsiteDiagNosisGroupAge
    }
})