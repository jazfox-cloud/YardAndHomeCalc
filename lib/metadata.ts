import type { Metadata } from "next";

export const siteUrl = "https://yardandhomecalc.com";
export const socialImagePath = "/yard-home-calc-share.png";
export const socialImageAlt = "Yard & Home Calc project calculator preview";

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function pageMetadata({ title, description, path }: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Yard & Home Calc",
      type: "website",
      images: [
        {
          url: socialImagePath,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: socialImageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: socialImagePath,
          alt: socialImageAlt
        }
      ]
    }
  };
}
