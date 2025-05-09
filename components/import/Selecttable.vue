<script setup lang="ts">
import {
  FwbButton,
  FwbModal,
  FwbCheckbox
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
  selecedTable(payload:  TableMap[]) {
    // return `true` or `false` to indicate
    // validation pass / fail
  }
});

watch(() => props.excelSheets, (first, second) => {

  if (first) {
    for (const key in first) {
      if (Object.prototype.hasOwnProperty.call(first, key)) {
        const element = first[key];
        inputSheetList.value.push(key);
      }
    }
    compareTableLists(tableList.value, inputSheetList.value);
  }
});

watch(() => props.isShowModal, (first, second) => {
  console.log(
    "Watch props.isShowModal function called with args:",
    first,
    second
  );
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

const compareTableLists = (tableList: TableMap[], inputSheetList: string[]): { common: string[], difference: string[] } => {
  // Create normalized arrays with trimmed and lowercased values
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

const closeModal = (mode: string = 'declined') => {
  if (mode === 'accept') {
    const emitSelectedTable: TableMap[] = selectedSheetList.value.map((sheet) => {
      const lowercasedSheet = sheet.trim().toLowerCase();
      
      const found: TableMap | undefined = tableList.value.find((item) => item.sheet.trim().toLowerCase() === lowercasedSheet);
      
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
      <div class="space-y-2">
        <fwb-checkbox
          v-for="(sheet, i) in compareTableLists(tableList,inputSheetList ).common" :key="i"
          v-model="selectedSheetList"
          :label="sheet" :value="sheet"
          name="sheets" />

          <div v-if="compareTableLists(tableList,inputSheetList ).difference">
            <p class="text-red-500">The following sheets are not in the table list:</p>
            <ul class="list-disc pl-5">
              <li v-for="(sheet, i) in compareTableLists(tableList,inputSheetList ).difference" :key="i">
                {{ sheet }}
              </li>
            </ul>
          </div>
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