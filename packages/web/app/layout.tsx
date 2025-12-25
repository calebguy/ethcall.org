import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ethcall.org",
  description: "Read Ethereum contract data via URL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <div className="text-center min-h-screen w-full flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
