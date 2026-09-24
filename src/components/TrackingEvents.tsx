"use client";

import { useEffect } from "react";

/**
 * Pushes a `phone_click` event to the dataLayer whenever a `tel:` link is
 * clicked, anywhere on the site. One delegated listener instead of an
 * onClick on every phone link (header, footer, CTAs, machine pages).
 * The lead-form submit event lives in LeadForm itself.
 */
export function TrackingEvents() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="tel:"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "phone_click",
        phone_number: link.getAttribute("href")?.replace("tel:", "") ?? "",
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
