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

    async function fetchGroupsByInfectsiteDiagnosis(
        infect_site: string,
        diagnosis: string
    ) {
        try {
            const filterInfectsite: any = {
                'INFECT_SITE': {
                    $containsi: infect_site ? infect_site : ''
                }
            }

            const filterDiagnosis: any = {
                'DIAGNOSIS': {
                    $containsi: diagnosis ? diagnosis : ''
                }
            }

            const filterObj = {
                ...filterInfectsite,
                ...filterDiagnosis
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
                const pagination = response.meta.pagination;
                const pageSize = 'pageSize' in pagination ? pagination.pageSize : 100;
                const pageCount = 'pageCount' in pagination ? pagination.pageCount : 1;
                const allResponses = [response];
                for (let i = 2; i <= pageCount; i++) {
                    const response = await find<any>('msd-cpgs', {
                        fields: ['GROUP'],
                        pagination: {
                            page: i,
                            pageSize: pageSize,
                        },
                        filters: filterObj,
                    });
                    allResponses.push(response);
                }
                const mergedData = allResponses.map(response => response.data);
                const mergedFlatData = mergedData.flat();
                groups.value = mergedFlatData;
                mapGroups();
                reorderGroup();
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
            const stringGroups = groups.value.map((group: { GROUP: string; }) => group.GROUP);
            const uniq = [...new Set(stringGroups)]
            groups.value = uniq
          } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
          }
        } else {
            return []
        }
      }

      function reorderGroup() {
        const defaultOrder = [
            'NB: PMA <30w',
            'NB: PMA 30-34w',
            'NB: PMA 35-44w',
            'NB: PMA 44w+',
            'INFANT',
            'CHILD',
        ];
        const reorderedArray: string[] = [];
      
        // Iterate through the default order and add elements from the input array if they exist
        defaultOrder.forEach(item => {
          if (groups.value.includes(item)) {
            reorderedArray.push(item);
          }
        });
      
        groups.value = reorderedArray;
      }

      return {
        groups,
        getGroups,
        fetchGroupsByInfectsiteDiagnosis }
})