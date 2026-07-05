const CANONICAL_HOST = "yardandhomecalc.com";
const PUBLIC_FILE = /\.[a-z0-9]+$/i;

export async function onRequest(context) {
  const url = new URL(context.request.url);
  let shouldRedirect = false;

  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    shouldRedirect = true;
  }

  if (url.pathname !== "/" && !url.pathname.endsWith("/") && !PUBLIC_FILE.test(url.pathname)) {
    url.pathname = `${url.pathname}/`;
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
