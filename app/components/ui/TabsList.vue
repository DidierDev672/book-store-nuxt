<template>
  <div :class="['tabs-list', props.class]">
    <slot />
  </div>
</template>
<script setup lang="ts">
interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
.tabs-list {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding: 0.25rem;
}
</style>
