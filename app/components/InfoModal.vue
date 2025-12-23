<template>
  <!-- Overlay con backdrop blur -->
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
  >
    <!-- Modal Container -->
    <div
      class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
    >
      <!-- Header Sticky -->
      <div
        class="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center"
      >
        <h2 class="text-2xl font-bold text-gray-800">Sobre el Tinnitus</h2>
        <button
          @click="emitClose"
          class="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Cerrar Modal"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Contenido del Modal -->
      <div class="p-6 space-y-6">
        <!-- Seccion: Que es el Tinnitus?  -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">
            Que es el Tinnitus?
          </h3>
          <p class="text-gray-700 leading-relaxed">
            El tinnitus es la percepción de sonido cuando no hay fuente sonora
            externa presente. Comúnmente se describe como un zumbido, silbido,
            pitido o rugido en los oídos. Afecta a millones de personas en todo
            el mundo y puede variar en intensidad.
          </p>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">
            Enmascaramiento de Sonido
          </h3>
          <p class="text-gray-700 leading-relaxed mb-3">
            El enmascaramiento sonoro es una técnica terapéutica que utiliza
            sonidos externos para hacer que el tinnitus sea menos perceptible.
            Los sonidos que ofrecemos incluyen:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">.</span>
              <span
                ><strog>Ruido Blanco:</strog> Contiene todas las frecuencias
                audibles en igual intensidad</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-pink-500 mr-2">•</span>
              <span
                ><strong>Ruido Rosa:</strong> Más suave que el blanco, con
                énfasis en frecuencias bajas</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-amber-600 mr-2">•</span>
              <span
                ><strong>Ruido Marrón:</strong> Sonido profundo y envolvente,
                muy relajante</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span
                ><strong>Sonidos Naturales:</strong> Lluvia, olas y ventilador
                para relajación adicional</span
              >
            </li>
          </ul>
        </section>
        <!-- Seccion: Como Usar Esta Herramienta -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">
            Como Usar esta Herramienta
          </h3>
          <ol class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-blue-500 mr-2 font-bold">1.</span>
              <span
                >Selecciona uno o varios sonidos haciendo clic en el botón de
                reproducir</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2 font-bold">2.</span>
              <span>Ajusta el volumen de cada sonido individualmente</span>
            </li>
            <li>
              <span class="text-blue-500 mr-2 font-bold">3.</span>
              <span
                >Mezcla diferentes sonidos para encontrar tu combinación
                ideal</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2 font-bold">4.</span>
              <span>Usa auriculares para una mejor experiencia</span>
            </li>
          </ol>
        </section>
        <!-- Sección: Aviso Médico -->
        <section
          class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg"
        >
          <div class="flex items-start space-x-3">
            <AlertCircle class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 class="font-semibold text-amber-800 mb-1">
                Aviso Médico Importante
              </h4>
              <p class="text-sm text-amber-700 leading-relaxed">
                Esta herramienta es solo de apoyo y no reemplaza el consejo
                médico profesional. Si experimentas tinnitus, especialmente si
                es nuevo, empeoró repentinamente o está acompañado de mareos o
                pérdida auditiva, consulta con un otorrinolaringólogo o
                audiólogo calificado.
              </p>
            </div>
          </div>
        </section>

        <!-- Sección: Consejos Adicionales -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">
            Consejos Adicionales
          </h3>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span
                >Evita ambientes muy silenciosos donde el tinnitus se percibe
                más</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span
                >Reduce el consumo de cafeína y sal, que pueden empeorar los
                síntomas</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span>Practica técnicas de relajación y manejo del estrés</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span>Mantén un volumen seguro para proteger tu audición</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-500 mr-2">•</span>
              <span
                >Considera unirte a grupos de apoyo para personas con
                tinnitus</span
              >
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { X, AlertCircle } from "lucide-vue-next";

// Definir props
interface Props {
  onClose?: () => void;
}

// Definir emits
interface Emits {
  (e: "close"): void;
}

// Props y emits
const props = withDefaults(defineProps<Props>(), {
  onClose: undefined,
});

const emit = defineEmits<Emits>();

// Emitir evento de cierre
const emitClose = () => {
  if (props.onClose) {
    props.onClose();
  }
  emit("close");
};
</script>

<style scoped>
/* Estilos específicos para el modal */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-black\/50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.z-50 {
  z-index: 50;
}

.sticky {
  position: sticky;
}

.max-h-\[90vh\] {
  max-height: 90vh;
}

.overflow-y-auto {
  overflow-y: auto;
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.rounded-2xl {
  border-radius: 1rem;
}

.border-l-4 {
  border-left-width: 4px;
}

.rounded-r-lg {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

/* Estilos para hover del botón */
button:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>
