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
                riskOrganisms.value = response.data
                mapRiskorganisms()
            }
        } catch (error) {
            
        }
    }

    function mapRiskorganisms() {
        if (riskOrganisms.value) {
            try {
                const stringRiskorganisms = riskOrganisms.value.map((age: { attributes: { RISK_ORGANISM: string; }; }) => age.attributes.RISK_ORGANISM);
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