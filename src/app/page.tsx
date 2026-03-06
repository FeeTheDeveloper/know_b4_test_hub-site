import Link from "next/link";
import Image from "next/image";
import { getPublishedCourses } from "@/lib/actions/courses";
import { CourseCard } from "@/components/ui";
import HowItWorks from "@/components/home/HowItWorks";

export default async function HomePage() {
  const allCourses = await getPublishedCourses();
  const courses = allCourses.slice(0, 3);

  return (
    <>
      {/* Public nav */}
      <header className="bg-brandBlue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Know B4 Testing Hub"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="font-semibold text-white">Know B4 Hub</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-brandBlue to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="Know B4 Testing Hub"
              width={100}
              height={100}
              priority
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Compliance Training &amp; Certification
            <br />
            <span className="text-brandGoldLight">for Workplace Testing Programs</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Professional testing, training, and compliance tools for employers,
            collectors, and program managers.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/certifications"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-brandGold text-brandBlue font-semibold hover:bg-brandGoldLight transition-colors"
            >
              View Certifications
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3 rounded-lg border border-brandGold text-brandGold font-semibold hover:bg-brandGold/10 transition-colors"
            >
              Login to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Certified Professionals" },
              { value: "25+", label: "Compliance Courses" },
              { value: "98%", label: "Exam Pass Rate" },
              { value: "24/7", label: "Online Access" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-brandGold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">Featured Courses</h2>
            <p className="mt-2 text-white/60">
              Industry-standard certification programs for workplace compliance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                href="/signup"
                actionLabel="Enroll Now"
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* CTA */}
      <section className="relative bg-primary-900 text-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle gold glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Gold accent line */}
        <div className="mx-auto mb-10 w-16 h-px bg-brandGold/40" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Build a Stronger Compliance Program
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            Access workplace testing, training, and certification tools designed
            to support safer operations and more consistent compliance.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/certifications"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-brandGold text-brandBlue font-semibold hover:bg-brandGoldLight transition-colors text-center"
            >
              View Certifications
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3 rounded-lg border border-white/30 text-white font-semibold hover:border-white hover:bg-white/5 transition-colors text-center"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3 rounded-lg border border-white/30 text-white font-semibold hover:border-white hover:bg-white/5 transition-colors text-center"
            >
              Login to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Know B4 Testing Hub. All rights reserved.</p>
          <p className="mt-1">
            Professional certification and compliance training platform.
          </p>
        </div>
      </footer>
    </>
  );
}
