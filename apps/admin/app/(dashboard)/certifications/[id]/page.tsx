import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CertificationForm } from "@/components/certifications/certification-form";

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
      <p className="display mb-3 text-xs uppercase tracking-[0.2em] text-moss">
        Content / Edit
      </p>
      <h1 className="mb-10 max-w-3xl text-4xl font-extrabold tracking-tight">
        Edit certification
      </h1>
      <CertificationForm certification={data} />
    </section>
  );
}
