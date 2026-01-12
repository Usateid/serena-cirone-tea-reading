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
  const [showBanner, setShowBanner] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Controlla se l'app è già installata
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      console.log("✅ PWA già installata (modalità standalone)");
      return;
    }

    // Rileva Android
    const android = /Android/i.test(navigator.userAgent);
    setIsAndroid(android);

    // Log per debug
    console.log("🔍 Verifica installazione PWA...");
    console.log("User Agent:", navigator.userAgent);
    console.log("Is Android:", android);

    // Controlla se è stato già dismissato
    const dismissed = localStorage.getItem("pwa_banner_dismissed");
    const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    const hoursSinceDismiss = (Date.now() - dismissedTime) / (1000 * 60 * 60);

    // Per Android/Chrome, ascolta l'evento beforeinstallprompt
    const handler = async (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      console.log("✅ Evento beforeinstallprompt catturato!");

      // Su Android, mostra il banner se il prompt non è disponibile immediatamente
      if (android && hoursSinceDismiss >= 24) {
        setTimeout(() => {
          setShowBanner(true);
        }, 3000);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Su Android, mostra il banner dopo un delay se non c'è prompt
    if (android && hoursSinceDismiss >= 24) {
      const timeout = setTimeout(() => {
        if (!deferredPrompt) {
          setShowBanner(true);
        }
      }, 5000);
      return () => clearTimeout(timeout);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setIsInstalled(true);
          setShowBanner(false);
        }
        setDeferredPrompt(null);
      } catch (error) {
        console.log("⚠️ Errore durante l'installazione", error);
      }
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("pwa_banner_dismissed", Date.now().toString());
  };

  if (isInstalled) return null;

  // Banner per Android quando il prompt nativo non è disponibile
  if (showBanner && isAndroid) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-tea-dark to-tea-accent p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <svg
                className="w-8 h-8 text-tea-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-bold text-lg">Installa ReadYourTea</h3>
              <p className="text-sm opacity-90">
                Per un&apos;esperienza migliore
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors flex-shrink-0"
              aria-label="Chiudi"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-4">
            {deferredPrompt ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-700">
                  Installa ReadYourTea per accedere rapidamente e utilizzare
                  l&apos;app anche offline.
                </p>
                <button
                  onClick={handleInstall}
                  className="w-full bg-tea-green text-white py-3 px-4 rounded-xl font-semibold hover:bg-tea-dark transition-colors shadow-md active:scale-95"
                >
                  Installa ora
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-700">
                  Per installare l&apos;app:
                </p>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                  <li>
                    Tocca il menu <strong>(⋮)</strong> in alto a destra
                  </li>
                  <li>
                    Seleziona <strong>&quot;Installa app&quot;</strong> o{" "}
                    <strong>&quot;Aggiungi alla schermata Home&quot;</strong>
                  </li>
                  <li>Conferma l&apos;installazione</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
