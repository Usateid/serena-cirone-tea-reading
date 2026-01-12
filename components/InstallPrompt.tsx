"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  useEffect(() => {
    // Controlla se l'app è già installata
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Controlla se è stato già mostrato il prompt in questa sessione
    const sessionPrompted = sessionStorage.getItem("pwa_prompted");
    if (sessionPrompted === "true") {
      return;
    }

    // Per Android/Chrome, ascolta l'evento beforeinstallprompt
    const handler = async (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Mostra il prompt nativo dopo un breve delay
      setTimeout(async () => {
        try {
          await promptEvent.prompt();
          const { outcome } = await promptEvent.userChoice;
          if (outcome === "accepted") {
            setIsInstalled(true);
          }
          setDeferredPrompt(null);
          setHasPrompted(true);
          sessionStorage.setItem("pwa_prompted", "true");
        } catch (error) {
          console.log("Prompt non disponibile o già mostrato");
        }
      }, 2000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // Non renderizzare nulla - il prompt nativo viene mostrato automaticamente
  return null;
}
