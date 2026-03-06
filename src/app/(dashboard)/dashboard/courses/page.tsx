import { CourseCard, PageHeading } from "@/components/ui";
import { capitalize } from "@/lib/utils";
import { requireProfile } from "@/lib/auth";
import { getUserEnrollments } from "@/lib/actions/enrollment";
import { getPublishedCourses } from "@/lib/actions/courses";
import { EnrollButton } from "@/components/ui/enroll-button";

export default async function MyCoursesPage() {
  const profile = await requireProfile();
  const [enrollments, publishedCourses] = await Promise.all([
    getUserEnrollments(profile.user_id),
    getPublishedCourses(),
  ]);
  const enrolledCourseIds = new Set(enrollments.map((e) => e.course_id));
  const availableCourses = publishedCourses.filter(
    (c) => !enrolledCourseIds.has(c.id)
  );

  return (
    <>
      <PageHeading
        title="My Courses"
        description="Track your enrolled courses and discover new ones."
      />

      {/* Enrolled courses */}
      {enrollments.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">
            Enrolled ({enrollments.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrollments.map((enrollment) => (
              <CourseCard
                key={enrollment.id}
                course={enrollment.courses}
                href={`/dashboard/courses/${enrollment.courses.slug}`}
                progress={enrollment.progress_percent}
                status={enrollment.status as "active" | "completed" | "dropped"}
                actionLabel={
                  enrollment.status === "completed" ? "Review" : "Continue"
                }
              />
            ))}
          </div>
        </section>
      )}

      {/* Browse available */}
      {availableCourses.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">
            Available Courses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {availableCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:border-brandGold hover:shadow-md transition-all flex flex-col">
                <div className="h-36 bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-brandGold rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-brandBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-xs text-brandGoldLight font-medium">{course.category}</span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {capitalize(course.difficulty)}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {course.duration_hours}h
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-1">
                    {course.short_description}
                  </p>
                  {course.certificate_title && (
                    <p className="text-[10px] text-brandGold font-medium mb-2 flex items-center gap-1">
                      <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                      Certificate eligible
                    </p>
                  )}
                  {course.target_audience && (
                    <p className="text-[10px] text-gray-400 line-clamp-1 mb-3">
                      For: {course.target_audience}
                    </p>
                  )}
                  <div className="mt-auto">
                    <EnrollButton courseId={course.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {enrollments.length === 0 && availableCourses.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">No courses available yet.</p>
        </div>
      )}
    </>
  );
}
