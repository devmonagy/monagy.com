// Shared font loader for generated icons/social images (ImageResponse/satori
// can't use next/font like the rest of the site does — it needs the actual
// font file bytes handed to it directly, so this fetches them separately).
let cachedFont: ArrayBuffer | null = null;

export async function getSyneFont(): Promise<ArrayBuffer> {
  if (cachedFont) return cachedFont;

  const cssResponse = await fetch(
    "https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap",
    {
      headers: {
        // An old UA string makes Google Fonts serve TTF instead of WOFF2 —
        // satori only supports TTF/OTF/WOFF, not WOFF2.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
      },
    },
  );
  const css = await cssResponse.text();

  // Google returns one @font-face block per unicode subset (greek,
  // latin-ext, latin, ...) in that order — grabbing the first url() match
  // against the raw response silently picks the "greek" block, whose font
  // file doesn't include basic Latin letters. Slice to the "latin" block
  // specifically before extracting the url().
  const latinBlock = css.split("/* latin */")[1] ?? css;
  const fontUrl = latinBlock.match(
    /src: url\((.+?)\) format\('(?:woff2?|opentype|truetype)'\)/,
  )?.[1];
  if (!fontUrl) {
    throw new Error("Could not resolve the Syne font file URL from Google Fonts");
  }

  const fontResponse = await fetch(fontUrl);
  cachedFont = await fontResponse.arrayBuffer();
  return cachedFont;
}
