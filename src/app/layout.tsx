import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable} font-body bg-background`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}