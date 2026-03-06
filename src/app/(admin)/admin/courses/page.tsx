import Link from "next/link";
import { AdminTable, PageHeading } from "@/components/ui";
import { getAllCourses } from "@/lib/actions/courses";
import { capitalize, formatDate } from "@/lib/utils";
import type { Course } from "@/types";
import { TogglePublishButton } from "@/components/ui/toggle-publish-button";

export default async function AdminCoursesPage() {
  const courses = await getAllCourses();

  return (
    <>
      <PageHeading
        title="Manage Courses"
        description="Create, edit, and manage certification courses."
        actions={
          <Link
            href="/admin/courses/new"
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors"
          >
            + New Course
          </Link>
        }
      />

      <AdminTable<Course>
        keyExtractor={(c) => c.id}
        data={courses}
        columns={[
          {
            key: "title",
            header: "Course",
            render: (course) => (
              <div>
                <p className="font-medium text-gray-900">{course.title}</p>
                <p className="text-xs text-gray-500">{course.category}</p>
              </div>
            ),
          },
          {
            key: "audience",
            header: "Audience",
            render: (course) => (
              <p className="text-xs text-gray-600 max-w-[180px] line-clamp-2">
                {course.target_audience || "—"}
              </p>
            ),
          },
          {
            key: "difficulty",
            header: "Level",
            render: (course) => (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {capitalize(course.difficulty)}
              </span>
            ),
          },
          {
            key: "duration",
            header: "Duration",
            render: (course) => (
              <span className="text-gray-600">{course.duration_hours}h</span>
            ),
          },
          {
            key: "certificate",
            header: "Certificate",
            render: (course) => (
              course.certificate_title ? (
                <span className="text-xs text-brandGold font-medium">
                  {course.certificate_validity_months}mo validity
                </span>
              ) : (
                <span className="text-xs text-gray-400">None</span>
              )
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (course) => (
              <TogglePublishButton courseId={course.id} isPublished={course.is_published} />
            ),
          },
          {
            key: "updated",
            header: "Last Updated",
            render: (course) => (
              <span className="text-gray-500">{formatDate(course.updated_at)}</span>
            ),
          },
          {
            key: "actions",
            header: "",
            render: (course) => (
              <Link
                href={`/admin/courses/${course.slug}`}
                className="text-sm text-brandGold hover:text-brandGoldLight font-medium"
              >
                Edit
              </Link>
            ),
            className: "text-right",
          },
        ]}
      />
    </>
  );
}
