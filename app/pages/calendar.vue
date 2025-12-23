<template>
  <div class="p-4">
    <CalendarHeader
      :title="headerTitle"
      @prev="goPrev"
      @next="goNext"
      @today="goToday"
      @change-view="onChangeView"
    />

    <CalendarGrid
      :days="calendarDays"
      @add-event="openAddEvent"
      @open-event="openEvent"
    />

    <div
      v-if="showForm"
      class="fixed inset-0 flex items-center justify-center bg-black/40"
    >
      <div class="bg-white p-4 rounded w-96">
        <h3 class="text-lg font-semibold mb-2">Crear tarea</h3>
        <label class="block"
          >Título<input v-model="form.title" class="input"
        /></label>
        <label class="block mt-2"
          >Descripción<textarea
            v-model="form.description"
            class="input"
          ></textarea>
        </label>
        <label class="block mt-2"
          >Fecha<input
            type="datetime-local"
            v-model="form.startDate"
            class="input"
        /></label>
        <label class="block mt-2"
          ><input type="checkbox" v-model="form.notification.enabled" />
          Notificar</label
        >

        <div class="mt-4 flex justify-end gap-2">
          <button class="btn" @click="closeForm">Cancelar</button>
          <button class="btn" @click="submitForm">Guardar</button>
        </div>
      </div>
    </div>

    <div v-if="selectedEvent" class="mt-4">
      <CalendarEvent
        :event="selectedEvent"
        @edit="editEvent"
        @delete="deleteEvent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCalendar } from "~/composables/useCalendar";
import CalendarHeader from "~/components/calendar/CalendarHeader.vue";
import CalendarGrid from "~/components/calendar/CalendarGrid.vue";
import CalendarEvent from "~/components/calendar/CalendarEvent.vue";

const {
  currentDate,
  calendarDays,
  addEvent,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
  viewMode,
} = useCalendar();

const headerTitle = computed(() =>
  currentDate.value.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  })
);

const showForm = ref(false);
const form = ref({
  title: "",
  description: "",
  startDate: "",
  notification: { enabled: false },
});
const selectedEvent = ref(null as any);

const goPrev = () => goToPreviousMonth();
const goNext = () => goToNextMonth();
const goToday = () => goToToday();

const openAddEvent = (date: Date) => {
  showForm.value = true;
  form.value.startDate = new Date(date).toISOString().slice(0, 16);
};

const openEvent = (event: any) => {
  selectedEvent.value = event;
};

const closeForm = () => {
  showForm.value = false;
};

const onChangeView = (v: "month" | "week" | "day") => {
  viewMode.value = v;
};

const submitForm = () => {
  const payload = {
    title: form.value.title,
    description: form.value.description,
    startDate: new Date(form.value.startDate).toISOString(),
    notification: form.value.notification,
    recurring: false,
    type: "task",
    endDate: new Date(form.value.startDate).toISOString(),
    color: "#60A5FA",
    completed: "false",
  };
  addEvent(payload);
  showForm.value = false;
  // reset form
  form.value = {
    title: "",
    description: "",
    startDate: "",
    notification: { enabled: false },
  };
};

const editEvent = (event: any) => {
  // placeholder: in a real app open an edit form
  selectedEvent.value = null;
};

const deleteEvent = (id: string) => {
  // call composable update - placeholder
  // ...existing code...
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.btn {
  padding: 6px 10px;
  border-radius: 6px;
  background: #eee;
}
</style>
