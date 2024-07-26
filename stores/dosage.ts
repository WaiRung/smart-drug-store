import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useDosageStore = defineStore('useDosageStore', () => {
    const { find } = useStrapi()
    const dosages: any = ref([])

    const getDosages = computed(() => {
        return dosages.value
    })

    async function fetchDosagesByDrugAgegroup(drugId: number, ageGroupId: number, diagnosisId: number) {
        try {
            const filterObj = {
                drug_diagnosis: {
                    drug: {
                        id: {
                            $eq: drugId ? drugId : null
                        }
                    },
                    diagnosis: {
                        id: {
                            $eq: diagnosisId ? diagnosisId : null
                        }
                    }
                },
                age_group_diagnosis: {
                    age_group: {
                        id: {
                            $eq: ageGroupId ? ageGroupId : null
                        }
                    }

                }
            }
            const response = await find<any>('dosages', {
                populate: {
                    // diagnosis: true,
                    // age_group: true
                    // drug: true
                },
                filters: filterObj,
            });
            if (response) {
                dosages.value = response.data;
                mapDosages()
                
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function mapDosages() {
        if (dosages.value) {
            try {
                dosages.value = dosages.value.map((dosage: any) => {
                // Perform mapping or transformation on each item
                return {
                  // Return the mapped object
                  id: dosage['attributes']['id'],
                  ...dosage.attributes,
                }
              })
            } catch (error) {
              const errorStore = useErrorStore()
              errorStore.setError(error)
            }
          } else {
            return []
          }
    }


    return { getDosages, fetchDosagesByDrugAgegroup }
})