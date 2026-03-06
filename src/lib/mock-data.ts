/**
 * Sample training content for platform development.
 *
 * This seed data is provided for UI scaffolding and local development only.
 * It does NOT represent legally certified or federally approved training
 * material. All course descriptions, objectives, and module content are
 * illustrative samples written in a workplace-compliance tone.
 *
 * The live application reads from Supabase via server actions.
 */

import type {
  Profile,
  Course,
  CourseModule,
  CourseLesson,
  Enrollment,
  EnrollmentWithCourse,
  QuizAttempt,
  Certificate,
  CertificateWithCourse,
} from "@/types";

// ─── Course Categories (constants) ──────────────────────

export const COURSE_CATEGORIES = [
  "DOT Drug Testing",
  "Non-DOT Workplace Testing",
  "Collector Training",
  "Breath Alcohol Technician",
  "Chain of Custody Procedures",
  "Random Testing Program Management",
  "Reasonable Suspicion Awareness",
  "Mobile Collection Operations",
  "Employer Compliance Training",
  "TPA Program Administration",
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];

// ─── Profiles ────────────────────────────────────────────

export const mockProfiles: Profile[] = [
  {
    id: "p-001",
    user_id: "u-001",
    email: "jane.doe@acmecorp.com",
    role: "user",
    first_name: "Jane",
    last_name: "Doe",
    company: "ACME Logistics",
    job_title: "Safety Manager",
    phone: "(555) 123-4567",
    avatar_url: null,
    created_at: "2025-09-01T10:00:00Z",
    updated_at: "2025-09-01T10:00:00Z",
  },
  {
    id: "p-002",
    user_id: "u-002",
    email: "admin@knowb4testing.com",
    role: "admin",
    first_name: "Admin",
    last_name: "User",
    company: "Know B4 Testing",
    job_title: "Platform Administrator",
    phone: null,
    avatar_url: null,
    created_at: "2025-08-15T08:00:00Z",
    updated_at: "2025-08-15T08:00:00Z",
  },
  {
    id: "p-003",
    user_id: "u-003",
    email: "bob.smith@acmecorp.com",
    role: "user",
    first_name: "Bob",
    last_name: "Smith",
    company: "ACME Logistics",
    job_title: "Warehouse Supervisor",
    phone: "(555) 987-6543",
    avatar_url: null,
    created_at: "2025-10-05T14:30:00Z",
    updated_at: "2025-10-05T14:30:00Z",
  },
  {
    id: "p-004",
    user_id: "u-004",
    email: "maria.garcia@rapidtrans.com",
    role: "user",
    first_name: "Maria",
    last_name: "Garcia",
    company: "Rapid Transport Inc.",
    job_title: "DOT Compliance Officer",
    phone: "(555) 456-7890",
    avatar_url: null,
    created_at: "2025-10-20T09:15:00Z",
    updated_at: "2025-10-20T09:15:00Z",
  },
];

// ─── Courses ─────────────────────────────────────────────

export const mockCourses: Course[] = [
  // 1 — DOT Drug Testing
  {
    id: "c-001",
    title: "DOT Drug & Alcohol Testing Compliance",
    slug: "dot-drug-alcohol-testing-compliance",
    short_description:
      "Comprehensive overview of 49 CFR Part 40 drug and alcohol testing regulations for DOT-covered employers and employees.",
    description:
      "This course provides a detailed examination of the U.S. Department of Transportation's drug and alcohol testing requirements under 49 CFR Part 40. Participants will learn about the six categories of required testing, specimen collection procedures, laboratory analysis standards, Medical Review Officer (MRO) processes, Substance Abuse Professional (SAP) referrals, and employer recordkeeping obligations. Sample training content for platform development.",
    thumbnail_url: null,
    category: "DOT Drug Testing",
    difficulty: "intermediate",
    duration_hours: 6,
    passing_score: 80,
    target_audience: "Designated Employer Representatives (DERs), safety directors, HR professionals, and compliance officers at DOT-regulated companies including trucking, aviation, rail, transit, pipeline, and maritime operations.",
    learning_objectives: [
      "Explain the six categories of DOT-mandated drug and alcohol testing",
      "Describe the role of the MRO and SAP in the testing process",
      "Identify employer recordkeeping and reporting obligations under 49 CFR Part 40",
      "Outline proper procedures for handling positive, adulterated, and substituted test results",
      "Recognize the consequences of DOT testing violations for employers and employees",
    ],
    certificate_title: "DOT Drug & Alcohol Testing Compliance Certificate",
    certificate_validity_months: 24,
    is_published: true,
    created_at: "2025-08-20T09:00:00Z",
    updated_at: "2025-11-01T12:00:00Z",
  },
  // 2 — Non-DOT Workplace Testing
  {
    id: "c-002",
    title: "Non-DOT Workplace Drug Testing Programs",
    slug: "non-dot-workplace-drug-testing",
    short_description:
      "Design and administer effective workplace drug testing programs for non-federally-regulated employers.",
    description:
      "This course covers the fundamentals of establishing and managing workplace drug testing programs outside the DOT framework. Topics include state-by-state legal considerations, policy drafting, testing methodologies (urine, oral fluid, hair), result interpretation, employee rights, and integrating testing into a broader drug-free workplace program. Sample training content for platform development.",
    thumbnail_url: null,
    category: "Non-DOT Workplace Testing",
    difficulty: "beginner",
    duration_hours: 4,
    passing_score: 75,
    target_audience: "HR managers, employee relations specialists, occupational health coordinators, and business owners implementing voluntary workplace drug testing.",
    learning_objectives: [
      "Differentiate between DOT-mandated and non-DOT workplace testing requirements",
      "Draft a legally defensible workplace drug testing policy",
      "Evaluate specimen types and testing methodologies for non-regulated programs",
      "Apply state-specific legal requirements to program design",
      "Manage employee communications and consent procedures",
    ],
    certificate_title: "Non-DOT Workplace Drug Testing Program Certificate",
    certificate_validity_months: 24,
    is_published: true,
    created_at: "2025-09-10T10:00:00Z",
    updated_at: "2025-10-15T14:00:00Z",
  },
  // 3 — Collector Training
  {
    id: "c-003",
    title: "Urine Specimen Collector Qualification Training",
    slug: "urine-specimen-collector-training",
    short_description:
      "Step-by-step qualification training for urine specimen collectors per 49 CFR Part 40 Subpart C.",
    description:
      "This course trains individuals to serve as qualified urine specimen collectors under DOT regulations. Participants will learn the complete collection process including donor identification, privacy considerations, temperature verification, split specimen procedures, observed collections, shy bladder protocols, and Federal Drug Testing Custody and Control Form (CCF) completion. Includes mock collection scenarios and error correction procedures. Sample training content for platform development.",
    thumbnail_url: null,
    category: "Collector Training",
    difficulty: "advanced",
    duration_hours: 8,
    passing_score: 85,
    target_audience: "Individuals seeking qualification as DOT urine specimen collectors, clinic staff, mobile collection technicians, and occupational health nurses.",
    learning_objectives: [
      "Perform a complete DOT urine specimen collection following 49 CFR Part 40",
      "Complete the Federal CCF accurately with no fatal or correctable errors",
      "Execute observed and directly observed collection procedures when required",
      "Manage shy bladder situations per regulatory requirements",
      "Identify and correct common collection errors before they become fatal flaws",
    ],
    certificate_title: "DOT Urine Specimen Collector Qualification",
    certificate_validity_months: 12,
    is_published: true,
    created_at: "2025-09-20T11:00:00Z",
    updated_at: "2025-11-10T09:00:00Z",
  },
  // 4 — Breath Alcohol Technician
  {
    id: "c-004",
    title: "Breath Alcohol Technician (BAT) Training",
    slug: "breath-alcohol-technician-training",
    short_description:
      "Qualification course for Breath Alcohol Technicians covering EBT operation, calibration, and DOT testing protocols.",
    description:
      "This course prepares individuals to become qualified Breath Alcohol Technicians (BATs) under DOT regulations. Participants will learn evidential breath testing (EBT) device operation, calibration checks, screening and confirmation test procedures, Alcohol Testing Form (ATF) completion, and result reporting. The curriculum includes hands-on practice scenarios with mock subjects and common troubleshooting situations. Sample training content for platform development.",
    thumbnail_url: null,
    category: "Breath Alcohol Technician",
    difficulty: "advanced",
    duration_hours: 6,
    passing_score: 85,
    target_audience: "Individuals seeking BAT qualification, occupational health professionals, collection site personnel, and mobile testing technicians.",
    learning_objectives: [
      "Operate DOT-approved evidential breath testing devices correctly",
      "Conduct screening and confirmation breath alcohol tests per 49 CFR Part 40",
      "Complete the Alcohol Testing Form (ATF) without errors",
      "Perform pre-test calibration checks and document results",
      "Handle refusals, incomplete tests, and equipment malfunctions",
    ],
    certificate_title: "Breath Alcohol Technician (BAT) Qualification",
    certificate_validity_months: 12,
    is_published: true,
    created_at: "2025-10-01T08:00:00Z",
    updated_at: "2025-11-05T16:00:00Z",
  },
  // 5 — Chain of Custody Procedures
  {
    id: "c-005",
    title: "Chain of Custody Documentation & Procedures",
    slug: "chain-of-custody-procedures",
    short_description:
      "Master the chain of custody process from specimen collection through laboratory reporting.",
    description:
      "This course provides in-depth training on maintaining an unbroken chain of custody throughout the drug testing process. Topics include proper completion of the Federal CCF, specimen packaging and shipment, laboratory accessioning, result reporting, and legal defensibility. Participants will learn to identify common chain-of-custody breaks and how to prevent them. Sample training content for platform development.",
    thumbnail_url: null,
    category: "Chain of Custody Procedures",
    difficulty: "intermediate",
    duration_hours: 3,
    passing_score: 80,
    target_audience: "Specimen collectors, laboratory personnel, MRO staff, TPAs, and employer representatives involved in the testing chain.",
    learning_objectives: [
      "Explain why an unbroken chain of custody is essential to legally defensible testing",
      "Complete all sections of the Federal CCF correctly",
      "Package and ship specimens according to DOT and carrier requirements",
      "Identify common chain-of-custody errors and their legal consequences",
      "Document corrective statements when errors are discovered",
    ],
    certificate_title: "Chain of Custody Procedures Certificate",
    certificate_validity_months: 24,
    is_published: true,
    created_at: "2025-10-10T10:00:00Z",
    updated_at: "2025-11-15T10:00:00Z",
  },
  // 6 — Random Testing Program Management
  {
    id: "c-006",
    title: "Random Testing Program Management",
    slug: "random-testing-program-management",
    short_description:
      "Design, implement, and manage DOT-compliant random drug and alcohol testing programs.",
    description:
      "This course teaches employers and TPAs how to build and maintain scientifically valid, legally defensible random testing programs. Topics include random selection pool composition, annual testing rate calculations, selection methodology, notification procedures, documentation, and common audit findings. Participants will learn to use consortium and third-party administration models effectively. Sample training content for platform development.",
    thumbnail_url: null,
    category: "Random Testing Program Management",
    difficulty: "intermediate",
    duration_hours: 4,
    passing_score: 80,
    target_audience: "DERs, TPAs, consortium administrators, safety directors, and compliance managers responsible for random testing programs.",
    learning_objectives: [
      "Build a random selection pool that meets DOT requirements",
      "Calculate and apply the correct annual random testing rates by DOT agency",
      "Select employees using a scientifically valid random method",
      "Document random selections and notifications properly",
      "Prepare for and respond to DOT compliance audits of random programs",
    ],
    certificate_title: "Random Testing Program Management Certificate",
    certificate_validity_months: 24,
    is_published: true,
    created_at: "2025-10-15T09:00:00Z",
    updated_at: "2025-11-18T11:00:00Z",
  },
  // 7 — Reasonable Suspicion Awareness
  {
    id: "c-007",
    title: "Reasonable Suspicion Training for Supervisors",
    slug: "reasonable-suspicion-supervisor-training",
    short_description:
      "DOT-compliant training to help supervisors recognize and document signs of drug and alcohol use.",
    description:
      "This course fulfills the DOT requirement for at least 60 minutes of training on the physical, behavioral, speech, and performance signs of probable drug use, and at least 60 minutes on the indicators of probable alcohol misuse. Supervisors will learn observation techniques, documentation best practices, the referral process, and how to conduct a reasonable suspicion determination meeting. Sample training content for platform development.",
    thumbnail_url: null,
    category: "Reasonable Suspicion Awareness",
    difficulty: "intermediate",
    duration_hours: 2,
    passing_score: 80,
    target_audience: "Front-line supervisors, managers, and designated company officials at DOT-regulated employers who may need to make reasonable suspicion determinations.",
    learning_objectives: [
      "Identify physical and behavioral indicators of probable drug use",
      "Identify indicators of probable alcohol misuse in the workplace",
      "Document observations using a standardized reasonable suspicion checklist",
      "Follow proper procedures for notifying the employee and arranging testing",
      "Understand employer and supervisor liability related to reasonable suspicion determinations",
    ],
    certificate_title: "Reasonable Suspicion Awareness — Supervisor Certificate",
    certificate_validity_months: 24,
    is_published: true,
    created_at: "2025-10-20T10:00:00Z",
    updated_at: "2025-11-20T09:00:00Z",
  },
  // 8 — Mobile Collection Operations
  {
    id: "c-008",
    title: "Mobile Drug & Alcohol Collection Operations",
    slug: "mobile-collection-operations",
    short_description:
      "Operational training for mobile collection technicians performing on-site drug and alcohol testing.",
    description:
      "This course covers the unique challenges of performing specimen collections outside a fixed facility. Topics include mobile collection vehicle setup, supply chain management, site assessment, environmental controls, privacy and security of specimens, chain of custody in the field, and handling post-accident and reasonable suspicion collections at remote locations. Sample training content for platform development.",
    thumbnail_url: null,
    category: "Mobile Collection Operations",
    difficulty: "advanced",
    duration_hours: 5,
    passing_score: 80,
    target_audience: "Mobile collection technicians, fleet service coordinators, occupational health agencies offering on-site testing, and collection network managers.",
    learning_objectives: [
      "Set up a compliant mobile collection environment at any worksite",
      "Maintain chain of custody and specimen integrity during transport",
      "Conduct post-accident and reasonable suspicion collections in the field",
      "Manage supplies, documentation, and scheduling for mobile operations",
      "Address common challenges including inclement weather and remote locations",
    ],
    certificate_title: "Mobile Collection Operations Certificate",
    certificate_validity_months: 12,
    is_published: true,
    created_at: "2025-10-25T10:00:00Z",
    updated_at: "2025-11-22T10:00:00Z",
  },
  // 9 — Employer Compliance Training
  {
    id: "c-009",
    title: "Employer Drug-Free Workplace Compliance",
    slug: "employer-drug-free-workplace-compliance",
    short_description:
      "Build and maintain a comprehensive drug-free workplace program that meets federal and state requirements.",
    description:
      "This course guides employers through every component of a compliant drug-free workplace program: written policy development, employee education, supervisor training requirements, Employee Assistance Program (EAP) integration, and the five categories of drug testing. Includes templates for policies, employee acknowledgment forms, and compliance checklists aligned with both DOT and Drug-Free Workplace Act standards. Sample training content for platform development.",
    thumbnail_url: null,
    category: "Employer Compliance Training",
    difficulty: "beginner",
    duration_hours: 3,
    passing_score: 75,
    target_audience: "Business owners, HR directors, safety managers, and compliance officers establishing or updating a drug-free workplace program.",
    learning_objectives: [
      "Identify the five required components of a drug-free workplace program",
      "Draft a compliant written drug and alcohol policy",
      "Integrate Employee Assistance Programs into the workplace program",
      "Determine which employees are subject to testing and under what circumstances",
      "Maintain program documentation to satisfy audit and legal requirements",
    ],
    certificate_title: "Drug-Free Workplace Compliance Certificate",
    certificate_validity_months: 24,
    is_published: true,
    created_at: "2025-11-01T10:00:00Z",
    updated_at: "2025-11-25T10:00:00Z",
  },
  // 10 — TPA Program Administration
  {
    id: "c-010",
    title: "Third-Party Administrator (TPA) Program Operations",
    slug: "tpa-program-administration",
    short_description:
      "Operational training for third-party administrators managing drug and alcohol testing programs on behalf of employers.",
    description:
      "This course is designed for staff at TPAs and consortium/third-party administrators (C/TPAs) who manage drug and alcohol testing programs for multiple employer clients. Topics include client onboarding, random pool management, scheduling and tracking tests across multiple locations, MRO coordination, result management, FMCSA Clearinghouse reporting, and annual program audits. Sample training content for platform development.",
    thumbnail_url: null,
    category: "TPA Program Administration",
    difficulty: "advanced",
    duration_hours: 6,
    passing_score: 85,
    target_audience: "TPA account managers, C/TPA operations staff, consortium administrators, and program compliance managers.",
    learning_objectives: [
      "Onboard new employer clients with proper documentation and pool setup",
      "Manage random selection pools across multiple employer accounts",
      "Coordinate MRO review, SAP referrals, and return-to-duty processes",
      "Report testing events to the FMCSA Drug & Alcohol Clearinghouse",
      "Conduct annual program audits and generate compliance reports",
    ],
    certificate_title: "TPA Program Administration Certificate",
    certificate_validity_months: 12,
    is_published: false,
    created_at: "2025-11-10T10:00:00Z",
    updated_at: "2025-11-28T10:00:00Z",
  },
];

// ─── Modules & Lessons ───────────────────────────────────
// Covering courses c-001 through c-007 (published courses with full content)

export const mockModules: CourseModule[] = [
  /* ── c-001 DOT Drug & Alcohol Testing ────────────────── */
  { id: "m-001", course_id: "c-001", title: "Overview of 49 CFR Part 40", description: "Regulatory framework covering all DOT drug and alcohol testing requirements.", order_index: 1, created_at: "2025-08-20T09:00:00Z" },
  { id: "m-002", course_id: "c-001", title: "The Six Categories of DOT Testing", description: "Pre-employment, random, reasonable suspicion, post-accident, return-to-duty, and follow-up testing.", order_index: 2, created_at: "2025-08-20T09:00:00Z" },
  { id: "m-003", course_id: "c-001", title: "MRO and SAP Processes", description: "Medical Review Officer review and Substance Abuse Professional referral procedures.", order_index: 3, created_at: "2025-08-20T09:00:00Z" },

  /* ── c-002 Non-DOT Workplace Testing ─────────────────── */
  { id: "m-004", course_id: "c-002", title: "Legal Landscape for Non-DOT Testing", description: "State-by-state requirements and legal considerations for voluntary programs.", order_index: 1, created_at: "2025-09-10T10:00:00Z" },
  { id: "m-005", course_id: "c-002", title: "Program Design & Policy Drafting", description: "Building a defensible testing policy with clear procedures and employee rights.", order_index: 2, created_at: "2025-09-10T10:00:00Z" },

  /* ── c-003 Collector Training ────────────────────────── */
  { id: "m-006", course_id: "c-003", title: "The Collection Process", description: "End-to-end urine specimen collection per DOT regulations.", order_index: 1, created_at: "2025-09-20T11:00:00Z" },
  { id: "m-007", course_id: "c-003", title: "CCF Completion & Error Correction", description: "Properly completing and correcting the Federal Drug Testing Custody and Control Form.", order_index: 2, created_at: "2025-09-20T11:00:00Z" },
  { id: "m-008", course_id: "c-003", title: "Special Collection Situations", description: "Observed collections, shy bladder, and direct observation procedures.", order_index: 3, created_at: "2025-09-20T11:00:00Z" },

  /* ── c-004 BAT Training ──────────────────────────────── */
  { id: "m-009", course_id: "c-004", title: "EBT Device Operation", description: "Setup, calibration, and operation of DOT-approved evidential breath testing devices.", order_index: 1, created_at: "2025-10-01T08:00:00Z" },
  { id: "m-010", course_id: "c-004", title: "Conducting Breath Alcohol Tests", description: "Screening tests, confirmation tests, and ATF documentation.", order_index: 2, created_at: "2025-10-01T08:00:00Z" },

  /* ── c-005 Chain of Custody ──────────────────────────── */
  { id: "m-011", course_id: "c-005", title: "Chain of Custody Fundamentals", description: "Principles of specimen accountability from collection to reporting.", order_index: 1, created_at: "2025-10-10T10:00:00Z" },
  { id: "m-012", course_id: "c-005", title: "CCF Walkthrough & Error Prevention", description: "Step-by-step CCF completion with common error identification.", order_index: 2, created_at: "2025-10-10T10:00:00Z" },

  /* ── c-006 Random Testing Program ────────────────────── */
  { id: "m-013", course_id: "c-006", title: "Building the Random Pool", description: "Pool composition, safety-sensitive classifications, and multi-employer consortia.", order_index: 1, created_at: "2025-10-15T09:00:00Z" },
  { id: "m-014", course_id: "c-006", title: "Selection, Notification & Audit Readiness", description: "Random selection methodology, employee notification, and audit documentation.", order_index: 2, created_at: "2025-10-15T09:00:00Z" },

  /* ── c-007 Reasonable Suspicion ──────────────────────── */
  { id: "m-015", course_id: "c-007", title: "Physical & Behavioral Indicators of Drug Use", description: "Observable signs and symptoms that may indicate drug use in the workplace.", order_index: 1, created_at: "2025-10-20T10:00:00Z" },
  { id: "m-016", course_id: "c-007", title: "Indicators of Alcohol Misuse", description: "Observable signs and symptoms that may indicate alcohol misuse.", order_index: 2, created_at: "2025-10-20T10:00:00Z" },
  { id: "m-017", course_id: "c-007", title: "Documentation & the Determination Meeting", description: "Completing the observation checklist and conducting the determination meeting.", order_index: 3, created_at: "2025-10-20T10:00:00Z" },
];

export const mockLessons: CourseLesson[] = [
  /* ── m-001 Overview of 49 CFR Part 40 ────────────────── */
  { id: "l-001", module_id: "m-001", title: "History and Purpose of 49 CFR Part 40", content: "The Department of Transportation promulgated 49 CFR Part 40 to establish uniform procedures for conducting workplace drug and alcohol testing. The regulation applies to all DOT agencies...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-08-20T09:00:00Z" },
  { id: "l-002", module_id: "m-001", title: "DOT Agencies and Covered Employees", content: "Six DOT agencies enforce drug and alcohol testing requirements: FMCSA, FAA, FRA, FTA, PHMSA, and USCG. Each agency designates specific safety-sensitive positions...", content_type: "text", duration_minutes: 15, order_index: 2, created_at: "2025-08-20T09:00:00Z" },
  { id: "l-003", module_id: "m-001", title: "Prohibited Substances and Testing Panels", content: "DOT testing covers five drug classes: marijuana, cocaine, opiates, amphetamines, and PCP. Alcohol testing uses a breath or saliva screening threshold of 0.02...", content_type: "text", duration_minutes: 15, order_index: 3, created_at: "2025-08-20T09:00:00Z" },

  /* ── m-002 Six Categories of DOT Testing ─────────────── */
  { id: "l-004", module_id: "m-002", title: "Pre-Employment and Random Testing", content: "Pre-employment testing must be completed with a verified negative result before the employee can perform safety-sensitive functions. Random testing must be conducted at the annual rate set by each DOT agency...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-08-20T09:00:00Z" },
  { id: "l-005", module_id: "m-002", title: "Reasonable Suspicion and Post-Accident Testing", content: "Reasonable suspicion testing requires specific, contemporaneous, articulable observations by a trained supervisor. Post-accident testing requirements vary by DOT agency...", content_type: "text", duration_minutes: 20, order_index: 2, created_at: "2025-08-20T09:00:00Z" },
  { id: "l-006", module_id: "m-002", title: "Return-to-Duty and Follow-Up Testing", content: "Employees who violate DOT drug or alcohol rules must complete SAP evaluation and treatment before returning to safety-sensitive duties. Follow-up testing is mandatory for at least 12 months...", content_type: "text", duration_minutes: 15, order_index: 3, created_at: "2025-08-20T09:00:00Z" },

  /* ── m-003 MRO and SAP Processes ─────────────────────── */
  { id: "l-007", module_id: "m-003", title: "Medical Review Officer Responsibilities", content: "The MRO is a licensed physician with knowledge of substance abuse disorders who reviews and interprets all drug test results. The MRO must verify all positive, adulterated, and substituted results...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-08-20T09:00:00Z" },
  { id: "l-008", module_id: "m-003", title: "SAP Evaluation and Return-to-Duty", content: "The Substance Abuse Professional evaluates employees who have violated DOT drug and alcohol regulations and provides recommendations for treatment and education...", content_type: "text", duration_minutes: 20, order_index: 2, created_at: "2025-08-20T09:00:00Z" },

  /* ── m-004 Legal Landscape for Non-DOT ───────────────── */
  { id: "l-009", module_id: "m-004", title: "Federal Drug-Free Workplace Act Overview", content: "The Drug-Free Workplace Act of 1988 requires federal contractors and grantees to maintain drug-free workplace programs. While it does not mandate testing, many employers implement testing as part of compliance...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-09-10T10:00:00Z" },
  { id: "l-010", module_id: "m-004", title: "State Laws and Testing Restrictions", content: "State laws vary significantly in their regulation of workplace drug testing. Some states require employers to follow specific procedures or limit testing to certain circumstances...", content_type: "text", duration_minutes: 25, order_index: 2, created_at: "2025-09-10T10:00:00Z" },

  /* ── m-005 Program Design & Policy Drafting ──────────── */
  { id: "l-011", module_id: "m-005", title: "Components of a Testing Policy", content: "A comprehensive non-DOT testing policy should include: purpose statement, covered employees, prohibited conduct, types of testing, consequences, and employee rights...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-09-10T10:00:00Z" },
  { id: "l-012", module_id: "m-005", title: "Specimen Types and Testing Methods", content: "Non-DOT programs may use urine, oral fluid, hair, or combination testing. Each specimen type has different detection windows and considerations for implementation...", content_type: "text", duration_minutes: 15, order_index: 2, created_at: "2025-09-10T10:00:00Z" },

  /* ── m-006 The Collection Process ─────────────────────── */
  { id: "l-013", module_id: "m-006", title: "Pre-Collection Setup and Donor Check-In", content: "The collector must verify the collection site meets privacy requirements, check supplies, and positively identify the donor using a valid photo ID...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-09-20T11:00:00Z" },
  { id: "l-014", module_id: "m-006", title: "Specimen Collection and Temperature Check", content: "The donor provides a specimen in the collector's presence (or monitored area). The collector must check the temperature within 4 minutes and record it on the CCF...", content_type: "text", duration_minutes: 25, order_index: 2, created_at: "2025-09-20T11:00:00Z" },
  { id: "l-015", module_id: "m-006", title: "Specimen Sealing and Chain of Custody", content: "After verifying adequate volume and temperature, the collector splits the specimen into bottles A and B, applies tamper-evident seals, and completes the CCF...", content_type: "text", duration_minutes: 20, order_index: 3, created_at: "2025-09-20T11:00:00Z" },

  /* ── m-007 CCF Completion & Error Correction ─────────── */
  { id: "l-016", module_id: "m-007", title: "Step-by-Step CCF Completion", content: "The Federal CCF has five copies. The collector completes Steps 1 through 5, the donor completes Step 5, and each step must be completed accurately to avoid fatal flaws...", content_type: "document", duration_minutes: 30, order_index: 1, created_at: "2025-09-20T11:00:00Z" },
  { id: "l-017", module_id: "m-007", title: "Fatal Flaws vs. Correctable Errors", content: "Fatal flaws result in the test being cancelled. Correctable errors can be addressed through a documented correction process within defined timeframes...", content_type: "text", duration_minutes: 20, order_index: 2, created_at: "2025-09-20T11:00:00Z" },

  /* ── m-008 Special Collection Situations ─────────────── */
  { id: "l-018", module_id: "m-008", title: "Observed and Directly Observed Collections", content: "Observed collections may be required for return-to-duty, follow-up, or when a specimen temperature is outside the acceptable range...", content_type: "text", duration_minutes: 25, order_index: 1, created_at: "2025-09-20T11:00:00Z" },
  { id: "l-019", module_id: "m-008", title: "Shy Bladder Procedures", content: "When a donor cannot provide a sufficient specimen, the collector begins the shy bladder process: additional fluids, a three-hour waiting period, and MRO evaluation if unsuccessful...", content_type: "text", duration_minutes: 20, order_index: 2, created_at: "2025-09-20T11:00:00Z" },

  /* ── m-009 EBT Device Operation ──────────────────────── */
  { id: "l-020", module_id: "m-009", title: "DOT-Approved EBT Devices", content: "Only devices on the NHTSA Conforming Products List may be used for DOT confirmation testing. Screening devices include both EBTs and approved alcohol screening devices (ASDs)...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-10-01T08:00:00Z" },
  { id: "l-021", module_id: "m-009", title: "Calibration and Quality Assurance", content: "EBTs must be calibrated according to manufacturer specifications. External calibration checks must be performed and documented at required intervals...", content_type: "text", duration_minutes: 20, order_index: 2, created_at: "2025-10-01T08:00:00Z" },

  /* ── m-010 Conducting Breath Alcohol Tests ────────────── */
  { id: "l-022", module_id: "m-010", title: "Screening Test Procedures", content: "The BAT verifies the employee's identity, explains the test, conducts a screening test, and records the result on the ATF. If the result is 0.02 or greater, a confirmation test is required...", content_type: "text", duration_minutes: 25, order_index: 1, created_at: "2025-10-01T08:00:00Z" },
  { id: "l-023", module_id: "m-010", title: "Confirmation Test and ATF Completion", content: "A confirmation test must be conducted at least 15 but not more than 30 minutes after the screening test. The BAT completes all sections of the ATF and provides copies to the employee and employer...", content_type: "text", duration_minutes: 25, order_index: 2, created_at: "2025-10-01T08:00:00Z" },

  /* ── m-011 Chain of Custody Fundamentals ─────────────── */
  { id: "l-024", module_id: "m-011", title: "What Is Chain of Custody?", content: "Chain of custody is the documented, unbroken trail that accounts for the integrity of a specimen from collection to final disposition. Any break in the chain can compromise the legal defensibility of the test...", content_type: "text", duration_minutes: 15, order_index: 1, created_at: "2025-10-10T10:00:00Z" },
  { id: "l-025", module_id: "m-011", title: "Specimen Packaging and Shipment", content: "After collection, specimens must be sealed, placed in a leak-proof bag with absorbent material, and shipped to the laboratory via a secure courier within required timeframes...", content_type: "text", duration_minutes: 20, order_index: 2, created_at: "2025-10-10T10:00:00Z" },

  /* ── m-012 CCF Walkthrough & Error Prevention ────────── */
  { id: "l-026", module_id: "m-012", title: "Hands-On CCF Walkthrough", content: "In this interactive exercise, participants complete a mock CCF following each step of the collection process. Emphasis is placed on matching specimen IDs, applying seals correctly, and signing in the proper fields...", content_type: "document", duration_minutes: 30, order_index: 1, created_at: "2025-10-10T10:00:00Z" },
  { id: "l-027", module_id: "m-012", title: "Common Errors and Corrective Actions", content: "This lesson reviews the most frequently cited CCF errors in DOT audits and describes the corrective statement process for each...", content_type: "text", duration_minutes: 20, order_index: 2, created_at: "2025-10-10T10:00:00Z" },

  /* ── m-013 Building the Random Pool ──────────────────── */
  { id: "l-028", module_id: "m-013", title: "Safety-Sensitive Employee Identification", content: "Employers must identify all employees who perform safety-sensitive functions as defined by their applicable DOT agency. These employees form the basis of the random testing pool...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-10-15T09:00:00Z" },
  { id: "l-029", module_id: "m-013", title: "Consortium Pools and Rate Calculations", content: "Small employers may join consortia to meet random testing obligations. Annual testing rates are set by each DOT agency and may vary year to year...", content_type: "text", duration_minutes: 20, order_index: 2, created_at: "2025-10-15T09:00:00Z" },

  /* ── m-014 Selection, Notification & Audit ───────────── */
  { id: "l-030", module_id: "m-014", title: "Random Selection Methodology", content: "Selections must use a scientifically valid method such as a computer-generated random number algorithm. Each employee in the pool must have an equal chance of selection...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-10-15T09:00:00Z" },
  { id: "l-031", module_id: "m-014", title: "Notification and Test Completion", content: "Once selected, the employee must be notified and proceed immediately to the collection site. Documentation of the notification time, arrival time, and test completion is essential...", content_type: "text", duration_minutes: 15, order_index: 2, created_at: "2025-10-15T09:00:00Z" },

  /* ── m-015 Physical & Behavioral Indicators (Drug Use) ── */
  { id: "l-032", module_id: "m-015", title: "Physical Signs of Drug Impairment", content: "Supervisors should observe for: bloodshot or watery eyes, dilated or constricted pupils, unsteady gait, tremors, unusual perspiration, and changes in skin color...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-10-20T10:00:00Z" },
  { id: "l-033", module_id: "m-015", title: "Behavioral Changes and Performance Indicators", content: "Behavioral indicators may include: mood swings, paranoia, agitation, withdrawal from coworkers, unexplained absences, increased accidents, and declining work quality...", content_type: "text", duration_minutes: 20, order_index: 2, created_at: "2025-10-20T10:00:00Z" },

  /* ── m-016 Indicators of Alcohol Misuse ──────────────── */
  { id: "l-034", module_id: "m-016", title: "Observable Signs of Alcohol Impairment", content: "Signs may include: odor of alcohol on breath, slurred speech, impaired coordination, flushed face, staggering or swaying, and difficulty concentrating...", content_type: "text", duration_minutes: 20, order_index: 1, created_at: "2025-10-20T10:00:00Z" },
  { id: "l-035", module_id: "m-016", title: "Patterns of Alcohol Misuse in the Workplace", content: "Chronic patterns may include: frequent Monday absences, declining reliability, smell of alcohol at start of shift, drinking during lunch, and hiding beverages at the worksite...", content_type: "text", duration_minutes: 15, order_index: 2, created_at: "2025-10-20T10:00:00Z" },

  /* ── m-017 Documentation & Determination Meeting ─────── */
  { id: "l-036", module_id: "m-017", title: "Completing the Observation Checklist", content: "Use the standardized observation checklist to document all observations: date, time, location, specific behaviors observed, names of witnesses, and supervisor's assessment...", content_type: "document", duration_minutes: 20, order_index: 1, created_at: "2025-10-20T10:00:00Z" },
  { id: "l-037", module_id: "m-017", title: "Conducting the Determination Meeting", content: "The determination meeting should be private, include a witness when possible, inform the employee of the observations, and direct the employee to the collection site. Do not diagnose...", content_type: "text", duration_minutes: 15, order_index: 2, created_at: "2025-10-20T10:00:00Z" },
];

// ─── Enrollments ─────────────────────────────────────────

export const mockEnrollments: Enrollment[] = [
  { id: "e-001", user_id: "u-001", course_id: "c-001", status: "completed", progress_percent: 100, enrolled_at: "2025-09-15T10:00:00Z", completed_at: "2025-10-20T14:30:00Z" },
  { id: "e-002", user_id: "u-001", course_id: "c-002", status: "active", progress_percent: 60, enrolled_at: "2025-10-25T09:00:00Z", completed_at: null },
  { id: "e-003", user_id: "u-001", course_id: "c-007", status: "active", progress_percent: 33, enrolled_at: "2025-11-01T11:00:00Z", completed_at: null },
  { id: "e-004", user_id: "u-003", course_id: "c-001", status: "active", progress_percent: 40, enrolled_at: "2025-10-10T08:00:00Z", completed_at: null },
  { id: "e-005", user_id: "u-003", course_id: "c-003", status: "completed", progress_percent: 100, enrolled_at: "2025-10-15T10:00:00Z", completed_at: "2025-11-10T16:00:00Z" },
  { id: "e-006", user_id: "u-004", course_id: "c-004", status: "active", progress_percent: 50, enrolled_at: "2025-11-05T09:00:00Z", completed_at: null },
  { id: "e-007", user_id: "u-004", course_id: "c-006", status: "completed", progress_percent: 100, enrolled_at: "2025-10-20T10:00:00Z", completed_at: "2025-11-15T14:00:00Z" },
];

// ─── Quiz Attempts ───────────────────────────────────────

export const mockQuizAttempts: QuizAttempt[] = [
  { id: "qa-001", user_id: "u-001", quiz_id: "q-001", course_id: "c-001", score: 92, passed: true, answers: { "q1": 2, "q2": 0, "q3": 1, "q4": 3, "q5": 1 }, started_at: "2025-10-20T13:50:00Z", completed_at: "2025-10-20T14:20:00Z" },
  { id: "qa-002", user_id: "u-003", quiz_id: "q-003", course_id: "c-003", score: 88, passed: true, answers: { "q1": 1, "q2": 3, "q3": 0, "q4": 2 }, started_at: "2025-11-10T15:20:00Z", completed_at: "2025-11-10T15:50:00Z" },
  { id: "qa-003", user_id: "u-004", quiz_id: "q-006", course_id: "c-006", score: 85, passed: true, answers: { "q1": 0, "q2": 2, "q3": 1 }, started_at: "2025-11-15T13:00:00Z", completed_at: "2025-11-15T13:25:00Z" },
];

// ─── Certificates ────────────────────────────────────────

export const mockCertificates: Certificate[] = [
  {
    id: "cert-001",
    user_id: "u-001",
    course_id: "c-001",
    certificate_number: "KB4-DOT-DA-2025-00142",
    issued_at: "2025-10-20T15:00:00Z",
    expires_at: "2027-10-20T15:00:00Z",
    revoked: false,
    revoked_at: null,
    revoked_reason: null,
  },
  {
    id: "cert-002",
    user_id: "u-003",
    course_id: "c-003",
    certificate_number: "KB4-COL-QT-2025-00287",
    issued_at: "2025-11-10T16:30:00Z",
    expires_at: "2026-11-10T16:30:00Z",
    revoked: false,
    revoked_at: null,
    revoked_reason: null,
  },
  {
    id: "cert-003",
    user_id: "u-004",
    course_id: "c-006",
    certificate_number: "KB4-RND-PM-2025-00315",
    issued_at: "2025-11-15T14:30:00Z",
    expires_at: "2027-11-15T14:30:00Z",
    revoked: false,
    revoked_at: null,
    revoked_reason: null,
  },
];

// ─── Derived / joined data helpers (for fallback/testing only) ────

export function getEnrollmentsWithCourses(userId: string): EnrollmentWithCourse[] {
  return mockEnrollments
    .filter((e) => e.user_id === userId)
    .map((e) => ({ ...e, courses: mockCourses.find((c) => c.id === e.course_id)! }))
    .filter((e) => e.courses);
}

export function getCertificatesWithCourses(userId: string): CertificateWithCourse[] {
  return mockCertificates
    .filter((c) => c.user_id === userId)
    .map((c) => ({ ...c, courses: mockCourses.find((course) => course.id === c.course_id)! }))
    .filter((c) => c.courses);
}

export function getPublishedCourses(): Course[] {
  return mockCourses.filter((c) => c.is_published);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return mockCourses.find((c) => c.slug === slug);
}

export function getModulesForCourse(courseId: string): CourseModule[] {
  return mockModules.filter((m) => m.course_id === courseId).sort((a, b) => a.order_index - b.order_index);
}

export function getLessonsForModule(moduleId: string): CourseLesson[] {
  return mockLessons.filter((l) => l.module_id === moduleId).sort((a, b) => a.order_index - b.order_index);
}

/** Demo current user — swap with Supabase session user */
export const CURRENT_USER_ID = "u-001";
export const CURRENT_PROFILE = mockProfiles.find((p) => p.user_id === CURRENT_USER_ID)!;
