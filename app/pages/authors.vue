<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        📚 Nuestros Autores Destacados
      </h1>

      <div class="flex justify-center mb-8 space-x-4">
        <button
          @click="sortAuthors('name')"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
        >
          Ordenar por Nombre
        </button>
        <button
          @click="sortAuthors('country')"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
        >
          Ordenar por País
        </button>
      </div>

      <TransitionGroup
        name="author-list"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <div
          v-for="author in sortedAuthors"
          :key="author.id"
          class="author-card"
          :data-country="author.country"
        >
          <div
            class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 transform hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div class="flex items-center space-x-4">
              <svg
                class="w-10 h-10 text-indigo-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <div>
                <h2 class="text-xl font-semibold text-gray-800">
                  {{ author.name }}
                </h2>
                <p class="text-sm text-gray-500">
                  <span class="font-medium text-indigo-600">País:</span>
                  {{ author.country }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const authors = ref([
  { id: 1, name: "Gabriel García Márquez", country: "Colombia" },
  { id: 2, name: "Isabel Allende", country: "Chile" },
  { id: 3, name: "Jorge Luis Borges", country: "Argentina" },
  { id: 4, name: "Octavio Paz", country: "México" },
  { id: 5, name: "Miguel de Cervantes", country: "España" },
  { id: 6, name: "Mario Vargas Llosa", country: "Perú" },
  { id: 7, name: "Clarice Lispector", country: "Brasil" },
  { id: 8, name: "Julio Cortázar", country: "Argentina" },
]);

const sortKey = ref("name");

const sortedAuthors = computed(() => {
  return [...authors.value].sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = a[sortKey.value];

    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });
});

const sortAuthors = (key) => {
  sortKey.value = key;
};
</script>

<style>
.author-list-enter-active,
.author-list-leave-active {
  transition: opacity 0.5s ease;
}

.author-list-enter-from,
.author-list-leave-to {
  opacity: 0;
}

.author-list-move {
  transition: transform 0.5s ease;
}
</style>
