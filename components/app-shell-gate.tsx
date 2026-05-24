import { headers } from "next/headers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

type AppShellGateProps = {
  children: React.ReactNode;
};

export default function AppShellGate({ children }: AppShellGateProps) {
  const pathname = headers().get("x-pathname") ?? "";
  const hideGlobalChrome =
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/admin-login");

  if (hideGlobalChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
