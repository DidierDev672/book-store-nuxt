<template>
  <div class="bg-white rounded-2xl shadow-xl p-6 mb-8">
    <!-- Encabezado del reproductor -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
    >
      <div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">
          Reproductor Principal
        </h3>
        <p class="text-gray-600">Controla todos los sonidos desde aquí</p>
      </div>

      <div class="flex items-center space-x-4 mt-4 md:mt-0">
        <!-- Contador de sonidos activos -->
        <div class="bg-blue-50 px-4 py-2 rounded-lg">
          <span class="text-blue-600 font-semibold">{{
            activeSoundsCount
          }}</span>
          <span class="text-gray-600 ml-2">sonidos activos</span>
        </div>

        <!-- Botón para detener todos -->
        <button
          @click="stopAllSounds"
          :disabled="activeSoundsCount === 0"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            activeSoundsCount === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 text-white',
          ]"
        >
          Detener Todos
        </button>
      </div>
    </div>

    <!-- Grid de sonidos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SoundCard
        v-for="sound in sounds"
        :key="sound.id"
        :sound="sound"
        :is-active="isSoundActive(sound.id)"
        v-model:model-value="volumes[sound.id]!"
        @toggle="toggleSound(sound.id)"
      />
    </div>

    <!-- Control de volumen master -->
    <div
      v-if="activeSoundsCount > 0"
      class="mt-8 pt-8 border-t border-gray-200"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <Volume2 class="w-5 h-5 text-gray-600" />
          <span class="text-gray-700 font-medium">Volumen General</span>
        </div>
        <span class="text-blue-600 font-bold"
          >{{ Math.round(masterVolume * 100) }}%</span
        >
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="masterVolume"
        @input="updateMasterVolume"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />

      <div class="flex justify-between text-sm text-gray-500 mt-2">
        <span>0%</span>
        <span>{{ Math.round(masterVolume * 100) }}%</span>
        <span>100%</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Volume2 } from "lucide-vue-next";

import SoundCard from "./SoundCard.vue";
import { useAudioGenerator } from "~/hooks/useAudioGenerator";

const sounds = [
  {
    id: "white",
    name: "Ruido Blanco",
    description: "Sonido constante que enmascara otros ruidos",
    frequency: "20Hz - 20kHz",
    color: "from-slate-400 to-slate-500",
    icon: "⚡",
  },
  {
    id: "pink",
    name: "Ruido Rosa",
    description: "Más suave que el blanco, ideal para dormir",
    frequency: "20Hz - 5kHz",
    color: "from-pink-400 to-pink-500",
    icon: "🌊",
  },
  {
    id: "brown",
    name: "Ruido Marrón",
    description: "El más grave, similar a una cascada lejana",
    frequency: "20Hz - 1kHz",
    color: "from-purple-400 to-purple-500",
    icon: "🌬️",
  },
  {
    id: "rain",
    name: "Lluvia",
    description: "Sonido relajante de gotas de lluvia",
    frequency: "100Hz - 4kHz",
    color: "from-blue-400 to-blue-500",
    icon: "🌧️",
  },
  {
    id: "ocean",
    name: "Océano",
    description: "Olas del mar rompiendo suavemente",
    frequency: "50Hz - 2kHz",
    color: "from-cyan-400 to-cyan-500",
    icon: "🌊",
  },
  {
    id: "forest",
    name: "Bosque",
    description: "Sonidos de la naturaleza y pájaros",
    frequency: "200Hz - 5kHz",
    color: "from-green-400 to-green-500",
    icon: "🌳",
  },
];

const audio = useAudioGenerator();
const activeSounds = ref<Set<string>>(new Set());
const volumes = ref<Record<string, number>>({
  white: 0.5,
  pink: 0.5,
  brown: 0.5,
  rain: 0.5,
  ocean: 0.5,
  forest: 0.5,
});
const masterVolume = ref(0.5);

// Computed
const activeSoundsCount = computed(() => activeSounds.value.size);

// Métodos
const toggleSound = (soundId: string) => {
  if (activeSounds.value.has(soundId)) {
    audio.stopSound(soundId);
    activeSounds.value.delete(soundId);
  } else {
    audio.startSound(soundId, volumes.value[soundId]! * masterVolume.value);
    activeSounds.value.add(soundId);
  }
};

const isSoundActive = (soundId: string) => {
  return activeSounds.value.has(soundId);
};

const stopAllSounds = () => {
  audio.stopAllSounds();
  activeSounds.value.clear();
};

const updateMasterVolume = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newVolume = parseFloat(target.value);
  masterVolume.value = newVolume;

  // Aplicar el volumen master a todos los sonidos activos
  activeSounds.value.forEach((soundId) => {
    const originalVolume = volumes.value[soundId] || 0.5;
    audio.setVolume(soundId, originalVolume * newVolume);
  });
};

// Watch para cambios en volúmenes individuales
watch(
  () => volumes.value,
  (newVolumes) => {
    activeSounds.value.forEach((soundId) => {
      const individualVolume = newVolumes[soundId] || 0.5;
      audio.setVolume(soundId, individualVolume * masterVolume.value);
    });
  },
  { deep: true }
);
</script>
