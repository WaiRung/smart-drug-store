import { defineStore } from 'pinia'
import { useErrorStore } from './error';

export const useTabATP_CATALOGStore = defineStore('useTabATP_CATALOGStore', () => {
    const { find } = useStrapi()

    const classes: any = ref([])

    const filteredClasses: any = ref([])
    const ATPs: any = ref([])
    const ATP: any = ref({})

    const getATPs = computed(() => {
        return () => {
            return ATPs.value
        }
    })

    const getATPswithbyFORM_LABEL = computed(() => {
        return () => {
            // Remove duplicates based on the 'FORM_LABEL' property
            const uniqueMap: { [key: string]: any } = {};
            ATPs.value.forEach((atp: any) => {
                if (atp.FORM_LABEL) {
                    uniqueMap[atp.FORM_LABEL] = atp;
                } else {
                    const FORM_LABEL = `${atp.GENERIC}, ${atp.STR} ${atp.STR_U} per ${atp.DOSAGE_FORM}`;
                    atp.FORM_LABEL = FORM_LABEL;
                    uniqueMap[FORM_LABEL] = atp;
                }
            });
            
            // Convert back to array
            const uniqueATPs = Object.values(uniqueMap);
            
            return uniqueATPs
        }
    }
    )

    const getAtpByGenericForm = computed(() => {
        return (
            generic: string = '',
            form: string = ''
        ) => {
            let foundTabATP = null
            if (ATPs.value instanceof  Array) {
                foundTabATP = ATPs.value.find(
                    (atp: { GENERIC: string, FORM_LABEL: string }) =>
                        atp.GENERIC === generic.toUpperCase()
                    && (form ? atp.FORM_LABEL === form : true) // only filter FORM_LABEL when form is not empty
                )
                ATP.value = foundTabATP
            } else if (
                typeof ATPs.value === 'object' &&
                !Array.isArray(ATPs.value) &&
                ATPs.value !== null
            ) {
                foundTabATP = ATPs.value
            }
            return foundTabATP
        }
    })

    async function fetchClassesByGeneric(generic: string = '') {
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
                const rawClasses = mergedFlatData.map(item => item.CLASS);
                const uniq = [...new Set(rawClasses)]
                classes.value = uniq
                filteredClasses.value = uniq
            }
        } catch (error) {
            const errorStore = useErrorStore()
            errorStore.setError(error)
        }
    }

    async function fetchATPSByGenericRoute(generic: string = '', route: string = '') {
        try {
            const filterGeneric: any = generic ? {
                'GENERIC': {
                    $eqi: generic ? generic : ''
                }
            } : {}
            let ATPRoute = ''
            if (route === 'PO') {
                ATPRoute = 'oral'
            } else if (route === 'IV') {
                ATPRoute = 'parenteral '
            }
            const filterRoute: any = ATPRoute ? {
                'ROUTE': {
                    $eqi: ATPRoute
                }
            } : {}
            const filterObj = {
                $and: [
                    filterGeneric,
                    filterRoute
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

    return {
        getATPs,
        getATPswithbyFORM_LABEL,
        getAtpByGenericForm,
        fetchClassesByGeneric,
        fetchATPSByGenericRoute,
    }
})