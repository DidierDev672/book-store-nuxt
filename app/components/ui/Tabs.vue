<template>
  <div class="tabs-container">
    <slot />
  </div>
</template>
<script setup lang="ts">
// Props
interface Props {
  value?: string;
  defaultValue?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  defaultValue: "",
  class: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

// Valor activo
const activeTab = ref(props.value || props.defaultValue);

// Actualizar valor activo
watch(
  () => props.value,
  (newValue) => {
    if (newValue !== undefined) {
      activeTab.value = newValue;
    }
  }
);

// Emitir cambio
const updateActiveTab = (value: string) => {
  activeTab.value = value;
  emit("update:modelValue", value);
};

// Provide para componentes hijos
provide("tabsContext", {
  activeTab,
  updateActiveTab,
});
</script>
