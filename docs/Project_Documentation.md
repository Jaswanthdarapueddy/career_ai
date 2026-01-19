# CareerAI – AI-Powered Career Guidance & Employment Readiness System

## Project Overview
CareerAI is a minimal, AI-driven platform aligned with SDG-8 (Decent Work and Economic Growth). It analyzes user profiles, recommends career paths, generates ATS-friendly resumes, suggests certifications and projects, and provides a skill development roadmap using Agentic AI automation.

---

## Tech Stack
- **Frontend**: React (Vite), Lucide React icons, glassmorphism UI
- **Backend**: Python FastAPI
- **AI/Workflow**: Relay.app (Agentic AI automation)
- **Database**: Supabase (PostgreSQL)

---

## Core Features
1. User profile input (education, skills, interests, experience)
2. AI-powered career role recommendations
3. Identification of missing/weak skills
4. Professional, ATS-friendly resume generation
5. Suggested certifications and projects
6. Structured skill development roadmap
7. Secure storage of user data and AI outputs

---

## Architecture Diagram
```
Frontend (React/Vite) → API Proxy → FastAPI → Relay.app (AI Workflow) → Supabase
```

---

## Directory Structure
```
career-ai-demo/          # React frontend
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── IntelligenceSection.jsx
│   │   ├── CareerFlow.jsx
│   │   └── careerflow/
│   │       ├── FormStep.jsx
│   │       ├── LoaderStep.jsx
│   │       └── ResultStep.jsx
│   ├── global.css
│   ├── design-tokens.js
│   ├── main.jsx
│   └── App.jsx
├── index.html
├── vite.config.js
└── package.json

backend/                 # FastAPI backend
├── main.py
├── supabase_client.py
├── requirements.txt
└── .env

docs/                    # Documentation
├── Relay_Workflow_Design.md
└── Project_Documentation.md
```

---

## Setup Instructions

### Frontend
```bash
cd career-ai-demo
npm install
npm run dev
# Visit http://127.0.0.1:5173
```

### Backend
```bash
cd backend
pip install -r requirements.txt
start_backend.bat
# API runs on http://127.0.0.1:8000
```

### Supabase
- Create tables `user_profiles` and `ai_outputs` using `backend/supabase_schema.sql`
- Add `SUPABASE_URL` and `SUPABASE_KEY` (service_role) to `backend/.env`

### Relay.app
- Design workflow per `docs/Relay_Workflow_Design.md`
- **CRITICAL**: Ensure you add a "Webhook Response" step at the end of the workflow to return the JSON data. If missed, the app will receive a `runId` only.
- Copy webhook URL to `backend/.env` as `RELAY_WEBHOOK_URL`

---

## API Endpoints
- `POST /process-profile`
  - Accepts: UserProfile JSON
  - Forwards to Relay.app
  - Stores profile and AI output in Supabase
  - Returns: AI-generated recommendations

---

## Database Schema
- `user_profiles`: id, name, education, skills, interests, experience, created_at
- `ai_outputs`: id, user_id, career_roles, missing_skills, certifications, projects, resume, roadmap, created_at

---

## UI Design System
- **Colors**: Obsidian (#050505), Bone (#E3DAC9), Bone Dim (#c4bdaf), Lavender (#F4F1F8)
- **Typography**: Space Grotesk (Headings), Inter (Body), Outfit (Brand)
- **Style**: Glassmorphism with smooth reveal animations

---

## Future Enhancements
- User authentication
- Export resume to PDF
- Progress tracking for roadmap
- Integration with job boards
- Multi-language support

---

## License
MIT License

---

## Contact
For questions or contributions, please open an issue in the project repository.
