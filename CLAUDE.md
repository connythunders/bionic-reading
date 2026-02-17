# CLAUDE.md

This file documents the codebase structure, conventions, and workflows for AI assistants working in this repository.

## Project Overview

An educational technology platform for Swedish teachers and students. It provides AI-powered quiz generation, interactive teaching tools, and curriculum management for the Swedish school system (GY25 upper secondary, LGR22 primary). The platform is deployed as static HTML pages on GitHub Pages with an optional Node.js backend for AI features.

## Repository Structure

```
bionic-reading/
├── index.html              # Main landing/hub page
├── start.html              # Learning portal overview
├── ai-quiz-generator.html  # AI-powered quiz tool (requires backend)
├── ai-language-coach.html  # Language coaching tool
├── adaptivt-prov.html      # Adaptive testing tool
├── gruppgenerator.html     # Classroom group generator
├── klassrumsskarm.html     # Classroom management screen
├── logo-vectorizer.html    # Logo vectorization tool
├── gy25-laroplan.html      # GY25 (upper secondary) curriculum tool
├── lgr22-laroplan.html     # LGR22 (primary) curriculum tool
├── quiz-standalone.html    # Standalone WWI quiz
├── missionscentralen.html  # Mission center tool
├── bibeln-laromedel.html   # Bible teaching materials
├── judendom-laromedel.html # Judaism teaching materials
├── islam-ovningar.html     # Gamified Islam exercises (grade 8)
├── demokratins-framvaxt.html # Democracy/history content
├── english-exercises.html  # English language exercises
├── studera.html            # ADHD-focused study platform
├── murder-mystery.html     # Gamified murder mystery (horse farm theme)
├── css/
│   └── styles.css          # Main stylesheet (animated rainbow gradient theme)
├── js/
│   └── quiz.js             # WWI quiz class with hardcoded questions
├── backend/                # Optional Node.js API (for AI quiz generation)
│   ├── server.js           # Express entry point (port 3000)
│   ├── routes/
│   │   └── quiz.js         # All /api/quiz/* endpoints
│   ├── services/
│   │   ├── aiQuizGenerator.js  # Gemini AI question generation
│   │   ├── aiEvaluator.js      # Gemini AI feedback generation (Swedish)
│   │   └── fileParser.js       # PDF/DOCX text extraction
│   ├── .env.example        # Required environment variables
│   ├── Dockerfile          # Node 18 Alpine image
│   └── package.json
├── docker-compose.yml      # PostgreSQL + backend + NGINX (port 8080)
├── init.sql                # PostgreSQL schema (4 tables)
├── CNAME                   # connythunders.github.io domain config
└── *.md                    # Documentation files (mix of Swedish and English)
```

## Technology Stack

### Frontend
- **Vanilla HTML5, CSS3, JavaScript** — no frameworks, no build step
- Each tool is a self-contained `.html` file with inline `<script>` and `<style>` blocks or references to `css/styles.css` and `js/quiz.js`
- Deployed as a static site on **GitHub Pages**
- Responsive design using CSS Grid and Flexbox
- Animated gradient backgrounds are a common design motif

### Backend (optional, for AI quiz feature)
- **Node.js 18** + **Express 4**
- **PostgreSQL 15** — stores uploaded documents, quiz sessions, results
- **Google Gemini API** (`@google/generative-ai`) — generates quiz questions and feedback
- **multer** — file upload (PDF/DOCX, max 10 MB)
- **pdf-parse** / **mammoth** — text extraction from uploaded files
- Containerised via **Docker Compose**

## Backend API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/quiz/upload` | Upload PDF/DOCX, extract text |
| POST | `/api/quiz/generate` | Generate 25 quiz questions via Gemini |
| POST | `/api/quiz/evaluate` | Evaluate answers, get AI feedback |
| GET | `/api/quiz/sessions/:id` | Retrieve a quiz session |
| GET | `/api/quiz/history` | 50 most recent quiz completions |

All upload endpoints accept `multipart/form-data`. Question generation and evaluation use JSON bodies.

## Database Schema

Four tables in PostgreSQL (defined in `init.sql`):

- `quiz_results` — basic score storage (name, score, total, percentage)
- `documents` — uploaded file metadata (filename, word count, upload timestamp)
- `quiz_sessions` — generated quiz with questions stored as JSONB
- `ai_quiz_results` — detailed attempt record (user answers, AI feedback text)

## Environment Variables

Copy `backend/.env.example` to `backend/.env` before running the backend:

```
PORT=3000
DB_HOST=postgres        # 'localhost' for local dev, 'postgres' in Docker
DB_PORT=5432
DB_NAME=quizdb
DB_USER=root
DB_PASSWORD=root
GEMINI_API_KEY=your_api_key_here
```

## Development Workflows

### Frontend-only (most common)

No build step required. Edit HTML/CSS/JS files directly and open in a browser, or push to the `master` branch to deploy to GitHub Pages.

```bash
# Preview locally — any static server works
npx serve .
# or
python3 -m http.server 8000
```

### Backend development

```bash
cd backend
cp .env.example .env      # fill in GEMINI_API_KEY
npm install
npm run dev               # nodemon auto-restart on changes
```

### Full stack with Docker

```bash
docker-compose up --build
# Frontend: http://localhost:8080
# Backend:  http://localhost:3000
# DB:       localhost:5432
```

## Key Conventions

### Language
- **UI and user-facing text is in Swedish** — maintain this for all new educational content and feedback strings.
- Documentation files are a mix of Swedish and English; match the language of the file being edited.
- AI feedback from `aiEvaluator.js` is always generated in Swedish (the Gemini prompt enforces this).

### Frontend HTML files
- Each tool is a **standalone `.html` file** — avoid creating shared JS/CSS dependencies unless they already exist in `css/` or `js/`.
- Inline `<script>` and `<style>` blocks are acceptable and common.
- Use the existing animated gradient / card-based design language for visual consistency.

### Backend services
- Keep route handlers thin; business logic belongs in `backend/services/`.
- All file uploads are validated for MIME type and size (10 MB limit) in `routes/quiz.js` before reaching service code.
- Gemini responses are parsed with regex extraction to handle non-JSON preamble; always include a fallback for JSON parse failures.
- AI feedback is capped at 150–250 words and must be encouraging in tone (see `aiEvaluator.js`).

### Git
- Commit messages are written in **Swedish** (matches existing history).
- Feature branches follow the pattern `claude/<description>-<id>`.
- Push to the branch named `claude/claude-md-mlr2d03oeggq8yxv-jRViC` for this session.

## No Test Suite

There are no automated tests. Validation is manual. When making backend changes, verify manually with:

```bash
# Health check
curl http://localhost:3000/api/health

# Test file upload (replace with a real file)
curl -X POST http://localhost:3000/api/quiz/upload \
  -F "document=@/path/to/file.pdf"
```

## Curriculum Tools Notes

- `gy25-laroplan.html` integrates with the **Skolverket (Swedish National Agency for Education) API** to fetch live GY25 curriculum data. Treat this API as external and handle failures gracefully.
- `lgr22-laroplan.html` uses the same Skolverket API pattern for primary school curriculum (LGR22).
- These files are large (91–120 KB) due to embedded curriculum data and should be handled carefully to avoid merge conflicts.

## Common Pitfalls

- `js/quiz.js` contains **hardcoded WWI questions** — do not assume it is a generic quiz engine.
- The `backend/` directory has its own `package.json`; run `npm install` inside `backend/`, not at the root.
- The root directory has **no** `package.json` — there is no root-level Node project.
- Docker Compose default credentials (`root`/`root`) are for local development only; never use in production.
- The `CNAME` file must not be deleted or GitHub Pages custom domain will break.
