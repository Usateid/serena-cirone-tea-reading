import type { Metadata, Viewport } from "next";
import "./globals.css";

const APP_NAME = "ReadYourTea";
const APP_DEFAULT_TITLE =
  "ReadYourTea - Accompagna il tuo tè con storie rilassanti";
const APP_DESCRIPTION =
  "Scegli il tempo di infusione e leggi o ascolta una storia mentre aspetti";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#8B5A3C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
