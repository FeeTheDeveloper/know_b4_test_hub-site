import type { Profile } from "@/types";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Get the current authenticated user's profile, or null if not logged in */
export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    return data as Profile | null;
  } catch {
    return null;
  }
}

/** Require an authenticated profile — throws redirect if unauthenticated */
export async function requireProfile(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/login");
  }
  return profile;
}

/** Require admin role — redirects to dashboard if not admin */
export async function requireAdmin(): Promise<Profile> {
  const profile = await requireProfile();
  if (profile.role !== "admin") {
    redirect("/dashboard");
  }
  return profile;
}
