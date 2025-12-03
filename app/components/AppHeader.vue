<template>
  <header class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0">
          <a href="/" class="text-2xl font-bold text-indigo-600">Book Store</a>
        </div>
        <nav class="hidden md:flex space-x-4">
          <NuxtLink
            v-for="link in links"
            :key="link.name"
            :to="link.href"
            class="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md font-medium transition duration-150"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <div class="md:hidden flex items-center">
          <button
            @click="isOpen = !isOpen"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg
              class="h-6 w-6"
              :class="{ hidden: isOpen, block: !isOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ block: isOpen, hidden: !isOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
    </div>

    <transition
      enter-active-class="transition transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div v-show="isOpen" class="md:hidden">
        <div
          class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100 shadow-md"
        >
          <a
            v-for="link in links"
            :key="link.name"
            :href="link.href"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-150"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false); //? Estado para controlar a abertura.

const links = [
  { name: "Inicio", href: "#" },
  { name: "Todos los  libros", href: "/books" },
  { name: "Autores", href: "/authors" },
  { name: "Generos", href: "/genres" },
  { name: "Tiempo de lectura", href: "#" },
  { name: "Favoritos", href: "#" },
];
</script>
