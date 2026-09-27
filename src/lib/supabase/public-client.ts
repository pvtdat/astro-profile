export type PublicSupabaseConfig = {
  url: string;
  key: string;
};

export function getPublicSupabaseConfig(): PublicSupabaseConfig | null {
  const url = (
    import.meta.env.PUBLIC_SUPABASE_URL ??
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL
  )?.trim();
  const key = (
    import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )?.trim();

  return url && key ? { url, key } : null;
}
