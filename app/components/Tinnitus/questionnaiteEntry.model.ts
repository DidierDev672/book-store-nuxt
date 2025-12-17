export interface QuestionnaireEntry {
  id: string;
  date: string;
  severity: number;
  duration: string;
  affectedActivities: string[];
  emotionalState: string;
  sleepQuality: number;
  triggers: string;
  copingStrategiesUsed: string[];
  notes: string;
}