# ReadYourTea

Un'applicazione PWA Next.js per accompagnare l'infusione del tè con storie rilassanti.

## Caratteristiche

- ⏱️ Timer personalizzabile per l'infusione (1-10 minuti)
- 📖 Storie con animazioni eleganti durante l'attesa
- 🎧 Supporto audio opzionale
- ☕ Animazione tazzina fumante durante il countdown
- 📱 PWA installabile con prompt automatico
- 🎨 Design minimalista e rilassante
- 🔧 Pannello admin per gestire le storie

## Setup

```bash
pnpm install
pnpm dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## Struttura

- `/app` - Pagine Next.js (Home, Countdown, Admin)
- `/components` - Componenti React riutilizzabili
- `/lib` - Logica e utilities
- `/public` - File statici e manifest PWA

## Note

- Le storie sono salvate in localStorage (può essere sostituito con un database)
- Le icone PWA devono essere generate (192x192 e 512x512)
- I file audio vanno caricati in `/public/stories/`

## Tecnologie

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- next-pwa
