import type { QuestionnaireEntry } from "./questionnaiteEntry.model";

export interface HistoryLogProps {
  entries: QuestionnaireEntry;
  onDelete: (id: string) => void;
}

export const copingStrategies = [
  { id: "white-noise", label: "Ruido blanco/rosa" },
  { id: "nature-sounds", label: "Sonidos de naturaleza" },
  { id: "meditation", label: "Meditación" },
  { id: "exercise", label: "Ejercicio físico" },
  { id: "breathing", label: "Ejercicios de respiración" },
  { id: "distraction", label: "Distracción (TV, música)" },
  { id: "sleep-routine", label: "Rutina de sueño" },
  { id: "caffeine-reduction", label: "Reducción de cafeína" },
];
