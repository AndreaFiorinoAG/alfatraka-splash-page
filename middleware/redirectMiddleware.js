/**
 * Middleware per reindirizzare gli utenti verso App Store, Play Store o Web App
 * in base al dispositivo utilizzato
 */

/**
 * Rileva il tipo di dispositivo dall'User-Agent
 * @param {string} userAgent - User-Agent della richiesta
 * @returns {string} - 'ios', 'android', 'desktop', o 'unknown'
 */
function detectDevice(userAgent) {
  if (!userAgent) {
    return 'unknown';
  }

  const ua = userAgent.toLowerCase();

  // Rileva iOS (iPhone, iPad, iPod)
  if (/iphone|ipad|ipod/.test(ua)) {
    return 'ios';
  }

  // Rileva Android
  if (/android/.test(ua)) {
    return 'android';
  }

  // Rileva Desktop (Windows, Mac, Linux)
  if (/windows|macintosh|linux|x11/.test(ua)) {
    return 'desktop';
  }

  return 'unknown';
}

/**
 * Middleware di reindirizzamento
 * @param {Object} config - Configurazione degli URL
 * @param {string} config.iosAppStoreUrl - URL dell'App Store iOS
 * @param {string} config.androidPlayStoreUrl - URL del Play Store Android
 * @param {string} config.webAppUrl - URL dell'applicazione web per desktop
 * @param {string} config.fallbackUrl - URL della landing page di fallback (opzionale)
 * @returns {Function} Middleware Express
 */
function createRedirectMiddleware(config) {
  const {
    iosAppStoreUrl,
    androidPlayStoreUrl,
    webAppUrl,
    fallbackUrl = '/landing'
  } = config;

  return function redirectMiddleware(req, res, next) {
    const userAgent = req.headers['user-agent'];
    const deviceType = detectDevice(userAgent);

    // Log per debug (opzionale)
    console.log(`[Redirect Middleware] Device: ${deviceType}, UA: ${userAgent}`);

    switch (deviceType) {
      case 'ios':
        if (iosAppStoreUrl) {
          return res.redirect(302, iosAppStoreUrl);
        }
        break;

      case 'android':
        if (androidPlayStoreUrl) {
          return res.redirect(302, androidPlayStoreUrl);
        }
        break;

      case 'desktop':
        if (webAppUrl) {
          return res.redirect(302, webAppUrl);
        }
        break;

      case 'unknown':
      default:
        // Reindirizza alla landing page di fallback
        return res.redirect(302, fallbackUrl);
    }

    // Fallback nel caso in cui nessuna condizione sia soddisfatta
    return res.redirect(302, fallbackUrl);
  };
}

module.exports = {
  createRedirectMiddleware,
  detectDevice
};
