import type { Metadata } from "next";
import { ModalProvider } from "../providers/ModalProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "BANDHA — The Thread That Binds",
  description: "A house of handwoven sarees, built on the Odia art of bandha.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
