import { CertificationForm } from "@/components/certifications/certification-form";

export default function NewCertificationPage() {
  return (
    <section>
      <p className="display mb-3 text-xs uppercase tracking-[0.2em] text-moss">
        Content / New
      </p>
      <h1 className="mb-10 text-4xl font-extrabold tracking-tight">
        New certification
      </h1>
      <CertificationForm />
    </section>
  );
}
