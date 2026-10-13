# Tessere

Un'app personale per salvare le carte fedeltà sull'iPhone e mostrarle in cassa.
Niente App Store, account, pubblicità o abbonamenti.
Le tessere restano solo sul telefono.

## Cosa c'è nella cartella

| File | A cosa serve |
|---|---|
| `index.html` | L'app: interfaccia, scansione, archivio, backup |
| `sw.js` | Fa funzionare l'app anche offline |
| `manifest.webmanifest` | Nome e icona dell'app installata |
| `icons/` | Icone per la schermata Home |
| `vendor/` | Lettore di codici (ZXing) e generatore di codici (bwip-js), inclusi in locale |

## 1. Metti l'app online (una volta sola, gratis)

L'app deve essere aperta da un indirizzo `https://`, altrimenti Safari non dà accesso alla fotocamera.
GitHub Pages lo fa gratis.

1. Crea un account su [github.com](https://github.com), se non ce l'hai.
2. In alto a destra tocca **+ → New repository**.
3. Chiamalo `tessere`, lascialo **Public** e premi **Create repository**.
4. Nella pagina del repository vuoto clicca **uploading an existing file**.
5. Trascina **il contenuto** di questa cartella: `index.html`, `sw.js`, `manifest.webmanifest` e le cartelle `icons` e `vendor`.
   Non trascinare la cartella `tessere` intera.
6. Premi **Commit changes**.
7. Vai in **Settings → Pages**.
   In *Build and deployment* scegli *Source: Deploy from a branch*, poi *Branch: main* e */ (root)*.
   Premi **Save**.
8. Dopo uno o due minuti l'app è su `https://TUONOME.github.io/tessere/`.

Il repository pubblico contiene solo il codice. Le tue tessere non passano mai da GitHub.

## 2. Installala sull'iPhone

1. Apri l'indirizzo in **Safari**.
2. Tocca **Condividi**, poi **Aggiungi alla schermata Home**.
3. Apri Tessere dall'icona.

Aggiungi le tessere **dall'app installata**, non dalla pagina in Safari.
iOS tiene separati i dati delle due: le tessere aggiunte in Safari non compaiono nell'app sulla Home.

## 3. Uso

- **Aggiungi tessera**: scansiona con la fotocamera, scegli una foto o uno screenshot, oppure digita il numero.
  Il tipo di codice (EAN-13, Code 128, QR…) viene riconosciuto da solo.
- **In cassa**: apri la tessera e tocca il codice per mostrarlo a schermo intero su sfondo bianco.
  Lo schermo resta acceso finché la tessera è aperta, se la versione di iOS lo consente.
- **Recenti / A–Z**: le tessere usate più spesso restano in cima.

## 4. Backup: importante

- Se elimini l'icona dalla schermata Home, iOS cancella anche le tessere salvate.
- Non cambiare l'indirizzo dell'app, per esempio rinominando il repository: le tessere sono legate all'indirizzo.

Esporta un backup ogni tanto da **⚙ → Esporta backup** e salvalo in iCloud Drive.
Per recuperare le tessere usa **Importa backup**.

## 5. Aggiornare l'app

1. Modifica i file e ricaricali su GitHub.
2. In `sw.js` aumenta il numero in `VERSION` (es. `tessere-v2`).
   Altrimenti l'iPhone continua a usare la copia salvata.
3. Apri l'app, chiudila e riaprila: alla seconda apertura vedi la nuova versione.

## Licenze

- ZXing (lettura codici): Apache 2.0, vedi `vendor/LICENSE-zxing.txt`.
- bwip-js (generazione codici): MIT, vedi `vendor/LICENSE-bwip-js.txt`.
