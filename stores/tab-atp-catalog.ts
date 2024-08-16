import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useTabATP_CATALOGStore = defineStore('useTabATP_CATALOGStore', () => {
    const { find } = useStrapi()

    const classes: any = ref([])

    const filteredClasses: any = ref([])
    const ATPs: any = ref([])

    const getATPs = computed(() => {
        return () => {
            return ATPs.value
        }
    })

    const getClassess = computed(() => {
        return () => {
            return filteredClasses.value
        }
    })

    async function fetchClasses(generic: string = '') {
        try {
            const filterGeneric: any = {
                'GENERIC': {
                    $containsi: generic ? generic : ''
                }
            }

            const filterObj = {
                ...filterGeneric
            }

            const response1 = await find<any>('tab-atp-catalogs', {
                fields: ['CLASS'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: filterObj,
            },);
            const response2 = await find<any>('tab-atp-catalogs', {
                fields: ['CLASS'],
                pagination: {
                    page: 2,
                    pageSize: 100,
                },
                filters: filterObj,
            },);
            const response3 = await find<any>('tab-atp-catalogs', {
                fields: ['CLASS'],
                pagination: {
                    page: 3,
                    pageSize: 100,
                },
                filters: filterObj,
            },);
            const response4 = await find<any>('tab-atp-catalogs', {
                fields: ['CLASS'],
                pagination: {
                    page: 4,
                    pageSize: 100,
                },
                filters: filterObj,
            },);
            const response5 = await find<any>('tab-atp-catalogs', {
                fields: ['CLASS'],
                pagination: {
                    page: 5,
                    pageSize: 100,
                },
                filters: filterObj,
            },);
            const response6 = await find<any>('tab-atp-catalogs', {
                fields: ['CLASS'],
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
                const rawClasses = mergedFlatData.map(item => item.attributes.CLASS);
                const uniq = [...new Set(rawClasses)]
                classes.value = uniq
                filteredClasses.value = uniq
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    async function fetchATPSByGenericClass(generic: string = '', className: string = '') {
        try {
            const filterGeneric: any = {
                'GENERIC': {
                    $containsi: generic ? generic : ''
                }
            }
            const filterClassName: any = {
                'CLASS': {
                    $containsi: className ? className : ''
                }
            }
            const filterObj = {
                $or: [
                    filterGeneric,
                    filterClassName
                ]
            }
            const response = await find<any>('tab-atp-catalogs', {
                populate: {
                    // diagnosis: true,
                    // age_group: true
                    // drug: true
                },
                filters: filterObj,
            });
            if (response) {
                ATPs.value = response.data;
                // mapDosages()

            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    function getFilteredClasses(searchText:string) {
        if (searchText) {
            
            const filtered = classes.value.filter((classLabel: string) => classLabel.startsWith(searchText));
            filteredClasses.value = filtered
        } else {
            filteredClasses.value = classes.value
        }
    }

    return {
        getClassess,
        getATPs,
        fetchClasses,
        fetchATPSByGenericClass,
        getFilteredClasses
    }
})