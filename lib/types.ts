export interface Story {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  duration: number; // minuti
  audioUrl?: string;
  createdAt: string;
}

export interface TimerSettings {
  duration: number;
  story: Story;
  mode: 'text' | 'audio';
}
