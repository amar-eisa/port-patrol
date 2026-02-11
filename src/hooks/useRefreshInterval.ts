import { useState, useCallback } from "react";

const STORAGE_KEY = "vps-refresh-interval";
const DEFAULT_INTERVAL = 30;

export const useRefreshInterval = () => {
  const [interval, setIntervalState] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? Number(stored) : DEFAULT_INTERVAL;
  });

  const setInterval = useCallback((value: number) => {
    const clamped = Math.max(10, Math.min(300, value));
    localStorage.setItem(STORAGE_KEY, String(clamped));
    setIntervalState(clamped);
  }, []);

  return { interval, setInterval };
};
