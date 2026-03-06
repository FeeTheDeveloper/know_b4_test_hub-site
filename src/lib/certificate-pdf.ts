import { jsPDF } from "jspdf";
import type { CertificateWithCourse, Profile } from "@/types";

/* ─── Brand colors (RGB) ──────────────────────────────── */
const NAVY = [11, 42, 74] as const;       // #0B2A4A
const GOLD = [212, 175, 55] as const;     // #D4AF37
const GOLD_L = [232, 199, 106] as const;  // #E8C76A
const WHITE = [255, 255, 255] as const;
const GRAY = [107, 114, 128] as const;
const DARK = [17, 24, 39] as const;

/**
 * Generate a branded corporate certificate PDF (server-safe — no "use client").
 * Returns a Buffer suitable for streaming from an API route.
 */
export function generateCertificatePDF(
  certificate: CertificateWithCourse,
  profile: Profile
): Buffer {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();  // 297
  const h = doc.internal.pageSize.getHeight(); // 210

  /* ── White background ────────────────────────────────── */
  doc.setFillColor(...WHITE);
  doc.rect(0, 0, w, h, "F");

  /* ── Navy border frame ───────────────────────────────── */
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(2);
  doc.rect(8, 8, w - 16, h - 16);

  /* ── Gold inner accent frame ─────────────────────────── */
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.75);
  doc.rect(12, 12, w - 24, h - 24);

  /* ── Gold corner ornaments (small L-brackets) ────────── */
  const cornerLen = 14;
  const inset = 14;
  doc.setLineWidth(1.5);
  doc.setDrawColor(...GOLD);
  // top-left
  doc.line(inset, inset, inset + cornerLen, inset);
  doc.line(inset, inset, inset, inset + cornerLen);
  // top-right
  doc.line(w - inset, inset, w - inset - cornerLen, inset);
  doc.line(w - inset, inset, w - inset, inset + cornerLen);
  // bottom-left
  doc.line(inset, h - inset, inset + cornerLen, h - inset);
  doc.line(inset, h - inset, inset, h - inset - cornerLen);
  // bottom-right
  doc.line(w - inset, h - inset, w - inset - cornerLen, h - inset);
  doc.line(w - inset, h - inset, w - inset, h - inset - cornerLen);

  /* ── Company logo / name ─────────────────────────────── */
  // Gold badge square
  const badgeSize = 12;
  const badgeX = w / 2 - badgeSize / 2;
  const badgeY = 24;
  doc.setFillColor(...GOLD);
  doc.roundedRect(badgeX, badgeY, badgeSize, badgeSize, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text("KB", w / 2, badgeY + badgeSize / 2 + 1.2, { align: "center" });

  // Company name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text("KNOW B4 TESTING HUB", w / 2, badgeY + badgeSize + 7, {
    align: "center",
  });

  /* ── Gold decorative line ────────────────────────────── */
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(w / 2 - 55, 50, w / 2 + 55, 50);

  /* ── Title ───────────────────────────────────────────── */
  doc.setFont("times", "bold");
  doc.setFontSize(30);
  doc.setTextColor(...NAVY);
  doc.text("Certificate of Completion", w / 2, 62, { align: "center" });

  /* ── Gold accent line under title ────────────────────── */
  doc.setDrawColor(...GOLD_L);
  doc.setLineWidth(0.4);
  doc.line(w / 2 - 45, 66, w / 2 + 45, 66);

  /* ── Body text ───────────────────────────────────────── */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...GRAY);
  doc.text("This certifies that", w / 2, 78, { align: "center" });

  /* ── Recipient name ──────────────────────────────────── */
  const fullName = `${profile.first_name} ${profile.last_name}`;
  doc.setFont("times", "bolditalic");
  doc.setFontSize(26);
  doc.setTextColor(...DARK);
  doc.text(fullName, w / 2, 92, { align: "center" });

  /* ── Gold underline under name ───────────────────────── */
  const nameWidth = doc.getTextWidth(fullName);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(w / 2 - nameWidth / 2 - 5, 95, w / 2 + nameWidth / 2 + 5, 95);

  /* ── Completion text ─────────────────────────────────── */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...GRAY);
  doc.text(
    "has successfully completed the certification program:",
    w / 2,
    106,
    { align: "center" }
  );

  /* ── Course title ────────────────────────────────────── */
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...NAVY);
  // Wrap long course titles
  const maxLineWidth = w - 80;
  const courseLines = doc.splitTextToSize(
    certificate.courses.title,
    maxLineWidth
  );
  doc.text(courseLines, w / 2, 118, { align: "center" });

  /* ── Footer section ──────────────────────────────────── */
  const footerY = h - 50;

  // Gold divider line
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(35, footerY - 4, w - 35, footerY - 4);

  // Formatted dates
  const issuedDate = new Date(certificate.issued_at).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // Three-column footer: Date | Certificate ID | Signature
  const colL = 75;
  const colC = w / 2;
  const colR = w - 75;

  // Completion Date (left)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text("Completion Date", colL, footerY + 2, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text(issuedDate, colL, footerY + 8, { align: "center" });

  // Certificate ID (center)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text("Certificate ID", colC, footerY + 2, { align: "center" });
  doc.setFont("courier", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  doc.text(certificate.certificate_number, colC, footerY + 8, {
    align: "center",
  });

  // Authorized Signature (right)
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.3);
  doc.line(colR - 30, footerY + 5, colR + 30, footerY + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text("Authorized Signature", colR, footerY + 11, { align: "center" });

  // Validity line
  if (certificate.expires_at) {
    const expiresDate = new Date(certificate.expires_at).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    doc.text(`Valid through ${expiresDate}`, colC, footerY + 16, {
      align: "center",
    });
  }

  /* ── Company footer bar ──────────────────────────────── */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.text(
    "Know B4 Testing Hub  •  Professional Workplace Compliance Certification",
    w / 2,
    h - 17,
    { align: "center" }
  );

  // Return as Buffer for server-side streaming
  return Buffer.from(doc.output("arraybuffer"));
}
