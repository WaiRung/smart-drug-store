import { defineStore } from 'pinia'
import { useErrorStore } from './error'

export const useDosageStore = defineStore('useDosageStore', () => {
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
            console.log(filter.selectedWeight);
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
        console.log(evt.target.value);
        const regex = /^\d+(\.\d+)?$/;
        if (regex.test(evt.target.value)) {
            filter.selectedWeight.isValid = true
            filter.selectedWeight.val = evt.target.value
        } else {
            filter.selectedWeight.isValid = false
            filter.selectedWeight.val = evt.target.value = ''
        }
    }

    function clearValidity(fieldName: string) {
        filter[fieldName as keyof typeof filter].isValid = true
    }

    return {
        getFilter,
        onChangeWeight,
        clearValidity
    }
})