import { defineStore } from 'pinia'
import { useMsdcpgStore } from '~/stores/msdcpg'
import { useTabATP_CATALOGStore } from '~/stores/tab-atp-catalog'
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
        const DOSE_LBL = msdcpg.DOSE_LBL
        const DOSE_M = msdcpg.DOSE_M
        const DOSE_UNIT = msdcpg.DOSE_UNIT

        const unit = DOSE_UNIT

        const maxdoseNum = DOSE_M ?  Number(DOSE_M) : null
        const weightNum = Number(filter.selectedWeight.val)
        const timeNum = Number(filter.selectedFrequency.val)

        if (DOSE_LBL === '/kg/day') {
            const lowerLimit_raw = msdcpg.DOSE_L * weightNum
            let upperLimit_raw = msdcpg.DOSE_U * weightNum
            if (maxdoseNum && upperLimit_raw > maxdoseNum) {
                upperLimit_raw = maxdoseNum
            }
            const lowerLimit = Math.round(lowerLimit_raw * 100) / 100
            const upperLimit = Math.round(upperLimit_raw * 100) / 100
            console.log(msdcpg.DOSE_U);
            
            // console.log('getTotalDailyDosage : ' + `${lowerLimit} - ${upperLimit}`);
            return {
                lowerLimit,
                upperLimit,
                unit
            }


        } else if (DOSE_LBL === '/kg/dose') {
            const lowerLimit_raw = msdcpg.DOSE_L * weightNum * timeNum
            let upperLimit_raw = msdcpg.DOSE_U * weightNum * timeNum
            if (maxdoseNum && upperLimit_raw > maxdoseNum) {
                upperLimit_raw = maxdoseNum
            }
            const lowerLimit = Math.round(lowerLimit_raw * 100) / 100
            const upperLimit = Math.round(upperLimit_raw * 100) / 100

            return {
                lowerLimit,
                upperLimit,
                unit
            }
        } else {
            return {
                lowerLimit: 0,
                upperLimit: 0,
                unit: 'g, mg or MU'
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
        const DOSE_LBL = msdcpg.DOSE_LBL
        const DOSE_M = msdcpg.DOSE_M
        const DOSE_UNIT = msdcpg.DOSE_UNIT

        const unit = DOSE_UNIT

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
                upperLimit,
                unit
            }
        } else if (DOSE_LBL === '/kg/dose') {
            const lowerLimit_raw = msdcpg.DOSE_L * weightNum
            let upperLimit_raw = msdcpg.DOSE_U * weightNum
            if (maxdoseNum && upperLimit_raw > maxdoseNum) {
                upperLimit_raw = maxdoseNum
            }

            const lowerLimit = Math.round(lowerLimit_raw * 100) / 100
            const upperLimit = Math.round(upperLimit_raw * 100) / 100

            
            // console.log(`${lowerLimit} - ${upperLimit}`);
            return {
                lowerLimit,
                upperLimit,
                unit
            }
        } else {
            const DOSE_CHECK = `${msdcpg.DOSE_L} ${msdcpg.DOSE_UNIT}${msdcpg.DOSE_LBL}`
            return {
                lowerLimit: null,
                upperLimit: null,
                DOSE_CHECK
            }
        }
    }

    function mlPerDose() {
        const msdcpg = msdcpgStore.getMsdcpg()
        let tabATP = null
        console.log('form : ', filter.selectedForm.val);
        
        if (Array.isArray(tabATP)) {
            tabATP = tabATP_CATALOGStore.getAtpByGenericForm(msdcpg.GENERIC, filter.selectedForm.val)[0]
        } else {
            tabATP = tabATP_CATALOGStore.getAtpByGenericForm(msdcpg.GENERIC, filter.selectedForm.val)
        }

        const DOSE_LBL = msdcpg.DOSE_LBL
        const DOSE_M = msdcpg.DOSE_M
        const STR_CONTENT = tabATP.STR_CONTENT

        const maxdoseNum = DOSE_M ?  Number(DOSE_M) : null
        const weightNum = Number(filter.selectedWeight.val)
        const timeNum = Number(filter.selectedFrequency.val)
        
        
        if (STR_CONTENT === 'mL') {
            const amountPerDoseLowerLimit = amountPerDose().lowerLimit
            const amountPerDoseUpperLimit = amountPerDose().upperLimit

            const strTimestrV = Number(tabATP.STR_V) / Number(tabATP.STR)

            const lowerLimit_raw = amountPerDoseLowerLimit! * strTimestrV
            const upperLimit_raw = amountPerDoseUpperLimit! * strTimestrV

            const lowerLimit = Math.round(lowerLimit_raw * 10) / 10
            const upperLimit = Math.round(upperLimit_raw * 10) / 10

            return {
                tabATP,
                lowerLimit,
                upperLimit
            }
        } else {
            const mlPerDose = `-`
            return {
                tabATP,
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

        // filter.selectedFrequency.val = filterObj.Time
    }

    function onChangeForm(drugForm: string) {
        // filter getAtpByGenericForm by selected drugForm too, then calculate the dosage based on the form
        console.log('onChangeForm : ', drugForm);
        filter.selectedForm.val = drugForm
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
