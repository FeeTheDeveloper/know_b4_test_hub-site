import { notFound, redirect } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { getCourseBySlug } from "@/lib/actions/courses";
import { getQuizForCourse } from "@/lib/actions/quiz";
import { getEnrollment } from "@/lib/actions/enrollment";
import { QuizClient } from "@/components/ui/quiz-client";

interface QuizPageProps {
  params: Promise<{ slug: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const profile = await requireProfile();
  const course = await getCourseBySlug(slug);

  if (!course) notFound();

  const enrollment = await getEnrollment(profile.user_id, course.id);
  if (!enrollment) redirect(`/dashboard/courses/${slug}`);

  const quiz = await getQuizForCourse(course.id);
  if (!quiz) notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">{quiz.title}</h1>
        <p className="text-sm text-white/60 mt-1">{quiz.description}</p>
        <p className="text-sm text-white/60 mt-1">
          Passing score: {course.passing_score}% &middot;{" "}
          {quiz.quiz_questions.length} questions
          {quiz.time_limit_minutes && ` · ${quiz.time_limit_minutes} min time limit`}
        </p>
      </div>

      <QuizClient
        quiz={quiz}
        courseId={course.id}
        courseSlug={slug}
        passingScore={course.passing_score}
      />
    </div>
  );
}
