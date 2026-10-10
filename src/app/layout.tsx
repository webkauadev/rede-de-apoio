import type { Metadata, Viewport } from "next";
import "@fontsource/geist/400.css";
import "@fontsource/geist/600.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "Rede de Apoio — Base técnica",
  description: "Scaffold técnico provisório da V1. Sem dados de cuidado.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
