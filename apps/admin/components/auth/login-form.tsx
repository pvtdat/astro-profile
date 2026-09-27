"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    setError(null);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (signInError) {
      setError("Invalid email or password.");
      setPending(false);
      return;
    }
    window.location.assign("/dashboard");
  }

  return (
    <form
      action={submit}
      className="space-y-5 border border-[var(--line)] bg-white p-6 shadow-[8px_8px_0_#d8d5cb]"
    >
      <label className="block text-sm font-semibold">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-3 outline-none focus:border-moss"
        />
      </label>
      <label className="block text-sm font-semibold">
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-3 outline-none focus:border-moss"
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        disabled={pending}
        className="w-full bg-ink px-4 py-3 font-bold text-white transition hover:bg-moss disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
