"use client";

import { useState, useEffect } from "react";

/**
 * Debounces a value by the given delay in ms
 * Returns the debounced value that updates only after `delay` ms of inactivity
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
