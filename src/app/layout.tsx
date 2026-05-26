import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
