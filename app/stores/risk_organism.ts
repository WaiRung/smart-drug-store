import { defineStore } from 'pinia'
import { useErrorStore } from './error'

export const useRiskorganismStore = defineStore('useRiskorganismStore', () => {
    const { find } = useStrapi()

    const riskOrganisms: any = ref([])

    const getRiskOrganisms = computed(() => {
        return () => {
            return riskOrganisms.value
        }
    })

    async function fetchRiskorganismByInfectedsiteDiagNosisGroupAgeServerity(
        infect_site: string,
        diagnosis: string,
        group: string,
        age: string,
        serverity: string,
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

            const filterObj = {
                ...filterGroup,
                ...filterAge,
                ...filterInfectsite,
                ...filterDiagnosis,
                ...filterServerity
            }

            const response = await find<any>('msd-cpgs', {
                fields: ['RISK_ORGANISM'],
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
                        fields: ['RISK_ORGANISM'],
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
                riskOrganisms.value = mergedFlatData;
                mapRiskorganisms();
            }
        } catch (error) {
            
        }
    }

    function mapRiskorganisms() {
        if (riskOrganisms.value) {
            try {
                const stringRiskorganisms = riskOrganisms.value.map((age: { RISK_ORGANISM: string; }) => age.RISK_ORGANISM);
                const uniq = [...new Set(stringRiskorganisms)]

                riskOrganisms.value = uniq
            } catch (error) {
                const errorStore = useErrorStore()
              errorStore.setError(error)
            }
        } else {
            return []
        }
    }

    return {
        getRiskOrganisms,
        fetchRiskorganismByInfectedsiteDiagNosisGroupAgeServerity
    }
})