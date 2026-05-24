"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function TopLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const prevPath = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start loader on any anchor click that triggers internal navigation
  useEffect(() => {
    function start() {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(true);
      setWidth(20);
      timerRef.current = setTimeout(() => setWidth(60), 150);
      timerRef.current = setTimeout(() => setWidth(80), 600);
    }

    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        anchor.target === "_blank"
      ) return;
      start();
    }

    function handleSubmit() {
      start();
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  // Finish loader when pathname changes (navigation complete)
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    if (timerRef.current) clearTimeout(timerRef.current);
    setWidth(100);
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 300);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[9999] h-[3px] bg-primary shadow-[0_0_8px_rgba(0,85,255,0.6)] transition-[width] duration-300 ease-in-out"
      style={{ width: `${width}%` }}
    />
  );
}
