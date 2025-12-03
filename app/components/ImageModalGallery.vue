<template>
  <figure
    class="image-display bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <img
      :src="imageSrc"
      :alt="imageAlt"
      :class="imageClass"
      class="w-full object-cover rounded-md"
      loading="lazy"
    />

    <figcaption
      v-if="caption"
      class="mt-2 text-center text-sm text-gray-500 italic"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "Image",
  },
  sizeClasses: {
    type: String,
    default: "max-h-64",
  },

  caption: {
    type: String,
    default: "",
  },
});

const imageSrc = computed(() => props.src);
const imageAlt = computed(() => props.alt);

const imageClass = computed(() => [props.sizeClasses].join(" "));
</script>
