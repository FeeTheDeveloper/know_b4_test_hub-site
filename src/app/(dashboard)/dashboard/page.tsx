import Link from "next/link";
import { DashboardCard, CourseCard, PageHeading } from "@/components/ui";
import { requireProfile } from "@/lib/auth";
import { getUserEnrollments } from "@/lib/actions/enrollment";
import { getUserCertificates } from "@/lib/actions/certificates";

export default async function DashboardPage() {
  const profile = await requireProfile();
  const enrollments = await getUserEnrollments(profile.user_id);
  const certificates = await getUserCertificates(profile.user_id);
  const activeEnrollments = enrollments.filter((e) => e.status === "active");

  return (
    <>
      <PageHeading
        title={`Welcome back, ${profile.first_name}`}
        description="Here's an overview of your learning progress."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Active Courses"
          value={activeEnrollments.length}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />
        <DashboardCard
          title="Completed"
          value={enrollments.filter((e) => e.status === "completed").length}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
        <DashboardCard
          title="Certificates"
          value={certificates.length}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
        />
        <DashboardCard
          title="Avg. Progress"
          value={
            activeEnrollments.length > 0
              ? `${Math.round(activeEnrollments.reduce((acc, e) => acc + e.progress_percent, 0) / activeEnrollments.length)}%`
              : "N/A"
          }
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>

      {/* Active courses */}
      {activeEnrollments.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Continue Learning</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeEnrollments.map((enrollment) => (
              <CourseCard
                key={enrollment.id}
                course={enrollment.courses}
                href={`/dashboard/courses/${enrollment.courses.slug}`}
                progress={enrollment.progress_percent}
                status={enrollment.status as "active" | "completed" | "dropped"}
                actionLabel="Continue"
              />
            ))}
          </div>
        </section>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">No active courses yet.</p>
          <Link href="/dashboard/courses" className="inline-block mt-2 text-sm font-medium text-brandGold hover:text-brandGoldLight">
            Browse available courses &rarr;
          </Link>
        </div>
      )}

      {/* Upcoming training */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">Upcoming Training</h2>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {activeEnrollments.length > 0 ? (
            activeEnrollments.slice(0, 3).map((enrollment) => (
              <div
                key={enrollment.id}
                className="flex items-center justify-between px-5 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {enrollment.courses.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {enrollment.progress_percent}% complete &middot;{" "}
                    {enrollment.courses.duration_hours}h total
                  </p>
                </div>
                <Link
                  href={`/dashboard/courses/${enrollment.courses.slug}`}
                  className="text-xs font-semibold text-brandGold hover:text-brandGoldLight transition-colors"
                >
                  Resume &rarr;
                </Link>
              </div>
            ))
          ) : (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-gray-500">No upcoming training scheduled.</p>
              <Link
                href="/dashboard/courses"
                className="inline-block mt-2 text-sm font-medium text-brandGold hover:text-brandGoldLight"
              >
                Browse courses &rarr;
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
