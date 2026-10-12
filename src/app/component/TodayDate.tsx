"use client";

import { useSyncExternalStore } from "react";

const subscribeToDate = (callback: () => void) => {
  const interval = setInterval(callback, 60_000);
  return () => clearInterval(interval);
};

const getToday = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function TodayDate({ className }: { className?: string }) {
  const today = useSyncExternalStore(subscribeToDate, getToday, () => "");

  return <span className={className}>{today}</span>;
}
