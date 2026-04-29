"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideGlobalChrome = useMemo(
    () => pathname.startsWith("/admin-dashboard"),
    [pathname]
  );

  return (
    <>
      {!hideGlobalChrome && <Navbar />}
      {children}
      {!hideGlobalChrome && <Footer />}
    </>
  );
}

