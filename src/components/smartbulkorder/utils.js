export function friendlyNameFromUrl(url) {
  try {
    const u = new URL(url);
    const slug = u.pathname.split("/").filter(Boolean).pop() || "";
    const name = decodeURIComponent(slug.replace(/[-_]+/g, " ")).trim();
    return name || "Product from URL";
  } catch {
    return "Product from URL";
  }
}
