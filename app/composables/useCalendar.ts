// composables/useCalendar.ts
import { ref, computed } from "vue";
import type { CalendarEvent } from "~/types/calendar_event";
import { useNotifications } from "~/composables/useNotifications";

export const useCalendar = () => {
  const currentDate = ref(new Date());
  const selectedDate = ref(new Date());
  const events = ref<CalendarEvent[]>([]);
  const viewMode = ref<"month" | "week" | "day">("month");

  // Generar días del mes
  const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    // Días del mes anterior
    const firstDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date),
      });
    }

    // Días del mes actual
    const daysInMonth = lastDay.getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        events: getEventsForDate(date),
        isToday: isToday(date),
      });
    }

    // Días del próximo mes
    const totalCells = 42; // 6 semanas
    const remainingCells = totalCells - days.length;

    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date),
      });
    }

    return days;
  });

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.value.filter((event: any) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const addEvent = (event: any) => {
    // Fill defaults for required fields if caller omitted them
    const start = new Date(event.startDate);
    const newEvent: CalendarEvent = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title: event.title || "Untitled",
      description: event.description || "",
      type: (event as any).type || "task",
      startDate: start,
      endDate: event.endDate ? new Date(event.endDate) : start,
      color: event.color || "#60A5FA",
      completed: (event as any).completed || "false",
      recurring: event.recurring,
      soundTherapy: event.soundTherapy,
      readingTask: event.readingTask,
      notification: event.notification || { enabled: false, minutesBefore: 0 },
    };

    events.value.push(newEvent);
    persistEvents();

    // Programar notificación si está habilitada
    if (newEvent.notification?.enabled) {
      scheduleNotification(newEvent);
    }

    // Programar eventos recurrentes
    if (newEvent.recurring) {
      scheduleRecurringEvents(newEvent);
    }

    return newEvent;
  };

  // Persistir eventos en localStorage
  const persistEvents = () => {
    try {
      const raw = JSON.stringify(
        events.value.map((e) => ({
          ...e,
          startDate:
            e.startDate instanceof Date
              ? e.startDate.toISOString()
              : e.startDate,
          endDate:
            e.endDate instanceof Date ? e.endDate.toISOString() : e.endDate,
        }))
      );
      localStorage.setItem("calendar_events", raw);
    } catch (e) {
      // ignore
    }
  };

  const restoreEvents = () => {
    try {
      const raw = localStorage.getItem("calendar_events");
      if (!raw) return;
      const arr = JSON.parse(raw) as any[];
      events.value = arr.map((a) => ({
        ...a,
        startDate: new Date(a.startDate),
        endDate: new Date(a.endDate),
      })) as CalendarEvent[];

      // schedule pending notifications for restored events
      events.value.forEach((e) => {
        if (e.notification?.enabled) scheduleNotification(e);
      });
    } catch (e) {
      // ignore
    }
  };

  // initialize
  if (process.client) restoreEvents();

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    const index = events.value.findIndex((e: any) => e.id === id);
    if (index !== -1) {
      const existing = events.value[index];
      if (!existing) return;
      events.value[index] = {
        ...existing,
        ...updates,
        id: existing.id,
      } as CalendarEvent;
      persistEvents();
    }
  };

  const deleteEvent = (id: string) => {
    events.value = events.value.filter((e: any) => e.id !== id);
    persistEvents();
  };

  // Notification helpers: inicializar solo en cliente para evitar errores en SSR
  let requestPermission = async () => false;
  let notify = (title: string, options?: NotificationOptions) => {};
  if (process.client) {
    const ns = useNotifications();
    requestPermission = ns.requestPermission;
    notify = ns.notify;
  }

  const scheduleNotification = (event: CalendarEvent) => {
    if (!process.client) return;
    try {
      const minutesBefore = event.notification?.minutesBefore ?? 0;
      const triggerAt =
        new Date(event.startDate).getTime() - minutesBefore * 60000;
      const delay = triggerAt - Date.now();
      // Only schedule if in the future
      if (delay > 0) {
        // Browser setTimeout has limits (~24.8 days). If delay too large, skip scheduling now.
        const MAX = 2147483647;
        if (delay <= MAX) {
          setTimeout(() => {
            notify(event.title, {
              body: event.description || "Recordatorio",
              data: { eventId: event.id },
            });
          }, delay);
        }
      }
    } catch (e) {}
  };

  const scheduleRecurringEvents = (event: CalendarEvent) => {
    if (!event.recurring) return;
    const occurrences = [] as CalendarEvent[];
    const start = new Date(event.startDate);
    const endLimit = event.recurring.endDate
      ? new Date(event.recurring.endDate)
      : new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
    let cursor = new Date(start);
    while (true) {
      // advance
      if (event.recurring.frequency === "daily")
        cursor.setDate(cursor.getDate() + (event.recurring.interval || 1));
      if (event.recurring.frequency === "weekly")
        cursor.setDate(cursor.getDate() + 7 * (event.recurring.interval || 1));
      if (event.recurring.frequency === "monthly")
        cursor.setMonth(cursor.getMonth() + (event.recurring.interval || 1));
      if (cursor > endLimit) break;
      const occ: CalendarEvent = {
        ...event,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        startDate: new Date(cursor),
        endDate: new Date(cursor),
      };
      occurrences.push(occ);
      // prevent infinite loop
      if (occurrences.length > 200) break;
    }
    if (occurrences.length) {
      events.value.push(...occurrences);
      persistEvents();
      occurrences.forEach((o) => {
        if (o.notification?.enabled) scheduleNotification(o);
      });
    }
  };

  const goToPreviousMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1
    );
  };

  const goToNextMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1
    );
  };

  const goToToday = () => {
    currentDate.value = new Date();
    selectedDate.value = new Date();
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return {
    currentDate,
    selectedDate,
    events,
    calendarDays,
    viewMode,
    addEvent,
    updateEvent,
    deleteEvent,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    formatDate,
    getEventsForDate,
  };
};
