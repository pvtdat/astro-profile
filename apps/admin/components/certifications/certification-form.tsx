"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import {
  certificationSchema,
  type CertificationFormValues,
} from "@/lib/validations/certification";
import type { Certification } from "@/types/database";

export function CertificationForm({
  certification,
}: {
  certification?: Certification;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: certification
      ? {
          ...certification,
          category: certification.category ?? "",
          issue_date: certification.issue_date ?? "",
          credential_id: certification.credential_id ?? "",
          credential_url: certification.credential_url ?? "",
          description: certification.description ?? "",
          image_url: certification.image_url ?? "",
          skills: certification.skills.join(", "),
        }
      : { display_order: 0, featured: false, published: true, skills: "" },
  });
  async function submit(values: CertificationFormValues) {
    setSaving(true);
    setMessage(null);
    try {
      const supabase = createClient();
      let imageUrl = values.image_url;
      const file = (document.querySelector<HTMLInputElement>("#image")?.files ??
        [])[0];

      if (file) {
        if (
          !/[.]((jpe?g)|(png)|(webp))$/i.test(file.name) ||
          file.size > 5 * 1024 * 1024
        ) {
          throw new Error(
            "Image must be JPG, PNG, or WEBP and no larger than 5 MB.",
          );
        }

        const path = `${certification?.id ?? crypto.randomUUID()}/${file.name}`;
        const upload = await supabase.storage
          .from("certifications")
          .upload(path, file, { upsert: true });
        if (upload.error) throw upload.error;

        imageUrl = supabase.storage.from("certifications").getPublicUrl(path)
          .data.publicUrl;
      }

      const payload = {
        ...values,
        image_url: imageUrl || null,
        category: values.category || null,
        issue_date: values.issue_date || null,
        credential_id: values.credential_id || null,
        credential_url: values.credential_url || null,
        description: values.description || null,
        skills: (values.skills ?? "")
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };
      const result = certification
        ? await supabase
            .from("certifications")
            .update(payload)
            .eq("id", certification.id)
        : await supabase.from("certifications").insert(payload);
      if (result.error) throw result.error;

      window.location.assign("/certifications");
    } catch (error) {
      console.error("Failed to save certification", error);
      setMessage(
        error instanceof Error && error.message.includes("Bucket not found")
          ? "Storage bucket 'certifications' is missing. Run supabase/migrations/002_certifications_storage.sql in Supabase SQL Editor."
          : error instanceof Error
            ? error.message
            : "Failed to save certification.",
      );
    } finally {
      setSaving(false);
    }
  }
  const field = (
    name: keyof CertificationFormValues,
    label: string,
    type = "text",
  ) => (
    <label className="block text-sm font-semibold">
      {label}
      <input
        type={type}
        {...register(
          name,
          type === "number" ? { valueAsNumber: true } : undefined,
        )}
        className="mt-2 w-full border border-[var(--line)] bg-white px-3 py-3 outline-none focus:border-moss"
      />
      {errors[name] && (
        <span className="mt-1 block text-xs font-normal text-red-700">
          {errors[name]?.message}
        </span>
      )}
    </label>
  );
  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-3xl space-y-6">
      {message && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          {message}
        </p>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {field("title", "Title")} {field("issuer", "Issuer")}{" "}
        {field("category", "Category")}{" "}
        {field("issue_date", "Issue date", "date")}{" "}
        {field("credential_id", "Credential ID")}{" "}
        {field("credential_url", "Credential URL", "url")}{" "}
        {field("display_order", "Display order", "number")}
      </div>
      <label className="block text-sm font-semibold">
        Skills
        <input
          {...register("skills")}
          placeholder="Machine Learning, Classification, Model Evaluation"
          className="mt-2 w-full border border-[var(--line)] bg-white px-3 py-3 outline-none focus:border-moss"
        />
        <span className="mt-1 block text-xs font-normal text-slate-500">
          Separate multiple skills with commas.
        </span>
      </label>
      <label className="block text-sm font-semibold">
        Description
        <textarea
          {...register("description")}
          rows={5}
          className="mt-2 w-full border border-[var(--line)] bg-white px-3 py-3 outline-none focus:border-moss"
        />
      </label>
      <label className="block text-sm font-semibold">
        Certificate image
        <input
          id="image"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={(event) =>
            setValue("image_url", event.target.files?.[0]?.name ?? "")
          }
          className="mt-2 block w-full border border-dashed border-[var(--line)] bg-white px-3 py-4 text-sm"
        />
      </label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" {...register("featured")} /> Featured
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" {...register("published")} /> Published
        </label>
      </div>
      <div className="flex gap-3">
        <Link
          href="/certifications"
          className="border border-[var(--line)] px-5 py-3 text-sm font-bold"
        >
          Cancel
        </Link>
        <button
          disabled={saving}
          className="bg-ink px-5 py-3 text-sm font-bold text-white hover:bg-moss disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save certification"}
        </button>
      </div>
    </form>
  );
}
