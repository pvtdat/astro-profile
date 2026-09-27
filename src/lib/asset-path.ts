export function resolveAssetPath(base: string, path: string): string {
  return /^https?:\/\//i.test(path)
    ? path
    : `${base}${path.replace(/^\/+/, "")}`;
}
