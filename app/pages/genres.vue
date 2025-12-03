<template>
  <div class="bg-gray-100 min-h-screen py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        📖 Explora Nuestros Géneros
      </h1>

      <div class="flex justify-center mb-12">
        <button
          @click="sortGenres"
          class="px-6 py-3 bg-teal-600 text-white font-semibold rounded-full shadow-lg hover:bg-teal-700 transition duration-200 transform hover:scale-105"
        >
          Alternar Orden Alfabético
        </button>
      </div>

      <TransitionGroup
        name="genre-list"
        tag="div"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div v-for="genre in sortedGenres" :key="genre.id" class="genre-item">
          <a
            href="#"
            class="block p-5 text-center rounded-lg shadow-md border-b-4 border-teal-500 bg-white hover:bg-teal-50 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out"
            :aria-label="`Explorar libros de ${genre.name}`"
          >
            <h2 class="text-xl font-bold text-gray-800">{{ genre.name }}</h2>
            <p class="text-sm text-gray-500 mt-1">{{ genre.book_count }}</p>
          </a>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const genres = ref([
  { id: 1, name: "Ficción", slug: "ficcion", book_count: 450 },
  { id: 2, name: "No Ficción", slug: "no-ficcion", book_count: 320 },
  { id: 3, name: "Ciencia Ficción", slug: "ciencia-ficcion", book_count: 180 },
  { id: 4, name: "Fantasía", slug: "fantasia", book_count: 210 },
  { id: 5, name: "Thriller", slug: "thriller", book_count: 150 },
  { id: 6, name: "Romance", slug: "romance", book_count: 280 },
  { id: 7, name: "Misterio", slug: "misterio", book_count: 110 },
  { id: 8, name: "Biografía", slug: "biografia", book_count: 90 },
  { id: 9, name: "Historia", slug: "historia", book_count: 130 },
  { id: 10, name: "Poesía", slug: "poesia", book_count: 60 },
]);

const sortAscending = ref(true);

const sortedGenres = computed(() => {
  return [...genres.value].sort((a, b) => {
    //? Usamos el localeCompare para una ordenación alfabética correcta en español
    const comparison = a.name.localeCompare(b.name, "es");
    return sortAscending.value ? comparison : -comparison;
  });
});

const sortGenres = () => {
  //? Cambia la dirección de la ordenación
  sortAscending.value = !sortAscending.value;
};
</script>

<style>
.genre-list-enter-active,
.genre-list-leave-active {
  transition: opacity 0.4s ease;
}

.genre-list-enter-from,
.genre-list-leave-to {
  opacity: 0;
  /* Opcional: para que se deslice un poco mientras desaparece */
  transform: translateY(20px);
}

.genre-list-leave-active {
  position: absolute;
}

.genre-list-move {
  /* Transición suave para el cambio de posición */
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
