<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-3xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-light text-gray-900">
              Evaluación de Tinnitus
            </h1>
            <p class="text-gray-600 mt-1">
              Paso {{ currentStep }} de {{ totalSteps }}
            </p>
          </div>
          <button
            @click="$router.push('/')"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Barra de progreso -->
    <div class="max-w-3xl mx-auto px-4 py-6">
      <div class="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-blue-600 transition-all duration-300"
          :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Contenido del cuestionario -->
    <main class="max-w-3xl mx-auto px-4 pb-16">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <!-- Pregunta 1: Intensidad -->
        <div v-if="currentStep === 1">
          <div class="mb-8">
            <div class="flex items-center mb-4">
              <span
                class="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
              >
                Intensidad
              </span>
            </div>
            <h2 class="text-xl font-medium text-gray-900 mb-4">
              En una escala del 1 al 10, ¿cómo calificarías la intensidad de tu
              tinnitus?
            </h2>
            <p class="text-gray-600 mb-8">
              Donde 1 es apenas perceptible y 10 es extremadamente intenso
            </p>
          </div>

          <div class="space-y-8">
            <!-- Escala numérica -->
            <div class="mb-10">
              <div class="flex justify-between mb-2">
                <span class="text-sm text-gray-500">Leve (1)</span>
                <span class="text-sm text-gray-500">Extremo (10)</span>
              </div>

              <!-- Botones de escala -->
              <div class="grid grid-cols-10 gap-2">
                <button
                  v-for="num in 10"
                  :key="num"
                  @click="selectIntensity(num)"
                  :class="[
                    'h-12 rounded-lg text-sm font-medium transition-all',
                    selectedIntensity === num
                      ? 'bg-blue-600 text-white transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  ]"
                >
                  {{ num }}
                </button>
              </div>

              <!-- Etiquetas descriptivas -->
              <div class="flex justify-between mt-4">
                <span class="text-xs text-gray-500 text-center"
                  >No me molesta</span
                >
                <span class="text-xs text-gray-500 text-center">Moderado</span>
                <span class="text-xs text-gray-500 text-center"
                  >Interfiere con mi vida</span
                >
              </div>
            </div>

            <!-- Notas adicionales -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Notas adicionales (opcional)
              </label>
              <textarea
                v-model="notes.intensity"
                placeholder="Describe cómo se siente tu tinnitus..."
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Pregunta 2: Frecuencia -->
        <div v-else-if="currentStep === 2">
          <div class="mb-8">
            <div class="flex items-center mb-4">
              <span
                class="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
              >
                Frecuencia
              </span>
            </div>
            <h2 class="text-xl font-medium text-gray-900 mb-4">
              ¿Con qué frecuencia experimentas el tinnitus?
            </h2>
            <p class="text-gray-600 mb-8">
              Selecciona la opción que mejor describa tu experiencia
            </p>
          </div>

          <div class="space-y-3">
            <button
              v-for="option in frequencyOptions"
              :key="option.value"
              @click="selectFrequency(option.value)"
              :class="[
                'w-full p-4 text-left rounded-xl border transition-all',
                selectedFrequency === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300',
              ]"
            >
              <div class="flex items-center">
                <div
                  :class="[
                    'w-5 h-5 rounded-full border mr-4',
                    selectedFrequency === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300',
                  ]"
                ></div>
                <div>
                  <div class="font-medium text-gray-900">
                    {{ option.label }}
                  </div>
                  <div class="text-sm text-gray-600 mt-1">
                    {{ option.description }}
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Pregunta 3: Patrón -->
        <div v-else-if="currentStep === 3">
          <div class="mb-8">
            <div class="flex items-center mb-4">
              <span
                class="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
              >
                Patrón
              </span>
            </div>
            <h2 class="text-xl font-medium text-gray-900 mb-4">
              ¿Cómo describirías el patrón de tu tinnitus?
            </h2>
            <p class="text-gray-600 mb-8">
              Puede ser constante, pulsátil o intermitente
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              v-for="pattern in patternOptions"
              :key="pattern.value"
              @click="selectPattern(pattern.value)"
              :class="[
                'p-6 rounded-xl border-2 transition-all',
                selectedPattern === pattern.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300',
              ]"
            >
              <div class="text-center">
                <div class="text-2xl mb-3">{{ pattern.icon }}</div>
                <div class="font-medium text-gray-900 mb-1">
                  {{ pattern.label }}
                </div>
                <div class="text-sm text-gray-600">
                  {{ pattern.description }}
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Navegación -->
        <div class="flex justify-between mt-12 pt-8 border-t border-gray-200">
          <button
            v-if="currentStep > 1"
            @click="previousStep"
            class="px-6 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            ← Anterior
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < totalSteps"
            @click="nextStep"
            :disabled="!canProceed"
            :class="[
              'px-6 py-3 font-medium rounded-lg transition-colors',
              canProceed
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed',
            ]"
          >
            Siguiente →
          </button>
          <button
            v-else
            @click="submitQuestionnaire"
            :disabled="!canProceed"
            :class="[
              'px-6 py-3 font-medium rounded-lg transition-colors',
              canProceed
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed',
            ]"
          >
            Completar evaluación
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "#app";

const router = useRouter();

// Estado del cuestionario
const currentStep = ref(1);
const totalSteps = ref(8);

// Respuestas
const selectedIntensity = ref<number | null>(null);
const selectedFrequency = ref<string | null>(null);
const selectedPattern = ref<string | null>(null);
const notes = ref({
  intensity: "",
  frequency: "",
  pattern: "",
});

// Opciones
const frequencyOptions = [
  {
    value: "constant",
    label: "Constante",
    description: "Presente todo el tiempo",
  },
  { value: "daily", label: "Diariamente", description: "Varias veces al día" },
  {
    value: "weekly",
    label: "Semanalmente",
    description: "Algunas veces por semana",
  },
  { value: "occasional", label: "Ocasional", description: "De vez en cuando" },
];

const patternOptions = [
  {
    value: "constant",
    label: "Constante",
    description: "Siempre igual",
    icon: "—",
  },
  {
    value: "pulsatile",
    label: "Pulsátil",
    description: "Late como el corazón",
    icon: "♪",
  },
  {
    value: "intermittent",
    label: "Intermitente",
    description: "Va y viene",
    icon: "~",
  },
];

// Validación
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return selectedIntensity.value !== null;
    case 2:
      return selectedFrequency.value !== null;
    case 3:
      return selectedPattern.value !== null;
    default:
      return true;
  }
});

// Métodos
const selectIntensity = (value: number) => {
  selectedIntensity.value = value;
};

const selectFrequency = (value: string) => {
  selectedFrequency.value = value;
};

const selectPattern = (value: string) => {
  selectedPattern.value = value;
};

const nextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const submitQuestionnaire = () => {
  // Aquí guardarías las respuestas
  const answers = {
    intensity: selectedIntensity.value,
    frequency: selectedFrequency.value,
    pattern: selectedPattern.value,
    notes: notes.value,
  };

  // Guardar en localStorage
  localStorage.setItem("tinnitus-assessment", JSON.stringify(answers));

  // Navegar a resultados
  router.push("/results");
};
</script>
