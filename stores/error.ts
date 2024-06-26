import { defineStore } from 'pinia'

export const useErrorStore = defineStore('errorStore', () => {
    const error = ref(null)

    const getError = computed(() => {

        let returnMsg = 'An error occurred'
        if (error.value && error.value['data'] && error.value['data']['message']) {
            returnMsg = error.value['data']['message']
        } else if (typeof error.value === 'string') {
            returnMsg = error.value
        }
        return returnMsg
        // return error.value
    })

    const isError = computed(() => {
        const returnB = error.value ? true : false
        return returnB
    })

    function setError(newError: any) {
        error.value = newError
    }

    function clearError() {
        error.value = null
    }

    return {
        error,
        getError,
        isError,
        setError,
        clearError
    }
})