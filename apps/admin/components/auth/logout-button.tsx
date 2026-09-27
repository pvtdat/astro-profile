"use client";

import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  async function logout() {
    await createClient().auth.signOut();
    window.location.assign("/login");
  }
  return (
    <button
      onClick={logout}
      className="text-white/60 underline-offset-4 hover:text-citrus hover:underline"
    >
      Log out
    </button>
  );
}
