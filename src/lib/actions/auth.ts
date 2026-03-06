"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types";

export async function signUp(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const company = (formData.get("company") as string) || null;

  if (!email || !password || !firstName || !lastName) {
    return { success: false, error: "All required fields must be filled." };
  }
  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." };
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // If the user already exists, Supabase returns a user with no identities
  if (data.user?.identities?.length === 0) {
    return { success: false, error: "An account with this email already exists. Please sign in instead." };
  }

  // Update the auto-created profile with name and company
  if (data.user) {
    await supabase
      .from("profiles")
      .update({ first_name: firstName, last_name: lastName, company })
      .eq("user_id", data.user.id);
  }

  // If no session, email confirmation is required
  if (!data.session) {
    return { success: true, message: "Check your email for a confirmation link to complete your registration." };
  }

  redirect("/dashboard");
}

export async function signIn(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      return { success: false, error: "Please confirm your email address before signing in. Check your inbox for a confirmation link." };
    }
    return { success: false, error: "Invalid email or password." };
  }

  redirect("/dashboard");
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function resetPassword(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, error: "Email is required." };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/callback?next=/dashboard/profile`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateProfile(formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  const updates = {
    first_name: formData.get("firstName") as string,
    last_name: formData.get("lastName") as string,
    company: (formData.get("company") as string) || null,
    job_title: (formData.get("jobTitle") as string) || null,
    phone: (formData.get("phone") as string) || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
