<template>
  <div class="card">
    <div class="flex justify-content-center mb-4">
      <SelectButton v-model="sizeTable" :options="sizeOptions" optionLabel="label" dataKey="label" />
    </div>
    <DataTable 
      :value="documents" 
      v-model:selection="selectedDocument"
      :size="sizeTable.value" 
      selectionMode="single" 
      tableStyle="min-width: 50rem"
    >
      <Column field="number" header="номер"></Column>
      <template v-for="(value, key) in attributes" :key="key">
        <Column 
        v-if="key !== 'r_object_id'"
        :field="key" 
        :header="value"
        ></Column>
      </template>
    </DataTable>
    <!-- {{ console.log(selectedDocument) }} -->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  documents: {
    type: Array
  },
  attributes: {
    type: Object
  },
});

const selectedDocument = ref();

watch(selectedDocument, () => {
  router.push({ path: `/document/${selectedDocument.value.r_object_id}` });
});

const sizeTable = ref({ label: 'Normal', value: 'null' });
const sizeOptions = ref([
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: 'null' },
    { label: 'Large', value: 'large' }
]);
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>

