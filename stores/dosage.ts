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

    const getTotalDailyDosage = computed(() => {
        return () => {
            // console.log('selectedWeight : ', filter.selectedWeight);
            // console.log('msdcpg : ', msdcpgStore.getFilter());
            const msdcpg = msdcpgStore.getMsdcpg()
            console.log('atps : ', msdcpgStore.getMsdcpg())
            const DOSE_LBL = msdcpg.attributes.DOSE_LBL
            const weightNum = Number(filter.selectedWeight.val)
            const timeNum = Number(filter.selectedFrequency.val)

            if (DOSE_LBL === '/kg/day') {
                const lowerLimit = msdcpg.attributes.DOSE_L*weightNum
                const upperLimit = msdcpg.attributes.DOSE_U*weightNum
                console.log(`${lowerLimit} - ${upperLimit}`);
                return `${lowerLimit} - ${upperLimit} .mg, g or MU`
                
                
            } else if (DOSE_LBL === '/kg/dose') {
                const lowerLimit = msdcpg.attributes.DOSE_L*weightNum*timeNum
                const upperLimit = msdcpg.attributes.DOSE_U*weightNum*timeNum
                console.log(`${lowerLimit} - ${upperLimit}`);
                return `${lowerLimit} - ${upperLimit} mg, g or MU`
            } else {
                
            }
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

    const amountPerDose = computed(() => {
        return () => {
            const msdcpg = msdcpgStore.getMsdcpg()
            const DOSE_LBL = msdcpg.attributes.DOSE_LBL
            const weightNum = Number(filter.selectedWeight.val)
            const timeNum = Number(filter.selectedFrequency.val)
            if (DOSE_LBL === '/kg/day') {
                const lowerLimit = (msdcpg.attributes.DOSE_L*weightNum*timeNum) / timeNum
                const upperLimit = (msdcpg.attributes.DOSE_U*weightNum*timeNum) / timeNum
            }
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

    function onChangeFrequency(frequencyTime: string) {
        console.log(frequencyTime);
        
        // filter.selectedFrequency.val = filterObj.attributes.Time
    }

    function clearValidity(fieldName: string) {
        filter[fieldName as keyof typeof filter].isValid = true
    }

    return {
        getFilter,
        onChangeWeight,
        onChangeFrequency,
        clearValidity,
        getTotalDailyDosage
    }
})