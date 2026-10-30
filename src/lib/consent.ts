export type ConsentValue = "accepted" | "declined";

const STORAGE_KEY = "kavoprovid-cookie-consent";
export const CONSENT_EVENT = "kavoprovid-consent-change";

// Google Consent Mode v2 starts as "denied" (set in layout.tsx before GTM
// loads). This lifts it to "granted" once the visitor accepts, and pins it
// back to "denied" on decline or reset.
export function applyConsentToGoogle(value: ConsentValue | null) {
  const granted = value === "accepted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
  });
}

export function getConsent(): ConsentValue | null {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

export function setConsent(value: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  applyConsentToGoogle(value);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function clearConsent() {
  window.localStorage.removeItem(STORAGE_KEY);
  applyConsentToGoogle(null);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
