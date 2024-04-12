<template>
  <AppContainer>
    <main class="main">
      <Spiner
        v-if="loading"
        style="width: 50px; height: 50px; margin: auto; display: block"
        strokeWidth="5"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
  
      <Table v-else :documents="documents" :attributes="attributes"/>
  
      <Paginator 
        v-model:rows="size"
        v-model:first="offset"
        :rows="size" 
        :totalRecords="totalDocuments" 
        :rowsPerPageOptions="rowsPaginator"
      ></Paginator>
    </main>
  </AppContainer>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '../stores/document'
import Table from '../components/Table.vue'
import AppContainer from '../components/AppContainer.vue'

const store = useDocumentStore();
const { 
  documents, 
  rowsPaginator, 
  size, 
  totalDocuments, 
  offset,
  loading,
  attributes
} = storeToRefs(useDocumentStore());

// запрашиваем доступные атрибуты
onBeforeMount(() => {
  store.fetchDocuments();
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>

