/** Core database types matching the Supabase schema */

export type UserRole = "user" | "admin";

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  company: string | null;
  job_title: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail_url: string | null;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration_hours: number;
  passing_score: number;
  target_audience: string;
  learning_objectives: string[];
  certificate_title: string;
  certificate_validity_months: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
}

export interface CourseLesson {
  id: string;
  module_id: string;
  title: string;
  content: string;
  content_type: "text" | "video" | "document";
  duration_minutes: number;
  order_index: number;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: "active" | "completed" | "dropped";
  progress_percent: number;
  enrolled_at: string;
  completed_at: string | null;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
}

export interface Quiz {
  id: string;
  course_id: string;
  title: string;
  description: string;
  time_limit_minutes: number | null;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
  order_index: number;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  course_id: string;
  score: number;
  passed: boolean;
  answers: Record<string, number>;
  started_at: string;
  completed_at: string | null;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_number: string;
  issued_at: string;
  expires_at: string | null;
  revoked: boolean;
  revoked_at: string | null;
  revoked_reason: string | null;
}

/* ─── Joined / view types ─────────────────────────────── */

export interface ModuleWithLessons extends CourseModule {
  course_lessons: CourseLesson[];
}

export interface CourseWithModules extends Course {
  course_modules: ModuleWithLessons[];
}

export interface CourseWithMeta extends Course {
  module_count: number;
  lesson_count: number;
  total_duration_minutes: number;
}

export interface EnrollmentWithCourse extends Enrollment {
  courses: Course;
}

export interface CertificateWithCourse extends Certificate {
  courses: Course;
}

export interface CertificateWithDetails extends Certificate {
  courses: Course;
  profiles: Profile;
}

export interface QuizWithQuestions extends Quiz {
  quiz_questions: QuizQuestion[];
}

/* ─── Action results ──────────────────────────────────── */

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
