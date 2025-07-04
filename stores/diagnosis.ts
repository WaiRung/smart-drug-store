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

    async function fetchDiagnosisByInfectsite(
        infect_site: string
    ) {
        try {

            const filterInfectsite: any = {
                'INFECT_SITE': {
                    $containsi: infect_site ? infect_site : ''
                }
            }

            const filterObj = {
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
                const pagination = response.meta.pagination;
                const pageSize = 'pageSize' in pagination ? pagination.pageSize : 100;
                const pageCount = 'pageCount' in pagination ? pagination.pageCount : 1;
                const allResponses = [response];
                for (let i = 2; i <= pageCount; i++) {
                    const response = await find<any>('msd-cpgs', {
                        fields: ['DIAGNOSIS'],
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
                diagnoses.value = mergedFlatData;
                mapDiagnoses();
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function mapDiagnoses() {
        if (diagnoses.value) {
            try {
                const stringDiagnoses = diagnoses.value.map((age: { DIAGNOSIS: string; }) => age.DIAGNOSIS);
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
        fetchDiagnosisByInfectsite
    }
})