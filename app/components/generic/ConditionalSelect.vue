<template>
    <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !fieldData.isValid }">
        <div class="md:w-1/3">
            <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                {{ label }}
            </label>
        </div>
        <div class="md:w-1/3 relative">
            <!-- Custom dropdown for options with NB items -->
            <div v-if="hasNBOptions && label === 'Group'" class="relative">
                <button
                    type="button"
                    @click="toggleDropdown"
                    @blur="handleDropdownBlur"
                    :disabled="isDisabled"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500 text-left"
                    :class="{ 'bg-gray-100': isDisabled, 'cursor-not-allowed': isDisabled }"
                >
                    {{ fieldData.val || `Select ${label}` }}
                    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                
                <!-- Custom dropdown menu -->
                <div 
                    v-show="isDropdownOpen && !isDisabled"
                    class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-visible dropdown-menu"
                >
                    <div class="overflow-auto max-h-60">
                        <div
                            @click="selectOption('')"
                            class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-xl"
                        >
                            Select {{ label }}
                        </div>
                        <div
                            v-for="option in options"
                            :key="option"
                            @click="selectOption(option)"
                            @mouseenter="hoveredOption = option"
                            @mouseleave="hoveredOption = null"
                            class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-xl flex items-center justify-between"
                            :class="{ 'bg-blue-50 font-semibold text-blue-700': option.startsWith('NB') }"
                        >
                            <span>{{ option }}</span>
                            <div v-if="option.startsWith('NB')" class="flex items-center">
                                <svg class="w-5 h-5 text-blue-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Floating Tooltip Message Box (outside dropdown, fixed position) -->
                <Teleport to="body">
                    <div 
                        v-if="hoveredOption && hoveredOption.startsWith('NB') && isDropdownOpen"
                        class="fixed z-[9999] px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-2xl border-2 border-blue-400 max-w-md tooltip-message-box"
                        :style="tooltipStyle"
                    >
                        <div class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-blue-200 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                            </svg>
                            <div>
                                <div class="font-bold text-lg mb-1">{{ hoveredOption }}</div>
                                <div class="text-sm text-blue-50">
                                    Newborn categories require special consideration for antibiotic selection and dosing based on gestational age and birth weight.
                                </div>
                            </div>
                        </div>
                    </div>
                </Teleport>
            </div>
            
            <!-- Regular select for non-NB options or other fields -->
            <select 
                v-else
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
import { computed, ref } from 'vue'

const showTooltip = ref(false)
const isDropdownOpen = ref(false)
const hoveredOption = ref(null)

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

// Check if options contain any NB items
const hasNBOptions = computed(() => {
    return props.options.some(option => option.toString().startsWith('NB'))
})

// Tooltip positioning - center of screen
const tooltipStyle = computed(() => {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
})

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

// Custom dropdown methods
function toggleDropdown() {
    if (!props.customDisabled && !isDisabled.value) {
        isDropdownOpen.value = !isDropdownOpen.value
    }
}

function selectOption(option) {
    props.fieldData.val = option
    isDropdownOpen.value = false
    handleChange(option)
}

function handleDropdownBlur() {
    // Delay closing to allow for option selection
    setTimeout(() => {
        isDropdownOpen.value = false
        handleBlur()
    }, 150)
}
</script>

<style scoped>
.is-invalid select {
    border-color: #dc3545;
}

/* Dropdown menu with overflow visible */
.dropdown-menu {
    overflow: visible !important;
}

/* Tooltip message box styling */
.tooltip-message-box {
    animation: fadeInScale 0.2s ease-out;
    backdrop-filter: blur(4px);
    pointer-events: none;
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

/* Custom styling for options with NB prefix */
option[value^="NB"] {
    font-weight: 600;
    color: #2563eb;
}

/* Ensure dropdown is above other elements but tooltip is above everything */
.relative {
    position: relative;
}
</style>
