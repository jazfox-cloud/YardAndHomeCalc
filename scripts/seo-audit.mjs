import fs from "node:fs";
import path from "node:path";

const siteUrl = "https://yardandhomecalc.com";
const routes = [
  "/",
  "/mulch-calculator/",
  "/concrete-calculator/",
  "/paint-calculator/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/disclaimer/",
];
const socialImage = `${siteUrl}/yard-home-calc-share.png`;
const failures = [];
const records = [];

function fail(message) {
  failures.push(message);
}

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function tags(html, element) {
  return html.match(new RegExp(`<${element}\\b[^>]*>`, "gi")) ?? [];
}

function attribute(html, element, key) {
  for (const tag of tags(html, element)) {
    const marker = tag.match(/\b(?:name|property|rel)="([^"]*)"/i)?.[1];
    if (marker !== key) continue;
    return decode(tag.match(/\b(?:content|href)="([^"]*)"/i)?.[1] ?? "");
  }
  return "";
}

function routeFile(route) {
  return route === "/" ? "out/index.html" : `out${route}index.html`;
}

function localAssetExists(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const outputPath = path.join("out", clean);
  return fs.existsSync(outputPath) || fs.existsSync(path.join(outputPath, "index.html"));
}

for (const route of routes) {
  const filename = routeFile(route);
  if (!fs.existsSync(filename)) {
    fail(`${route}: missing build output ${filename}`);
    continue;
  }

  const html = fs.readFileSync(filename, "utf8");
  const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "");
  const description = attribute(html, "meta", "description");
  const canonical = attribute(html, "link", "canonical");
  const h1 = html.match(/<h1\b/gi)?.length ?? 0;
  const robots = attribute(html, "meta", "robots");
  const expectedCanonical = `${siteUrl}${route}`;
  const og = {
    title: attribute(html, "meta", "og:title"),
    description: attribute(html, "meta", "og:description"),
    url: attribute(html, "meta", "og:url"),
    type: attribute(html, "meta", "og:type"),
    image: attribute(html, "meta", "og:image"),
    width: attribute(html, "meta", "og:image:width"),
    height: attribute(html, "meta", "og:image:height"),
    imageType: attribute(html, "meta", "og:image:type"),
    alt: attribute(html, "meta", "og:image:alt"),
  };
  const twitter = {
    card: attribute(html, "meta", "twitter:card"),
    title: attribute(html, "meta", "twitter:title"),
    description: attribute(html, "meta", "twitter:description"),
    image: attribute(html, "meta", "twitter:image"),
    alt: attribute(html, "meta", "twitter:image:alt"),
  };

  if (!title || title.length > 60) fail(`${route}: title length ${title.length}`);
  if (!description || description.length < 120 || description.length > 155) {
    fail(`${route}: description length ${description.length}`);
  }
  if (canonical !== expectedCanonical) fail(`${route}: canonical ${canonical}`);
  if (h1 !== 1) fail(`${route}: H1 count ${h1}`);
  if (robots.includes("noindex")) fail(`${route}: unexpected noindex`);
  if (
    og.title !== title ||
    og.description !== description ||
    og.url !== canonical ||
    og.type !== "website" ||
    og.image !== socialImage ||
    og.width !== "1200" ||
    og.height !== "630" ||
    og.imageType !== "image/png" ||
    !og.alt
  ) {
    fail(`${route}: incomplete or inconsistent Open Graph metadata`);
  }
  if (
    twitter.card !== "summary_large_image" ||
    twitter.title !== title ||
    twitter.description !== description ||
    twitter.image !== socialImage ||
    !twitter.alt
  ) {
    fail(`${route}: incomplete or inconsistent Twitter metadata`);
  }
  for (const url of [canonical, og.url, og.image, twitter.image]) {
    if (!url.startsWith("https://yardandhomecalc.com/") || url.includes("www.")) {
      fail(`${route}: non-canonical metadata URL ${url}`);
    }
  }

  for (const imageTag of tags(html, "img")) {
    if (!/\balt="[^"]*"/i.test(imageTag)) fail(`${route}: img missing alt`);
    const source = imageTag.match(/\bsrc="([^"]+)"/i)?.[1];
    if (source?.startsWith("/") && !localAssetExists(source)) {
      fail(`${route}: missing image resource ${source}`);
    }
  }
  for (const script of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(decode(script[1]));
    } catch {
      fail(`${route}: invalid JSON-LD`);
    }
  }
  for (const resource of html.matchAll(/<(?:script|link)\b[^>]+(?:src|href)="([^"]+)"/gi)) {
    const source = resource[1];
    if (source.startsWith("/_next/") && !localAssetExists(source)) {
      fail(`${route}: missing static resource ${source}`);
    }
  }

  const internalLinks = [...html.matchAll(/<a\b[^>]+href="([^"]+)"/gi)]
    .map((match) => decode(match[1]))
    .filter((href) => href.startsWith("/"));
  for (const href of internalLinks) {
    const parsed = new URL(href, siteUrl);
    if (
      parsed.pathname !== "/" &&
      !parsed.pathname.endsWith("/") &&
      !path.extname(parsed.pathname)
    ) {
      fail(`${route}: redirecting internal link ${href}`);
    }
    if (!localAssetExists(parsed.pathname)) fail(`${route}: broken internal link ${href}`);
  }

  records.push({
    route,
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    canonical,
    h1,
    internalLinks,
  });
}

const titles = records.map((record) => record.title);
const descriptions = records.map((record) => record.description);
if (new Set(titles).size !== titles.length) fail("duplicate titles");
if (new Set(descriptions).size !== descriptions.length) fail("duplicate descriptions");

const sitemap = fs.readFileSync("out/sitemap.xml", "utf8");
const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/yardandhomecalc\.com([^<]*)<\/loc>/g)]
  .map((match) => match[1]);
if (JSON.stringify(sitemapRoutes) !== JSON.stringify(routes)) {
  fail(`sitemap mismatch: ${JSON.stringify(sitemapRoutes)}`);
}

const inbound = Object.fromEntries(routes.map((route) => [route, []]));
for (const record of records) {
  for (const href of new Set(record.internalLinks)) {
    const pathname = new URL(href, siteUrl).pathname;
    if (inbound[pathname] && pathname !== record.route) inbound[pathname].push(record.route);
  }
}
for (const route of routes) {
  if (inbound[route].length === 0) fail(`${route}: indexable orphan`);
}

const notFound = fs.readFileSync("out/404.html", "utf8");
const notFoundRobots = attribute(notFound, "meta", "robots");
for (const key of ["canonical", "og:url", "og:image", "twitter:image"]) {
  const value = key === "canonical"
    ? attribute(notFound, "link", key)
    : attribute(notFound, "meta", key);
  if (value) fail(`404: unexpected ${key} ${value}`);
}
if (!notFoundRobots.includes("noindex") || !notFoundRobots.includes("follow")) {
  fail(`404: robots is ${notFoundRobots}`);
}
if ((notFound.match(/<h1\b/gi)?.length ?? 0) !== 1 || !notFound.includes("Return home")) {
  fail("404: missing H1 or Return home link");
}

const png = fs.readFileSync("public/yard-home-calc-share.png");
const pngWidth = png.readUInt32BE(16);
const pngHeight = png.readUInt32BE(20);
if (png.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a" || pngWidth !== 1200 || pngHeight !== 630) {
  fail(`social image: invalid PNG or dimensions ${pngWidth}x${pngHeight}`);
}

console.log(JSON.stringify({
  pages: records.map(({ internalLinks, ...record }) => ({
    ...record,
    inboundSources: inbound[record.route].length,
  })),
  sitemapRoutes,
  socialImage: {
    path: "/yard-home-calc-share.png",
    width: pngWidth,
    height: pngHeight,
    bytes: png.length,
  },
  failures,
}, null, 2));

if (failures.length) process.exitCode = 1;
