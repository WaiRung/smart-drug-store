import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useDiagnosisStore = defineStore('useDiagnosisStore', () => {
    const { find } = useStrapi()
    const diagnoses: any = ref([])

    const getDiagnoses = computed(() => {
        return (diagnosisId: Number = 0) => {
            if (!diagnosisId) {
                return diagnoses.value
            }
            try {
                // const drugIdString = drugId.toString()
                return diagnoses.value.find((diagnosis: { id: Number; }) => {
                    const isMatch = diagnosis.id === diagnosisId
                    return isMatch
                })
            } catch (error) {

            }

        }
    })

    async function fetchDiagnosesByDrug(drugId: number) {
        try {
            const filterObj = drugId ? {
                drug: {
                    id: {
                        $eq: drugId
                    }
                }
            } : {}
            const response = await find<any>('drug-diagnoses', {
                populate: {
                    diagnosis: true,
                    // drug: true
                },
                filters: filterObj,
            });
            if (response) {
                diagnoses.value = response.data;
                mapDiagnoses()
                
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
            // throw error
        }
    }

    function mapDiagnoses() {
        
        if (diagnoses.value) {
          try {
            diagnoses.value = diagnoses.value.map((diagnosis: any) => {
              // Perform mapping or transformation on each item
              return {
                // Return the mapped object
                id: diagnosis['attributes']['diagnosis']['data']['id'],
                ...diagnosis.attributes.diagnosis.data.attributes,
              }
            })
          } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
          }
        } else {
    
        }
      }

    return { diagnoses, getDiagnoses, fetchDiagnosesByDrug }
})