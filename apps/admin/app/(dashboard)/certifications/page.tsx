import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CertificationTable } from "@/components/certifications/certification-table";

export default async function CertificationsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("display_order", { ascending: true });
  return (
    <section>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="display mb-3 text-xs uppercase tracking-[0.2em] text-moss">
            Content / Credentials
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Certifications
          </h1>
        </div>
        <Link
          href="/certifications/new"
          className="bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-moss"
        >
          + Add certification
        </Link>
      </div>
      {error ? (
        <div className="border border-red-200 bg-red-50 p-5 text-sm text-red-800">
          Failed to load certifications. Try again later.
        </div>
      ) : (
        <CertificationTable certifications={data ?? []} />
      )}
    </section>
  );
}
