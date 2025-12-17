<template>
  <div v-show="isActive" :class="['tabs-content', props.class]">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { inject } from "vue";

interface Props {
  value: string;
  class?: string;
}

const props = defineProps<Props>();

// Obtener contexto de las pestañas
const tabsContext = inject<{
  activeTab: Ref<string>;
}>("tabsContext");

// Verificar si está activo
const isActive = computed(() => tabsContext?.activeTab.value === props.value);
</script>

<style scoped>
.tabs-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
