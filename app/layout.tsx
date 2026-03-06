import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-display-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enzo Gilbert | Young Golf Prodigy",
  description:
    "Follow the journey of Enzo Gilbert, a remarkable young golfer showing talent beyond his years. Explore his story, achievements, and passion for golf.",
  keywords: [
    "Enzo Gilbert",
    "young golfer",
    "golf prodigy",
    "junior golf",
    "golf journey",
  ],
  openGraph: {
    title: "Enzo Gilbert | Young Golf Prodigy",
    description:
      "Follow the journey of Enzo Gilbert, a remarkable young golfer showing talent beyond his years.",
    type: "website",
    locale: "en_GB",
    siteName: "Enzo Gilbert",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enzo Gilbert | Young Golf Prodigy",
    description:
      "Follow the journey of Enzo Gilbert, a remarkable young golfer showing talent beyond his years.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
