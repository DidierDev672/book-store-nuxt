<template>
  <div class="min-h-screen bg-gradient-to-r from-gray-50 to-white mt-4">
    <!-- Header minimalista -->
    <header class="py-8 px-4 max-w-4xl mx-auto">
      <div class="tex-center mb-12">
        <div class="mb-6">
          <div
            class="w-full h-60 bg-blue-100 rounded-2xl flex flex-col gap-2 items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 class="text-3xl md:text-4xl font-ligth text-gray-900 mb-2">
              Cuestionario de Tinnitus
            </h1>
            <p class="text-gray-600 max-w-md mx-auto">
              Una herramienta simple para evaluar y monitorear tu tinnitus
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="max-w-4xl mx-auto px-4 pb-16">
      <!-- Tarjetas de accion -->
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <NuxtLink to="/questionnaire" class="group">
          <div
            class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">
              Nueva Evaluacion
            </h3>
            <p class="text-gray-600 mb-4">
              Completa el cuestionario para evaluar tu tinnitus actual.
            </p>
            <span class="text-blue-600 font-medium inline-flex items-center">
              Comenzar
              <svg
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </div>
        </NuxtLink>

        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div
            class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6"
          >
            <svg
              class="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-medium text-gray-900 mb-3">Historial</h3>
          <p class="text-gray-600 mb-4">
            Revisa tus evaluciones anteriores y monitorea tu progreso.
          </p>
          <button
            @click="viewHistory"
            class="text-gray-700 font-medium inline-flex items-center hover:text-gray-900"
          >
            Ver historial
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Informacion -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 class="text-2xl font-light text-gray-900 mb-">
          Sobre este cuestionario
        </h2>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="space-y-3">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span class="text-gray-700">Evaluación personalizada</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span class="text-gray-700">Recomendaciones específicas</span>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span class="text-gray-700">Monitoreo del progreso</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span class="text-gray-700">Diseño minimalista</span>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span class="text-gray-700">Privacidad garantizada</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span class="text-gray-700">Sin costo</span>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- Footer -->
    <footer class="max-w-4xl mx-auto px-4 py-8 border-t border-gray-200">
      <div class="text-center text-gray-500 text-sm">
        <p>
          Este cuestionario es una herramienta de evaluación y no sustituye el
          diagnóstico médico profesional.
        </p>
        <p class="mt-2">
          Si experimentas síntomas severos, consulta con un especialista.
        </p>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();

const viewHistory = () => {
  alert("Funcionalidad de historial en desarrollo");
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-br {
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
}

.rounded-2xl {
  border-radius: 1rem;
}

.shadow-sm {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.border-gray-100 {
  border-color: #f3f4f6;
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
