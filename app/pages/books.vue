<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        📖 Catálogo de Libros
      </h1>

      <div class="flex flex-wrap justify-center gap-4 mb-10">
        <button
          @click="toggleSort"
          class="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-150 transform hover:scale-10"
        >
          Ordenar por Año ({{ sortAscending ? "Ascendente" : "Descendente" }})
        </button>

        <button
          @click="toggleAvailability"
          class="px-5 py-2 rounded-lg shadow-md transition duration-150 transform hover:scale-105"
          :class="[
            filterAvailable
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-600 hover:bg-green-700',
            'text-white',
          ]"
        >
          {{ filterAvailable ? "Mostrar Todos" : "Solo Disponibles" }}
        </button>
      </div>

      <TransitionGroup
        name="book-list"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="book in filteredAndSortedBooks"
          :key="book.id"
          class="book-card"
        >
          <div
            class="bg-white p-6 rounded-xl shadow-lg border-l-4 transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
            :class="book.available ? 'border-green-500' : 'border-red-500'"
          >
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              {{ book.title }}
            </h2>

            <p class="text-sm text-gray-600 mb-4">
              <span class="font-medium text-blue-600">Año de Publicación:</span>
              {{ book.published_year }}
            </p>

            <div class="flex items-center space-x-2">
              <span
                :class="
                  book.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                "
                class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full"
              >
                {{ book.available ? "Disponible" : "No Disponible" }}
              </span>
            </div>
          </div>
        </div>

        <div
          v-if="filteredAndSortedBooks.length === 0"
          class="col-span-full text-center py-10"
        >
          <p class="text-xl text-gray-500">
            No hay libros que coincidan con el filtro.
          </p>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const books = ref([
  {
    id: 1,
    title: "Cien años de soledad",
    published_year: 1967,
    available: true,
  },
  {
    id: 2,
    title: "El amor en los tiempos del cólera",
    published_year: 1985,
    available: false,
  },
  { id: 3, title: "Rayuela", published_year: 1963, available: true },
  {
    id: 4,
    title: "Don Quijote de la Mancha",
    published_year: 1605,
    available: true,
  },
  {
    id: 5,
    title: "La casa de los espíritus",
    published_year: 1982,
    available: false,
  },
  { id: 6, title: "Ficciones", published_year: 1944, available: true },
]);

const sortAscending = ref(true);
const filterAvailable = ref(false);

const filteredBooks = computed(() => {
  if (!filterAvailable.value) {
    return books.value;
  }
  return books.value.filter((book) => book.available);
});

const filteredAndSortedBooks = computed(() => {
  return [...filteredBooks.value].sort((a, b) => {
    const yearA = a.published_year;
    const yearB = b.published_year;

    if (sortAscending.value) {
      return yearA - yearB;
    } else {
      return yearB - yearA;
    }
  });
});

const toggleSort = () => {
  sortAscending.value = !sortAscending.value;
};

const toggleAvailability = () => {
  filterAvailable.value = !filterAvailable.value;
};
</script>

<style>
.book-list-enter-active,
.book-list-leave-active {
  transition: all 0.5s ease;
}

.book-list-enter-from,
.book-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.book-list-move {
  transition: transform 0.5s ease;
}

.book-list-leave-active {
  position: absolute;
}
</style>
