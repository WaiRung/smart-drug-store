<template>
    <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !fieldData.isValid }">
        <div class="md:w-1/3">
            <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                {{ label }}
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
                <option value="">Select {{ label }}</option>
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
import { computed } from 'vue'

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

// New logic: disabled only if previous filterData val exists but current options are empty
// If previous options are empty array, current should NOT be disabled
const isDisabled = computed(() => {
    // Handle custom disabled prop (for special cases like Age with Viral Pneumonia)
    // But still apply the new logic: if previous options were empty, don't disable
    if (props.customDisabled) {
        // Apply new logic: if dependent options are empty, don't disable even if custom disabled is true
        if (props.dependentOptionsData && props.dependentOptionsData.length === 0) {
            return false
        }
        return true
    }

    if (!props.dependsOn) {
        return false
    }

    // Handle single dependency
    if (typeof props.dependsOn === 'string') {
        const dependentFieldVal = props.filterData[props.dependsOn]?.val
        
        // If dependent field has no value, disable current field
        if (!dependentFieldVal || dependentFieldVal === '') {
            return true
        }
        
        // NEW LOGIC: If dependent field has value but current options are empty, 
        // check if dependent options were empty (if so, don't disable)
        if (props.options.length === 0) {
            return props.dependentOptionsData.length > 0
        }
        
        return false
    }

    // Handle multiple dependencies
    if (Array.isArray(props.dependsOn)) {
        return props.dependsOn.some(dep => {
            const dependentFieldVal = props.filterData[dep]?.val
            
            // If any dependent field has no value, disable current field
            if (!dependentFieldVal || dependentFieldVal === '') {
                return true
            }
            
            // NEW LOGIC: If dependent field has value but current options are empty,
            // check if dependent options were empty (if so, don't disable)
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
