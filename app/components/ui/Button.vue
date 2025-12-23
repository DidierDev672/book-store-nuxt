<template>
  <button
    :class="[
      'button',
      `button-${props.variant}`,
      `button-size-${props.size}`,
      props.class,
    ]"
    :type="props.type"
    @click="emitClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "default" | "ghost" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  type: "button",
  class: "",
});

const emit = defineEmits<{
  click: [];
}>();

const emitClick = () => {
  emit("click");
};
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;
  border: 1px solid transparent;
}

/* Variantes */
.button-default {
  background-color: #3b82f6;
  color: white;
}

.button-default:hover {
  background-color: #2563eb;
}

.button-ghost {
  background-color: transparent;
  color: #6b7280;
}

.button-ghost:hover {
  background-color: #f9fafb;
  color: #374151;
}

.button-outline {
  background-color: white;
  border-color: #e5e7eb;
  color: #374151;
}

.button-outline:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.button-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.button-secondary:hover {
  background-color: #e5e7eb;
}

/* Tamaños */
.button-size-default {
  height: 2.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.button-size-sm {
  height: 2rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}

.button-size-lg {
  height: 3rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.button-size-icon {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
