<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              @click="$router.push('/')"
              class="text-gray-500 hover:text-gray-700 transition-colors"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div>
              <h1 class="text-2xl font-light text-gray-900">
                Resultados de la Evaluación
              </h1>
              <p class="text-gray-600 text-sm mt-1">{{ formattedDate }}</p>
            </div>
          </div>
          <button
            @click="downloadResults"
            class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Guardar PDF
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Tarjeta de puntuación principal -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8"
      >
        <div
          class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8"
        >
          <div>
            <h2 class="text-xl font-medium text-gray-900 mb-2">
              Puntuación de Severidad
            </h2>
            <p class="text-gray-600">
              Basado en tus respuestas al cuestionario
            </p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-center">
              <div class="text-4xl font-bold text-gray-900">
                {{ severityScore }}/10
              </div>
              <div class="text-sm text-gray-600 mt-1">Puntuación total</div>
            </div>
            <div
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium',
                severityLevel.bg,
                severityLevel.color,
              ]"
            >
              {{ severityLevel.level }}
            </div>
          </div>
        </div>

        <!-- Barra de progreso de severidad -->
        <div class="mb-10">
          <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-500">Leve</span>
            <span class="text-sm text-gray-500">Severo</span>
          </div>
          <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full transition-all duration-1000"
              :class="
                severityLevel.bg.replace('bg-', 'bg-').replace('-50', '-500')
              "
              :style="{ width: `${severityScore * 10}%` }"
            ></div>
          </div>
          <div class="flex justify-between mt-1">
            <span class="text-xs text-gray-500">0-3</span>
            <span class="text-xs text-gray-500">4-6</span>
            <span class="text-xs text-gray-500">7-8</span>
            <span class="text-xs text-gray-500">9-10</span>
          </div>
        </div>

        <!-- Descripción del nivel -->
        <div :class="['rounded-xl p-6 mb-6', severityLevel.bg]">
          <h3 class="font-medium text-gray-900 mb-3">
            ¿Qué significa "{{ severityLevel.level }}"?
          </h3>
          <p class="text-gray-700">
            {{ severityDescription }}
          </p>
        </div>
      </div>

      <!-- Sección de análisis por áreas -->
      <div class="mb-8">
        <h2 class="text-xl font-medium text-gray-900 mb-6">
          Análisis por Áreas
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Intensidad -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium text-gray-900">Intensidad</h3>
              <span class="text-2xl font-bold text-blue-600"
                >{{ intensityScore }}/10</span
              >
            </div>
            <p class="text-gray-600 text-sm mb-4">
              {{ intensityDescription }}
            </p>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-blue-500 transition-all duration-1000"
                :style="{ width: `${intensityScore * 10}%` }"
              ></div>
            </div>
          </div>

          <!-- Frecuencia -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium text-gray-900">Frecuencia</h3>
              <span class="text-lg font-medium text-gray-700 capitalize">{{
                frequency
              }}</span>
            </div>
            <p class="text-gray-600 text-sm mb-4">
              {{ frequencyDescription }}
            </p>
            <div class="flex items-center text-sm text-gray-600">
              <svg
                class="w-4 h-4 mr-2"
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
              <span>{{ frequencyDetail }}</span>
            </div>
          </div>

          <!-- Impacto en el sueño -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium text-gray-900">Impacto en el sueño</h3>
              <span class="text-2xl font-bold" :class="sleepImpactColor"
                >{{ sleepImpactScore }}/10</span
              >
            </div>
            <p class="text-gray-600 text-sm mb-4">
              {{ sleepImpactDescription }}
            </p>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-1000"
                :class="sleepImpactColor.replace('text-', 'bg-')"
                :style="{ width: `${sleepImpactScore * 10}%` }"
              ></div>
            </div>
          </div>

          <!-- Concentración -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium text-gray-900">Concentración</h3>
              <span class="text-2xl font-bold" :class="concentrationColor"
                >{{ concentrationScore }}/10</span
              >
            </div>
            <p class="text-gray-600 text-sm mb-4">
              {{ concentrationDescription }}
            </p>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-1000"
                :class="concentrationColor.replace('text-', 'bg-')"
                :style="{ width: `${concentrationScore * 10}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de recomendaciones personalizadas -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8"
      >
        <div class="flex items-center gap-3 mb-6">
          <div
            class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 class="text-xl font-medium text-gray-900">
            Recomendaciones Personalizadas
          </h2>
        </div>

        <div class="space-y-6">
          <!-- Recomendación 1 -->
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"
              >
                <span class="text-blue-600 font-medium">1</span>
              </div>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 mb-2">
                Enmascaramiento sonoro
              </h3>
              <p class="text-gray-600">
                {{ soundMaskingRecommendation }}
              </p>
            </div>
          </div>

          <!-- Recomendación 2 -->
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"
              >
                <span class="text-blue-600 font-medium">2</span>
              </div>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Hábitos de sueño</h3>
              <p class="text-gray-600">
                {{ sleepRecommendation }}
              </p>
            </div>
          </div>

          <!-- Recomendación 3 -->
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"
              >
                <span class="text-blue-600 font-medium">3</span>
              </div>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Manejo del estrés</h3>
              <p class="text-gray-600">
                {{ stressManagementRecommendation }}
              </p>
              <div class="mt-3 space-y-2">
                <div class="flex items-center text-sm text-gray-600">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Ejercicios de respiración profunda</span>
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Meditación guiada (5-10 minutos al día)</span>
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Pausas activas durante el trabajo</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recomendación 4 -->
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"
              >
                <span class="text-blue-600 font-medium">4</span>
              </div>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 mb-2">
                Consulta profesional
              </h3>
              <p class="text-gray-600">
                {{ professionalAdvice }}
              </p>
              <div class="mt-3 p-4 bg-blue-50 rounded-lg">
                <p class="text-sm text-blue-700">
                  <span class="font-medium">Importante:</span> Si tu tinnitus es
                  de inicio reciente, empeora rápidamente, o está acompañado de
                  mareos o pérdida auditiva, consulta con un otorrinolaringólogo
                  lo antes posible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Plan de acción -->
      <div
        class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8 mb-8"
      >
        <h2 class="text-xl font-medium text-gray-900 mb-6">
          Tu Plan de Acción para esta Semana
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl p-6">
            <h3 class="font-medium text-gray-900 mb-4 flex items-center">
              <svg
                class="w-5 h-5 text-blue-600 mr-2"
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
              Actividades diarias
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(activity, index) in dailyActivities"
                :key="index"
                class="flex items-start"
              >
                <div
                  class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0"
                >
                  <svg
                    class="w-3 h-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span class="text-gray-700">{{ activity }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-xl p-6">
            <h3 class="font-medium text-gray-900 mb-4 flex items-center">
              <svg
                class="w-5 h-5 text-blue-600 mr-2"
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
              Monitoreo
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(item, index) in monitoringItems"
                :key="index"
                class="flex items-start"
              >
                <div
                  class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0"
                >
                  <svg
                    class="w-3 h-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span class="text-gray-700">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-blue-200">
          <p class="text-sm text-gray-600">
            <span class="font-medium">Siguiente evaluación:</span> Recomendamos
            completar el cuestionario nuevamente en 2 semanas para monitorear tu
            progreso.
          </p>
        </div>
      </div>

      <!-- Acciones -->
      <div class="flex flex-col sm:flex-row gap-4">
        <button
          @click="$router.push('/questionnaire')"
          class="flex-1 bg-white border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Realizar nueva evaluación
        </button>
        <button
          @click="$router.push('/')"
          class="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-3"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Volver al inicio
        </button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="max-w-4xl mx-auto px-4 py-8 mt-8 border-t border-gray-200">
      <div class="text-center text-gray-500 text-sm">
        <p>
          Los resultados de esta evaluación son informativos y no constituyen un
          diagnóstico médico.
        </p>
        <p class="mt-2">
          Si tienes preocupaciones sobre tu salud auditiva, consulta con un
          especialista.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "#app";

const router = useRouter();

// Cargar datos del cuestionario
const assessmentData = ref<any>(null);
const formattedDate = computed(() => {
  return new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

onMounted(() => {
  const savedData = localStorage.getItem("tinnitus-assessment");
  if (savedData) {
    assessmentData.value = JSON.parse(savedData);
  } else {
    // Si no hay datos, redirigir al cuestionario
    router.push("/questionnaire");
  }
});

// Puntuaciones (simuladas basadas en datos)
const severityScore = computed(() => {
  if (!assessmentData.value) return 0;
  const intensity = assessmentData.value.intensity || 5;
  return Math.min(10, Math.round(intensity * 1.2));
});

const intensityScore = computed(() => {
  return assessmentData.value?.intensity || 5;
});

const sleepImpactScore = computed(() => {
  return Math.min(10, Math.round((assessmentData.value?.intensity || 5) * 0.8));
});

const concentrationScore = computed(() => {
  return Math.min(10, Math.round((assessmentData.value?.intensity || 5) * 0.7));
});

const frequency = computed(() => {
  return assessmentData.value?.frequency || "ocasional";
});

// Niveles de severidad
const severityLevel = computed(() => {
  const score = severityScore.value;
  if (score <= 3)
    return {
      level: "Leve",
      color: "text-green-600",
      bg: "bg-green-50",
      description:
        "El tinnitus es poco molesto y no interfiere significativamente con tus actividades diarias.",
    };
  if (score <= 6)
    return {
      level: "Moderado",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      description:
        "El tinnitus es notable y puede afectar algunas actividades, especialmente en ambientes silenciosos.",
    };
  if (score <= 8)
    return {
      level: "Severo",
      color: "text-orange-600",
      bg: "bg-orange-50",
      description:
        "El tinnitus es significativo y puede interferir con el sueño, concentración y calidad de vida.",
    };
  return {
    level: "Muy Severo",
    color: "text-red-600",
    bg: "bg-red-50",
    description:
      "El tinnitus es muy intenso y afecta considerablemente la vida diaria. Se recomienda consulta médica.",
  };
});

const severityDescription = computed(() => severityLevel.value.description);

// Colores para sub-puntuaciones
const sleepImpactColor = computed(() => {
  const score = sleepImpactScore.value;
  if (score <= 3) return "text-green-600";
  if (score <= 6) return "text-yellow-600";
  if (score <= 8) return "text-orange-600";
  return "text-red-600";
});

const concentrationColor = computed(() => {
  const score = concentrationScore.value;
  if (score <= 3) return "text-green-600";
  if (score <= 6) return "text-yellow-600";
  if (score <= 8) return "text-orange-600";
  return "text-red-600";
});

// Descripciones
const intensityDescription = computed(() => {
  const score = intensityScore.value;
  if (score <= 3)
    return "El volumen de tu tinnitus es bajo y poco perceptible.";
  if (score <= 6)
    return "El volumen es moderado y perceptible en ambientes silenciosos.";
  if (score <= 8)
    return "El volumen es alto y puede ser molesto en diversas situaciones.";
  return "El volumen es muy alto y difícil de ignorar.";
});

const frequencyDescription = computed(() => {
  const freq = frequency.value;
  switch (freq) {
    case "constant":
      return "Presente constantemente.";
    case "daily":
      return "Aparece diariamente.";
    case "weekly":
      return "Se presenta varias veces por semana.";
    default:
      return "Ocasionalmente presente.";
  }
});

const frequencyDetail = computed(() => {
  const freq = frequency.value;
  switch (freq) {
    case "constant":
      return "Presente las 24 horas del día";
    case "daily":
      return "Varias veces al día";
    case "weekly":
      return "2-3 veces por semana";
    default:
      return "Menos de una vez por semana";
  }
});

const sleepImpactDescription = computed(() => {
  const score = sleepImpactScore.value;
  if (score <= 3) return "No afecta significativamente tu sueño.";
  if (score <= 6) return "Puede dificultar el inicio del sueño ocasionalmente.";
  if (score <= 8) return "Frecuentemente interrumpe o dificulta el sueño.";
  return "Afecta severamente la calidad y cantidad de sueño.";
});

const concentrationDescription = computed(() => {
  const score = concentrationScore.value;
  if (score <= 3) return "No afecta tu capacidad de concentración.";
  if (score <= 6)
    return "Puede distraerte ocasionalmente durante tareas que requieren enfoque.";
  if (score <= 8) return "Dificulta la concentración en tareas complejas.";
  return "Interfiere significativamente con tu capacidad para concentrarte.";
});

// Recomendaciones
const soundMaskingRecommendation = computed(() => {
  const score = severityScore.value;
  if (score <= 3)
    return "Utiliza sonidos ambientales suaves (lluvia, olas) durante momentos de silencio para mantener el tinnitus menos perceptible.";
  if (score <= 6)
    return "Considera usar ruido blanco o rosa a bajo volumen durante el día y especialmente antes de dormir para enmascarar el tinnitus.";
  if (score <= 8)
    return "Usa enmascaramiento sonoro regularmente. Sonidos como ruido marrón o ventilador pueden ser efectivos. Considera dispositivos específicos si es necesario.";
  return "El enmascaramiento sonoro intensivo puede ser necesario. Consulta con un audiólogo sobre opciones de terapia sonora personalizada.";
});

const sleepRecommendation = computed(() => {
  const score = sleepImpactScore.value;
  if (score <= 3)
    return "Mantén una rutina de sueño regular. Un sonido ambiental suave puede ayudar a prevenir que el tinnitus se vuelva más perceptible por la noche.";
  if (score <= 6)
    return "Crea un ambiente de sueño con sonido constante (ventilador, máquina de ruido blanco). Evita la cafeína después del mediodía.";
  if (score <= 8)
    return "Establece una rutina de relajación antes de dormir. Considera técnicas de relajación progresiva y mantén el enmascaramiento sonoro durante la noche.";
  return "Consulta con un especialista en sueño. Pueden recomendarse técnicas específicas de terapia cognitivo-conductual para el insomnio relacionado con tinnitus.";
});

const stressManagementRecommendation = computed(() => {
  const score = severityScore.value;
  if (score <= 3)
    return "Practica técnicas básicas de relajación para prevenir que el estrés empeore el tinnitus.";
  if (score <= 6)
    return "Incorpora prácticas regulares de manejo del estrés como mindfulness o yoga. El estrés puede exacerbar el tinnitus.";
  return "El manejo del estrés es crucial. Considera terapia o programas estructurados de reducción de estrés, ya que existe una relación bidireccional entre estrés y tinnitus.";
});

const professionalAdvice = computed(() => {
  const score = severityScore.value;
  if (score <= 3)
    return "Una consulta de rutina puede ser útil para monitorear tu condición y recibir orientación preventiva.";
  if (score <= 6)
    return "Considera una evaluación audiológica completa para entender mejor tu tinnitus y explorar opciones de manejo.";
  if (score <= 8)
    return "Se recomienda consultar con un otorrinolaringólogo y audiólogo especializado en tinnitus para un plan de tratamiento personalizado.";
  return "Consulta urgente con especialistas en tinnitus. Pueden ser necesarias evaluaciones adicionales y tratamientos específicos.";
});

// Plan de acción
const dailyActivities = computed(() => {
  const score = severityScore.value;
  const baseActivities = [
    "5-10 minutos de meditación o respiración profunda",
    "Uso de sonido ambiental durante el trabajo/estudio",
  ];

  if (score <= 3) {
    return [
      ...baseActivities,
      "Monitorear el tinnitus 1 vez al día",
      "Ejercicio físico moderado",
    ];
  } else if (score <= 6) {
    return [
      ...baseActivities,
      "Enmascaramiento sonoro durante 2 horas al día",
      "Diario de síntomas (5 minutos)",
      "Pausas auditivas cada 2 horas",
    ];
  } else {
    return [
      ...baseActivities,
      "Enmascaramiento sonoro programado",
      "Técnicas de relajación 2 veces al día",
      "Evitar ambientes muy silenciosos",
    ];
  }
});

const monitoringItems = computed(() => {
  return [
    "Registra la intensidad del tinnitus cada noche (escala 1-10)",
    "Anota situaciones que empeoran o mejoran los síntomas",
    "Monitorea horas de sueño y calidad del descanso",
    "Registra niveles de estrés diarios",
  ];
});

// Funciones
const downloadResults = () => {
  alert(
    "Funcionalidad de descarga en desarrollo. Por ahora, puedes hacer captura de pantalla."
  );
  // En una implementación real, usarías una librería como jsPDF o html2pdf
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-b {
  background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
}

.rounded-2xl {
  border-radius: 1rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.shadow-sm {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.border-gray-200 {
  border-color: #e5e7eb;
}

.border-blue-200 {
  border-color: #bfdbfe;
}

.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}
</style>
