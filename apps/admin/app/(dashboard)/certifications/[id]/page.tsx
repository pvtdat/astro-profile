import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CertificationForm } from "@/components/certifications/certification-form";
import { ArrowLeftIcon } from "@/components/icon";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .single();
  if (!data) notFound();
  return (
    <section>
      <div className="mb-8">
        <Link
          href="/certifications"
          className="group mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-moss transition-colors hover:text-ink"
        >
          <ArrowLeftIcon
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Back to certifications</span>
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Edit certification
        </h1>
      </div>
      <CertificationForm certification={data} />
    </section>
  );
}
