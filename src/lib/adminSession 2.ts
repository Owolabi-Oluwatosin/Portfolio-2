"use client";

// The GitHub token lives only in sessionStorage — never localStorage, a
// cookie, or anywhere in source — so it disappears when the tab closes and
// is never sent anywhere but api.github.com.
const KEY = "admin_gh_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(KEY);
}

export function setStoredToken(token: string): void {
  sessionStorage.setItem(KEY, token);
}

export function clearStoredToken(): void {
  sessionStorage.removeItem(KEY);
}
