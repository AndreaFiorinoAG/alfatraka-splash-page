const express = require('express');
const path = require('path');
const { createRedirectMiddleware } = require('./middleware/redirectMiddleware');

const app = express();
const PORT = process.env.PORT || 8080;

// Configurazione degli URL per il reindirizzamento
const redirectConfig = {
  iosAppStoreUrl: 'https://apps.apple.com/it/app/alfatraka/id1434355866',
  androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.alfagomma.alfatraka',
  webAppUrl: 'https://account.alfagomma.com/?appid=2',
  fallbackUrl: '/landing'
};

// Serve static files dalla cartella public
app.use(express.static(path.join(__dirname, 'public')));

// Route per la landing page
app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// Route principale con il middleware di reindirizzamento
// Questa sarà la route che viene chiamata quando l'utente scansiona il QR code
app.get('/', createRedirectMiddleware(redirectConfig));

// Route di esempio per testare il reindirizzamento con un path specifico
app.get('/app', createRedirectMiddleware(redirectConfig));

// Route di test per vedere l'User-Agent
app.get('/test', (req, res) => {
  const userAgent = req.headers['user-agent'];
  res.json({
    userAgent: userAgent,
    headers: req.headers
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server in ascolto sulla porta ${PORT}`);
  console.log(`📱 Apri http://localhost:${PORT} per testare il redirect`);
  console.log(`🌐 Landing page disponibile su http://localhost:${PORT}/landing`);
  console.log(`🔍 Test User-Agent: http://localhost:${PORT}/test`);
});
