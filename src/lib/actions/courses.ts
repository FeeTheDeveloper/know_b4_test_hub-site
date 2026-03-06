"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import type {
  ActionResult,
  Course,
  CourseWithModules,
} from "@/types";

/* ─── Public / user-facing queries ─────────────────────── */

export async function getPublishedCourses(): Promise<Course[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("title");
  return (data ?? []) as Course[];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();
  return (data as Course) ?? null;
}

export async function getCourseWithModules(
  courseId: string
): Promise<CourseWithModules | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("courses")
    .select(
      `*, course_modules(*, course_lessons(*))`
    )
    .eq("id", courseId)
    .single();
  if (!data) return null;
  // Sort modules and their lessons by order_index
  const course = data as CourseWithModules;
  course.course_modules.sort((a, b) => a.order_index - b.order_index);
  course.course_modules.forEach((m) =>
    m.course_lessons.sort((a, b) => a.order_index - b.order_index)
  );
  return course;
}

/* ─── Admin CRUD ───────────────────────────────────────── */

export async function getAllCourses(): Promise<Course[]> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .order("updated_at", { ascending: false });
  return (data ?? []) as Course[];
}

export async function createCourse(
  formData: FormData
): Promise<ActionResult<Course>> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const description = (formData.get("description") as string) || "";
  const shortDescription = (formData.get("shortDescription") as string) || "";
  const category = (formData.get("category") as string) || "General";
  const difficulty = (formData.get("difficulty") as string) || "beginner";
  const durationHours = Number(formData.get("durationHours")) || 1;
  const passingScore = Number(formData.get("passingScore")) || 70;
  const targetAudience = (formData.get("targetAudience") as string) || "";
  const certificateTitle = (formData.get("certificateTitle") as string) || "";
  const certificateValidityMonths = Number(formData.get("certificateValidityMonths")) || 24;

  let learningObjectives: string[] = [];
  const objectivesRaw = formData.get("learningObjectives") as string;
  if (objectivesRaw) {
    learningObjectives = objectivesRaw.split("\n").map((s) => s.trim()).filter(Boolean);
  }

  if (!title) {
    return { success: false, error: "Title is required." };
  }

  const { data, error } = await supabase
    .from("courses")
    .insert({
      title,
      slug,
      description,
      short_description: shortDescription,
      category,
      difficulty,
      duration_hours: durationHours,
      passing_score: passingScore,
      target_audience: targetAudience,
      learning_objectives: learningObjectives,
      certificate_title: certificateTitle,
      certificate_validity_months: certificateValidityMonths,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, data: data as Course };
}

export async function updateCourse(
  courseId: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  const fields = [
    "title",
    "slug",
    "description",
    "short_description",
    "category",
    "difficulty",
    "thumbnail_url",
    "target_audience",
    "certificate_title",
  ] as const;

  for (const f of fields) {
    const val = formData.get(f);
    if (val !== null) updates[f] = val;
  }

  const dh = formData.get("duration_hours");
  if (dh !== null) updates.duration_hours = Number(dh);

  const ps = formData.get("passing_score");
  if (ps !== null) updates.passing_score = Number(ps);

  const cvm = formData.get("certificate_validity_months");
  if (cvm !== null) updates.certificate_validity_months = Number(cvm);

  const objectivesRaw = formData.get("learning_objectives") as string | null;
  if (objectivesRaw !== null) {
    updates.learning_objectives = objectivesRaw.split("\n").map((s: string) => s.trim()).filter(Boolean);
  }

  const pub = formData.get("is_published");
  if (pub !== null) updates.is_published = pub === "true";

  const { error } = await supabase.from("courses").update(updates).eq("id", courseId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteCourse(courseId: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("courses").delete().eq("id", courseId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function toggleCoursePublish(
  courseId: string,
  publish: boolean
): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("courses")
    .update({ is_published: publish, updated_at: new Date().toISOString() })
    .eq("id", courseId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

/* ─── Module CRUD ──────────────────────────────────────── */

export async function createModule(
  courseId: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const orderIndex = Number(formData.get("orderIndex")) || 0;

  if (!title) return { success: false, error: "Module title is required." };

  const { error } = await supabase.from("course_modules").insert({
    course_id: courseId,
    title,
    description,
    order_index: orderIndex,
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteModule(moduleId: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("course_modules").delete().eq("id", moduleId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

/* ─── Lesson CRUD ──────────────────────────────────────── */

export async function createLesson(
  moduleId: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const title = formData.get("title") as string;
  const content = (formData.get("content") as string) || "";
  const contentType = (formData.get("contentType") as string) || "text";
  const durationMinutes = Number(formData.get("durationMinutes")) || 5;
  const orderIndex = Number(formData.get("orderIndex")) || 0;

  if (!title) return { success: false, error: "Lesson title is required." };

  const { error } = await supabase.from("course_lessons").insert({
    module_id: moduleId,
    title,
    content,
    content_type: contentType,
    duration_minutes: durationMinutes,
    order_index: orderIndex,
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteLesson(lessonId: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("course_lessons").delete().eq("id", lessonId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
