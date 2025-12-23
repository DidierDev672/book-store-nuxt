<template>
  <div class="grid grid-cols-7 gap-px bg-gray-100">
    <div
      v-for="(day, idx) in days"
      :key="idx"
      class="min-h-24 bg-white p-2 hover:bg-gray-50 transition-colors"
      :class="{
        'bg-gray-50': !day.isCurrentMonth,
        'ring-1 ring-blue-400': day.isToday,
      }"
    >
      <div class="flex justify-between items-start mb-1">
        <div :class="{ 'text-sm font-medium': !day.isCurrentMonth }">
          {{ day.date.getDate() }}
        </div>
        <div v-if="day.isToday" class="text-xs text-blue-600 font-bold">
          Hoy
        </div>
      </div>

      <ul class="mt-2 space-y-px">
        <li
          v-for="event in day.events"
          :key="event.id"
          class="text-xs px-1 py-0.5 truncate rounded-sm cursor-pointer transition-colors"
          :class="{
            'bg-blue-50 text-blue-700 hover:bg-blue-100':
              event.type === 'reading',
            'bg-green-50 text-green-700 hover:bg-green-100':
              event.type === 'therapy',
            'bg-purple-50 text-purple-700 hover:bg-purple-100':
              event.type === 'reminder',
            'bg-amber-50 text-amber-700 hover:bg-amber-100':
              event.type === 'task',
          }"
          @click="$emit('open-event', event)"
        >
          {{ event.title }}
        </li>
      </ul>

      <button
        class="w-full mt-2 text-xs text-gray-400 hover:text-gray-600 text-center py-1 rounded hover:bg-gray-100 transition-colors"
        @click="$emit('add-event', day.date)"
      >
        Añadir
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ days: any[] }>();
defineEmits(["open-event", "add-event"]);
</script>

<style scoped>
.bg-white {
  background: #fff;
}
</style>
