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

    async function fetchInfectsiteByGroupAge(
        group: string,
        age: string,
    ) {
        try {
            

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
                ...filterAge,
            }

            const response = await find<any>('msd-cpgs', {
                fields: ['INFECT_SITE'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            });

            if (response) {
                infectSites.value = response.data;
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
                const stringInfectsites = infectSites.value.map((age: { attributes: { INFECT_SITE: string; }; }) => age.attributes.INFECT_SITE);
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
        fetchInfectsiteByGroupAge
    }
})