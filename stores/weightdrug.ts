import { defineStore } from 'pinia'

export const useWeightdrugStore = defineStore('weightdrugStore', () => {
    const weightDrug = ref('')
    const tempWeightDrug = ref('')


    function setWeightDrug(value: string) {
        
        
        tempWeightDrug.value = value
        console.log(tempWeightDrug);
    }
    function confirmWeightDrug() {
        weightDrug.value = tempWeightDrug.value
    }
    return { setWeightDrug, confirmWeightDrug, weightDrug, tempWeightDrug }
})