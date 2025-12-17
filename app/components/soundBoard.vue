<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">
      Generador de Sonidos Relajantes
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SoundCard
        v-for="sound in sounds"
        :key="sound.id"
        :sound="sound"
        :is-active="activeSounds.includes(sound.id)"
        v-model:model-value="volumes[sound.id]!"
        @toggle="toggleSound(sound.id)"
      />
    </div>

    <!-- Botón para detener todos los sonidos -->
    <div class="mt-8 text-center">
      <button
        @click="stopAllSounds"
        class="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Detener Todos los Sonidos
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import SoundCard from "~/components/SoundCard.vue";
import { useAudioGenerator } from "~/hooks/useAudioGenerator";

// Datos de ejemplo de sonidos
const sounds = ref([
  {
    id: "white",
    name: "Ruido Blanco",
    description:
      "Sonido constante que enmascara otros ruidos, ideal para concentración.",
    frequency: "20Hz - 20kHz",
    color: "from-slate-400 to-slate-500",
    icon: "⚡",
  },
  {
    id: "pink",
    name: "Ruido Rosa",
    description: "Más suave que el blanco, perfecto para relajarse y dormir.",
    frequency: "20Hz - 5kHz",
    color: "from-pink-400 to-pink-500",
    icon: "🌊",
  },
  {
    id: "brown",
    name: "Ruido Marrón",
    description: "El más grave, similar a una cascada lejana.",
    frequency: "20Hz - 1kHz",
    color: "from-purple-400 to-purple-500",
    icon: "🌬️",
  },
  {
    id: "rain",
    name: "Lluvia",
    description: "Sonido relajante de gotas de lluvia cayendo.",
    frequency: "100Hz - 4kHz",
    color: "from-blue-400 to-blue-500",
    icon: "🌧️",
  },
  {
    id: "ocean",
    name: "Océano",
    description: "Olas del mar rompiendo suavemente en la costa.",
    frequency: "50Hz - 2kHz",
    color: "from-cyan-400 to-cyan-500",
    icon: "🌊",
  },
  {
    id: "forest",
    name: "Bosque",
    description: "Sonidos de la naturaleza, pájaros y hojas.",
    frequency: "200Hz - 5kHz",
    color: "from-green-400 to-green-500",
    icon: "🌳",
  },
]);

//? Estado reactivo
const audio = useAudioGenerator();
const activeSounds = ref<string[]>([]);
const volumes = reactive<Record<string, number>>({
  white: 0.5,
  pink: 0.5,
  brown: 0.5,
  rain: 0.5,
  ocean: 0.5,
  forest: 0.5,
});

//? Alternar sonido
const toggleSound = (soundId: string) => {
  if (activeSounds.value.includes(soundId)) {
    // Detener sonido
    audio.stopSound(soundId);
    activeSounds.value = activeSounds.value.filter((id) => id !== soundId);
  } else {
    // Iniciar sonido
    audio.startSound(soundId, volumes[soundId]);
    activeSounds.value = [...activeSounds.value, soundId];
  }
};

// Detener todos los sonidos
const stopAllSounds = () => {
  audio.stopAllSounds();
  activeSounds.value = [];
};

// Observar cambios en el volumen
watch(
  () => volumes,
  (newVolumes) => {
    // Actualizar volumen de los sonidos activos
    activeSounds.value.forEach((soundId) => {
      if (newVolumes[soundId] !== undefined) {
        audio.setVolume(soundId, newVolumes[soundId]);
      }
    });
  },
  { deep: true }
);
</script>
