import Link from "next/link";
import type { CertificateWithCourse } from "@/types";
import { formatDate } from "@/lib/utils";

interface CertificateCardProps {
  certificate: CertificateWithCourse;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const isExpired =
    certificate.expires_at && new Date(certificate.expires_at) < new Date();
  const isRevoked = certificate.revoked;

  let statusColor = "bg-success text-white";
  let statusLabel = "Active";
  if (isRevoked) {
    statusColor = "bg-danger text-white";
    statusLabel = "Revoked";
  } else if (isExpired) {
    statusColor = "bg-warning text-white";
    statusLabel = "Expired";
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 bg-brandGold/10 rounded-lg">
          <svg className="w-6 h-6 text-brandGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 text-sm mb-1">
        {certificate.courses.title}
      </h3>
      <p className="text-xs text-gray-500 mb-3 font-mono">
        {certificate.certificate_number}
      </p>

      <div className="space-y-1 text-xs text-gray-500 mb-4">
        <p>Issued: {formatDate(certificate.issued_at)}</p>
        {certificate.expires_at && (
          <p>Expires: {formatDate(certificate.expires_at)}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Link
          href={`/dashboard/certificates/${certificate.id}`}
          className="flex-1 text-center text-sm font-medium py-2 rounded-lg border border-brandGold text-brandGold hover:bg-brandGold/10 transition-colors"
        >
          View
        </Link>
        <a
          href={`/api/certificates/${certificate.id}/download`}
          className="flex items-center justify-center gap-1 flex-1 text-center text-sm font-semibold py-2 rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          PDF
        </a>
      </div>
    </div>
  );
}
