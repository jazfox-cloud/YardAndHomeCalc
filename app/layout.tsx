import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { organizationSchema } from "@/lib/schema";

const siteUrl = "https://yardandhomecalc.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yard & Home Calc - Free Yard and Home Project Calculators",
    template: "%s"
  },
  description:
    "Free calculators for yard and home projects. Estimate mulch, concrete, paint, and project material needs before you buy.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Yard & Home Calc",
    description: "Free calculators for yard and home projects.",
    url: siteUrl,
    siteName: "Yard & Home Calc",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
