import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useAgeStore = defineStore('useAgeStore', () => {
    const { find } = useStrapi()
    const ages: any = ref([])

    const getAges = computed(() => {
        return () => {
            return ages.value
        }
    })

    async function fetchAgesByInfectsiteDiagnosisGroup(
        infect_site: string,
        diagnosis: string,
        group: string
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

            const filterObj = {
                ...filterInfectsite,
                ...filterDiagnosis,
                ...filterGroup,
            }
            const response = await find<any>('msd-cpgs', {
                fields: ['AGE'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            });
            if (response) {
                ages.value = response.data;
                mapAges()
                
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function mapAges() {
        if (ages.value) {
            try {
                const stringAges = ages.value.map((age: { AGE: string;  }) => age.AGE);
                const uniq = [...new Set(stringAges)]

                ages.value = uniq
            } catch (error) {
              const errorStore = useErrorStore()
              errorStore.setError(error)
            }
          } else {
            return []
          }
    }


    return { getAges,
        fetchAgesByInfectsiteDiagnosisGroup
    }
})