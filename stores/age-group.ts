import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useAgeGroupStore = defineStore('useAgegroupStore', () => {
    const { find } = useStrapi()
    const ageGroups: any = ref([])

    const getAgeGroups = computed(() => {
        return (ageGroupId: Number = 0) => {
            if (!ageGroupId) {
                return ageGroups.value
            }
            try {
                return ageGroups.value.find((ageGroup: { id: Number; }) => {
                    const isMatch = ageGroup.id === ageGroupId
                    return isMatch
                })
            } catch (error) {

            }

        }
    })

    async function fetchAgeGroupsByDiagnosis(
        diagnosisName: string,
        subDiagnosisName: string = '',
        suspectedOrganismsName: string = ''
    ) {
        try {
            const filterObj: any = diagnosisName ? {
                diagnosis: {
                    DiagnosisName: {
                        $eqi: diagnosisName
                    }
                }
            } : {}
            if (subDiagnosisName) {
                filterObj.diagnosis.SubDiagnosisName = {
                    $eqi: subDiagnosisName
                }
            }
            if (suspectedOrganismsName) {
                filterObj.diagnosis.SuspectedOrganism = {
                    $eqi: suspectedOrganismsName
                }
            }

            const response = await find<any>('age-group-diagnoses', {
                populate: {
                    // diagnosis: true,
                    age_group: true
                    // drug: true
                },
                filters: filterObj,
            });
            if (response) {
                ageGroups.value = response.data;
                mapAgeGroups()
                
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
            // throw error
        }
    }

    function mapAgeGroups() {
        
        if (ageGroups.value) {
          try {
            ageGroups.value = ageGroups.value.map((ageGroup: any) => {
              // Perform mapping or transformation on each item
              return {
                // Return the mapped object
                id: ageGroup['attributes']['age_group']['data']['id'],
                ...ageGroup.attributes.age_group.data.attributes,
              }
            })
          } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
          }
        } else {
    
        }
      }

      return { ageGroups, getAgeGroups, fetchAgeGroupsByDiagnosis }
})