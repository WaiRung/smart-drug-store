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
        },
        selectedForm: {
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

    function resetFilter() {
        const nullKeys = [
            'selectedWeight',
            'selectedFrequency',
            'selectedForm',
        ]

        for (let i = 0; i < nullKeys.length; i++) {
            const key = nullKeys[i];
            const prop = filter[key as keyof typeof filter]
            prop.val = ''
        }
    }

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

        if (DOSE_LBL === '/kg/day') {
            const lowerLimit_raw = msdcpg.attributes.DOSE_L * weightNum
            let upperLimit_raw = msdcpg.attributes.DOSE_U * weightNum
            if (maxdoseNum && upperLimit_raw < maxdoseNum) {
                upperLimit_raw = maxdoseNum
            }
            const lowerLimit = Math.round(lowerLimit_raw * 100) / 100
            const upperLimit = Math.round(upperLimit_raw * 100) / 100
            // console.log('getTotalDailyDosage : ' + `${lowerLimit} - ${upperLimit}`);
            return {
                lowerLimit,
                upperLimit
            }


        } else if (DOSE_LBL === '/kg/dose') {
            const lowerLimit_raw = msdcpg.attributes.DOSE_L * weightNum * timeNum
            let upperLimit_raw = msdcpg.attributes.DOSE_U * weightNum * timeNum
            if (maxdoseNum && upperLimit_raw < maxdoseNum) {
                upperLimit_raw = maxdoseNum
            }
            const lowerLimit = Math.round(lowerLimit_raw * 100) / 100
            const upperLimit = Math.round(upperLimit_raw * 100) / 100
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
        console.log('getTotalDailyDosage : ', getTotalDailyDosage());
        
        if (DOSE_LBL === '/kg/day') {
            const lowerLimit_raw = getTotalDailyDosage().lowerLimit/timeNum
            const upperLimit_raw = getTotalDailyDosage().upperLimit/timeNum

            const lowerLimit = Math.round(lowerLimit_raw * 100) / 100
            const upperLimit = Math.round(upperLimit_raw * 100) / 100
            return {
                lowerLimit,
                upperLimit
            }
        } else if (DOSE_LBL === '/kg/dose') {
            const lowerLimit_raw = msdcpg.attributes.DOSE_L * weightNum
            let upperLimit_raw = msdcpg.attributes.DOSE_U * weightNum
            if (maxdoseNum && upperLimit_raw < maxdoseNum) {
                upperLimit_raw = maxdoseNum
            }

            const lowerLimit = Math.round(lowerLimit_raw * 100) / 100
            const upperLimit = Math.round(upperLimit_raw * 100) / 100
            console.log(`${lowerLimit} - ${upperLimit}`);
            return {
                lowerLimit,
                upperLimit
            }
        } else {
            const DOSE_CHECK = `${msdcpg.attributes.DOSE_L} ${msdcpg.attributes.DOSE_UNIT}${msdcpg.attributes.DOSE_LBL}`
            return {
                lowerLimit: null,
                upperLimit: null,
                DOSE_CHECK
            }
        }
    }

    function mlPerDose() {
        const msdcpg = msdcpgStore.getMsdcpg()
        const tabATP = tabATP_CATALOGStore.getAtpByGeneric(msdcpg.attributes.GENERIC)

        const DOSE_LBL = msdcpg.attributes.DOSE_LBL
        const DOSE_M = msdcpg.attributes.DOSE_M
        const STR_CONTENT = tabATP.attributes.STR_CONTENT

        const maxdoseNum = DOSE_M ?  Number(DOSE_M) : null
        const weightNum = Number(filter.selectedWeight.val)
        const timeNum = Number(filter.selectedFrequency.val)

        console.log('mlPerDose : ', msdcpg);
        
        if (STR_CONTENT === 'mL') {
            const amountPerDoseLowerLimit = amountPerDose().lowerLimit
            const amountPerDoseUpperLimit = amountPerDose().upperLimit

            const strTimestrV = Number(msdcpg.attributes.STR) * Number(msdcpg.attributes.STR_V)

            const lowerLimit_raw = amountPerDoseLowerLimit!/strTimestrV
            const upperLimit_raw = amountPerDoseUpperLimit!/strTimestrV

            const lowerLimit = Math.round(lowerLimit_raw * 100) / 100
            const upperLimit = Math.round(upperLimit_raw * 100) / 100
            return {
                lowerLimit,
                upperLimit
            }
        } else {
            const mlPerDose = `-`
            return {
                lowerLimit: null,
                upperLimit: null,
                mlPerDose
            }
        }
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

    function onChangeForm(drugForm: string) {
        console.log('onChangeFrequency : ', drugForm);
    }

    function clearValidity(fieldName: string) {
        filter[fieldName as keyof typeof filter].isValid = true
    }

    return {
        getFilter,
        onChangeWeight,
        onChangeFrequency,
        onChangeForm,
        resetFilter,
        clearValidity,
        getTotalDailyDosage,
        amountPerDose,
        mlPerDose
    }
})
