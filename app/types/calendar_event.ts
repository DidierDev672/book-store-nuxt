export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: "reading" | "therapy" | "reminder" | "task";
  startDate: Date;
  endDate: Date;
  color: string;
  completed: string;
  recurring?: {
    frequency: "daily" | "weekly" | "monthly";
    interval: number;
    endDate?: Date;
  };

  soundTherapy?: {
    soundType: 'alpha' | 'beta' | 'theta' | 'delta';
    duration: number;
    volume: number;
  };

  readingTask?: {
    bookTitle: string;
    pages: number;
    chapter?: number;
  }

  notification: {
    enabled: boolean;
    minutesBefore: number;
  }
}
