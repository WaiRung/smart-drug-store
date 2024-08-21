import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useGroupStore = defineStore('useGroupStore', () => {
    const { find } = useStrapi()
    const groups: any = ref([])

    const getGroups = computed(() => {
        return () => {
            return groups.value
        }
    })

    async function fetchGroupsByGeneric(
        generic: string,
    ) {
        try {
            const filterGeneric: any = {
                'GENERIC': {
                    $containsi: generic ? generic : ''
                }
            }

            const filterObj = {
                ...filterGeneric
            }

            const response = await find<any>('msd-cpgs', {
                fields: ['GROUP'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            });
            if (response) {
                groups.value = response.data;
                mapGroups()
                
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
            // throw error
        }
    }

    function mapGroups() {
        
        if (groups.value) {
          try {
            const stringGroups = groups.value.map((group: { attributes: { GROUP: string; }; }) => group.attributes.GROUP);
            const uniq = [...new Set(stringGroups)]
            
            groups.value = uniq
          } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
          }
        } else {
    
        }
      }

      return { groups, getGroups, fetchGroupsByGeneric }
})