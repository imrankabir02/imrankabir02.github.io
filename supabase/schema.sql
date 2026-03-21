-- =============================================================
-- Supabase Schema for Dynamic Portfolio
-- Run this in the Supabase SQL Editor to set up your database.
-- =============================================================

-- 1. Create the portfolio_data table (single-row store using JSONB)
CREATE TABLE IF NOT EXISTS public.portfolio_data (
  id          INTEGER PRIMARY KEY DEFAULT 1,
  data        JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prevent more than one row
ALTER TABLE public.portfolio_data
  ADD CONSTRAINT portfolio_data_single_row CHECK (id = 1);

-- 2. Enable Row Level Security
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Public (anon) can read portfolio data
CREATE POLICY "Public read access"
  ON public.portfolio_data
  FOR SELECT
  USING (true);

-- Only authenticated users (admin) can insert or update
CREATE POLICY "Authenticated insert"
  ON public.portfolio_data
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated update"
  ON public.portfolio_data
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 4. Auto-update the updated_at column on changes
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_portfolio_updated_at
  BEFORE UPDATE ON public.portfolio_data
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- =============================================================
-- SEED: Insert the initial portfolio data
-- Edit the JSON below to match your own portfolio content.
-- =============================================================
INSERT INTO public.portfolio_data (id, data) VALUES (
  1,
  '{
    "hero": {
      "name": "Imran Kabir",
      "title": "Mid-Level Backend Software Engineer",
      "tagline": "Building scalable, reliable, and high-performance backend systems with modern technologies.",
      "resumeUrl": "",
      "avatarUrl": "",
      "socialLinks": {
        "github": "https://github.com/imrankabir02",
        "linkedin": "",
        "twitter": "",
        "email": "imrankabir02@gmail.com"
      }
    },
    "about": {
      "bio": "I'\''m a backend-focused software engineer passionate about designing and building robust, scalable systems. With 4+ years of experience, I specialise in Python, Go, and Node.js backends, distributed architectures, and cloud-native deployments.",
      "highlights": [
        "Designed and maintained production microservices handling 100k+ daily requests",
        "Expert in RESTful & GraphQL API design with OpenAPI specification",
        "Strong background in relational and NoSQL database optimization",
        "Experience with Docker, Kubernetes, and CI/CD pipeline automation",
        "Advocate for clean code, TDD, and agile engineering practices"
      ],
      "location": "Dhaka, Bangladesh",
      "yearsOfExperience": 4
    },
    "skills": {
      "categories": ["Languages", "Frameworks", "Databases", "DevOps & Cloud", "Tools & Practices"],
      "items": [
        { "name": "Python", "level": 90, "category": "Languages" },
        { "name": "Go (Golang)", "level": 80, "category": "Languages" },
        { "name": "JavaScript / TypeScript", "level": 85, "category": "Languages" },
        { "name": "SQL", "level": 88, "category": "Languages" },
        { "name": "Django / DRF", "level": 90, "category": "Frameworks" },
        { "name": "FastAPI", "level": 85, "category": "Frameworks" },
        { "name": "Node.js / Express", "level": 80, "category": "Frameworks" },
        { "name": "Next.js", "level": 75, "category": "Frameworks" },
        { "name": "PostgreSQL", "level": 88, "category": "Databases" },
        { "name": "MongoDB", "level": 80, "category": "Databases" },
        { "name": "Redis", "level": 82, "category": "Databases" },
        { "name": "Elasticsearch", "level": 70, "category": "Databases" },
        { "name": "Docker", "level": 85, "category": "DevOps & Cloud" },
        { "name": "Kubernetes", "level": 72, "category": "DevOps & Cloud" },
        { "name": "AWS (EC2, S3, RDS, Lambda)", "level": 78, "category": "DevOps & Cloud" },
        { "name": "GitHub Actions / CI/CD", "level": 85, "category": "DevOps & Cloud" },
        { "name": "REST & GraphQL APIs", "level": 90, "category": "Tools & Practices" },
        { "name": "Celery / Message Queues", "level": 80, "category": "Tools & Practices" },
        { "name": "Microservices Architecture", "level": 80, "category": "Tools & Practices" },
        { "name": "TDD / BDD", "level": 78, "category": "Tools & Practices" }
      ]
    },
    "experiences": [
      {
        "id": "exp-1",
        "company": "TechCorp Solutions",
        "role": "Backend Software Engineer",
        "startDate": "2022-06",
        "endDate": null,
        "current": true,
        "description": "Leading backend development for a high-traffic SaaS platform serving 50,000+ users.",
        "responsibilities": [
          "Architected and developed RESTful microservices using Django DRF and FastAPI",
          "Reduced API response time by 40% through database query optimization and Redis caching",
          "Implemented event-driven messaging with RabbitMQ and Celery for asynchronous task processing",
          "Deployed containerized services with Docker and Kubernetes on AWS EKS",
          "Built CI/CD pipelines with GitHub Actions reducing deployment time by 60%"
        ],
        "techStack": ["Python", "Django DRF", "FastAPI", "PostgreSQL", "Redis", "RabbitMQ", "Docker", "Kubernetes", "AWS"],
        "companyUrl": ""
      }
    ],
    "projects": [
      {
        "id": "proj-1",
        "title": "Distributed Task Queue Engine",
        "description": "A lightweight, distributed task queue engine built in Go with support for priority queuing, retries, and dead-letter queues. Handles 10k+ tasks/second with horizontal scaling.",
        "techStack": ["Go", "Redis", "PostgreSQL", "Docker", "gRPC"],
        "githubUrl": "https://github.com/imrankabir02",
        "liveUrl": "",
        "imageUrl": "",
        "featured": true,
        "tags": ["Backend", "Distributed Systems", "Go"]
      }
    ],
    "contact": {
      "email": "imrankabir02@gmail.com",
      "availableForWork": true,
      "preferredContact": "email",
      "message": "Open to backend engineering roles and interesting collaboration opportunities."
    },
    "meta": {
      "lastUpdated": "2024-01-01T00:00:00.000Z",
      "version": "1.0"
    }
  }'
) ON CONFLICT (id) DO NOTHING;
