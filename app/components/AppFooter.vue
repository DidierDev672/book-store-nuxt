<template>
  <footer class="bg-gray-800 text-white py-8 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="text-xl font-bold text-indigo-400 mb-4">Mi Libreria</h3>
          <p class="text-gray-400 text-sm">
            Explora un mundo de conocimiento y aventura a través de nuestros
            libros.
          </p>
        </div>
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Navegación</h4>
          <ul>
            <li v-for="link in mainLinks" :key="link.name" class="mb-2">
              <a
                :href="link.href"
                class="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="ext-lg font-semibold text-white mb-4">Síguenos</h4>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              class="text-gray-400 hover:text-indigo-400 transform hover:scale-110 transition-all duration-200"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="h-6 w-6"></component>
            </a>
          </div>
        </div>
      </div>

      <div
        class="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm"
      >
        &copy; {{ currentYear }} Mi Librería. Todos los derechos reservados.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

import {
  AcademicCapIcon,
  BookOpenIcon,
  InformationCircleIcon,
  PhoneIcon,
} from "@heroicons/vue/24/outline";
import {
  ChatBubbleBottomCenterIcon,
  EnvelopeIcon,
} from "@heroicons/vue/24/outline";

import {
  AcademicCapIcon as TwitterIcon,
  BookOpenIcon as FacebookIcon,
  InformationCircleIcon as InstagramIcon,
} from "@heroicons/vue/24/outline";

const currentYear = computed(() => new Date().getFullYear());

const mainLinks = [
  { name: "Inicio", href: "/" },
  { name: "Libros", href: "/libros" },
  { name: "Autores", href: "/autores" },
  { name: "Novedades", href: "/novedades" },
];

const usefullLinks = [
  { name: "Política de Privacidad", href: "/privacidad" },
  { name: "Términos y Condiciones", href: "/terminos" },
  { name: "FAQ", href: "/faq" },
  { name: "Contacto", href: "/contacto" },
];

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
  { name: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { name: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
];
</script>
