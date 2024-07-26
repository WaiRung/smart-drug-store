import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useDiagnosisStore = defineStore('useDiagnosisStore', () => {
    const { find } = useStrapi()
    const fullDiagnoses: any = ref([])
    const diagnoses: any = ref([])
    const subDiagnoses: any = ref([])
    const suspectedOrganisms: any = ref([])

    const getDiagnoses = computed(() => {
        return (diagnosisId: Number = 0) => {
            if (!diagnosisId) {
                return fullDiagnoses.value
            }
            try {
                // const drugIdString = drugId.toString()
                return fullDiagnoses.value.find((diagnosis: { id: Number; }) => {
                    const isMatch = diagnosis.id === diagnosisId
                    return isMatch
                })
            } catch (error) {

            }

        }
    })

    const getDiagnosesName= computed(() => {
        return diagnoses.value
    })

    const getSubdiagnosesName= computed(() => {
        return subDiagnoses.value
    })

    const getSuspectedOrganismsName= computed(() => {
        return suspectedOrganisms.value
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
                fullDiagnoses.value = response.data;
                mapDiagnoses()
                mapDiagnosesName()
                mapSubdiagnosesName()
                
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
            // throw error
        }
    }

    function mapDiagnoses() {
        fullDiagnoses.value = fullDiagnoses.value.map((diagnosis: any) => {
            // Perform mapping or transformation on each item
            return {
                // Return the mapped object
                id: diagnosis['attributes']['diagnosis']['data']['id'],
                ...diagnosis.attributes.diagnosis.data.attributes,
            }
        })   
    }

    function mapDiagnosesName() {
        if (fullDiagnoses.value) {
            try {
                diagnoses.value = [...new Set(
                    fullDiagnoses.value.map((diagnosis: any) => 
                        diagnosis.DiagnosisName
                    )
                )]
                
            } catch (error) {
                const errorStore = useErrorStore()
                errorStore.setError(error)
            }
        } else {
            return []
        }
    }

    function mapSubdiagnosesName() {
        if (fullDiagnoses.value) {
            try {
                subDiagnoses.value = [...new Set(
                    fullDiagnoses.value.map((diagnosis: any) => 
                        diagnosis.SubDiagnosisName
                    )
                )]
                
            } catch (error) {
                const errorStore = useErrorStore()
                errorStore.setError(error)
            }
        } else {
            return []
        }
    }

    function mapSuspectedOrganisms(subDiagnosisName: string) {
        if (subDiagnosisName) {
            
            try {
                const filteredDiagnoses = fullDiagnoses.value.filter((diagnosis: any) => 
                    diagnosis.SubDiagnosisName === subDiagnosisName
                );
                suspectedOrganisms.value = [...new Set(filteredDiagnoses.map((diagnosis: any) => 
                    diagnosis.SuspectedOrganism
                ))];
            } catch (error) {
                console.error(error);
                
                const errorStore = useErrorStore()
                errorStore.setError(error)
            }
        }
    }

    // filter fullDiagnosis by DiagnosisName, SubDiagnosisName or SuspectedOrganism and get ids to find agerange
    function getDiagnosis(
        DiagnosisName: string,
        SubDiagnosisName: string,
        SuspectedOrganism: string
    ) {
        const filter: any = {}
        if (DiagnosisName) {
            filter['DiagnosisName'] = DiagnosisName
        }
        if (SubDiagnosisName) {
            filter['SubDiagnosisName'] = SubDiagnosisName
        }
        if (SuspectedOrganism) {
            filter['SuspectedOrganism'] = SuspectedOrganism
        }
        const diagnosis = fullDiagnoses.value.filter(function(diagnosis: { [x: string]: any; }) {
            for (var key in filter) {
              if (diagnosis[key] === undefined || diagnosis[key] != filter[key])
                return false;
            }
            return true;
          });
          return diagnosis[0]
          
    }
    // consider full data without join, just all row and where to find conditions

    function clearDiagnoses() {
        Object.assign(diagnoses.value, [])
    }

    return { 
        diagnoses,
        getDiagnoses,
        subDiagnoses,
        getDiagnosesName,
        getSubdiagnosesName,
        getSuspectedOrganismsName,
        mapSubdiagnosesName,
        mapSuspectedOrganisms,
        fetchDiagnosesByDrug,
        getDiagnosis,
        clearDiagnoses
    }
})