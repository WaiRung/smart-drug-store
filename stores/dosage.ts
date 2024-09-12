import { defineStore } from 'pinia'
import { useMsdcpgStore } from '#imports';
import { useErrorStore } from './error'

export const useDosageStore = defineStore('useDosageStore', () => {
    const msdcpgStore = useMsdcpgStore()

    const filter = reactive({
        selectedWeight: {
            isValid: true,
            val: '',
            required: true
        },
        selectedFrequency: {
            isValid: true,
            val: '',
            required: true
        }
    })

    const getFilter = computed(() => {
        return () => {
            return filter
        }
    })

    const getCaluculatedLabel = computed(() => {
        return () => {
            console.log('selectedWeight : ', filter.selectedWeight);
            console.log('msdcpg : ', msdcpgStore.getFilter());

            // if (!msdcpg) {
            //     return null
            // }
            // if (!filter.selectedWeight) {
            //     return msdcpg.attribute.ANTIBIOTIC_LABEL
            // }
            // if (!msdcpg.attribute.DOSE_U) {

            // }
        }
    })

    function onChangeWeight(evt: any) {
        const regex = /^\d+(\.\d+)?$/;
        if (regex.test(evt.target.value)) {
            filter.selectedWeight.isValid = true
            filter.selectedWeight.val = evt.target.value
        } else {
            filter.selectedWeight.isValid = false
            filter.selectedWeight.val = evt.target.value = ''
        }
    }

    function onChangeFrequency(filterObj: any) {
        
        filter.selectedFrequency.val = filterObj.attributes.Time
    }

    function clearValidity(fieldName: string) {
        filter[fieldName as keyof typeof filter].isValid = true
    }

    return {
        getFilter,
        onChangeWeight,
        onChangeFrequency,
        clearValidity,
        getCaluculatedLabel
    }
})