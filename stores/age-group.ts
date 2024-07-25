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

    async function fetchAgeGroupsByDiagnosis(diagnosisId: number) {
        try {
            const filterObj = diagnosisId ? {
                diagnosis: {
                    id: {
                        $eq: diagnosisId
                    }
                }
            } : {}
            const response = await find<any>('age-group-diagnoses', {
                populate: {
                    age_group: true,
                    // drug: true
                },
                filters: filterObj,
            });
            if (response) {
                ageGroups.value = response.data;
                mapDiagnoses()
                
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
            // throw error
        }
    }

    function mapDiagnoses() {
        
        if (ageGroups.value) {
          try {
            ageGroups.value = ageGroups.value.map((ageGroup: any) => {
              // Perform mapping or transformation on each item
              return {
                // Return the mapped object
                id: ageGroup['attributes']['diagnosis']['data']['id'],
                ...ageGroup.attributes.diagnosis.data.attributes,
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