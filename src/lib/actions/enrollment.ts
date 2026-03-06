"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  ActionResult,
  Enrollment,
  EnrollmentWithCourse,
  LessonProgress,
} from "@/types";

/* ─── Enrollment ───────────────────────────────────────── */

export async function getUserEnrollments(
  userId: string
): Promise<EnrollmentWithCourse[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("enrollments")
    .select("*, courses(*)")
    .eq("user_id", userId)
    .order("enrolled_at", { ascending: false });
  return (data ?? []) as EnrollmentWithCourse[];
}

export async function getEnrollment(
  userId: string,
  courseId: string
): Promise<Enrollment | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .single();
  return (data as Enrollment) ?? null;
}

export async function enrollInCourse(courseId: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated." };

  const { error } = await supabase.from("enrollments").insert({
    user_id: user.id,
    course_id: courseId,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "Already enrolled in this course." };
    }
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function dropEnrollment(courseId: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated." };

  const { error } = await supabase
    .from("enrollments")
    .update({ status: "dropped" })
    .eq("user_id", user.id)
    .eq("course_id", courseId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/* ─── Lesson Progress ──────────────────────────────────── */

export async function getUserLessonProgress(
  userId: string,
  lessonIds: string[]
): Promise<LessonProgress[]> {
  if (lessonIds.length === 0) return [];
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .in("lesson_id", lessonIds);
  return (data ?? []) as LessonProgress[];
}

export async function markLessonComplete(
  lessonId: string
): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated." };

  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" }
  );

  if (error) return { success: false, error: error.message };

  // Recalculate enrollment progress for the course this lesson belongs to
  await recalculateProgress(user.id, lessonId);

  return { success: true };
}

/** Recalculates enrollment progress_percent after a lesson is completed */
async function recalculateProgress(userId: string, lessonId: string) {
  const supabase = await createSupabaseServerClient();

  // Find which course this lesson belongs to
  const { data: lesson } = await supabase
    .from("course_lessons")
    .select("id, module_id, course_modules!inner(course_id)")
    .eq("id", lessonId)
    .single();

  if (!lesson) return;

  const courseId = (lesson as unknown as { course_modules: { course_id: string } })
    .course_modules.course_id;

  // Count total lessons in this course
  const { count: totalLessons } = await supabase
    .from("course_lessons")
    .select("id, course_modules!inner(course_id)", { count: "exact", head: true })
    .eq("course_modules.course_id", courseId);

  // Count completed lessons for this user in this course
  const { data: allLessons } = await supabase
    .from("course_lessons")
    .select("id, course_modules!inner(course_id)")
    .eq("course_modules.course_id", courseId);

  const allLessonIds = (allLessons ?? []).map((l: { id: string }) => l.id);

  const { count: completedLessons } = await supabase
    .from("lesson_progress")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("completed", true)
    .in("lesson_id", allLessonIds);

  const total = totalLessons ?? 1;
  const completed = completedLessons ?? 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const updates: Record<string, unknown> = { progress_percent: percent };
  if (percent === 100) {
    updates.status = "completed";
    updates.completed_at = new Date().toISOString();
  }

  await supabase
    .from("enrollments")
    .update(updates)
    .eq("user_id", userId)
    .eq("course_id", courseId);
}
