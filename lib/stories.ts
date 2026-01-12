import { Story } from './types';
import defaultStoriesData from '@/data/stories.json';

const STORAGE_KEY = 'readyourtea_stories';

// Carica le storie di default dal file JSON
const defaultStories: Story[] = defaultStoriesData as Story[];

export function getStories(): Story[] {
  if (typeof window === 'undefined') return defaultStories;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  const defaultIds = new Set(defaultStories.map(s => s.id));
  
  if (!stored) {
    // Inizializza con le storie di default
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStories));
    return defaultStories;
  }
  
  try {
    const allStories: Story[] = JSON.parse(stored);
    // Filtra solo le storie custom (quelle che non sono di default)
    const customStories = allStories.filter((s: Story) => !defaultIds.has(s.id));
    // Combina sempre le storie di default con quelle custom
    return [...defaultStories, ...customStories];
  } catch {
    // Se c'è un errore nel parsing, resetta con le storie di default
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStories));
    return defaultStories;
  }
}

export function saveStory(story: Story): void {
  if (typeof window === 'undefined') return;
  
  const allStories = getStories();
  const defaultIds = new Set(defaultStories.map(s => s.id));
  
  // Non permettere di modificare le storie di default
  if (defaultIds.has(story.id)) {
    console.warn('Non è possibile modificare le storie di default');
    return;
  }
  
  // Carica solo le storie custom da localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  const customStories: Story[] = stored ? JSON.parse(stored).filter((s: Story) => !defaultIds.has(s.id)) : [];
  
  const index = customStories.findIndex(s => s.id === story.id);
  
  if (index >= 0) {
    customStories[index] = story;
  } else {
    customStories.push(story);
  }
  
  // Salva solo le storie custom
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customStories));
}

export function deleteStory(id: string): void {
  if (typeof window === 'undefined') return;
  
  const defaultIds = new Set(defaultStories.map(s => s.id));
  
  // Non permettere di eliminare le storie di default
  if (defaultIds.has(id)) {
    console.warn('Non è possibile eliminare le storie di default');
    return;
  }
  
  // Carica solo le storie custom da localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  
  const customStories: Story[] = JSON.parse(stored).filter((s: Story) => !defaultIds.has(s.id));
  const filtered = customStories.filter(s => s.id !== id);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getStoryById(id: string): Story | undefined {
  return getStories().find(s => s.id === id);
}

export function getStoriesByDuration(duration: number): Story[] {
  return getStories().filter(s => s.duration === duration);
}

export function isDefaultStory(id: string): boolean {
  return defaultStories.some(s => s.id === id);
}
