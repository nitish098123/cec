import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdProvider from "@/components/AntdProvider";
import AppShellGate from "@/components/app-shell-gate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CEC",
  description: "",
  icons: {
    icon: [
      { url: "/IITR_logo.png", type: "image/png", sizes: "any" },
      { url: "/IITR_logo.png", type: "image/png", sizes: "32x32" },
      { url: "/IITR_logo.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/IITR_logo.png",
    apple: "/IITR_logo.png",
    other: [
      {
        rel: "icon",
        url: "/IITR_logo.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <AntdProvider>
            <AppShellGate>{children}</AppShellGate>
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
