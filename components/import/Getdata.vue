<script setup lang="ts">
const { find, create, delete: _delete } = useStrapi()
import * as XLSX from 'xlsx';
import {
  FwbButton,
  FwbModal,
  FwbCheckbox,
  FwbAlert,
  FwbProgress
} from 'flowbite-vue'

import { type TableMap, tableList, sanitizeMsdCpg } from './getdata_helper'

interface WorksheetData {
  [key: string]: any[];
}

interface ExcelData {
  [sheetName: string]: WorksheetData;
}

const fileInput = ref<HTMLInputElement | null>(null);
const isLoading = ref<boolean>(false);
const extractedData = ref<ExcelData | null>(null);
const errorMessage = ref<string>('');
const progresses = ref<{ [key: string]: number }>({});
const buttonsDisabled = ref<{ [key: string]: boolean }>({});
const uploadErrorMessages = ref<{ [key: string]: string | null }>({});

const emits = defineEmits<{
  (e: 'dataExtracted', data: ExcelData): void;
}>();

watch(extractedData, (newData) => {
  if (newData) {
    emits('dataExtracted', newData);
    for (const [sheetName, sheetData] of Object.entries(newData)) {
      progresses.value[sheetName] = 0;
      buttonsDisabled.value[sheetName] = disableUploadButton(sheetName);
      uploadErrorMessages.value[sheetName] = null;
    }

  }
});

const extractDataFromXLSX = async (file: File): Promise<ExcelData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        if (!e.target || !e.target.result) {
          throw new Error('Failed to read file');
        }

        const data: ExcelData = {};
        const buffer = e.target.result as ArrayBuffer;
        const workbook = XLSX.read(buffer, { type: 'array' });

        // Extract data from each worksheet
        workbook.SheetNames.forEach(sheetName => {
          // Convert the worksheet to JSON
          const worksheet = workbook.Sheets[sheetName];
          const sheetData = XLSX.utils.sheet_to_json(worksheet) as any[];
          data[sheetName] = { sheetData };
        });
        resetFileInput()
        resolve(data);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Unknown error'));
      }
    };

    reader.onerror = (error) => reject(new Error('File read error'));
    reader.readAsArrayBuffer(file);
  });
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files || files.length === 0) {
    errorMessage.value = 'No file selected';
    return;
  }

  const file = files[0];
  if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
    errorMessage.value = 'Please select an Excel file (.xlsx or .xls)';
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = '';
    extractedData.value = await extractDataFromXLSX(file);
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to process file';
    extractedData.value = null;
  } finally {
    isLoading.value = false;
  }
};

const resetFileInput = () => {
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const disableUploadButton = (sheetName: string | number): boolean => {
  if (typeof sheetName === 'number') {
    sheetName = String(sheetName);
  }
  if (!tableList.value.some(item => item.sheet.trim().toLowerCase() === sheetName.trim().toLowerCase())) {
    uploadErrorMessages.value[sheetName] = `Sheet "${sheetName}" does not match any table name.`;
    return true;
  }
  return false
};

const uploadClicked = async (sheetName: string) => {
  const item = tableList.value.find(
    item => item.sheet.trim().toLowerCase() === sheetName.trim().toLowerCase()
  );

  if (item) {
    buttonsDisabled.value[item.sheet] = true;
    progresses.value[item.sheet] = 0;

    uploadErrorMessages.value[item.sheet] = null;

    const sheetDataToUpload = extractedData.value?.[sheetName]?.sheetData;
    const totalRows = sheetDataToUpload?.length || 0;

    if (sheetDataToUpload && totalRows > 0) {
      await clearTable(item);

      let processedRows = 0;
      for (let i = 0; i < sheetDataToUpload?.length; i++) {
        const element = sheetDataToUpload[i];
        const elementToUpload = sanitizeMsdCpg(element);
        try {
          const response = await create(item.api_plural, elementToUpload);
          processedRows += 1;
        } catch (error) {
          console.log('Error creating record:', error);
        }
        const percentage = Math.floor((processedRows / totalRows) * 100);
        progresses.value[item.sheet] = percentage;
      }
      buttonsDisabled.value[item.sheet] = false;
    } else {
      uploadErrorMessages.value[item.sheet] = "No data to upload in this sheet";
      buttonsDisabled.value[item.sheet] = true;
    }
  }
}

const clearTable = async (tableObj: TableMap) => {
  uploadErrorMessages.value[tableObj.sheet] = "Clearing old data ...";
  try {
    let hasMoreData = true;
    while (hasMoreData) {
      const { data } = await find(tableObj.api_plural, {
        pagination: {
          page: 1,
          pageSize: 100
        }
      });

      if (data.length === 0) {
        hasMoreData = false;
        break;
      }

      for (const record of data) {
        try {
          if (record && typeof record === 'object' && 'documentId' in record) {
            const result = await _delete(tableObj.api_plural, (record as { documentId: string }).documentId);
          } else {
            console.error('Record does not have an documentId:', record);
          }
        } catch (error) {
          console.error('Delete failed:', error);
        }
      }
    }
    uploadErrorMessages.value[tableObj.sheet] = null
    return {
      success: true,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Bulk delete failed: ${errorMessage}`)
  }
};

const reset = (tableName: string) => {
  progresses.value[tableName] = 0;
  buttonsDisabled.value[tableName] = false;
  uploadErrorMessages.value[tableName] = null;
};
</script>

<template>
  <div class="xlsx-extractor">
    <div class="file-input-wrapper">
      <label for="excel-file" class="file-label">
        Select Excel File
        <input ref="fileInput" id="excel-file" type="file" accept=".xlsx,.xls" @change="handleFileChange"
          class="file-input" />
      </label>
    </div>

    <div v-if="isLoading" class="loading">
      Loading...
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-if="extractedData" class="results">
      <h3>Extracted Data</h3>
      <div v-for="(sheetData, sheetName) in extractedData" :key="sheetName" class="sheet-data">
        <div class="grid grid-cols-12 gap-4 items-center mb-6">
          <div class="col-span-4 text-xl text-gray-500">
            <h3>Sheet: {{ sheetName }}</h3>
            <p class="text-sm text-red-400"
              v-if="!tableList.some(item => item.sheet.trim().toLowerCase() === String(sheetName).trim().toLowerCase())">
              sheet name does not match any table name
            </p>

          </div>


          <!-- Action button -->
          <div class="col-span-2">
            <fwb-button :disabled="buttonsDisabled[sheetName]" @click="uploadClicked(String(sheetName))" color="green"
              size="sm">
              Import
            </fwb-button>
          </div>

          <!-- Refresh button -->
          <div class="col-span-2">
            <fwb-button
              :disabled="!tableList.some(item => item.sheet.trim().toLowerCase() === String(sheetName).trim().toLowerCase())"
              @click="reset(String(sheetName))" color="green" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </fwb-button>
          </div>

          <!-- Progress bar -->
          <div class="col-span-2">
            <fwb-progress :progress="progresses[sheetName] || 0" size="sm" :label="`${progresses[sheetName] || 0}%`" />
          </div>

          <!-- Alert message (full width) -->
          <div v-if="uploadErrorMessages[sheetName]" class="col-span-12 mt-2">
            <fwb-alert class="border-t-4 rounded-none" icon type="danger">
              {{ uploadErrorMessages[sheetName] }}
            </fwb-alert>
          </div>
        </div>


        <div v-if="sheetData.sheetData && sheetData.sheetData.length > 0" class="data-preview">
          <p>Rows: {{ sheetData.sheetData.length }}</p>
          <p>Sample data (first row):</p>
          <pre>{{ JSON.stringify(sheetData.sheetData[0], null, 2) }}</pre>
        </div>
        <p v-else>No data in this sheet</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.xlsx-extractor {
  margin: 20px 0;
}

.file-input-wrapper {
  margin-bottom: 20px;
}

.file-label {
  display: inline-block;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.file-input {
  display: none;
}

.error-message {
  color: red;
  margin: 10px 0;
}

.loading {
  margin: 10px 0;
  font-style: italic;
}

.results {
  margin-top: 20px;
}

.sheet-data {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.data-preview {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

pre {
  margin: 0;
  white-space: pre-wrap;
}
</style>