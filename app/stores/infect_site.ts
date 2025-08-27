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
            const response = await find<any>('msd-cpgs', {
                fields: ['INFECT_SITE'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                
            });
            if (response) {
                const pagination = response.meta.pagination;
                const pageSize = 'pageSize' in pagination ? pagination.pageSize : 100;
                const pageCount = 'pageCount' in pagination ? pagination.pageCount : 1;
                const allResponses = [response];
                for (let i = 2; i <= pageCount; i++) {
                    const response = await find<any>('msd-cpgs', {
                        fields: ['INFECT_SITE'],
                        pagination: {
                            page: i,
                            pageSize: pageSize,
                        },
                    });
                    allResponses.push(response);
                }

                const mergedData = allResponses.map(response => response.data);
                const mergedFlatData = mergedData.flat();
                infectSites.value = mergedFlatData;
                mapInfectsites();
                
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