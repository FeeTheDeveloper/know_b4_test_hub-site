import { redirect } from "next/navigation";

export default function CertificatesRedirect() {
  redirect("/dashboard/certificates");
}
