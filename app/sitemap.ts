import type { MetadataRoute } from "next";

// Single-page site — the #about/#experience/#projects/#contact anchors are
// all part of the one crawlable document, not separate pages, so this only
// ever needs the one root entry.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://monagy.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
