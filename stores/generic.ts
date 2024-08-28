import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useGenericStore = defineStore('useGenericStore', () => {
    const { find } = useStrapi()

    const generics: any = ref([])
    const filteredGenerics: any = ref([])

    const getGenerics = computed(() => {
        return () => {
            return filteredGenerics.value
        }
    })

    // async function fetchGenericsByClass(drugId: number) {
    //     try {
    //         const filterObj = drugId ? {
    //             drug: {
    //                 id: {
    //                     $eq: drugId
    //                 }
    //             }
    //         } : {}
    //         const response = await find<any>('drug-diagnoses', {
    //             populate: {
    //                 diagnosis: true,
    //                 // drug: true
    //             },
    //             filters: filterObj,
    //         });
    //         if (response) {
    //             fullDiagnoses.value = response.data;
                
    //         }
    //     } catch (error) {
    //         const errorStore = useErrorStore()
    //         errorStore.setError(error)
    //         // throw error
    //     }
    // }

    async function fetchGenerics(className: string = '') {
        try {
            const filterClassName: any = {
                'CLASS': {
                    $containsi: className ? className : ''
                }
            }

            const filterObj = {
                ...filterClassName
            }

            const response1 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            },);
            const response2 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 2,
                    pageSize: 100,
                },
                filters: filterObj,
            },);
            const response3 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 3,
                    pageSize: 100,
                },
                filters: filterObj,
            },);
            const response4 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 4,
                    pageSize: 100,
                },
                filters: filterObj,
            },);
            const response5 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 5,
                    pageSize: 100,
                },
                filters: filterObj,
            },);
            const response6 = await find<any>('tab-atp-catalogs', {
                fields: ['GENERIC'],
                pagination: {
                    page: 6,
                    pageSize: 100,
                },
                filters: filterObj,
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
            const filtered = generics.value.filter((genericLabel: string) => genericLabel.toLowerCase().startsWith(searchText));
            
            filteredGenerics.value = filtered
        } else {
            filteredGenerics.value = generics.value
        }
    }


    return { 
        getGenerics,
        fetchGenerics,
        getFilteredGenerics,

    }
})