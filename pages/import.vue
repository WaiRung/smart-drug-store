<script setup lang="ts">
import { ImportGetdata } from '#components';
import { useSlideStore } from '@/stores/slide'
definePageMeta({
    pageTransition: {
        name: 'slide-left',
        mode: 'out-in'
    },
    middleware: ['slide-direction']
})

interface WorksheetData {
  [key: string]: any[];
}

interface ExcelData {
  [sheetName: string]: WorksheetData;
}

const excelData = ref<ExcelData | undefined>(undefined);

const isSelectTableModalOpen = ref(false);

const handleDataExtracted = (data: ExcelData) => {
  excelData.value = data;
  isSelectTableModalOpen.value = true;
  // Example: Process the data further as needed
  // This could include data transformation, validation, saving to store, etc.
  console.log('Processing extracted data');
  
  // Example of accessing specific sheet data
  if (data['Sheet1']) {
    const sheet1Data = data['Sheet1'];
    console.log(`Sheet1 has ${sheet1Data.length} rows`);
  }
};
</script>

<template>
<div class="excel-reader-page">
    <h1>Excel File Reader</h1>
    <p>Upload an Excel file (.xlsx) to extract and process its data.</p>
    
    <ImportGetdata @data-extracted="handleDataExtracted" />
    <ImportSelecttable
      :isShowModal="isSelectTableModalOpen"
      :excelSheets="excelData"

      @close="isSelectTableModalOpen = false"
      />
    
    <div v-if="excelData" class="data-analysis">
      <h2>Data Analysis</h2>
      
      <!-- Example of showing sheet names -->
      <div class="sheet-list">
        <h3>Available Sheets:</h3>
        <ul>
          <li v-for="(_, sheetName) in excelData" :key="sheetName">
            {{ sheetName }} ({{ excelData[sheetName].length }} rows)
          </li>
        </ul>
      </div>
      
      <!-- Here you can add more components to visualize or process the data -->
    </div>
  </div>
</template>

<style scoped>
.excel-reader-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.data-analysis {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.sheet-list {
  margin-top: 20px;
}

ul {
  padding-left: 20px;
}
</style>