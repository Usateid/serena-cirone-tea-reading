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
      console.log("✅ PWA già installata (modalità standalone)");
      return;
    }

    // Log per debug
    console.log("🔍 Verifica installazione PWA...");
    console.log("User Agent:", navigator.userAgent);

    // Controlla se è stato già mostrato il prompt in questa sessione
    const sessionPrompted = sessionStorage.getItem("pwa_prompted");
    if (sessionPrompted === "true") {
      console.log("ℹ️ Prompt già mostrato in questa sessione");
      return;
    }

    // Per Android/Chrome, ascolta l'evento beforeinstallprompt
    const handler = async (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      console.log("✅ Evento beforeinstallprompt catturato!");

      // Mostra il prompt nativo immediatamente quando disponibile
      try {
        console.log("📱 Mostro il prompt di installazione...");
        await promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        console.log("📱 Risultato prompt:", outcome);
        if (outcome === "accepted") {
          setIsInstalled(true);
          console.log("✅ PWA installata con successo!");
        }
        setDeferredPrompt(null);
        setHasPrompted(true);
        sessionStorage.setItem("pwa_prompted", "true");
      } catch (error) {
        console.log("⚠️ Prompt non disponibile o già mostrato", error);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Timeout per verificare se l'evento non arriva
    const timeout = setTimeout(() => {
      if (!deferredPrompt) {
        console.log("ℹ️ Evento beforeinstallprompt non ancora disponibile");
        console.log(
          "💡 Suggerimento: Il browser mostra il prompt quando ritiene appropriato"
        );
        console.log("💡 Verifica:");
        console.log("   1. Apri DevTools → Application → Manifest");
        console.log("   2. Controlla che il manifest.json sia valido");
        console.log("   3. Verifica che le icone siano accessibili");
        console.log("   4. Controlla Service Workers nella tab Application");
      }
    }, 5000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timeout);
    };
  }, [deferredPrompt]);

  // Non renderizzare nulla - il prompt nativo viene mostrato automaticamente
  return null;
}
