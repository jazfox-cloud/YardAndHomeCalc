import type { Metadata } from "next";

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
      type: "website"
    }
  };
}
