import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { AppbarClient } from "../AppbarClient";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MudRa",
  description: "Simple Wallet App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppbarClient />
          {children}
        </Providers>
      </body>
    </html>
  );
}
