"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  ActionResult,
  QuizWithQuestions,
  QuizAttempt,
} from "@/types";

/* ─── Quiz queries ─────────────────────────────────────── */

export async function getQuizForCourse(
  courseId: string
): Promise<QuizWithQuestions | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("quizzes")
    .select("*, quiz_questions(*)")
    .eq("course_id", courseId)
    .limit(1)
    .single();

  if (!data) return null;

  const quiz = data as QuizWithQuestions;
  quiz.quiz_questions.sort((a, b) => a.order_index - b.order_index);
  return quiz;
}

export async function getUserQuizAttempts(
  userId: string,
  courseId: string
): Promise<QuizAttempt[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("quiz_attempts")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .order("started_at", { ascending: false });
  return (data ?? []) as QuizAttempt[];
}

/* ─── Quiz submission ──────────────────────────────────── */

export async function submitQuiz(
  quizId: string,
  courseId: string,
  answers: Record<string, number>
): Promise<ActionResult<QuizAttempt>> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated." };

  // Fetch questions to grade
  const { data: questions } = await supabase
    .from("quiz_questions")
    .select("id, correct_option_index")
    .eq("quiz_id", quizId);

  if (!questions || questions.length === 0) {
    return { success: false, error: "Quiz has no questions." };
  }

  // Grade
  let correct = 0;
  for (const q of questions) {
    if (answers[q.id] === q.correct_option_index) {
      correct++;
    }
  }

  const score = Math.round((correct / questions.length) * 100);

  // Get passing score from course
  const { data: course } = await supabase
    .from("courses")
    .select("passing_score")
    .eq("id", courseId)
    .single();

  const passingScore = course?.passing_score ?? 70;
  const passed = score >= passingScore;

  const { data: attempt, error } = await supabase
    .from("quiz_attempts")
    .insert({
      user_id: user.id,
      quiz_id: quizId,
      course_id: courseId,
      score,
      passed,
      answers,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  // If passed, mark enrollment as completed
  if (passed) {
    await supabase
      .from("enrollments")
      .update({
        status: "completed",
        progress_percent: 100,
        completed_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("course_id", courseId);
  }

  return { success: true, data: attempt as QuizAttempt };
}

/* ─── Admin quiz management ────────────────────────────── */

export async function createQuiz(
  courseId: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const timeLimit = formData.get("timeLimitMinutes")
    ? Number(formData.get("timeLimitMinutes"))
    : null;

  if (!title) return { success: false, error: "Quiz title is required." };

  const { error } = await supabase.from("quizzes").insert({
    course_id: courseId,
    title,
    description,
    time_limit_minutes: timeLimit,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function addQuizQuestion(
  quizId: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();
  const questionText = formData.get("questionText") as string;
  const optionsRaw = formData.get("options") as string;
  const correctIndex = Number(formData.get("correctOptionIndex")) || 0;
  const orderIndex = Number(formData.get("orderIndex")) || 0;

  if (!questionText) return { success: false, error: "Question text is required." };

  let options: string[];
  try {
    options = JSON.parse(optionsRaw);
  } catch {
    return { success: false, error: "Options must be a valid JSON array." };
  }

  const { error } = await supabase.from("quiz_questions").insert({
    quiz_id: quizId,
    question_text: questionText,
    options,
    correct_option_index: correctIndex,
    order_index: orderIndex,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}
