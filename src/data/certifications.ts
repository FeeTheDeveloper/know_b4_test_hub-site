import type { CourseCategory } from "@/lib/mock-data";

export interface CertificationCard {
  id: string;
  title: string;
  category: CourseCategory;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export const certifications: CertificationCard[] = [
  {
    id: "cert-dot",
    title: "DOT Drug & Alcohol Testing Compliance",
    category: "DOT Drug Testing",
    description:
      "Comprehensive overview of 49 CFR Part 40 drug and alcohol testing regulations for DOT-covered employers and employees.",
    duration: "6 hours",
    level: "Intermediate",
  },
  {
    id: "cert-nondot",
    title: "Non-DOT Workplace Drug Testing Programs",
    category: "Non-DOT Workplace Testing",
    description:
      "Design and administer effective workplace drug testing programs for non-federally-regulated employers.",
    duration: "4 hours",
    level: "Beginner",
  },
  {
    id: "cert-collector",
    title: "Urine Specimen Collector Qualification",
    category: "Collector Training",
    description:
      "Step-by-step qualification training for urine specimen collectors per 49 CFR Part 40 Subpart C.",
    duration: "8 hours",
    level: "Advanced",
  },
  {
    id: "cert-bat",
    title: "Breath Alcohol Technician (BAT) Training",
    category: "Breath Alcohol Technician",
    description:
      "Qualification course covering EBT operation, calibration, and DOT alcohol testing protocols.",
    duration: "6 hours",
    level: "Advanced",
  },
  {
    id: "cert-coc",
    title: "Chain of Custody Documentation & Procedures",
    category: "Chain of Custody Procedures",
    description:
      "Master the chain of custody process from specimen collection through laboratory reporting.",
    duration: "3 hours",
    level: "Intermediate",
  },
  {
    id: "cert-random",
    title: "Random Testing Program Management",
    category: "Random Testing Program Management",
    description:
      "Design, implement, and manage DOT-compliant random drug and alcohol testing programs.",
    duration: "4 hours",
    level: "Intermediate",
  },
  {
    id: "cert-suspicion",
    title: "Reasonable Suspicion Training for Supervisors",
    category: "Reasonable Suspicion Awareness",
    description:
      "DOT-compliant training to help supervisors recognize and document signs of drug and alcohol use.",
    duration: "2 hours",
    level: "Intermediate",
  },
  {
    id: "cert-mobile",
    title: "Mobile Drug & Alcohol Collection Operations",
    category: "Mobile Collection Operations",
    description:
      "Operational training for mobile collection technicians performing on-site drug and alcohol testing.",
    duration: "5 hours",
    level: "Advanced",
  },
  {
    id: "cert-employer",
    title: "Employer Drug-Free Workplace Compliance",
    category: "Employer Compliance Training",
    description:
      "Build and maintain a comprehensive drug-free workplace program that meets federal and state requirements.",
    duration: "3 hours",
    level: "Beginner",
  },
  {
    id: "cert-tpa",
    title: "Third-Party Administrator (TPA) Program Management",
    category: "TPA Program Administration",
    description:
      "Advanced training for TPAs managing employer drug and alcohol testing programs and consortium accounts.",
    duration: "5 hours",
    level: "Advanced",
  },
];
