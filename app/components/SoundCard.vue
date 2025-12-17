<template>
  <div
    :class="[
      'bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300',
      isActive ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-xl',
    ]"
  >
    <!-- Header con color de gradiente -->
    <div :class="`bg-gradient-to-br ${sound.color} p-6 text-white`">
      <div class="flex items-center justify-between mb-2">
        <!-- Icono del sonido -->
        <span class="text-4xl">{{ sound.icon }}</span>
        <!-- Boton de play/pause -->
        <button
          @click="emitToggle"
          class="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
        >
          <component :is="isActive ? Pause : Play" class="w-6 h-6" />
        </button>
      </div>
      <h3 class="text-xl font-bold">{{ sound.name }}</h3>
    </div>

    <div class="p-6">
      <p class="text-gray-600 text-sm mb-3">{{ sound.description }}</p>
      <div class="flex items-center text-xs text-gray-500 mb-4">
        <span class="bg-gray-100 px-2 py-1 rounded">{{ sound.frequency }}</span>
      </div>

      <!-- Controles de volumen (solo visible cuando esta activo) -->
      <div v-if="isActive" class="space-y-2">
        <div class="flex items-center space-x-2">
          <Volume2 class="w-4 h-4 text-gray-500" />
          <span class="text-sm text-gray-600">Volumen</span>
        </div>
        <!-- Slider de volume -->
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          :value="modelValue"
          @input="handleVolumeChange"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />

        <!-- Etiquetas del slider -->
        <div class="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>{{ Math.round(modelValue * 100) }}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Play, Pause, Volume2 } from "lucide-vue-next";
import type { Sound } from "~/models/sound.model";

// Props del componente
interface Props {
  sound: Sound;
  isActive: boolean;
  modelValue: number; // Usamos modelValue para v-model
}

// Emits del componente
interface Emits {
  (e: "toggle"): void;
  (e: "update:modelValue", volume: number): void;
}

// Props y emits
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Manejar cambio de volumen
const handleVolumeChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value);
  emit("update:modelValue", value);
};

const emitToggle = () => {
  emit("toggle");
};
</script>

<style scopedc>
/* Estilos específicos para el input range */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  background-color: #3b82f6; /* blue-500 */
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  background-color: #3b82f6;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
