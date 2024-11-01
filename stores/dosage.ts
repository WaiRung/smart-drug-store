import { defineStore } from 'pinia'
import { useMsdcpgStore } from '#imports';
import { useTabATP_CATALOGStore } from '#imports'
import { useErrorStore } from './error'

export const useDosageStore = defineStore('useDosageStore', () => {
    const msdcpgStore = useMsdcpgStore()
    const tabATP_CATALOGStore = useTabATP_CATALOGStore()

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

    function getTotalDailyDosage() {
        // console.log('selectedWeight : ', filter.selectedWeight);
        // console.log('msdcpg : ', msdcpgStore.getFilter());
        const msdcpg = msdcpgStore.getMsdcpg()
        console.log('atps : ', msdcpgStore.getMsdcpg())
        const DOSE_LBL = msdcpg.attributes.DOSE_LBL
        const DOSE_M = msdcpg.attributes.DOSE_M

        const maxdoseNum = DOSE_M ?  Number(DOSE_M) : null
        const weightNum = Number(filter.selectedWeight.val)
        const timeNum = Number(filter.selectedFrequency.val)

        console.log('getTotalDailyDosage : ' + `${DOSE_LBL}`);

        if (DOSE_LBL === '/kg/day') {
            const lowerLimit = msdcpg.attributes.DOSE_L * weightNum
            let upperLimit = msdcpg.attributes.DOSE_U * weightNum
            if (maxdoseNum && upperLimit < maxdoseNum) {
                upperLimit = maxdoseNum
            }
            // console.log('getTotalDailyDosage : ' + `${lowerLimit} - ${upperLimit}`);
            return {
                lowerLimit,
                upperLimit
            }


        } else if (DOSE_LBL === '/kg/dose') {
            const lowerLimit = msdcpg.attributes.DOSE_L * weightNum * timeNum
            let upperLimit = msdcpg.attributes.DOSE_U * weightNum * timeNum
            if (maxdoseNum && upperLimit < maxdoseNum) {
                upperLimit = maxdoseNum
            }
            console.log(`${lowerLimit} - ${upperLimit}`);
            return {
                lowerLimit,
                upperLimit
            }
        } else {
            return {
                lowerLimit: 0,
                upperLimit: 0
            }
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

    function amountPerDose() {

        const msdcpg = msdcpgStore.getMsdcpg()
        const DOSE_LBL = msdcpg.attributes.DOSE_LBL
        const DOSE_M = msdcpg.attributes.DOSE_M

        const maxdoseNum = DOSE_M ?  Number(DOSE_M) : null
        const weightNum = Number(filter.selectedWeight.val)
        const timeNum = Number(filter.selectedFrequency.val)
        if (DOSE_LBL === '/kg/day') {
            const lowerLimit = getTotalDailyDosage().lowerLimit/timeNum
            const upperLimit = getTotalDailyDosage().upperLimit/timeNum

            return {
                lowerLimit,
                upperLimit
            }
        } else if (DOSE_LBL === '/kg/dose') {
            const lowerLimit = msdcpg.attributes.DOSE_L * weightNum
            let upperLimit = msdcpg.attributes.DOSE_U * weightNum
            if (maxdoseNum && upperLimit < maxdoseNum) {
                upperLimit = maxdoseNum
            }
            console.log(`${lowerLimit} - ${upperLimit}`);
            return {
                lowerLimit,
                upperLimit
            }
        } else {
            const DOSE_CHECK = `${msdcpg.attributes.DOSE_L} ${msdcpg.attributes.DOSE_UNIT}${msdcpg.attributes.DOSE_LBL}`
            return DOSE_CHECK
        }
    }

    function mlPerDose() {
        const msdcpg = msdcpgStore.getMsdcpg()
    }

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
        console.log('onChangeFrequency : ', frequencyTime);

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
        getTotalDailyDosage,
        amountPerDose
    }
})
