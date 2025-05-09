<script setup lang="ts">
import {
  FwbButton,
  FwbModal,
  FwbCheckbox,
  FwbAlert,
  FwbProgress
} from 'flowbite-vue'

interface WorksheetData {
  [key: string]: any[];
}

interface ExcelData {
  [sheetName: string]: WorksheetData;
}

interface TableMap {
  sheet: string;
  table: string;
}

const props = defineProps({
  isShowModal: {
    type: Boolean,
    default: false
  },
  excelSheets: {
    type: Object as () => ExcelData,
    default: () => ({})
  },
});

const emit = defineEmits({
  close: () => true,
  selecedTable(payload: TableMap[]) {
    // return `true` or `false` to indicate
    // validation pass / fail
  }
});

watch(() => props.isShowModal, (first, second) => {
  console.log(
    "Watch props.isShowModal function called with args:",
    first,
    second
  );
});

watch(() => props.excelSheets, (first, second) => {
  if (first) {
    inputSheetList.value = [];
    for (const key in first) {
      if (Object.prototype.hasOwnProperty.call(first, key)) {
        inputSheetList.value.push(key);
      }
    }
    updateProgressesAndErrors();
  }
});

const tableList = ref<TableMap[]>([
  { sheet: 'ADJUSTS', table: 'atb-info-adjusts' },
  { sheet: 'AE', table: 'atb-info-aes' },
  { sheet: 'ALERT', table: 'atb-info-alerts' },
  { sheet: 'DD', table: 'atb-info-ddis' },
  { sheet: 'MSDCPG', table: 'msd-cpgs' },
  { sheet: 'Ref_FREQ', table: 'ref-freqs' },
  { sheet: '5_TabATB_CATALOG Final', table: 'tab-atp-catalogs' },
]);

const inputSheetList = ref<string[]>([]);
const selectedSheetList = ref<string[]>([]);
const buttonsDisabled = ref<{ [key: string]: boolean }>({});
const errorMessages = ref<{ [key: string]: string | null }>({});
const progresses = ref<{ [key: string]: number }>({});

const compareTableLists = (tableList: TableMap[], inputSheetList: string[]): { common: string[], difference: string[] } => {
  const normalizedTableList = tableList.map(item => item.sheet.trim().toLowerCase());
  const normalizedInputList = inputSheetList.map(item => item.trim().toLowerCase());

  const existingSet = new Set(normalizedTableList);

  const difference: string[] = [];
  const common: string[] = [];

  for (const item of normalizedInputList) {
    if (existingSet.has(item)) {
      common.push(item);
    } else {
      difference.push(item);
    }
  }

  return { common, difference };
}

const updateProgressesAndErrors = () => {
  if (!tableList.value.length || !inputSheetList.value.length) {
    errorMessages.value = {};
    progresses.value = {};
    return;
  }
  
  const { common } = compareTableLists(tableList.value, inputSheetList.value);
  
  // Update error messages
  errorMessages.value = common.reduce((acc, sheet) => {
    acc[sheet] = null; // Initialize with null (no errors)
    return acc;
  }, {} as { [key: string]: string | null });
  
  // Update progress values
  progresses.value = common.reduce((acc, sheet) => {
    acc[sheet] = Math.floor(Math.random() * 100);
    return acc;
  }, {} as { [key: string]: number });
}

watch(() => inputSheetList.value, updateProgressesAndErrors, { immediate: true });

const getOriginalSheetName = (normalizedSheetName: string): string => {
  const sheet = inputSheetList.value.find(
    sheet => sheet.trim().toLowerCase() === normalizedSheetName.toLowerCase()
  );
  return sheet || normalizedSheetName;
};

const getTableName = (sheetName: string): string => {
  const item = tableList.value.find(
    item => item.sheet.trim().toLowerCase() === sheetName.trim().toLowerCase()
  );
  return item ? item.table : '';
};

const closeModal = (mode: string = 'declined') => {
  if (mode === 'accept') {
    const emitSelectedTable: TableMap[] = selectedSheetList.value.map((sheet) => {
      const lowercasedSheet = sheet.trim().toLowerCase();
      const found: TableMap | undefined = tableList.value.find(
        (item) => item.sheet.trim().toLowerCase() === lowercasedSheet
      );
      return found ? found : null;
    }).filter((item): item is TableMap => item !== null);
    
    emit('selecedTable', emitSelectedTable);
  } else {
    emit('selecedTable', []);
  }
  emit('close');
};
</script>

<template>
  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">
        Select Table to Import
      </div>
    </template>
    <template #body>
      <div v-for="sheet in compareTableLists(tableList, inputSheetList).common" :key="sheet" class="mb-4">
        <div class="grid grid-cols-12 gap-4 items-center">
          <!-- Checkbox and table name -->
          <div class="col-span-4 flex items-center">
            <fwb-checkbox v-model="selectedSheetList" :label="getOriginalSheetName(sheet)" :value="sheet" name="sheets" />
          </div>
          
          <!-- Table mapping info -->
          <div class="col-span-3 text-sm text-gray-500">
            ({{ getTableName(sheet) }})
          </div>
          
          <!-- Action button -->
          <div class="col-span-2">
            <fwb-button color="green" size="sm">Import</fwb-button>
          </div>
          
          <!-- Progress bar -->
          <div class="col-span-3">
            <fwb-progress 
              :progress="progresses[sheet] || 0" 
              size="sm" 
              :label="`${progresses[sheet] || 0}%`" 
            />
          </div>
          
          <!-- Alert message (full width) -->
          <div v-if="errorMessages[sheet]" class="col-span-12 mt-2">
            <fwb-alert class="border-t-4 rounded-none" icon type="danger">
              {{ errorMessages[sheet] }}
            </fwb-alert>
          </div>
        </div>
      </div>
      
      <!-- Show sheets not in table list -->
      <div v-if="compareTableLists(tableList, inputSheetList).difference.length > 0" class="mt-4">
        <p class="text-red-500">The following sheets are not in the table list:</p>
        <ul class="list-disc pl-5">
          <li v-for="sheet in compareTableLists(tableList, inputSheetList).difference" :key="sheet">
            {{ getOriginalSheetName(sheet) }}
          </li>
        </ul>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative">
          Decline
        </fwb-button>
        <fwb-button @click="closeModal('accept')" color="green">
          I accept
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>