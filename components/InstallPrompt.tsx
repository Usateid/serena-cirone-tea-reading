"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Controlla se l'app è già installata
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Controlla se è iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      // Per iOS, mostra sempre il prompt
      setShowPrompt(true);
      return;
    }

    // Per Android/Chrome, ascolta l'evento beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Mostra il prompt anche se l'evento non è ancora arrivato
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 2000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Mostra di nuovo dopo 24 ore (simulato con localStorage)
    const dismissed = localStorage.getItem("pwa_dismissed");
    if (!dismissed) {
      localStorage.setItem("pwa_dismissed", Date.now().toString());
    }
  };

  // Controlla se è stato dismissato recentemente (24 ore)
  useEffect(() => {
    const dismissed = localStorage.getItem("pwa_dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const hoursSinceDismiss = (Date.now() - dismissedTime) / (1000 * 60 * 60);
      if (hoursSinceDismiss < 24) {
        setShowPrompt(false);
      }
    }
  }, []);

  if (isInstalled || !showPrompt) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-tea-dark text-white p-4 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium">
            {isIOS
              ? 'Installa ReadYourTea: tocca il pulsante Condividi e poi "Aggiungi alla schermata Home"'
              : "Installa ReadYourTea per un'esperienza migliore"}
          </p>
        </div>
        <div className="flex gap-2">
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-white text-tea-dark rounded-lg text-sm font-semibold hover:bg-tea-light transition-colors"
            >
              Installa
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="px-4 py-2 bg-tea-accent rounded-lg text-sm font-semibold hover:bg-tea-medium transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
