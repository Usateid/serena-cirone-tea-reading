# Come Verificare che la PWA sia Installata Correttamente

## 1. Verifica nel Browser (Chrome/Edge)

### Desktop:
- Apri Chrome/Edge e vai su `http://localhost:3000`
- Cerca l'icona di installazione nella barra degli indirizzi (icona con freccia verso l'alto o simbolo "+")
- Oppure vai su Menu (⋮) → "Installa ReadYourTea"

### Mobile:
- Apri Chrome su Android
- Dovrebbe apparire un banner in basso con "Aggiungi alla schermata Home"
- Oppure Menu (⋮) → "Installa app"

## 2. Verifica con DevTools

1. Apri DevTools (F12 o Cmd+Option+I)
2. Vai alla tab **Application** (o **Applicazioni**)
3. Controlla:
   - **Manifest**: Dovrebbe mostrare tutte le informazioni dell'app
   - **Service Workers**: Dovrebbe essere registrato e attivo
   - **Storage**: Dovrebbe mostrare i dati salvati

## 3. Verifica File Generati

Dopo il build, dovresti vedere questi file in `/public`:
- `sw.js` - Service Worker
- `workbox-*.js` - File Workbox per il caching

## 4. Verifica Modalità Standalone

Dopo l'installazione:
- L'app dovrebbe aprirsi in una finestra separata (senza barra degli indirizzi)
- Il titolo della finestra dovrebbe essere "ReadYourTea"
- Dovrebbe avere un'icona personalizzata nella taskbar/dock

## 5. Test Offline

1. Installa l'app
2. Apri l'app installata
3. Disconnetti internet
4. L'app dovrebbe ancora funzionare (grazie al service worker)

## 6. Verifica Console

Apri la console del browser e controlla:
- Nessun errore relativo al service worker
- Messaggi come "Service Worker registered" o simili

## Checklist Completa

- [ ] Manifest.json accessibile su `/manifest.json`
- [ ] Service Worker registrato (`sw.js` accessibile)
- [ ] Icone presenti e accessibili (`/icon-192.png`, `/icon-512.png`)
- [ ] Prompt di installazione appare nel browser
- [ ] App si apre in modalità standalone dopo installazione
- [ ] Funziona offline (dopo prima visita)
- [ ] Nessun errore nella console

## Troubleshooting

Se il prompt non appare:
1. Assicurati di essere su HTTPS (o localhost per development)
2. Controlla che il manifest.json sia valido
3. Verifica che le icone esistano e siano accessibili
4. Pulisci cache del browser e ricarica
5. Controlla la console per errori

## Comandi Utili

```bash
# Verifica che il build funzioni
pnpm run build

# Avvia il server di sviluppo
pnpm dev

# Verifica i file generati
ls -la public/sw.js public/workbox-*.js
```
