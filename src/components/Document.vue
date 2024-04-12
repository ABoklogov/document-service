<template>
  <div class="card flex justify-content-center">
    <VirtualScroller 
      :items="items" 
      :itemSize="50" 
      class="border-1 surface-border border-round" 
      style="width: 90vw; height: 90vh"
    >
      <template v-slot:item="{ item, options }">
        <div 
          :class="['flex align-items-center p-2', { 'surface-hover': options.odd }]" 
          style="height: 50px"
        >
          {{ item?.name }}: {{ item.value ? item.value : '---' }}
        </div>
      </template>
    </VirtualScroller>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  document: {
    type: Object
  },
  attributes: {
    type: Object
  },
});


const items = computed(() => {
  let total = []

  for (const key in props.document) {
    total.push({
      key,
      value: props.document[key]
    })
  }

  return total.map(el => {
    for (const key in props.attributes) {
      if (el.key === key) {
        return {...el, name: props.attributes[key]}
      }
    }
  }).filter(el => el)
});
</script>

<style scoped>

</style>
