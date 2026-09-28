import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/auth/logout-button";
import { NavLinks } from "@/components/nav-links";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || !["admin", "editor"].includes(profile.role)) {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-[var(--line)] bg-ink p-6 text-white lg:border-b-0 lg:border-r">
        <Link
          href="/dashboard"
          className="display text-sm uppercase tracking-[0.16em] text-citrus"
        >
          DP / Admin
        </Link>
        <NavLinks />
        <div className="mt-16 border-t border-white/15 pt-5 text-xs text-white/60">
          <p className="mb-3 truncate">{user.email}</p>
          <LogoutButton />
        </div>
      </aside>
      <main className="min-w-0 px-6 py-8 lg:px-12 lg:py-12">{children}</main>
    </div>
  );
}
