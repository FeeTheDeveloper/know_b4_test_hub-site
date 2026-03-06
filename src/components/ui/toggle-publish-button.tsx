"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleCoursePublish } from "@/lib/actions/courses";

interface Props {
  courseId: string;
  isPublished: boolean;
}

export function TogglePublishButton({ courseId, isPublished }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle() {
    startTransition(async () => {
      await toggleCoursePublish(courseId, !isPublished);
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleToggle}
      disabled={pending}
      className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${
        isPublished
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
      } disabled:opacity-50`}
    >
      {pending ? "…" : isPublished ? "Published" : "Draft"}
    </button>
  );
}
