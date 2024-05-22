import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RizzKart",
  description: "Get Your DreamItem Here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="mt-10 md:mt-5 md:p-10 md:h-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
