"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function RouteTicker({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/productdetails/")) return null;

  return children;
}
