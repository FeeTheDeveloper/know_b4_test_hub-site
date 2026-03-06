import { AdminTable, PageHeading } from "@/components/ui";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { RevokeCertButton } from "@/components/ui/revoke-cert-button";

interface CertRow {
  id: string;
  certificate_number: string;
  issued_at: string;
  expires_at: string | null;
  revoked: boolean;
  userName: string;
  courseName: string;
}

export default async function AdminCertificatesPage() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("certificates")
    .select("id, certificate_number, issued_at, expires_at, revoked, user_id, courses(title), profiles!certificates_user_id_fkey(first_name, last_name)")
    .order("issued_at", { ascending: false });

  const rows: CertRow[] = ((data ?? []) as unknown[]).map((row: unknown) => {
    const r = row as {
      id: string;
      certificate_number: string;
      issued_at: string;
      expires_at: string | null;
      revoked: boolean;
      courses: { title: string } | null;
      profiles: { first_name: string; last_name: string } | null;
    };
    return {
      id: r.id,
      certificate_number: r.certificate_number,
      issued_at: r.issued_at,
      expires_at: r.expires_at,
      revoked: r.revoked,
      userName: r.profiles
        ? `${r.profiles.first_name} ${r.profiles.last_name}`
        : "Unknown",
      courseName: r.courses?.title ?? "Unknown",
    };
  });

  return (
    <>
      <PageHeading
        title="Certificates"
        description="Manage issued certificates across all users."
      />

      <AdminTable<CertRow>
        keyExtractor={(c) => c.id}
        data={rows}
        columns={[
          {
            key: "number",
            header: "Certificate #",
            render: (cert) => (
              <span className="font-mono text-xs text-gray-900">
                {cert.certificate_number}
              </span>
            ),
          },
          {
            key: "user",
            header: "User",
            render: (cert) => (
              <span className="text-gray-700">{cert.userName}</span>
            ),
          },
          {
            key: "course",
            header: "Course",
            render: (cert) => (
              <span className="text-gray-700">{cert.courseName}</span>
            ),
          },
          {
            key: "issued",
            header: "Issued",
            render: (cert) => (
              <span className="text-gray-500">{formatDate(cert.issued_at)}</span>
            ),
          },
          {
            key: "expires",
            header: "Expires",
            render: (cert) => (
              <span className="text-gray-500">
                {cert.expires_at ? formatDate(cert.expires_at) : "Never"}
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (cert) => {
              const isExpired = cert.expires_at && new Date(cert.expires_at) < new Date();
              if (cert.revoked)
                return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">Revoked</span>;
              if (isExpired)
                return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Expired</span>;
              return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">Active</span>;
            },
          },
          {
            key: "actions",
            header: "",
            render: (cert) =>
              !cert.revoked ? (
                <RevokeCertButton certId={cert.id} />
              ) : null,
            className: "text-right",
          },
        ]}
      />
    </>
  );
}
