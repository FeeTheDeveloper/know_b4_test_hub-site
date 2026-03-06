import Link from "next/link";
import type { Course } from "@/types";
import { capitalize } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  href: string;
  progress?: number;
  status?: "active" | "completed" | "dropped";
  actionLabel?: string;
}

export function CourseCard({ course, href, progress, status, actionLabel }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:border-brandGold hover:shadow-md transition-all flex flex-col">
      {/* Thumbnail placeholder */}
      <div className="h-36 bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center relative">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-brandGold rounded-lg flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-brandBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xs text-brandGoldLight font-medium">{course.category}</span>
        </div>
        {/* Completion badge */}
        {status === "completed" && (
          <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-600 text-white">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            Completed
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {capitalize(course.difficulty)}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-0.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {course.duration_hours}h
          </span>
          {course.passing_score > 0 && (
            <span className="text-xs text-gray-400 flex items-center gap-0.5">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {course.passing_score}% to pass
            </span>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
          {course.short_description}
        </p>

        {/* Certificate eligibility */}
        {course.certificate_title && (
          <p className="text-[10px] text-brandGold font-medium mb-2 flex items-center gap-1">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            Certificate eligible
          </p>
        )}

        {/* Progress bar */}
        {typeof progress === "number" && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium text-gray-700">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full">
              <div
                className="h-full bg-brandGold rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-auto">
          <Link
            href={href}
            className="block w-full text-center text-sm font-semibold py-2 rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors"
          >
            {actionLabel ?? "View Course"}
          </Link>
        </div>
      </div>
    </div>
  );
}
