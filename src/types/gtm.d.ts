// Globals injected by the Consent Mode bootstrap and Google Tag Manager
// (see src/app/layout.tsx). dataLayer is how the app talks to GTM.
export {};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}
