"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Like `useState` but persists value to `sessionStorage` under the given key
 * Restores on mount; falls back to `defaultValue` if nothing stored
 */
export function useSessionState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    try {
      const raw = sessionStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  const reset = useCallback(() => {
    setValue(defaultValue);
    try {
      sessionStorage.removeItem(key);
    } catch {}
  }, [key, defaultValue]);

  return [value, setValue, reset] as const;
}
