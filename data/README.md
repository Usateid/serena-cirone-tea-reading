# Storie ReadYourTea

Questa cartella contiene le storie di default dell'applicazione.

## Struttura

- `stories.json`: File JSON contenente tutte le storie di default

## Formato delle Storie

Ogni storia deve avere la seguente struttura:

```json
{
  "id": "stringa univoca",
  "title": "Titolo della storia",
  "subtitle": "Sottotitolo descrittivo",
  "content": "Contenuto completo della storia",
  "duration": numero_minuti,
  "createdAt": "ISO date string",
  "audioUrl": "opzionale - URL del file audio"
}
```

## Note

- Le storie di default non possono essere modificate o eliminate dall'interfaccia admin
- Le storie custom aggiunte dall'utente vengono salvate in localStorage e si aggiungono a quelle di default
- Per aggiungere nuove storie di default, modifica direttamente `stories.json`
