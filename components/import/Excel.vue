<script setup lang="ts">
import { useSlideStore } from '@/stores/slide'
definePageMeta({
    pageTransition: {
        name: 'slide-left',
        mode: 'out-in'
    },
    middleware: ['slide-direction']
})

import * as XLSX from 'xlsx';

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

const emits = defineEmits<{
  (e: 'dataExtracted', data: ExcelData): void;
}>();

watch(extractedData, (newData) => {
  if (newData) {
    emits('dataExtracted', newData);
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
</script>

<template>
<div class="xlsx-extractor">
    <div class="file-input-wrapper">
      <label for="excel-file" class="file-label">
        Select Excel File
        <input
          ref="fileInput"
          id="excel-file"
          type="file"
          accept=".xlsx,.xls"
          @change="handleFileChange"
          class="file-input"
        />
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
        <h4>Sheet: {{ sheetName }}</h4>
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