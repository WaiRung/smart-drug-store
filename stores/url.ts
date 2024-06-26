// store/index.js
import { defineStore } from 'pinia'
export const useUrlStore = defineStore('urlStore', () => {
    const apiUrl = ref('http://localhost:1337')
    const url = ref('http://localhost:1337/api')
    return { apiUrl, url }
})