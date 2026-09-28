"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatDateDDMMYYYY } from "@/lib/utils";
import type { Certification } from "@/types/database";

export function CertificationTable({
  certifications: initial,
}: {
  certifications: Certification[];
}) {
  const [certifications, setCertifications] = useState(initial);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const rows = useMemo(
    () =>
      certifications
        .filter((item) =>
          `${item.title} ${item.issuer}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .filter(
          (item) =>
            filter === "all" ||
            (filter === "published" ? item.published : item.featured),
        ),
    [certifications, filter, query],
  );
  async function remove(item: Certification) {
    if (
      !window.confirm(`Delete “${item.title}”? This action cannot be undone.`)
    )
      return;
    const { error } = await createClient()
      .from("certifications")
      .delete()
      .eq("id", item.id);
    if (!error)
      setCertifications((items) =>
        items.filter((current) => current.id !== item.id),
      );
  }
  return (
    <div className="border border-[var(--line)] bg-white">
      <div className="flex flex-wrap gap-3 border-b border-[var(--line)] p-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title or issuer"
          className="min-w-[220px] flex-1 border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm font-normal outline-none placeholder:font-light placeholder:text-slate-400 focus:border-moss"
        />
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="featured">Featured</option>
        </select>
      </div>
      {rows.length === 0 ? (
        <div className="p-12 text-center">
          <p className="font-bold">No certifications yet.</p>
          <p className="mt-2 text-sm text-slate-600">
            Create your first certification.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-[var(--paper)] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Issuer</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id} className="border-t border-[var(--line)]">
                  <td className="px-5 py-4 font-semibold">
                    <Link
                      href={`/certifications/${item.id}`}
                      className="mr-4 font-semibold text-moss hover:underline"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{item.issuer}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {formatDateDDMMYYYY(item.issue_date)}
                  </td>
                  <td className="px-5 py-4">
                    {item.published ? (
                      <span className="text-moss">Published</span>
                    ) : (
                      <span className="text-slate-500">Draft</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/certifications/${item.id}`}
                      className="mr-4 font-semibold text-moss hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => remove(item)}
                      className="text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
