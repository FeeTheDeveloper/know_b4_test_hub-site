"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitQuiz } from "@/lib/actions/quiz";
import { issueCertificate } from "@/lib/actions/certificates";
import type { QuizWithQuestions, QuizAttempt } from "@/types";

interface Props {
  quiz: QuizWithQuestions;
  courseId: string;
  courseSlug: string;
  passingScore: number;
}

export function QuizClient({ quiz, courseId, courseSlug, passingScore }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizAttempt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const allAnswered = quiz.quiz_questions.every((q) => answers[q.id] !== undefined);

  function selectAnswer(questionId: string, optionIndex: number) {
    if (result) return; // prevent changes after submission
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function handleSubmit() {
    if (!allAnswered || result) return;
    setError(null);

    startTransition(async () => {
      const res = await submitQuiz(quiz.id, courseId, answers);
      if (!res.success) {
        setError(res.error ?? "Something went wrong.");
        return;
      }
      setResult(res.data!);

      // Issue certificate if passed
      if (res.data!.passed) {
        await issueCertificate(res.data!.user_id, courseId);
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Questions */}
      {quiz.quiz_questions.map((q, qi) => (
        <div
          key={q.id}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <p className="font-medium text-gray-900 mb-3">
            {qi + 1}. {q.question_text}
          </p>
          <div className="space-y-2">
            {q.options.map((option, oi) => {
              const selected = answers[q.id] === oi;
              const isCorrect = result && oi === q.correct_option_index;
              const isWrong = result && selected && oi !== q.correct_option_index;

              let ringColor = selected
                ? "ring-2 ring-brandGold bg-brandGold/5"
                : "hover:bg-gray-50";
              if (result) {
                if (isCorrect) ringColor = "ring-2 ring-green-500 bg-green-50";
                else if (isWrong) ringColor = "ring-2 ring-red-500 bg-red-50";
                else ringColor = "";
              }

              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => selectAnswer(q.id, oi)}
                  disabled={!!result}
                  className={`w-full text-left px-4 py-3 rounded-lg border border-gray-200 text-sm transition-all ${ringColor} disabled:cursor-default`}
                >
                  <span className="font-medium text-gray-500 mr-2">
                    {String.fromCharCode(65 + oi)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Error */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit / Result */}
      {!result ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || pending}
          className="w-full py-3 px-4 rounded-lg bg-brandGold text-brandBlue font-semibold hover:bg-brandGoldLight transition-colors disabled:opacity-50"
        >
          {pending ? "Submitting…" : "Submit Answers"}
        </button>
      ) : (
        <div
          className={`p-6 rounded-xl border-2 text-center ${
            result.passed
              ? "border-green-300 bg-green-50"
              : "border-red-300 bg-red-50"
          }`}
        >
          <p className="text-2xl font-bold mb-1">
            {result.score}%
          </p>
          <p className={`font-medium ${result.passed ? "text-green-700" : "text-red-700"}`}>
            {result.passed
              ? "Congratulations! You passed!"
              : `You need ${passingScore}% to pass. Try again!`}
          </p>
          {result.passed && (
            <p className="text-sm text-green-600 mt-2">
              A certificate has been issued. View it in your certificates page.
            </p>
          )}
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => router.push(`/dashboard/courses/${courseSlug}`)}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back to Course
            </button>
            {result.passed && (
              <button
                onClick={() => router.push("/dashboard/certificates")}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight"
              >
                View Certificate
              </button>
            )}
            {!result.passed && (
              <button
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                }}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
