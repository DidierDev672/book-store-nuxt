export interface SoundPreset {
    id: string;
    name: string;
    type: 'alpha' | 'beta' | 'theta' | 'delta';
    read: boolean;
    timestamp: Date;
    eventId?: string;
    actionUrl?: string;
}