import type { Metadata } from "next";
import { Domine, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "../store/providers";
import CartPopup from "../components/CartPopup";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HUSHPUPPIESCO",
  description: "Tienda de Calzado Hush Puppies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${domine.variable} antialiased`}
      >
        <Providers>
          <CartPopup />
          {children}
        </Providers>
      </body>
    </html>
  );
}
