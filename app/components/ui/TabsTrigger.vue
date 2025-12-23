<template>
  <button
    :class="['tabs-trigger', { active: isActive }, props.class]"
    @click="handleClick"
    type="button"
  >
    <slot />
  </button>
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
  updateActiveTab: (value: string) => void;
}>("tabsContext");

// Verificar si está activo
const isActive = computed(() => tabsContext?.activeTab.value === props.value);

// Manejar clic
const handleClick = () => {
  if (tabsContext) {
    tabsContext.updateActiveTab(props.value);
  }
};
</script>
<style scoped>
.tabs-trigger {
  padding: 0.625rem 1rem;
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
}
</style>
