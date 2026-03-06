"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { enrollInCourse } from "@/lib/actions/enrollment";

export function EnrollButton({ courseId }: { courseId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleEnroll() {
    startTransition(async () => {
      const result = await enrollInCourse(courseId);
      if (result.success) {
        router.refresh();
      }
    });
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={pending}
      className="block w-full text-center text-sm font-semibold py-2 rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors disabled:opacity-50"
    >
      {pending ? "Enrolling…" : "Enroll"}
    </button>
  );
}
