import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import CommandPalette from "@/components/ui/CommandPalette";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Tagr — NFC × ID | Cloud Dragon",
  description:
    "かざすだけで、人と人がつながる。NFC × 人脈ネットワーク。Cloud Dragonが提案する、いくつもの顔をもつ私たちのための、新しいIDの形。",
  openGraph: {
    title: "Tagr — NFC × ID | Cloud Dragon",
    description: "かざすだけで、人と人がつながる。NFC × 人脈ネットワーク。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="bg-ink-950">
      <body className="min-h-screen bg-ink-950 text-white antialiased font-sans">
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <CommandPalette />
        <Toaster
          position="top-right"
          theme="dark"
          closeButton
          duration={3500}
          toastOptions={{
            style: {
              background: "rgba(16, 19, 26, 0.92)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f3f5f8",
            },
          }}
        />
      </body>
    </html>
  );
}
