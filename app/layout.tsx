import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Inquiry Form | Stackgate",
  description:
    "Tell us about your business, project idea, goals, and budget so we can help you build the right solution.",

  openGraph: {
    title: "Project Inquiry Form | Stackgate",
    description:
      "Share your project details with Stackgate International.",
    type: "website",
    images: [
      {
        url: "https://stackgate-project-inquiry.vercel.app/preview.png",
        width: 1200,
        height: 630,
        alt: "Stackgate Project Inquiry Form",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
