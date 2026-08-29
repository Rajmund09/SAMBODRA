import type { Metadata } from "next";
import { ModalProvider } from "../providers/ModalProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAMBODRA — The House of Handwoven Heritage & Royal Silks",
  description: "A luxury haute couture handloom atelier celebrating the Odia art of Bandha Ikat and India's legendary master weavers.",
  keywords: ["SAMBODRA", "Bandha Ikat", "Sambalpuri Silk", "Banarasi Brocade", "Kanjivaram", "Indian Handloom", "Luxury Sarees", "Haute Couture"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}

