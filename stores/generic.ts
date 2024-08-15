import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useGenericStore = defineStore('useGenericStore', () => {
    const { find } = useStrapi()
    const fullDiagnoses: any = ref([])

    const generics: any = ref([])
    const filteredGenerics: any = ref([])
    const subDiagnoses: any = ref([])
    const suspectedOrganisms: any = ref([])

    const getGenerics = computed(() => {
        return () => {
            return filteredGenerics.value
        }
    })

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
        return generics.value
    })

    const getSubdiagnosesName= computed(() => {
        return subDiagnoses.value
    })

    const getSuspectedOrganismsName= computed(() => {
        return suspectedOrganisms.value
    })

    async function fetchGenericsByClass(drugId: number) {
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
                generics.value = [...new Set(
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

    async function fetchGenerics() {
        try {
            const response1 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
            },);
            const response2 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 2,
                    pageSize: 100,
                },
            },);
            const response3 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 3,
                    pageSize: 100,
                },
            },);
            const response4 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 4,
                    pageSize: 100,
                },
            },);
            const response5 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 5,
                    pageSize: 100,
                },
            },);
            const response6 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 6,
                    pageSize: 100,
                },
            },);
            if (response1 && response2 && response3 && response4 && response5 && response6) {

                // mapDosages()
                const mergedData = [
                    response1.data,
                    response2.data,
                    response3.data,
                    response4.data,
                    response5.data,
                    response6.data
                ];
                const mergedFlatData = mergedData.flat();
                const rawGenerics = mergedFlatData.map(item => item.attributes.GENERIC);
                const uniq = [...new Set(rawGenerics)]
                
                
                generics.value = uniq
                filteredGenerics.value = uniq
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function getFilteredGenerics(searchText:string) {
        
        if (searchText) {
            
            const filtered = generics.value.filter((genericLabel: string) => genericLabel.startsWith(searchText));
            filteredGenerics.value = filtered
        } else {
            filteredGenerics.value = generics.value
        }
    }


    return { 
        getGenerics,
        fetchGenerics,
        getFilteredGenerics,

        getDiagnoses,
        subDiagnoses,
        getDiagnosesName,
        getSubdiagnosesName,
        getSuspectedOrganismsName,
        mapSubdiagnosesName,
        mapSuspectedOrganisms,
        fetchGenericsByClass,
        getDiagnosis,
    }
})