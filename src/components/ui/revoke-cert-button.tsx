"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { revokeCertificate } from "@/lib/actions/certificates";

export function RevokeCertButton({ certId }: { certId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleRevoke() {
    if (!confirm("Are you sure you want to revoke this certificate?")) return;

    startTransition(async () => {
      await revokeCertificate(certId, "Revoked by admin");
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleRevoke}
      disabled={pending}
      className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
    >
      {pending ? "…" : "Revoke"}
    </button>
  );
}
