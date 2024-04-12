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
      <Document :document="currentDocument" :attributes="attributes"/>
    </main>
  </AppContainer>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '../stores/document';
import { useRoute } from 'vue-router';
import Document from '../components/Document.vue'
import AppContainer from '../components/AppContainer.vue'

const route = useRoute();
const { currentDocument, loading, attributes } = storeToRefs(useDocumentStore());

const store = useDocumentStore();
// запрашиваем доступные атрибуты
onBeforeMount(() => {
  store.fetchDocument(route.params.id);
});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
