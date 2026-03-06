"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CalendarCheck,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Schedule Testing",
    description:
      "Set up mobile or on-site drug and alcohol testing for pre-employment, random, post-accident, and reasonable suspicion programs.",
    icon: CalendarCheck,
  },
  {
    number: "02",
    title: "Complete Collection",
    description:
      "Certified personnel perform collections using proper procedures, documentation, and chain of custody standards.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Process & Review",
    description:
      "Test results move through laboratory processing and program review based on company policy, DOT requirements, and compliance protocols.",
    icon: FlaskConical,
  },
  {
    number: "04",
    title: "Train & Certify",
    description:
      "Employees and program participants complete required training, pass course assessments, and receive downloadable certificates.",
    icon: GraduationCap,
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#0B2A4A" }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border"
          style={{
            color: "#D4AF37",
            borderColor: "rgba(212,175,55,0.3)",
            backgroundColor: "rgba(212,175,55,0.08)",
          }}
        >
          Simple Compliance Workflow
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-3xl sm:text-4xl font-bold text-white"
        >
          How It Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          From testing and collection to reporting and certification, we help
          employers manage workplace compliance through one organized process.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Connecting gold line — desktop only */}
          <div
            className="hidden lg:block absolute top-[72px] left-[12.5%] right-[12.5%] h-px"
            style={{ backgroundColor: "rgba(212,175,55,0.25)" }}
            aria-hidden="true"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + i * 0.12,
                  ease: "easeOut",
                }}
                className="group relative flex flex-col items-center text-center rounded-xl p-7 transition-shadow duration-300 hover:shadow-xl focus-within:ring-2"
                style={{
                  backgroundColor: "rgba(16,47,90,0.6)",
                  border: "1px solid rgba(229,231,235,0.08)",
                }}
                tabIndex={0}
              >
                {/* Step number badge */}
                <div
                  className="relative z-10 w-[60px] h-[60px] rounded-full flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "rgba(212,175,55,0.12)",
                    border: "2px solid rgba(212,175,55,0.35)",
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: "#D4AF37" }}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Step number */}
                <span
                  className="text-xs font-bold tracking-widest mb-2"
                  style={{ color: "#E8C76A" }}
                >
                  STEP {step.number}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {step.description}
                </p>

                {/* Gold bottom accent on hover */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-2/3 transition-all duration-300 rounded-full"
                  style={{ backgroundColor: "#D4AF37" }}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
