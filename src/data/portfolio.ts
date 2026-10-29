/**
 * Single source of truth for every word on this site.
 * Edit here, commit, and CI redeploys — no CMS, no database round-trip.
 */

export interface Experience {
  year: string;
  role: string;
  company: string;
  ownership: string;
  metric?: string;
  metricLabel?: string;
  outcome: string;
  description: string;
  technologies: string[];
}

export interface Education {
  title: string;
  name: string;
  location: string;
  year: string;
}

export interface SkillGroup {
  heading: string;
  items: string[];
}

export interface Project {
  title: string;
  ownership: string;
  status: string;
  metric?: string;
  metricLabel?: string;
  outcome: string;
  org?: string;
  context: string;
  note?: string;
  appLink?: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  featured?: boolean;
}

export const MY_DETAILS = {
  name: "Mridha Imran Kabir",
  title: "Backend Engineer",
  role: "IT Engineer at",
  company: "BIFPCL",
  companyLink: "https://www.bifpcl.com/",
  email: "imrankabir325@gmail.com",
  address: "Bagerhat, Bangladesh",
  github: "https://github.com/imrankabir02",
  availability: "Open to full-time remote roles",
} as const;

export const ABOUT_TEXT = `Backend engineer in Django, Laravel, and FastAPI. Most of my work is unglamorous: slow queries made fast, jobs that survive bad input, systems that tell you when they break.

I care about the 2am details — idempotent jobs, per-row error isolation, tenant data the database itself keeps from leaking, indexes chosen for the real query. I've owned systems end to end — a multi-tenant SaaS backend, a broad internal platform, workflow engines, data pipelines — from schema design through migration, deployment, and the Linux boxes they run on.

Outside work I build in TypeScript and Flutter: a licensed warehouse/POS system on NestJS, a live-tracking app on Supabase and Postgres policies, a marketplace on PostGIS, and a published open dataset of Bangladesh's electricity demand.`;

export const SKILLSETS: string[] = [
  "REST API design",
  "Query optimisation & indexing",
  "Background jobs & queues",
  "Multi-tenant data isolation",
  "Real-time systems (WebSockets, LISTEN/NOTIFY)",
  "Geospatial queries (PostGIS)",
  "Workflow & state machines",
  "Schema design & migrations",
  "Deployment & CI/CD",
  "Offline-first & licence-based app design",
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    heading: "Languages",
    items: ["Python", "TypeScript", "PHP", "Dart", "JavaScript"],
  },
  {
    heading: "Frameworks",
    items: ["Django", "Laravel", "FastAPI", "NestJS", "Next.js", "React", "Flutter"],
  },
  {
    heading: "Data",
    items: ["PostgreSQL", "PostGIS", "TimescaleDB", "MySQL", "MSSQL", "SQLite", "Supabase", "Redis"],
  },
  {
    heading: "Infrastructure",
    items: ["Docker", "Celery", "Nginx", "Linux", "WebSockets", "GitHub Actions", "GitLab CI", "AWS", "Git"],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    year: "July 2026 - Present",
    role: "Backend Engineer (Contract)",
    company: "CloudHub",
    ownership: "LEAD",
    outcome:
      "I own the backend architecture and the design docs that justify it.",
    description: `Lead backend author on a multi-tenant B2B SaaS platform. Tenant isolation is enforced in the database with PostgreSQL Row-Level Security, so a missing WHERE clause fails closed instead of leaking another tenant's data. Also built a transactional outbox for reliable notifications, TimescaleDB time-series ingestion, and concurrency-safe scheduling. I own the backend architecture and its design docs.`,
    technologies: [
      "FastAPI",
      "PostgreSQL",
      "TimescaleDB",
      "Row-Level Security",
      "Transactional Outbox",
      "Celery",
      "Docker",
      "Nginx",
    ],
  },
  {
    year: "June 2025 - Present",
    role: "IT Engineer",
    company: "BIFPCL",
    ownership: "SOLE",
    metric: "80+",
    metricLabel: "MODELS",
    outcome:
      "Migrated SQLite → MSSQL in place, then kept shipping on top of it.",
    description: `Titled IT Engineer, but the work is mostly backend. Primary author of a large internal Django platform — a multi-module monolith I've built and maintained single-handed since late 2025. Migrated it from SQLite to MSSQL in place, moved slow file handling onto background workers, and extracted a heavily-used module into its own service. Plus Linux operations, containerised deployment, and monitoring.`,
    technologies: [
      "Django",
      "DRF",
      "Celery",
      "Redis",
      "MSSQL",
      "Linux",
      "Nginx",
    ],
  },
  {
    year: "January 2025 - June 2025",
    role: "Software Engineer",
    company: "Barikoi Maps",
    ownership: "BACKEND",
    outcome:
      "Geofence and nearby-point queries stayed fast as the dataset grew.",
    description: `Location-intelligence backends in Laravel and MySQL: spatial filtering — geofence containment, nearby-point lookups — and the indexing to keep it fast as data grew. Redis for caching and queues, Laravel WebSockets for real-time, Docker on AWS.`,
    technologies: [
      "Laravel",
      "MySQL",
      "Spatial Indexing",
      "Redis",
      "WebSockets",
      "Docker",
      "AWS",
    ],
  },
  {
    year: "January 2024 - January 2025",
    role: "Backend Developer",
    company: "Phone Tech BD Ltd",
    ownership: "BACKEND",
    metric: "2",
    metricLabel: "APPS",
    outcome: "Both shipped; Shifttrek is still in production.",
    description: `First professional backend role. Built two Laravel applications from scratch — including Shifttrek, a workforce-scheduling product now in production — covering schema design, REST APIs, and authentication, and refactored legacy modules that had grown hard to change safely.`,
    technologies: [
      "Laravel",
      "MySQL",
      "Livewire",
      "REST API",
      "Database Design",
    ],
  },
];

export const EDUCATIONS: Education[] = [
  {
    title: "B.Sc in Computer Science & Engineering",
    name: "Khulna University",
    location: "Khulna, Bangladesh",
    year: "January 2018 - March 2024",
  },
  {
    title: "HSC in Science",
    name: "Digraj Degree College",
    location: "Mongla, Bagerhat, Bangladesh",
    year: "2014 - 2016",
  },
];

// Ordered strongest first. Backend systems don't photograph well, so each card is
// a short problem → decision → tradeoff, not a screenshot. Keep them tight: one- or
// two-sentence description, at most three highlights. Employer/client systems are
// named (`org`) and described at the engineering level only — architecture and
// decisions, never data, secrets, repositories, or internal infrastructure.
export const PROJECTS: Project[] = [
  {
    title: "CloudHR",
    featured: true,
    ownership: "LEAD",
    status: "In production",
    outcome:
      "Tenant isolation the database itself enforces — a missed WHERE clause fails closed, not open.",
    org: "Lead Backend Engineer · CloudHub",
    context: "FastAPI · PostgreSQL · TimescaleDB",
    note: "Client product · code is private — walkthrough on request.",
    description:
      "A multi-tenant B2B SaaS I'm the lead backend author on. The whole design turns on tenant isolation — enforced in the database with PostgreSQL Row-Level Security, so a forgotten WHERE clause fails closed instead of leaking another tenant's data.",
    highlights: [
      "Tenant isolation via database-enforced Row-Level Security, not app-layer filtering",
      "Transactional outbox so notifications survive a broker outage",
      "TimescaleDB time-series ingestion with evaluation in a background worker",
    ],
    technologies: [
      "FastAPI",
      "PostgreSQL",
      "TimescaleDB",
      "Row-Level Security",
      "Celery",
      "Docker",
    ],
  },
  {
    title: "BIFPCL Operations Platform",
    featured: true,
    ownership: "SOLE",
    status: "In production",
    metric: "80+",
    metricLabel: "MODELS",
    outcome:
      "One author, one migration path, and still deployable as requirements keep arriving.",
    org: "Sole backend author · BIFPCL",
    context: "Django · MSSQL · Docker · CI/CD",
    note: "Internal system · code is private — walkthrough on request.",
    description:
      "The internal operations platform at BIFPCL — a multi-module Django monolith I'm the sole author of, covering a broad range of operational workflows. The engineering problem is keeping a system this wide coherent, migratable, and deployable as requirements keep arriving.",
    highlights: [
      "80+ models under one Django project, single-author ownership",
      "In-place SQLite → MSSQL migration behind a data-migration script",
      "Containerised nginx / uWSGI stack with a fail-fast CI pipeline",
    ],
    technologies: ["Django", "MSSQL", "Docker", "Nginx", "uWSGI", "CI/CD"],
  },
  {
    title: "Bangladesh Electricity Demand Dataset",
    featured: true,
    ownership: "SOLO",
    status: "Published",
    metric: "2,469",
    metricLabel: "DAYS",
    outcome:
      "Public PDFs with no API, turned into tidy tables that check themselves.",
    context: "Python · Web scraping · PDF extraction · Zenodo",
    appLink: "https://doi.org/10.5281/zenodo.21783853",
    description:
      "Daily electricity demand, generation and load-shedding data for Bangladesh, reconstructed from PDF reports that BPDB and NLDC publish with no bulk download and no API. Scrapers and extractors turn them into tidy CSVs at system, zone, power-station and substation level, from 2019 to 2026, with a dataset paper in preparation.",
    highlights: [
      "Resume-safe scrapers: re-running fills gaps instead of starting over",
      "Extraction validated against identities the source itself must satisfy, not plausibility rules",
      "Versioned release with a DOI, a citation file, and ERA5 weather and BPDB's own forecast alongside",
    ],
    technologies: ["Python", "pdftotext", "Scrapers", "ERA5", "Zenodo"],
  },
  {
    title: "WPOS — Warehouse & POS with Central Licensing",
    ownership: "SOLO",
    status: "In development",
    outcome:
      "Software installed on a customer's own server that still can't run without a signed licence.",
    context: "NestJS · React · Prisma · Ed25519",
    note: "Private repository — walkthrough on request.",
    description:
      "An on-premise warehouse and point-of-sale system, activated by an Ed25519-signed licence token from a hosted central monitoring system. A shared licence-core package holds the token format, verification, machine fingerprint and state machine for both sides.",
    highlights: [
      "pnpm/Turborepo monorepo: client API and web, CMS API and web, a shared licence-core package",
      "Catalog, purchasing, accounting and a POS with offline sync, split payments, post-dated cheques and refunds",
      "CMS with licence lifecycle, telemetry, releases, key rotation and an audit trail; Docker, .deb and Windows installers",
    ],
    technologies: ["NestJS", "React", "Prisma", "PostgreSQL", "Electron", "Docker"],
  },
  {
    title: "Varalagbe — Local Micro-Job Marketplace",
    ownership: "SOLO",
    status: "Pre-launch",
    outcome:
      "Moved the whole backend from Django to TypeScript without logging a single user out.",
    context: "TypeScript · Supabase · PostGIS · Flutter",
    note: "Private repository — walkthrough on request.",
    description:
      "A hyperlocal two-sided marketplace matching customers with nearby verified workers for household jobs, from posting a job through price negotiation, completion, a commission ledger and ratings. I migrated the backend from Django to a TypeScript API on Supabase, planned so existing sessions kept working.",
    highlights: [
      "PostGIS radius search to rank nearby workers; phone-OTP auth with rotating refresh tokens",
      "WebSocket chat fanned out across instances with Postgres LISTEN/NOTIFY, with message order preserved",
      "Customer and worker Flutter apps sharing one core package; CI on backend and mobile",
    ],
    technologies: ["TypeScript", "Hono", "Supabase", "PostGIS", "Flutter", "pg_cron"],
  },
  {
    title: "TripTrack — Live Transport Tracking",
    ownership: "SOLO",
    status: "Live",
    outcome:
      "A whole backend with no server to run — the database's own rules decide who sees what.",
    context: "Flutter · Supabase · MapLibre",
    appLink: "/triptrack",
    description:
      "A private, approval-based transport app for a closed community of passengers, drivers and a transport authority. Passengers watch their bus live on a map, drivers broadcast GPS during a trip, and admins approve registrations and schedule trips. Access is enforced by Postgres Row Level Security rather than a custom server.",
    highlights: [
      "One Flutter app, three roles; the screens follow the signed-in user's role",
      "Schema, RLS policies and RPC functions in migrations, with RLS tests on plain PostgreSQL",
      "Bus-near-my-stoppage alerts, trip scheduling on the Bangladesh working week, Android APKs per ABI",
    ],
    technologies: ["Flutter", "Supabase", "Row Level Security", "MapLibre", "GitHub Actions"],
  },
  {
    title: "Gatepass — Approval Workflow",
    ownership: "BACKEND",
    status: "In production",
    outcome:
      "No approval can land half-applied — every transition is atomic and recoverable.",
    org: "Backend · BIFPCL",
    context: "Django · DRF · Celery · Redis",
    note: "Internal system · code is private — walkthrough on request.",
    description:
      "BIFPCL's gate-pass approval system, extracted from the platform above into its own service. Requests route through multiple approvers, each transition modelled as an explicit finite state machine — so an approval can't land in an inconsistent or unrecoverable state. The core problem is correctness under concurrent, multi-step approvals.",
    highlights: [
      "Approval state machine on django-fsm — atomic and recoverable, no half-applied transitions",
      "JWT-authenticated API with bulk actions and CSV export",
      "Celery + Redis for background work and operational alerting",
    ],
    technologies: ["Django", "DRF", "Celery", "Redis", "django-fsm", "Docker"],
  },
  {
    title: "Vendor Procurement Portal",
    ownership: "BACKEND",
    status: "In production",
    metric: "2",
    metricLabel: "PORTALS",
    outcome:
      "Two audiences, one domain model, and business rules that live in exactly one place.",
    org: "Backend · BIFPCL",
    context: "Django · Services Layer · UBAC",
    note: "Internal system · code is private — walkthrough on request.",
    description:
      "BIFPCL's vendor procurement portal — a dual-portal design (external for vendors, internal for staff) over one shared domain model. The focus is separation of concerns: business rules live in a dedicated services layer, not in views or models.",
    highlights: [
      "Dual-portal architecture over one shared domain model",
      "Business rules isolated in a dedicated services layer",
      "Database-driven fine-grained access control (UBAC) with a full audit trail",
      "Access-controlled file delivery with upload validation, and per-action activity logging",
    ],
    technologies: ["Django", "Services Layer", "UBAC", "Tailwind", "Bootstrap"],
  },
  {
    title: "Hospital Patient Service System",
    ownership: "SOLO",
    status: "In development",
    outcome:
      "A patient's journey from registration to billing, with the waiting room's screen updating live.",
    org: "Backend · Healthcare client system",
    context: "Django · Channels · MSSQL",
    note: "Client system · architecture only — walkthrough on request.",
    description:
      "An integrated patient service system covering registration, queueing, consultation, investigations, inpatient care and billing. Visits get a daily serial token and a WebSocket-driven display board shows the queue live.",
    highlights: [
      "Consultations stay draft until signed, then lock; later changes are addenda, not edits",
      "Signed orders route to the owning department's worklist; inpatient charting, bedside ordering and medication administration records",
      "Role-based staff UI, invoices and payments with revenue analytics, plus characterization tests around lab and pharmacy flows",
    ],
    technologies: ["Django", "DRF", "Channels", "MSSQL", "Redis", "Docker"],
  },
  {
    title: "Log Ingestion & Monitoring",
    ownership: "BACKEND",
    status: "In production",
    outcome:
      "One broken index can no longer freeze every other device's logs, and someone is told when it happens.",
    org: "Backend · CloudHub",
    context: "Django · Celery · Docker · Telegram alerts",
    note: "Client product · architecture only — walkthrough on request.",
    description:
      "A log-ingestion and monitoring product for network operators. My work is on reliability and correctness: isolating ingestion failures, making search return only the right subscriber's logs, and alerting operators on problems and recovery.",
    highlights: [
      "Ingestion isolates per-index failures and raises an alert instead of stalling",
      "Search and router filters matched on exact host and per-router identity, not on IP prefixes or reused addresses",
      "Telegram and SMTP alerts for client faults and recovery, with licence renewal history and exports",
    ],
    technologies: ["Django", "Celery", "Docker", "Telegram Bot API", "SMTP"],
  },
  {
    title: "Reliable Background Import System",
    featured: true,
    ownership: "SOLO",
    status: "Private repo",
    metric: "54",
    metricLabel: "TESTS",
    outcome:
      "One bad row can no longer abort the run — failures stay queryable and re-exportable.",
    context: "Laravel · MySQL · Redis queues",
    note: "Private repository — happy to walk through the code on request.",
    description:
      "Monica CRM imports contacts synchronously in-request — the whole file loaded into memory, timing out past a few hundred rows. I rebuilt it as an async pipeline: the CSV streams row by row, work chains across queue jobs, and each row's outcome is recorded independently so one bad record can't abort the run.",
    highlights: [
      "Three-stage job chain, configurable batch size; streamed, never fully buffered",
      "Per-row error isolation — failed rows stay queryable and export as a corrected CSV",
      "54 tests / 189 assertions, plus ADRs on the key tradeoffs",
    ],
    technologies: ["Laravel 11", "MySQL", "Redis", "Queue Workers", "PHPUnit"],
  },
  {
    title: "Legal Document Intelligence Pipeline",
    ownership: "SOLO",
    status: "Private repo",
    metric: "57",
    metricLabel: "TESTS",
    outcome:
      "Every generated claim traces back to the source passage it came from.",
    context: "FastAPI · Python · Chroma · Docker",
    note: "Private repository — happy to walk through the code on request.",
    description:
      "An ingestion-to-draft pipeline for messy legal documents. PDFs are extracted (OCR fallback) and cleaned, retrieved over a hybrid BM25 + vector index, then a grounded draft is generated with citations back to the source.",
    highlights: [
      "Hybrid retrieval — BM25 for exact terms, Chroma vectors for semantic recall",
      "Grounded output with an evidence trail back to source passages",
      "Learns from operator edits (capture → diff → pattern store) · 57 tests, dockerised",
    ],
    technologies: ["FastAPI", "Python", "Chroma", "BM25", "React", "Docker"],
  },
  {
    title: "Shifttrek — Workforce Management Platform",
    ownership: "BACKEND",
    status: "Live",
    outcome: "In production and serving live scheduling workflows today.",
    org: "Backend · Phone Tech BD",
    context: "Production system · Laravel · MySQL",
    appLink: "https://www.shifttrek.com/",
    description:
      "A production workforce-scheduling product built at Phone Tech, now serving live operational workflows. My work centred on backend stability and database efficiency — schema design, query tuning, and predictable scheduling logic under real use.",
    technologies: ["Laravel", "MySQL", "Livewire", "TailwindCSS"],
  },
  {
    title: "CV Studio",
    ownership: "SOLO",
    status: "Live",
    metric: "0",
    metricLabel: "SIGN-UP",
    outcome:
      "Fully usable with no account — cloud sync is opt-in, and off by default.",
    context: "React 19 · Vite · Supabase",
    appLink: "https://cv-studio-v1.vercel.app/",
    description:
      "A free, no-signup CV builder for freshers. Local-first by design — everything lives in the browser, with optional Supabase sign-in for cross-device sync that stays off by default. The hard parts here are product ones: guiding someone who's staring at a blank field, and a PDF export that keeps text selectable and ATS-readable.",
    highlights: [
      "Local-first — fully usable with no account; cloud sync is opt-in via Supabase",
      "Guided authoring: 7 starter personas, inline writing tips, a completeness / ATS meter",
      "Print-ready A4 PDF export with selectable text, plus JSON import / export",
    ],
    technologies: ["React 19", "Vite", "Supabase", "localStorage"],
  },
  {
    title: "Income & Expense Tracker",
    ownership: "SOLO",
    status: "Live",
    metric: "0",
    metricLabel: "SERVERS",
    outcome:
      "No backend and no telemetry — backups live in the user's own Google account, encrypted.",
    context: "Flutter · SQLite · Google Drive",
    note: "Open on request · Android build.",
    description:
      "An offline-first personal finance app. Transactions live in a local SQLite database; backups are AES-256 encrypted and stored in the user's own Drive. The decryption key sits in Drive's hidden app-data folder, so signing in on a new phone restores everything.",
    highlights: [
      "Encrypted backup with scheduled runs, retention, and replace / merge / selective restore with a preview",
      "Accounts, budgets with alert thresholds, recurring transactions, receipt photos, CSV / Excel / PDF export",
      "Biometric app lock; CI that fails fast on bad signing secrets",
    ],
    technologies: ["Flutter", "sqflite", "AES-256", "Google Drive API", "GitHub Actions"],
  },
  {
    title: "Supervisor Radar",
    ownership: "SOLO",
    status: "In use",
    outcome:
      "Where a directory can't be crawled, it finds the same people from the open bibliographic record.",
    context: "Python · Crawling · OpenAlex · FastAPI",
    note: "Open on request.",
    description:
      "A pipeline that finds, enriches and ranks research supervisors for MS/PhD applications. It crawls faculty pages, resolves each person against open bibliographic APIs, detects funding and recruiting signals, scores fit, drafts outreach and tracks applications in a dashboard. Retargeting to another field means editing one YAML file.",
    highlights: [
      "Per-host polite crawling with departments run in parallel",
      "Falls back to bibliographic data for bot-challenged or client-rendered directories",
      "Refresh runs on CI and commits the updated export",
    ],
    technologies: ["Python", "FastAPI", "OpenAlex", "ORCID", "YAML", "GitHub Actions"],
  },
  {
    title: "content-maker — Automated Video Pipeline",
    ownership: "SOLO",
    status: "In use",
    outcome:
      "A daily video with a human approval tap, and no topic or snippet ever reused.",
    context: "TypeScript · Remotion · GitHub Actions",
    note: "Open on request.",
    description:
      "Every day an LLM proposes one code trick, Remotion renders it as a vertical code animation, and the MP4 goes to Telegram for a quick approval before publishing as a YouTube Short and an Instagram Reel. A committed ledger prevents repeats.",
    highlights: [
      "LLM generation, render, human approval gate, then publishing, all on GitHub Actions",
      "Dedup ledger committed to the repo; written design blueprint with platform and policy-risk notes",
    ],
    technologies: ["TypeScript", "Remotion", "Gemini / Claude API", "Telegram Bot API", "GitHub Actions"],
  },
  {
    title: "Khulna University CSE Alumni Portal",
    ownership: "SOLO",
    status: "Prototype",
    outcome:
      "A modular monolith where each domain is its own app and could be extracted later.",
    context: "Django · Next.js · PostgreSQL · Celery",
    note: "Community project · walkthrough on request.",
    description:
      "A verified-membership network for the department's alumni, replacing a static directory. Directory, mentorship, job board with referrals, events, forums and a moderation and verification portal sit in separate Django apps behind one deployable unit.",
    highlights: [
      "Verification and moderation queues with an audit log",
      "Transactional email through Celery so slow SMTP never blocks a response; images transcoded to WebP on ingest",
    ],
    technologies: ["Django", "DRF", "Next.js", "PostgreSQL", "Redis", "Celery"],
  },
  {
    title: "BanglaHealth — Health Records Prototype",
    ownership: "SOLO",
    status: "Prototype",
    metric: "~20",
    metricLabel: "MODELS",
    outcome:
      "A doctor sees a record only after the citizen approves — and a test matrix enforces it.",
    context: "Django · DRF · Celery · Docker",
    note: "Work-in-progress prototype — private repository, walkthrough on request.",
    description:
      "A prototype health-records platform built around the hard domain problems rather than CRUD: patient–practitioner relationships, consent over who can read a record, and reporting aggregation.",
    highlights: [
      "~20 models across patients, practitioners, records, and consent",
      "Celery workers for notifications and background aggregation",
      "Consent enforcement matrix, CI-generated keys, and a rehearsed restore — honest status: prototype, not production",
    ],
    technologies: ["Django", "DRF", "Celery", "PostgreSQL", "Docker"],
  },
];

