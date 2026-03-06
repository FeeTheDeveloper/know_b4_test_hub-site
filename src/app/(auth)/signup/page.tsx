import Link from "next/link";
import { signUp } from "@/lib/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";
import type { ActionResult } from "@/types";

async function signUpAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  "use server";
  return signUp(formData);
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-brandBlue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 bg-brandGold rounded-lg flex items-center justify-center">
            <span className="text-brandBlue font-bold">KB</span>
          </div>
        </Link>
        <h2 className="text-center text-2xl font-bold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-white/60">
          Start your certification journey today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm rounded-xl border border-gray-200">
          <AuthForm action={signUpAction} submitLabel="Create Account">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-brandGold"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-brandGold"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Work email address
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

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-brandGold"
                placeholder="ACME Corp"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-brandGold"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-400">Minimum 8 characters</p>
            </div>
          </AuthForm>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-brandGold hover:text-brandGoldLight">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
