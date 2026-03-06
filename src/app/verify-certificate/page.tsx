"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type VerifyState = "idle" | "loading" | "valid" | "invalid";

export default function VerifyCertificatePage() {
  const [certId, setCertId] = useState("");
  const [state, setState] = useState<VerifyState>("idle");

  function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!certId.trim()) return;

    setState("loading");
    // Placeholder — will be replaced with real Supabase lookup
    setTimeout(() => {
      setState("invalid");
    }, 1200);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="bg-brandBlue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Know B4 Testing Hub"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="font-semibold text-white">Know B4 Hub</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Log In
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 bg-gradient-to-b from-brandBlue to-primary-900 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 rounded-full bg-brandGold/10 flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-brandGold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Verify a Certificate
            </h1>
            <p className="mt-2 text-white/60 text-sm">
              Enter a certificate ID to confirm its authenticity and current
              status.
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label
                htmlFor="cert-id"
                className="block text-sm font-medium text-white/70 mb-1"
              >
                Certificate ID
              </label>
              <input
                id="cert-id"
                type="text"
                value={certId}
                onChange={(e) => {
                  setCertId(e.target.value);
                  if (state !== "idle") setState("idle");
                }}
                placeholder="e.g. KB-2025-001234"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={!certId.trim() || state === "loading"}
              className="w-full py-3 rounded-lg bg-brandGold text-brandBlue font-semibold hover:bg-brandGoldLight transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state === "loading" ? "Verifying…" : "Verify Certificate"}
            </button>
          </form>

          {/* Result states */}
          {state === "valid" && (
            <div className="mt-6 rounded-xl bg-green-900/30 border border-green-500/30 p-5 text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-green-300 font-semibold">
                Certificate Verified
              </p>
              <p className="text-green-400/70 text-sm mt-1">
                This certificate is valid and in good standing.
              </p>
            </div>
          )}

          {state === "invalid" && (
            <div className="mt-6 rounded-xl bg-red-900/30 border border-red-500/30 p-5 text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-red-300 font-semibold">
                Certificate Not Found
              </p>
              <p className="text-red-400/70 text-sm mt-1">
                No matching record was found. Please check the ID and try again.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-white/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Know B4 Testing Hub. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
