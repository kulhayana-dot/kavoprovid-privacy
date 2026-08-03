export type ConsentValue = "accepted" | "declined";

const STORAGE_KEY = "kavoprovid-cookie-consent";
export const CONSENT_EVENT = "kavoprovid-consent-change";

export function getConsent(): ConsentValue | null {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

export function setConsent(value: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function clearConsent() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
