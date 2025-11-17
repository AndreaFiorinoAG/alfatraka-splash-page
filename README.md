# QR Code Redirect Middleware

Sistema di reindirizzamento intelligente per indirizzare gli utenti verso App Store, Play Store o Web App in base al dispositivo utilizzato.

## 🚀 Caratteristiche

- ✅ Rilevamento automatico del dispositivo (iOS, Android, Desktop)
- ✅ Reindirizzamento verso App Store per dispositivi iOS
- ✅ Reindirizzamento verso Play Store per dispositivi Android
- ✅ Reindirizzamento verso Web App per desktop
- ✅ Landing page di fallback con scelta manuale
- ✅ Design responsive e moderno
- ✅ Evidenziazione automatica della piattaforma corretta

## 📋 Prerequisiti

- Node.js (versione 14 o superiore)
- npm o yarn

## 🔧 Installazione

1. Installa le dipendenze:
```bash
npm install
```

2. Configura gli URL nel file `server.js`:
```javascript
const redirectConfig = {
  iosAppStoreUrl: 'https://apps.apple.com/app/YOUR_APP_ID',
  androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME',
  webAppUrl: 'https://your-web-app-url.com',
  fallbackUrl: '/landing'
};
```

3. Aggiorna i link nella landing page `public/landing.html`:
```html
<a href="TUO_URL_APP_STORE" class="btn btn-ios">
<a href="TUO_URL_PLAY_STORE" class="btn btn-android">
<a href="TUO_URL_WEB_APP" class="btn btn-web">
```

## 🎯 Utilizzo

### Avvio del server

```bash
npm start
```

Il server si avvierà sulla porta 3000 (o sulla porta specificata nella variabile d'ambiente PORT).

### Route disponibili

- `GET /` - Route principale con reindirizzamento automatico
- `GET /app` - Route alternativa con reindirizzamento automatico
- `GET /landing` - Landing page con scelta manuale
- `GET /test` - Test dell'User-Agent

### Generare un QR Code

Puoi generare un QR code che punta a:
- `https://tuo-dominio.com/` - Per il reindirizzamento automatico
- `https://tuo-dominio.com/landing` - Per la landing page diretta

## 🏗️ Struttura del progetto

```
qr_code/
├── middleware/
│   └── redirectMiddleware.js    # Middleware di reindirizzamento
├── public/
│   └── landing.html              # Landing page di fallback
├── server.js                     # Server Express
├── package.json                  # Dipendenze del progetto
└── README.md                     # Documentazione
```

## 🔍 Come funziona

1. L'utente scansiona il QR code
2. Il middleware analizza l'User-Agent della richiesta
3. In base al dispositivo rilevato:
   - **iOS** → Redirect all'App Store
   - **Android** → Redirect al Play Store
   - **Desktop** → Redirect alla Web App
   - **Sconosciuto** → Redirect alla landing page

4. Nella landing page, l'utente può scegliere manualmente la piattaforma

## 🎨 Personalizzazione

### Modificare il design della landing page

Modifica il file `public/landing.html` per personalizzare:
- Colori e gradiente
- Logo e icone
- Testi e descrizioni
- Stili dei pulsanti

### Aggiungere logica personalizzata

Il middleware può essere esteso nel file `middleware/redirectMiddleware.js` per:
- Aggiungere rilevamento di altri dispositivi
- Implementare A/B testing
- Aggiungere analytics
- Personalizzare i codici di stato HTTP

## 📱 Test

Per testare con diversi User-Agent:

1. Usa gli strumenti sviluppatore del browser (F12)
2. Seleziona "Device toolbar" o "Responsive design mode"
3. Scegli un dispositivo mobile o desktop
4. Naviga su `http://localhost:3000/`

## 🚀 Deploy

### Deploy su servizi cloud:

- **Heroku**: `git push heroku main`
- **Vercel**: `vercel deploy`
- **Railway**: Connetti il repository GitHub
- **DigitalOcean App Platform**: Connetti il repository

Assicurati di impostare la variabile d'ambiente `PORT` se richiesta.

## 📄 Licenza

ISC

## 🤝 Contributi

Contributi, issues e feature requests sono benvenuti!
