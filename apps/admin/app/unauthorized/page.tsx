import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md border border-[var(--line)] bg-white p-8 shadow-[8px_8px_0_#d8d5cb]">
        <p className="display mb-4 text-xs uppercase tracking-[0.2em] text-moss">
          Access denied
        </p>
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight">
          Admin access required
        </h1>
        <p className="mb-8 text-sm leading-6 text-slate-600">
          Your account is authenticated, but it has not been assigned an admin
          or editor role yet.
        </p>
        <div className="flex items-center gap-4 text-sm font-bold">
          <Link href="/login" className="border border-[var(--line)] px-4 py-3">
            Use another account
          </Link>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
