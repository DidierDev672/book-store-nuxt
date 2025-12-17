<template></template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

axios
  .get("http://localhost:8000/admin/books/book/")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
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
