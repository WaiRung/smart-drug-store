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

    async function fetcHypersensitivityByInfectedsiteDiagNosisGroupAgeServerityRiskorganism(
        infect_site: string,
        diagnosis: string,
        group: string,
        age: string,
        serverity: string,
        risk_organism: string
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

            const filterServerity: any = {
                'SEVERITY': {
                    $containsi: serverity ? serverity : ''
                }
            }

            const filterRiskorganism: any = {
                'RISK_ORGANISM': {
                    $containsi: risk_organism ? risk_organism : ''
                }
            }

            const filterObj = {
                ...filterGroup,
                ...filterAge,
                ...filterInfectsite,
                ...filterDiagnosis,
                ...filterServerity,
                ...filterRiskorganism
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
                console.log('Hypersensitivity Response:', response);
                const pagination = response.meta.pagination;
                const pageSize = 'pageSize' in pagination ? pagination.pageSize : 100;
                const pageCount = 'pageCount' in pagination ? pagination.pageCount : 1;
                const allResponses = [response];
                for (let i = 2; i <= pageCount; i++) {
                    const response = await find<any>('msd-cpgs', {
                        fields: ['HYPERSENSITIVITY'],
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
                hypersensitivities.value = mergedFlatData
                mapHypersensitivities()
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function mapHypersensitivities() {
        if (hypersensitivities.value) {
            try {
                const stringHypersensitivities = hypersensitivities.value.map((sense: { HYPERSENSITIVITY: string; }) => sense.HYPERSENSITIVITY);
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
        fetcHypersensitivityByInfectedsiteDiagNosisGroupAgeServerityRiskorganism
    }
})