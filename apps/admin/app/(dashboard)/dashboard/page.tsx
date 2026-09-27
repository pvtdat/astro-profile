import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: certifications, error } = await supabase
    .from("certifications")
    .select("published, featured");
  const total = certifications?.length ?? 0;
  const published =
    certifications?.filter((item) => item.published).length ?? 0;
  const featured = certifications?.filter((item) => item.featured).length ?? 0;
  const metrics = [
    ["Total certifications", total],
    ["Published", published],
    ["Drafts", total - published],
    ["Featured", featured],
  ];

  return (
    <section>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="display mb-3 text-xs uppercase tracking-[0.2em] text-moss">
            Overview
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
        </div>
        <Link
          href="/certifications/new"
          className="bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-moss"
        >
          + Add certification
        </Link>
      </div>
      {error ? (
        <p className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Failed to load certifications.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(([label, value]) => (
            <div
              key={label}
              className="border border-[var(--line)] bg-white p-6"
            >
              <p className="display text-4xl text-moss">{value}</p>
              <p className="mt-4 text-sm font-semibold text-slate-600">
                {label}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
