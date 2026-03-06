import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeading } from "@/components/ui";
import { requireProfile } from "@/lib/auth";
import { getCertificateById } from "@/lib/actions/certificates";
import { formatDate } from "@/lib/utils";

interface CertificateDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CertificateDetailPage({
  params,
}: CertificateDetailPageProps) {
  const { id } = await params;
  const profile = await requireProfile();
  const certificate = await getCertificateById(id);

  if (!certificate || certificate.user_id !== profile.user_id) {
    notFound();
  }

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

  const issuedDate = new Date(certificate.issued_at).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <>
      <PageHeading
        title="Certificate Details"
        actions={
          <Link
            href="/dashboard/certificates"
            className="text-sm font-medium text-brandGold hover:text-brandGoldLight transition-colors"
          >
            &larr; Back to Certificates
          </Link>
        }
      />

      {/* Certificate preview card — mimics the PDF layout */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden max-w-4xl mx-auto">
        {/* Certificate visual preview */}
        <div className="relative p-8 sm:p-12">
          {/* Navy border frame */}
          <div className="absolute inset-4 sm:inset-6 border-2 border-brandBlue rounded pointer-events-none" />
          {/* Gold inner frame */}
          <div className="absolute inset-5 sm:inset-7 border border-brandGold rounded pointer-events-none" />

          {/* Gold corner brackets */}
          <div className="absolute top-5 left-5 sm:top-7 sm:left-7 w-5 h-5 border-t-2 border-l-2 border-brandGold pointer-events-none" />
          <div className="absolute top-5 right-5 sm:top-7 sm:right-7 w-5 h-5 border-t-2 border-r-2 border-brandGold pointer-events-none" />
          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 w-5 h-5 border-b-2 border-l-2 border-brandGold pointer-events-none" />
          <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 w-5 h-5 border-b-2 border-r-2 border-brandGold pointer-events-none" />

          <div className="relative text-center py-8 sm:py-12">
            {/* Logo badge */}
            <div className="w-12 h-12 mx-auto bg-brandGold rounded-lg flex items-center justify-center mb-3">
              <span className="text-brandBlue font-bold text-sm">KB</span>
            </div>
            <p className="text-sm font-bold text-brandBlue tracking-wider">
              KNOW B4 TESTING HUB
            </p>

            {/* Gold divider */}
            <div className="w-32 h-px bg-brandGold mx-auto my-4" />

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brandBlue mb-1">
              Certificate of Completion
            </h2>
            <div className="w-24 h-px bg-brandGoldLight mx-auto my-3" />

            {/* Body */}
            <p className="text-sm text-gray-500 mb-2">This certifies that</p>
            <p className="text-2xl sm:text-3xl font-serif font-bold italic text-gray-900 mb-1">
              {fullName}
            </p>
            <div className="w-40 h-px bg-brandGold mx-auto my-3" />
            <p className="text-sm text-gray-500 mb-4">
              has successfully completed the certification program:
            </p>
            <p className="text-lg sm:text-xl font-serif font-bold text-brandBlue mb-6">
              {certificate.courses.title}
            </p>

            {/* Footer details */}
            <div className="w-full h-px bg-brandGold/30 my-6" />
            <div className="grid grid-cols-3 gap-4 text-center max-w-lg mx-auto">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                  Completion Date
                </p>
                <p className="text-xs font-semibold text-gray-900">
                  {issuedDate}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                  Certificate ID
                </p>
                <p className="text-xs font-mono text-gray-900">
                  {certificate.certificate_number}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                  Authorized Signature
                </p>
                <div className="border-b border-brandBlue w-20 mx-auto mt-3" />
              </div>
            </div>

            {certificate.expires_at && (
              <p className="text-[10px] text-gray-400 mt-4">
                Valid through{" "}
                {new Date(certificate.expires_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}

            <p className="text-[9px] text-gray-400 mt-3">
              Know B4 Testing Hub &bull; Professional Workplace Compliance
              Certification
            </p>
          </div>
        </div>
      </div>

      {/* Certificate metadata + actions */}
      <div className="max-w-4xl mx-auto mt-6 grid sm:grid-cols-2 gap-4">
        {/* Details card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">
            Certificate Information
          </h3>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Status</dt>
              <dd>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColor}`}
                >
                  {statusLabel}
                </span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Certificate ID</dt>
              <dd className="font-mono text-gray-900 text-xs">
                {certificate.certificate_number}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Course</dt>
              <dd className="font-medium text-gray-900 text-right max-w-[60%]">
                {certificate.courses.title}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Issued</dt>
              <dd className="font-medium text-gray-900">
                {formatDate(certificate.issued_at)}
              </dd>
            </div>
            {certificate.expires_at && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Expires</dt>
                <dd className="font-medium text-gray-900">
                  {formatDate(certificate.expires_at)}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Actions card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Actions</h3>
          <div className="space-y-3">
            <a
              href={`/api/certificates/${certificate.id}/download`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-brandGold text-brandBlue font-semibold text-sm hover:bg-brandGoldLight transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF Certificate
            </a>
            <Link
              href={`/dashboard/courses/${certificate.courses.slug}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-brandGold text-brandGold font-medium text-sm hover:bg-brandGold/10 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              View Course
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
