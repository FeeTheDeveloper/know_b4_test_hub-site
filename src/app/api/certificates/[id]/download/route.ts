import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateCertificatePDF } from "@/lib/certificate-pdf";
import type { CertificateWithCourse, Profile } from "@/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  // Verify authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch certificate with course data
  const { data: certificate } = await supabase
    .from("certificates")
    .select("*, courses(*)")
    .eq("id", id)
    .single();

  if (!certificate) {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  }

  const cert = certificate as CertificateWithCourse;

  // Ensure the user owns this certificate (or is admin)
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const prof = profile as Profile;

  if (cert.user_id !== user.id && prof.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // For admin downloading someone else's cert, fetch the cert owner's profile
  let ownerProfile = prof;
  if (cert.user_id !== user.id) {
    const { data: owner } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", cert.user_id)
      .single();
    if (owner) {
      ownerProfile = owner as Profile;
    }
  }

  // Generate PDF
  const pdfBuffer = generateCertificatePDF(cert, ownerProfile);

  const filename = `certificate-${cert.certificate_number}.pdf`;

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-cache",
    },
  });
}
