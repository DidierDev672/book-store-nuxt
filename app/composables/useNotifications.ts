import { ref } from "vue";

export const useNotifications = () => {
  // Guardar el acceso a Notification para evitar errores en SSR
  const permission = ref(
    typeof window !== "undefined" && "Notification" in window
      ? (window as any).Notification.permission
      : "default"
  );

  const requestPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window))
      return false;
    const p = await Notification.requestPermission();
    permission.value = p;
    return p === "granted";
  };

  const notify = (title: string, options?: NotificationOptions) => {
    try {
      if (typeof window === "undefined" || !("Notification" in window)) return;
      if (Notification.permission === "granted") {
        new Notification(title, options);
      } else {
        Notification.requestPermission().then((p) => {
          if (p === "granted") new Notification(title, options);
        });
      }
    } catch (e) {
      // ignore
    }
  };

  return { permission, requestPermission, notify };
};
