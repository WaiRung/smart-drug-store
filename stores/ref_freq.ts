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

    async function fetchfrequencies(msdcpgFREQ: string = '') {
        try {
            if (msdcpgFREQ.startsWith('divided ')) {
                msdcpgFREQ = msdcpgFREQ.replace('divided ', '')
            }
            if (msdcpgFREQ.endsWith(' after loading dose')) {
                msdcpgFREQ = msdcpgFREQ.replace(' after loading dose', '')
            }
            if (msdcpgFREQ.endsWith(' a day')) {
                msdcpgFREQ = msdcpgFREQ.replace(' a day', '')
            }
            if (msdcpgFREQ.endsWith(' a day after loading dose')) {
                msdcpgFREQ = msdcpgFREQ.replace(' a day after loading dose', '')
            }
            const filterFREQ: any = {
                'FREQ': {
                    $eq: msdcpgFREQ
                }
            }
            const filterObj = {
                ...filterFREQ,
               
            }
            const response = await find<any>('ref-freqs', {
                fields: ['FREQ', 'FREQ_LBL', 'Time'],
                filters: filterObj,
            },);
            if (response) {
                const rawFrequencies = response.data
                const unique = mergeObjects(rawFrequencies)
                
                frequencies.value = unique
                filteredFrequencies.value = unique
                
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function filterFrequencies(searchText: string) {
        if (searchText) {
            const filtered = frequencies.value.filter((frequencyObj: any) => {
                return frequencyObj.FREQ.includes(searchText)
            })
            
            const unique = mergeObjects(filtered)
            filteredFrequencies.value = unique
        } else {
            filteredFrequencies.value = frequencies.value
        }
    }

    function mergeObjects(arr: any[]) {
        const groupedObjects = arr.reduce((acc: { [x: string]: any; }, obj: { FREQ_LBL: any; }) => {
          const key = obj.FREQ_LBL;
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