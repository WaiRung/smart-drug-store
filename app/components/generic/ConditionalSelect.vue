<template>
    <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !fieldData.isValid }">
        <div class="md:w-1/3">
            <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                {{ label }}
                <span v-if="required" class="text-red-500">*</span>
            </label>
        </div>
        <div class="md:w-1/3">
            <select 
                v-model="fieldData.val"
                @change="handleChange(fieldData.val)"
                @blur="handleBlur"
                :disabled="isDisabled"
                class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500"
            >
                <!-- <option value="">Select {{ label }}</option> -->
                <option value="">to be considerate</option>
                <option v-for="option in options" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
            
            <div v-show="!fieldData.isValid" class="text-red-400 text-xl text-sm mt-1">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    fieldData: {
        type: Object,
        required: true
    },
    options: {
        type: Array,
        required: true,
        default: () => []
    },
    label: {
        type: String,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    },
    errorMessage: {
        type: String,
        required: true
    },
    dependsOn: {
        type: [String, Array],
        default: null
    },
    filterData: {
        type: Object,
        required: true
    },
    dependentOptionsData: {
        type: Array,
        default: () => []
    },
    customDisabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['change', 'blur'])


const isDisabled = computed(() => {
    if (props.customDisabled) {
        return true
    } else {
        if (props.dependentOptionsData && props.dependentOptionsData.length === 0) {
            return false
        }
    }

    if (!props.dependsOn) {
        return false
    }

    if (typeof props.dependsOn === 'string') {
        const dependentFieldVal = props.filterData[props.dependsOn]?.val
        
        if (!dependentFieldVal || dependentFieldVal === '') {
            return true
        }
        
        if (props.options.length === 0) {
            return props.dependentOptionsData.length > 0
        }
        
        return false
    }

    if (Array.isArray(props.dependsOn)) {
        return props.dependsOn.some(dep => {
            const dependentFieldVal = props.filterData[dep]?.val
            
            if (!dependentFieldVal || dependentFieldVal === '') {
                return true
            }
            
            if (props.options.length === 0) {
                return props.dependentOptionsData.length > 0
            }
            
            return false
        })
    }

    return false
})

function handleChange(value) {
    emit('change', value)
}

function handleBlur() {
    emit('blur')
}
</script>

<style scoped>
.is-invalid select {
    border-color: #dc3545;
}
</style>
