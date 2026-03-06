import Link from "next/link";
import Image from "next/image";
import { certifications } from "@/data/certifications";

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-brandGold/10 text-brandGold",
  Advanced: "bg-red-100 text-red-800",
};

export default function CertificationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brandBlue to-primary-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Know B4 Testing Hub"
              width={72}
              height={72}
              priority
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Professional <span className="text-brandGoldLight">Certifications</span>
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Industry-standard compliance training and certification programs for
            workplace drug testing, DOT regulations, and safety standards.
          </p>
        </div>
      </section>

      {/* Certifications grid */}
      <section className="bg-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:border-brandGold hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                {/* Card header */}
                <div className="h-3 bg-gradient-to-r from-brandGold to-brandGoldLight" />

                <div className="p-6 flex flex-col flex-1">
                  {/* Category & level */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide truncate">
                      {cert.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${levelColors[cert.level]}`}
                    >
                      {cert.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {cert.description}
                  </p>

                  {/* Meta + CTA */}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">
                      {cert.duration}
                    </span>
                    <Link
                      href="/signup"
                      className="text-sm font-semibold px-4 py-2 rounded-lg bg-brandGold text-brandBlue hover:bg-brandGoldLight transition-colors"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brandBlue text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">
            Need a Custom Training Program?
          </h2>
          <p className="mt-3 text-white/60">
            We work with employers, TPAs, and consortium administrators to
            build tailored compliance training for your organization.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-brandGold text-brandBlue font-semibold hover:bg-brandGoldLight transition-colors text-center"
            >
              Get Started
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
    </>
  );
}
