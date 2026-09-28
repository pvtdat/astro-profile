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
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    certification?.image_url || null,
  );
  const [isNewUpload, setIsNewUpload] = useState(false);

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
          issue_date: certification.issue_date
            ? certification.issue_date.split("T")[0]
            : "",
          credential_id: certification.credential_id ?? "",
          credential_url: certification.credential_url ?? "",
          description: certification.description ?? "",
          image_url: certification.image_url ?? "",
          skills: certification.skills.join(", "),
        }
      : { display_order: 0, featured: false, published: true, skills: "" },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image_url", file.name, { shouldValidate: true });
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setIsNewUpload(true);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setIsNewUpload(false);
    setValue("image_url", "");
    const fileInput = document.querySelector<HTMLInputElement>("#image");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  async function submit(values: CertificationFormValues) {
    setSaving(true);
    setMessage(null);
    try {
      const supabase = createClient();
      let imageUrl = previewUrl
        ? certification?.image_url || values.image_url
        : null;
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
    placeholder?: string,
    helperText?: string,
  ) => (
    <label className="block text-sm font-semibold">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        {...register(
          name,
          type === "number" ? { valueAsNumber: true } : undefined,
        )}
        className="mt-2 w-full border border-[var(--line)] bg-white px-3 py-3 font-normal outline-none placeholder:font-light placeholder:text-slate-400 focus:border-moss"
      />
      {helperText && (
        <span className="mt-1 block text-xs font-normal text-slate-500">
          {helperText}
        </span>
      )}
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
        {field(
          "title",
          "Title",
          "text",
          "Machine Learning: Introduction with Regression",
        )}
        {field("issuer", "Issuer", "text", "Codecademy")}
        {field("category", "Category", "text", "Machine Learning")}
        {field("issue_date", "Issue date", "date")}
        {field("credential_id", "Credential ID", "text", "CC-ML-REG-2026")}
        {field(
          "credential_url",
          "Credential URL",
          "url",
          "https://www.codecademy.com/certificates/...",
        )}
        {field("display_order", "Display order", "number", "0")}
      </div>
      <label className="block text-sm font-semibold">
        Skills
        <input
          {...register("skills")}
          placeholder="Machine Learning, Linear Regression, Model Evaluation"
          className="mt-2 w-full border border-[var(--line)] bg-white px-3 py-3 font-normal outline-none placeholder:font-light placeholder:text-slate-400 focus:border-moss"
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
          placeholder="Hoàn thành khóa học Machine Learning với trọng tâm Linear Regression, xây dựng và đánh giá độ chính xác của mô hình..."
          className="mt-2 w-full border border-[var(--line)] bg-white px-3 py-3 font-normal outline-none placeholder:font-light placeholder:text-slate-400 focus:border-moss"
        />
      </label>

      <div className="space-y-3">
        <label className="block text-sm font-semibold">
          Certificate image
          <input
            id="image"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImageChange}
            className="mt-2 block w-full border border-dashed border-[var(--line)] bg-white px-3 py-4 text-sm cursor-pointer"
          />
        </label>
        <span className="block text-xs text-slate-500">
          Accepts JPG, PNG, WEBP up to 5 MB.
        </span>

        {previewUrl && (
          <div className="mt-3 rounded border border-[var(--line)] bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-moss">
                  Image Review / Preview
                </span>
                {isNewUpload ? (
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                    New file chosen
                  </span>
                ) : (
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                    Current image
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-moss hover:underline"
                >
                  Open in new tab ↗
                </a>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs font-semibold text-red-600 hover:text-red-800 hover:underline"
                >
                  Remove image
                </button>
              </div>
            </div>
            <div className="flex max-h-80 w-full items-center justify-center overflow-hidden rounded border border-[var(--line)] bg-[var(--paper)] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Certificate preview"
                className="max-h-72 max-w-full rounded object-contain shadow-sm"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
          <input type="checkbox" {...register("featured")} /> Featured
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
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
