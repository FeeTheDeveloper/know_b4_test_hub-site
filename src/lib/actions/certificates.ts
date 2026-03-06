"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import type {
  ActionResult,
  Certificate,
  CertificateWithCourse,
  CertificateWithDetails,
} from "@/types";

/* ─── User certificate queries ─────────────────────────── */

export async function getUserCertificates(
  userId: string
): Promise<CertificateWithCourse[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("certificates")
    .select("*, courses(*)")
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });
  return (data ?? []) as CertificateWithCourse[];
}

export async function getCertificateById(
  certId: string
): Promise<CertificateWithCourse | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("certificates")
    .select("*, courses(*)")
    .eq("id", certId)
    .single();
  return (data as CertificateWithCourse) ?? null;
}

/* ─── Issue certificate (called after quiz pass) ───────── */

export async function issueCertificate(
  userId: string,
  courseId: string
): Promise<ActionResult<Certificate>> {
  const supabase = await createSupabaseServerClient();

  // Prevent duplicate certificates
  const { data: existing } = await supabase
    .from("certificates")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("revoked", false)
    .limit(1);

  if (existing && existing.length > 0) {
    return { success: false, error: "Certificate already issued for this course." };
  }

  // Generate unique certificate number
  const prefix = "KB4";
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  const certificateNumber = `${prefix}-${ts}-${rand}`;

  // Get course-specific validity period
  const { data: course } = await supabase
    .from("courses")
    .select("certificate_validity_months")
    .eq("id", courseId)
    .single();
  const validityMonths = course?.certificate_validity_months ?? 24;

  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + validityMonths);

  const { data, error } = await supabase
    .from("certificates")
    .insert({
      user_id: userId,
      course_id: courseId,
      certificate_number: certificateNumber,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data: data as Certificate };
}

/* ─── Admin queries ────────────────────────────────────── */

export async function getAllCertificates(): Promise<CertificateWithDetails[]> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("certificates")
    .select("*, courses(*), profiles!certificates_user_id_fkey(*)")
    .order("issued_at", { ascending: false });

  // Supabase returns the join under whatever key it resolves;
  // map it to match our type.
  return ((data ?? []) as unknown as CertificateWithDetails[]);
}

export async function revokeCertificate(
  certId: string,
  reason: string
): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("certificates")
    .update({
      revoked: true,
      revoked_at: new Date().toISOString(),
      revoked_reason: reason,
    })
    .eq("id", certId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
