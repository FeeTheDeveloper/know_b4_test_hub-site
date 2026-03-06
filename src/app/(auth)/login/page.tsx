import Link from "next/link";
import { signIn } from "@/lib/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";
import type { ActionResult } from "@/types";

async function loginAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  "use server";
  return signIn(formData);
}

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error: callbackError } = await searchParams;

  return (
    <div className="min-h-screen bg-brandBlue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 bg-brandGold rounded-lg flex items-center justify-center">
            <span className="text-brandBlue font-bold">KB</span>
          </div>
        </Link>
        <h2 className="text-center text-2xl font-bold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-white/60">
          Access your certification dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm rounded-xl border border-gray-200">
          {callbackError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {callbackError}
            </div>
          )}
          <AuthForm action={loginAction} submitLabel="Sign in">
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-brandGold"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-brandGold hover:text-brandGoldLight"
              >
                Forgot password?
              </Link>
            </div>
          </AuthForm>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-brandGold hover:text-brandGoldLight">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
