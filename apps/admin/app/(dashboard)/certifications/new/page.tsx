import Link from "next/link";
import { CertificationForm } from "@/components/certifications/certification-form";
import { ArrowLeftIcon } from "@/components/icon";

export default function NewCertificationPage() {
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
          New certification
        </h1>
      </div>
      <CertificationForm />
    </section>
  );
}
