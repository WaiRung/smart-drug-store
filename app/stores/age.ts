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
                const pagination = response.meta.pagination;
                const pageSize = 'pageSize' in pagination ? pagination.pageSize : 100;
                const pageCount = 'pageCount' in pagination ? pagination.pageCount : 1;
                const allResponses = [response];
                for (let i = 2; i <= pageCount; i++) {
                    const response = await find<any>('msd-cpgs', {
                        fields: ['AGE'],
                        pagination: {
                            page: i,
                            pageSize: pageSize,
                        },
                        filters: filterObj,
                    });
                    allResponses.push(response);
                }
                const mergedData = allResponses.map(response => response.data);
                const mergedFlatData = mergedData.flat();
                ages.value = mergedFlatData;
                mapAges();
                
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