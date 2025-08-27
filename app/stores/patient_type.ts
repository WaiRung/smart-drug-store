import { defineStore } from 'pinia'
import { useErrorStore } from './error'

export const usePatienttypeStore = defineStore('usePatienttypeStore', () => {
    const { find } = useStrapi()

    const patientTypes: any = ref([])

    const getPatienttypes = computed(() => {
        return () => {
            return patientTypes.value
        }
    })

    async function fetchPatientypeByGenericGroupAge(
        generic: string,
        group: string,
        age: string
    ) {
        try {
            const filterGeneric: any = {
                'GENERIC': {
                    $containsi: generic ? generic : ''
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

            const filterObj = {
                ...filterGroup,
                ...filterGeneric,
                ...filterAge
            }

            const response = await find<any>('msd-cpgs', {
                fields: ['PATIENT_TYPE'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            });

            if (response) {
                patientTypes.value = response.data;
                mapPatienttypes()
                
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function mapPatienttypes() {
        if (patientTypes.value) {
            try {
                const stringPatientTypes = patientTypes.value.map((age: { PATIENT_TYPE: string; }) => age.PATIENT_TYPE);
                const uniq = [...new Set(stringPatientTypes)]
                
                patientTypes.value = uniq
                
            } catch (error) {
              const errorStore = useErrorStore()
              errorStore.setError(error)
            }
          } else {
            return []
          }
    }

    return {
        getPatienttypes,
        fetchPatientypeByGenericGroupAge
    }
})