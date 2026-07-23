import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pageMetadata, siteUrl } from "@/lib/metadata";
import { organizationSchema } from "@/lib/schema";

const homeTitle = "Yard & Home Calc - Free Yard and Home Project Calculators";
const homeDescription =
  "Free calculators for yard and home projects. Estimate mulch, concrete, paint, and project material needs before you buy.";
const homeMetadata = pageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/"
});

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s"
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
