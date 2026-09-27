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
  skills?: string[] | null;
  featured: boolean;
  display_order: number;
};

const getLocalCertificates = () => localCertificates;

export async function loadCertificates(): Promise<Certificate[]> {
  const config = getPublicSupabaseConfig();
  if (!config) return getLocalCertificates();

  try {
    const fetchRows = async (includeSkills: boolean) => {
      const query = new URLSearchParams({
        select: includeSkills
          ? "title,issuer,category,issue_date,credential_url,description,image_url,skills,featured,display_order"
          : "title,issuer,category,issue_date,credential_url,description,image_url,featured,display_order",
        published: "eq.true",
        order: "display_order.asc",
      });
      return fetch(`${config.url}/rest/v1/certifications?${query.toString()}`, {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
        },
      });
    };

    let response = await fetchRows(true);
    if (!response.ok && response.status === 400) {
      response = await fetchRows(false);
    }
    if (!response.ok) {
      throw new Error(`Supabase REST HTTP ${response.status}`);
    }
    const data = (await response.json()) as SupabaseCertificate[];
    if (!data || data.length === 0) return getLocalCertificates();

    const localByKey = new Map(
      localCertificates.map((certificate) => [
        `${certificate.title.trim().toLowerCase()}::${certificate.issuer.trim().toLowerCase()}`,
        certificate,
      ]),
    );

    return data.map((certificate) => {
      const local = localByKey.get(
        `${certificate.title.trim().toLowerCase()}::${certificate.issuer.trim().toLowerCase()}`,
      );

      return {
        title: certificate.title,
        issuer: certificate.issuer,
        issuedAt: certificate.issue_date?.slice(0, 4) ?? local?.issuedAt ?? "",
        image: certificate.image_url ?? local?.image ?? "",
        credentialUrl: certificate.credential_url ?? local?.credentialUrl,
        skills: certificate.skills?.length
          ? certificate.skills
          : (local?.skills ??
            (certificate.category ? [certificate.category] : [])),
        summary: certificate.description ?? local?.summary,
        featured: certificate.featured,
        displayOrder: certificate.display_order,
      };
    });
  } catch (error) {
    console.warn(
      "Failed to load certificates from Supabase; using local data.",
      error,
    );
    return getLocalCertificates();
  }
}
