<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
  >
    <!-- Navbar -->
    <nav class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div
              class="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg"
            >
              <Volume2 class="text-white w-6 h-6" />
            </div>
            <h1 class="text-2xl font-bold text-gray-800">Alivio Tinnitus</h1>
          </div>
          <button
            @click="showInfo = true"
            class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Info class="w-5 h-5" />
            <span class="hidden sm:inline">Información</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Contenido Principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Encabezado -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">
          Sonidos para Enmascarar el Tinnitus
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Encuentra alivio con nuestra colección de sonidos terapéuticos
          diseñados para ayudar a enmascarar los acúfenos y promover la
          relajación.
        </p>
      </div>

      <!-- Reproductor de Audio -->
      <AudioPlayer />

      <!-- Sección de Consejos -->
      <div class="mt-12 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div class="flex items-center space-x-2 mb-4">
          <Heart class="text-red-500 w-5 h-5" />
          <h3 class="text-xl font-semibold text-gray-800">
            Consejos para el Uso
          </h3>
        </div>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-start">
            <span class="text-blue-500 mr-2">•</span>
            <span>Ajusta el volumen a un nivel cómodo, no demasiado alto</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-500 mr-2">•</span>
            <span>Usa auriculares de calidad para una mejor experiencia</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-500 mr-2">•</span>
            <span
              >Experimenta con diferentes sonidos para encontrar el que más te
              ayude</span
            >
          </li>
          <li class="flex items-start">
            <span class="text-blue-500 mr-2">•</span>
            <span
              >Usa estos sonidos durante actividades relajantes o antes de
              dormir</span
            >
          </li>
        </ul>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-16 bg-white/60 backdrop-blur-sm border-t border-gray-200">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600"
      >
        <p>
          Alivio Tinnitus - Herramienta de apoyo para el manejo del tinnitus
        </p>
        <p class="text-sm mt-2">
          Esta herramienta no reemplaza el consejo médico profesional. Consulta
          con tu médico.
        </p>
      </div>
    </footer>

    <!-- Modal de Información -->
    <InfoModal v-if="showInfo" @close="showInfo = false" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Volume2, Info, Heart } from "lucide-vue-next";
import AudioPlayer from "~/components/AudioPlayer.vue";
import InfoModal from "~/components/InfoModal.vue";

const showInfo = ref(false);
</script>
