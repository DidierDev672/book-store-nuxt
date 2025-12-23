<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div v-if="loading">Cargando Libros...0</div>
    <div v-else-if="error">Error: {{ error }}</div>
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
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        <div
          v-for="book in filteredAndSortedBooks"
          :key="book.id"
          class="book-card"
        >
          <div
            class="flex flex-col h-full"
            :class="book.available ? 'border-green-500' : 'border-red-500'"
          >
          <div class="relative aspect-[2/3] rounded-sm shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden"
          style="background:hsl(350, 45%, 30%)"
          >
          </div>
          <div class="absolute left-0 top-0 bottom-0 w-3 bg-black/20"></div>
            <h2 class="font-display text-lg md:text-xl font-semibold loading-tight drop-shadow-md">
              {{ book.title }}
            </h2>
            <p class="font-body text-sm opacity-90 drop-shadow-sm">
              {{ book.author }}
            </p>
            <p class="font-body text-sm opacity-90 drop-shadow-sm">
              <span class="font-medium text-blue-600">Año de Publicación:</span>
              {{ book.published_year }}
            </p>
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
import axios from "axios";
const books = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchBooks = async  () => {
  loading.value = true;
  error.value = null;

  try{
    const response = await axios.get("https://openlibrary.org/people/mekBot/books/want-to-read.json");


    books.value = response.data.reading_log_entries.map((item, index) => ({
      id: index,
      title: item.work?.title || 'Sin título',
      published_year: item.work?.first_publish_year || null,
      author: item.work?.author_names?.[0] || 'Autor desconocido',
      available: true,
      coverColor: 'hsl(35,60%,35%)'
    }));
  }
  catch(error){
    console.error('Error al cargar libros: ', error);
    error.value = error.message || 'Error al cargar los libros';
  }
  finally{
    loading.value = false;
  }
}

fetchBooks();

const sortAscending = ref(true);
const filterAvailable = ref(false);

const filteredBooks = computed(() => {
  if (!filterAvailable.value) {
    return books.value;
  }
  return books.value.filter((book) => book.available);
});
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
