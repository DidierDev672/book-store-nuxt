<template>
  <div class="p-4 bg-white border border-gray-200 rounded">
    <div class="flex justify-between items-start mb-3">
      <div>
        <h4 class="font-medium text-gray-900 mb-1">{{ event.title }}</h4>
      </div>
      <p class="text-xs text-gray-500">
        {{ formattedDate }}
      </p>
    </div>
    <p v-if="event.description" class="text-sm text-gray-600 mb-4">
      {{ event.description }}
    </p>

    <div class="flex justify-end gap-2">
      <button
        class="text-sm text-gray-600 hover:text-gray-900 px-2 py-1"
        @click="$emit('edit', event)"
      >
        Editar
      </button>
      <button
        class="text-sm text-gray-600 hover:text-red-600 px-2 py-1"
        @click="$emit('delete', event.id)"
      >
        Borrar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{ event: any }>();
const emit = defineEmits(["edit", "delete"]);
const formattedDate = computed(() =>
  new Date(props.event.startDate).toLocaleString("es-ES")
);
</script>

<style scoped>
.btn {
  padding: 6px 8px;
  border-radius: 6px;
  background: #eee;
}
</style>
