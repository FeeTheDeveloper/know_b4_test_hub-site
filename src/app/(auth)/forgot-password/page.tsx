"use client";

import Link from "next/link";
import { useState } from "react";
import { resetPassword } from "@/lib/actions/auth";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await resetPassword(formData);
    setPending(false);
    if (result.success) {
      setSent(true);
    } else {
      setError(result.error ?? "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-brandBlue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 bg-brandGold rounded-lg flex items-center justify-center">
            <span className="text-brandBlue font-bold">KB</span>
          </div>
        </Link>
        <h2 className="text-center text-2xl font-bold text-white">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-white/60">
          Enter your email and we&apos;ll send a reset link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm rounded-xl border border-gray-200">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
              <p className="mt-2 text-sm text-gray-500">
                If an account exists with that email, you&apos;ll receive a password reset link.
              </p>
              <Link
                href="/login"
                className="inline-block mt-4 text-sm font-medium text-brandGold hover:text-brandGoldLight"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  {error}
                </div>
              )}
              <form action={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-brandGold"
                    placeholder="you@company.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-brandBlue bg-brandGold hover:bg-brandGoldLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandGold transition-colors disabled:opacity-50"
                >
                  {pending ? "Sending…" : "Send Reset Link"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link href="/login" className="font-medium text-brandGold hover:text-brandGoldLight">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
