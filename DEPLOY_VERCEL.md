# Deploy PWA su Vercel - Checklist

## ✅ Problema Risolto

Le icone erano file placeholder invece di PNG reali. Ora sono state generate correttamente!

## Passi per Deploy su Vercel

### 1. Assicurati che i file siano committati

```bash
git add .
git commit -m "Fix PWA: aggiunte icone PNG reali e configurazione Vercel"
git push
```

### 2. Verifica che questi file siano nel repository

- ✅ `public/icon-192.png` (PNG reale, non placeholder)
- ✅ `public/icon-512.png` (PNG reale, non placeholder)
- ✅ `public/manifest.json`
- ✅ `vercel.json` (nuovo file per configurazione headers)
- ✅ `next.config.js` (con @ducanh2912/next-pwa)

### 3. Dopo il deploy su Vercel

Il build genererà automaticamente:
- `public/sw.js` (service worker)
- `public/workbox-*.js` (file workbox)

### 4. Verifica la PWA sul sito deployato

Visita: https://serena-cirone-tea-reading.vercel.app/

#### Controlli da fare:

1. **Apri DevTools** (F12)
2. **Tab Application** → **Manifest**:
   - Dovrebbe mostrare "ReadYourTea"
   - Le icone dovrebbero essere caricate correttamente
   - Nessun errore rosso

3. **Tab Application** → **Service Workers**:
   - Dovrebbe essere registrato `sw.js`
   - Status: "activated and is running"

4. **Console del browser**:
   - Cerca i log: `🔍 Verifica installazione PWA...`
   - Se vedi `✅ Evento beforeinstallprompt catturato!` → il browser è pronto

5. **Prompt di installazione**:
   - **Desktop Chrome/Edge**: Icona nella barra degli indirizzi o Menu → "Installa ReadYourTea"
   - **Mobile Chrome**: Banner "Aggiungi alla schermata Home"

### 5. Test con Lighthouse

1. Apri DevTools → Tab **Lighthouse**
2. Seleziona **Progressive Web App**
3. Clicca **Generate report**
4. Dovrebbe mostrare almeno:
   - ✅ Manifest valido
   - ✅ Service Worker registrato
   - ✅ HTTPS (Vercel lo fornisce automaticamente)

## Troubleshooting

### Se il prompt non appare:

1. **Pulisci cache del browser**:
   - Chrome: Settings → Privacy → Clear browsing data
   - Seleziona "Cached images and files"

2. **Verifica che le icone siano accessibili**:
   - Visita: https://serena-cirone-tea-reading.vercel.app/icon-192.png
   - Dovrebbe mostrare l'icona, non un errore 404

3. **Verifica il manifest**:
   - Visita: https://serena-cirone-tea-reading.vercel.app/manifest.json
   - Dovrebbe essere JSON valido

4. **Verifica il service worker**:
   - Visita: https://serena-cirone-tea-reading.vercel.app/sw.js
   - Dovrebbe essere codice JavaScript

5. **Il browser potrebbe richiedere più visite**:
   - Visita il sito più volte
   - Il browser mostra il prompt quando ritiene appropriato

## Note Importanti

- Vercel fornisce HTTPS automaticamente ✅
- Il service worker viene generato durante il build ✅
- Le icone ora sono PNG reali ✅
- Il manifest è configurato correttamente ✅

## Comandi Utili

```bash
# Genera nuove icone se necessario
pnpm run generate-icons

# Build locale per testare
pnpm run build
pnpm start

# Verifica file generati
ls -lh public/sw.js public/workbox-*.js
```
