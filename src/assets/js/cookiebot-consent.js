/**
 * This script is used to set the tracking consent for Shopify Customer Privacy.
 * @link https://shopify.dev/docs/api/consent-tracking
 */
document.addEventListener('DOMContentLoaded', (event) => {
  function feedback() {
    const p = Shopify.customerPrivacy;
    console.log(`Tracking ${p.userCanBeTracked() ? 'en' : 'dis'}abled`);
  }
  // Load the Shopify Customer Privacy JavaScript library.
  Shopify.loadFeatures(
    [
      {
        name: 'consent-tracking-api',
        version: '0.1',
      },
    ],
    (error) => {
      if (error) throw error;
      // In case the cookiebot is already accepted
      handleCookieAction();
      // Set tracking on Cookiebot consent event
      window.addEventListener('CookiebotOnConsentReady', function () {
        handleCookieAction();
      });
    }
  );

  function handleCookieAction() {
    // Check if Cookiebot and customerPrivacy are available
    if ('Cookiebot' in window && 'customerPrivacy' in Shopify) {
      if (Cookiebot.consented) {
        Shopify.customerPrivacy.setTrackingConsent(true, feedback);
      } else {
        Shopify.customerPrivacy.setTrackingConsent(false, feedback);
      }
    }
  }
});
