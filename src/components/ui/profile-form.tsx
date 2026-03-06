"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/auth";
import type { Profile } from "@/types";

export function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setError(null);
    const result = await updateProfile(formData);
    setSaving(false);
    if (result.success) {
      setEditing(false);
      router.refresh();
    } else {
      setError(result.error ?? "Failed to update profile.");
    }
  }

  if (!editing) {
    return (
      <>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <dt className="text-gray-500">First Name</dt>
            <dd className="mt-0.5 font-medium text-gray-900">
              {profile.first_name || "Not provided"}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Last Name</dt>
            <dd className="mt-0.5 font-medium text-gray-900">
              {profile.last_name || "Not provided"}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Company</dt>
            <dd className="mt-0.5 font-medium text-gray-900">
              {profile.company ?? "Not provided"}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Job Title</dt>
            <dd className="mt-0.5 font-medium text-gray-900">
              {profile.job_title ?? "Not provided"}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Phone</dt>
            <dd className="mt-0.5 font-medium text-gray-900">
              {profile.phone ?? "Not provided"}
            </dd>
          </div>
        </dl>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            defaultValue={profile.first_name}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            defaultValue={profile.last_name}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            id="company"
            name="company"
            defaultValue={profile.company ?? ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
          />
        </div>
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            defaultValue={profile.job_title ?? ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={profile.phone ?? ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
