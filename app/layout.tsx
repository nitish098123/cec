import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdProvider from "@/components/AntdProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CEC",
  description: "",
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
            <Navbar />
            {children}
            <Footer />
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
