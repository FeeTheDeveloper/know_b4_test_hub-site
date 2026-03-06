"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { markLessonComplete } from "@/lib/actions/enrollment";

export function LessonCompleteButton({ lessonId }: { lessonId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleComplete() {
    startTransition(async () => {
      await markLessonComplete(lessonId);
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleComplete}
      disabled={pending}
      className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
    >
      {pending ? "…" : "✓ Done"}
    </button>
  );
}
