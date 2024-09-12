import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useREF_FREQStore = defineStore('useREF_FREQStore', () => {
    const { find } = useStrapi()

    const frequencies: any = ref([])

    const filteredFrequencies: any = ref([])

    const getFrequencies = computed(() => {
        return () => {
            return filteredFrequencies.value
        }
    })

    async function fetchfrequencies() {
        try {
            const response = await find<any>('ref-freqs', {
                fields: ['FREQ', 'FREQ_LBL', 'Time'],
                filters: {},
            },);
            if (response) {
                frequencies.value = response.data
                // filteredFrequencies.value = response.data
                console.log(response.data);
                
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function filterFrequencies(searchText: string) {
        if (searchText) {
            const filtered = frequencies.value.filter((frequencyObj: any) => {
                return frequencyObj.attributes.FREQ.includes(searchText)
            })
            
            const unique = mergeObjects(filtered)
            filteredFrequencies.value = unique
        } else {
            filteredFrequencies.value = frequencies.value
        }
    }

    function mergeObjects(arr: any[]) {
        const groupedObjects = arr.reduce((acc: { [x: string]: any; }, obj: { attributes: { FREQ_LBL: any; }; }) => {
          const key = obj.attributes.FREQ_LBL;
          if (!acc[key]) {
            acc[key] = obj;
          }
          return acc;
        }, {});
      
        return Object.values(groupedObjects);
      }

    return {
        getFrequencies,
        fetchfrequencies,
        filterFrequencies,
    }
})