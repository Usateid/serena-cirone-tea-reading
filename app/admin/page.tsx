"use client";

import { useState, useEffect } from "react";
import { Story } from "@/lib/types";
import { getStories, saveStory, deleteStory, isDefaultStory } from "@/lib/stories";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    duration: "3",
    audioUrl: "",
  });

  useEffect(() => {
    setStories(getStories());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const story: Story = {
      id: editingStory?.id || Date.now().toString(),
      title: formData.title,
      subtitle: formData.subtitle,
      content: formData.content,
      duration: parseInt(formData.duration),
      audioUrl: formData.audioUrl || undefined,
      createdAt: editingStory?.createdAt || new Date().toISOString(),
    };

    saveStory(story);
    setStories(getStories());
    resetForm();
  };

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      subtitle: story.subtitle,
      content: story.content,
      duration: story.duration.toString(),
      audioUrl: story.audioUrl || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questa storia?")) {
      deleteStory(id);
      setStories(getStories());
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      content: "",
      duration: "3",
      audioUrl: "",
    });
    setEditingStory(null);
    setShowForm(false);
  };

  return (
    <main className="min-h-screen p-4 bg-gradient-to-b from-tea-light to-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-tea-dark">Pannello Admin</h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-tea-accent text-white rounded-lg hover:bg-tea-dark transition-colors"
            >
              ← Home
            </button>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="px-4 py-2 bg-tea-green text-white rounded-lg hover:bg-tea-dark transition-colors"
            >
              + Nuova Storia
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-tea-dark">
              {editingStory ? "Modifica Storia" : "Nuova Storia"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-tea-dark mb-1">
                  Titolo
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-tea-medium rounded-lg focus:border-tea-dark outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-tea-dark mb-1">
                  Sottotitolo
                </label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-tea-medium rounded-lg focus:border-tea-dark outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-tea-dark mb-1">
                  Contenuto
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-tea-medium rounded-lg focus:border-tea-dark outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-tea-dark mb-1">
                  Durata (minuti)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-tea-medium rounded-lg focus:border-tea-dark outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-tea-dark mb-1">
                  URL Audio (opzionale)
                </label>
                <input
                  type="url"
                  value={formData.audioUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, audioUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2 border-2 border-tea-medium rounded-lg focus:border-tea-dark outline-none"
                />
                <p className="text-xs text-tea-accent mt-1">
                  Carica il file audio in /public/stories/ e inserisci il
                  percorso
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-tea-green text-white rounded-lg font-semibold hover:bg-tea-dark transition-colors touch-manipulation min-h-[44px]"
                >
                  {editingStory ? "Salva Modifiche" : "Crea Storia"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors touch-manipulation min-h-[44px]"
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-tea-dark mb-4">
            Storie Esistenti ({stories.length})
          </h2>
          {stories.length === 0 ? (
            <p className="text-center text-tea-accent py-8">
              Nessuna storia ancora. Crea la prima!
            </p>
          ) : (
            stories.map((story) => {
              const isDefault = isDefaultStory(story.id);
              return (
                <div key={story.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-tea-dark">
                          {story.title}
                        </h3>
                        {isDefault && (
                          <span className="px-2 py-1 text-xs bg-tea-green text-white rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-tea-accent mb-2">{story.subtitle}</p>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {story.content}
                      </p>
                      <div className="flex gap-4 text-sm text-tea-accent">
                        <span>Durata: {story.duration} min</span>
                        {story.audioUrl && <span>🎧 Audio disponibile</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(story)}
                        disabled={isDefault}
                        className={`
                          px-4 py-2 rounded-lg transition-colors text-sm touch-manipulation min-h-[44px]
                          ${
                            isDefault
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-tea-accent text-white hover:bg-tea-dark"
                          }
                        `}
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => handleDelete(story.id)}
                        disabled={isDefault}
                        className={`
                          px-4 py-2 rounded-lg transition-colors text-sm touch-manipulation min-h-[44px]
                          ${
                            isDefault
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }
                        `}
                      >
                        Elimina
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
