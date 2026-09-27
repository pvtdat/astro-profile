import {
  certificates as localCertificates,
  type Certificate,
} from "../data/certificates";
import { getPublicSupabaseConfig } from "./supabase/public-client";

type SupabaseCertificate = {
  title: string;
  issuer: string;
  category: string | null;
  issue_date: string | null;
  credential_url: string | null;
  description: string | null;
  image_url: string | null;
};

const getLocalCertificates = () => localCertificates;

export async function loadCertificates(): Promise<Certificate[]> {
  const config = getPublicSupabaseConfig();
  if (!config) return getLocalCertificates();

  try {
    const query = new URLSearchParams({
      select:
        "title,issuer,category,issue_date,credential_url,description,image_url",
      published: "eq.true",
      order: "display_order.asc",
    });
    const response = await fetch(
      `${config.url}/rest/v1/certifications?${query.toString()}`,
      {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Supabase REST HTTP ${response.status}`);
    }
    const data = (await response.json()) as SupabaseCertificate[];
    if (!data || data.length === 0) return getLocalCertificates();

    return data.map((certificate) => ({
      title: certificate.title,
      issuer: certificate.issuer,
      issuedAt: certificate.issue_date?.slice(0, 4) ?? "",
      image: certificate.image_url ?? "",
      credentialUrl: certificate.credential_url ?? undefined,
      skills: certificate.category ? [certificate.category] : [],
      summary: certificate.description ?? undefined,
    }));
  } catch (error) {
    console.warn(
      "Failed to load certificates from Supabase; using local data.",
      error,
    );
    return getLocalCertificates();
  }
}
