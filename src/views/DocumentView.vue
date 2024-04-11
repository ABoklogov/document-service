<template>
  <div class="document">
    {{currentDocument}}
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '../stores/document';
import { useRoute } from 'vue-router';

const route = useRoute();
const { currentDocument } = storeToRefs(useDocumentStore());

const store = useDocumentStore();
// запрашиваем доступные атрибуты
onBeforeMount(() => {
  store.fetchCurrentDocument(route.params.id);
});
</script>

<style scoped>

</style>
