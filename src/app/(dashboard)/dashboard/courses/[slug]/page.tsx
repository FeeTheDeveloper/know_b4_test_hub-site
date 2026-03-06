import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeading, LessonProgressBlock } from "@/components/ui";
import { getCourseBySlug, getCourseWithModules } from "@/lib/actions/courses";
import { getEnrollment, getUserLessonProgress } from "@/lib/actions/enrollment";
import { getQuizForCourse, getUserQuizAttempts } from "@/lib/actions/quiz";
import { requireProfile } from "@/lib/auth";
import { capitalize } from "@/lib/utils";
import { EnrollButton } from "@/components/ui/enroll-button";
import { LessonCompleteButton } from "@/components/ui/lesson-complete-button";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const profile = await requireProfile();
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const [courseWithModules, enrollment, quiz] = await Promise.all([
    getCourseWithModules(course.id),
    getEnrollment(profile.user_id, course.id),
    getQuizForCourse(course.id),
  ]);

  const modules = courseWithModules?.course_modules ?? [];

  // Gather all lesson IDs to get progress
  const allLessonIds = modules.flatMap((m) =>
    m.course_lessons.map((l) => l.id)
  );
  const lessonProgress = enrollment
    ? await getUserLessonProgress(profile.user_id, allLessonIds)
    : [];
  const completedLessonIds = new Set(
    lessonProgress.filter((lp) => lp.completed).map((lp) => lp.lesson_id)
  );

  // Quiz attempts
  const quizAttempts = enrollment
    ? await getUserQuizAttempts(profile.user_id, course.id)
    : [];
  const bestAttempt = quizAttempts.length > 0
    ? quizAttempts.reduce((best, a) => (a.score > best.score ? a : best))
    : null;

  return (
    <>
      <PageHeading
        title={course.title}
        description={course.short_description}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-2">About This Course</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Modules & lessons */}
          {modules.map((mod, moduleIndex) => (
            <div key={mod.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-1">
                Module {moduleIndex + 1}: {mod.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{mod.description}</p>
              <div className="space-y-2">
                {mod.course_lessons.map((lesson) => {
                  const completed = completedLessonIds.has(lesson.id);
                  return (
                    <div key={lesson.id} className="flex items-center gap-2">
                      <div className="flex-1">
                        <LessonProgressBlock
                          title={lesson.title}
                          moduleName={mod.title}
                          duration={`${lesson.duration_minutes} min`}
                          completed={completed}
                          current={!completed && !!enrollment}
                        />
                      </div>
                      {enrollment && !completed && (
                        <LessonCompleteButton lessonId={lesson.id} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quiz section */}
          {quiz && enrollment && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Final Assessment</h3>
              <p className="text-sm text-gray-500 mb-4">{quiz.description}</p>
              {bestAttempt ? (
                <div className="space-y-2">
                  <p className="text-sm">
                    Best score:{" "}
                    <span className={`font-semibold ${bestAttempt.passed ? "text-green-600" : "text-red-600"}`}>
                      {bestAttempt.score}%
                    </span>
                    {bestAttempt.passed && " ✓ Passed"}
                  </p>
                  {!bestAttempt.passed && (
                    <Link
                      href={`/dashboard/courses/${slug}/quiz`}
                      className="inline-block px-4 py-2 text-sm font-semibold rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors"
                    >
                      Retake Assessment
                    </Link>
                  )}
                </div>
              ) : (
                <Link
                  href={`/dashboard/courses/${slug}/quiz`}
                  className="inline-block px-4 py-2 text-sm font-semibold rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors"
                >
                  Start Assessment
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Course Details</h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Category</dt>
                <dd className="font-medium text-gray-900 text-right max-w-[60%]">{course.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Difficulty</dt>
                <dd className="font-medium text-gray-900">{capitalize(course.difficulty)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Duration</dt>
                <dd className="font-medium text-gray-900">{course.duration_hours} hours</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Passing Score</dt>
                <dd className="font-medium text-gray-900">{course.passing_score}%</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Modules</dt>
                <dd className="font-medium text-gray-900">{modules.length}</dd>
              </div>
            </dl>
          </div>

          {/* Target audience */}
          {course.target_audience && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Target Audience</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{course.target_audience}</p>
            </div>
          )}

          {/* Learning objectives */}
          {course.learning_objectives && course.learning_objectives.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Learning Objectives</h3>
              <ul className="space-y-1.5">
                {course.learning_objectives.map((obj, i) => (
                  <li key={i} className="flex gap-2 text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 text-brandGold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certificate eligibility */}
          {course.certificate_title && (
            <div className="bg-brandGold/10 rounded-xl border border-brandGold/30 p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-brandGold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                <h3 className="font-semibold text-brandGold text-sm">Certificate Eligible</h3>
              </div>
              <p className="text-xs text-gray-700 font-medium mb-1">{course.certificate_title}</p>
              <p className="text-[10px] text-gray-500">
                Valid for {course.certificate_validity_months} months after issuance
              </p>
            </div>
          )}

          {/* Progress / Enroll */}
          {enrollment ? (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-700">{enrollment.progress_percent}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-brandGold rounded-full transition-all"
                  style={{ width: `${enrollment.progress_percent}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 capitalize">
                Status: {enrollment.status}
              </p>
            </div>
          ) : (
            <EnrollButton courseId={course.id} />
          )}
        </div>
      </div>
    </>
  );
}
