<template>
  <div class="flex items-center justify-between px-4 py-4">
    <div class="flex items-center gap-3">
      <button
        @click="$emit('prev')"
        class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        @click="$emit('today')"
        class="px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
      >
        Hoy
      </button>
      <button
        @click="$emit('next')"
        class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
    <div class="text-lg font-semibold text-gray-900">{{ title }}</div>
    <div class="relative">
      <select
        v-model="view"
        @change="$emit('change-view', view)"
        class="pl-3 pr-8 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        <option value="month">Mes</option>
        <option value="week">Semana</option>
        <option value="day">Día</option>
      </select>
      <div class="absolute inset-y-0 right-2 flex items-center text-gray-400">
        <svg
          class="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>();
const emit = defineEmits(["prev", "next", "today", "change-view"]);
import { ref } from "vue";
const view = ref("month");
</script>

<style scoped>
.btn {
  padding: 6px 8px;
  border-radius: 6px;
  background: #eee;
}
.input {
  padding: 6px 8px;
}
</style>
