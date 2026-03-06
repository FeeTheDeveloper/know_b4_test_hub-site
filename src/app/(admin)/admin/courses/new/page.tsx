"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse } from "@/lib/actions/courses";
import { PageHeading } from "@/components/ui";

const CATEGORIES = [
  "DOT Drug Testing",
  "Non-DOT Workplace Testing",
  "Collector Training",
  "Breath Alcohol Technician",
  "Chain of Custody Procedures",
  "Random Testing Program Management",
  "Reasonable Suspicion Awareness",
  "Mobile Collection Operations",
  "Employer Compliance Training",
  "TPA Program Administration",
];

export default function NewCoursePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setError(null);
    const result = await createCourse(formData);
    setSaving(false);
    if (result.success) {
      router.push("/admin/courses");
      router.refresh();
    } else {
      setError(result.error ?? "Failed to create course.");
    }
  }

  return (
    <>
      <PageHeading
        title="Create New Course"
        description="Fill in the details below to create a new compliance training course."
      />

      <form action={handleSubmit} className="max-w-2xl space-y-5">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Basic info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm">Basic Information</h2>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Course Title *
            </label>
            <input
              id="title"
              name="title"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              Slug (auto-generated if empty)
            </label>
            <input
              id="slug"
              name="slug"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
              placeholder="e.g. dot-compliance-training"
            />
          </div>

          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <input
              id="shortDescription"
              name="shortDescription"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
              placeholder="Brief one-line summary for course listings"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Full Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
              placeholder="Detailed course description including scope and coverage"
            />
          </div>
        </div>

        {/* Classification */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm">Classification & Requirements</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue="DOT Drug Testing"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                defaultValue="beginner"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700">
                Duration (hours)
              </label>
              <input
                id="durationHours"
                name="durationHours"
                type="number"
                min={1}
                defaultValue={1}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
              />
            </div>
            <div>
              <label htmlFor="passingScore" className="block text-sm font-medium text-gray-700">
                Passing Score (%)
              </label>
              <input
                id="passingScore"
                name="passingScore"
                type="number"
                min={0}
                max={100}
                defaultValue={70}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
              />
            </div>
          </div>

          <div>
            <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
              Target Audience
            </label>
            <textarea
              id="targetAudience"
              name="targetAudience"
              rows={2}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
              placeholder="e.g. Safety managers, DOT compliance officers, and HR professionals"
            />
          </div>

          <div>
            <label htmlFor="learningObjectives" className="block text-sm font-medium text-gray-700">
              Learning Objectives (one per line)
            </label>
            <textarea
              id="learningObjectives"
              name="learningObjectives"
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
              placeholder={"Explain the six categories of DOT testing\nIdentify employer recordkeeping obligations\nDescribe the role of the MRO"}
            />
          </div>
        </div>

        {/* Certificate settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm">Certificate Settings</h2>

          <div>
            <label htmlFor="certificateTitle" className="block text-sm font-medium text-gray-700">
              Certificate Title
            </label>
            <input
              id="certificateTitle"
              name="certificateTitle"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
              placeholder="e.g. DOT Drug Testing Compliance Certificate"
            />
            <p className="mt-1 text-xs text-gray-400">Leave blank if no certificate is awarded.</p>
          </div>

          <div>
            <label htmlFor="certificateValidityMonths" className="block text-sm font-medium text-gray-700">
              Certificate Validity (months)
            </label>
            <input
              id="certificateValidityMonths"
              name="certificateValidityMonths"
              type="number"
              min={1}
              defaultValue={24}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 text-sm font-semibold rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors disabled:opacity-50"
          >
            {saving ? "Creating…" : "Create Course"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
