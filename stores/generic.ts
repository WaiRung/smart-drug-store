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

    // async function fetchGenerics(drugId: number) {
    //     try {
    //         const filterObj = drugId ? {
    //             drug: {
    //                 documentId: {
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
        getFilteredGenerics,

    }
})