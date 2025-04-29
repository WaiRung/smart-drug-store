import { defineStore } from 'pinia'
import { useErrorStore } from './error'

export const useInfectsiteStore = defineStore('useInfectsiteStore', () => {
    const { find } = useStrapi()

    const infectSites: any = ref([])

    const getInfectsites = computed(() => {
        return () => {
            return infectSites.value
        }
    })

    async function fetchInfectsite() {
        try {
            const response1 = await find<any>('msd-cpgs', {
                fields: ['INFECT_SITE'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                
            });

            const response2 = await find<any>('msd-cpgs', {
                fields: ['INFECT_SITE'],
                pagination: {
                    page: 2,
                    pageSize: 100,
                },
                
            });
            if (response1 && response2) {
                const mergedData = [
                    response1.data,
                    response2.data,
                ];
                const mergedFlatData = mergedData.flat();
                infectSites.value = mergedFlatData;
                mapInfectsites()
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function mapInfectsites() {
        if (infectSites.value) {
            try {
                const stringInfectsites = infectSites.value.map((age: { INFECT_SITE: string; }) => age.INFECT_SITE);
                const uniq = [...new Set(stringInfectsites)]
                
                infectSites.value = uniq
                
            } catch (error) {
              const errorStore = useErrorStore()
              errorStore.setError(error)
            }
          } else {
            return []
          }
    }

    return {
        getInfectsites,
        fetchInfectsite
    }
})