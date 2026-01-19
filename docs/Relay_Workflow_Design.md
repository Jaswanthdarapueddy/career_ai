# Relay.app Workflow Design: CareerAI Profile Processor

## Overview
This Relay.app workflow orchestrates AI-driven career guidance, resume generation, and skill development planning based on user profile data received from the FastAPI backend.

---

## 1. Trigger: Manual Webhook
- **Type**: Manual Trigger (Webhook)
- **Method**: POST
- **Input**: JSON payload from FastAPI backend
- **Expected Payload**:
```json
{
  "name": "string",
  "education": "string",
  "skills": "string",
  "interests": "string",
  "experience": "string"
}
```

---

## 2. Step: Career Analysis Agent
- **Purpose**: Analyze education, skills, interests, and experience to recommend suitable career roles.
- **Prompt Template**:
```
You are a career guidance AI. Based on the user profile:
- Name: {{name}}
- Education: {{education}}
- Skills: {{skills}}
- Interests: {{interests}}
- Experience: {{experience}}

Return a JSON object with:
{
  "career_roles": ["role1", "role2", ...],
  "missing_skills": ["skill1", "skill2", ...],
  "certifications": ["cert1", "cert2", ...],
  "projects": ["proj1", "proj2", ...],
  "roadmap": ["step1", "step2", ...],
  "resume": "ATS-friendly resume content"
}
```
- **Output**: Pass structured JSON to next step.

---

## 3. Step: Resume Generation Agent
- **Purpose**: Generate a professional, ATS-friendly resume using the profile and career analysis.
- **Prompt Template**:
```
Generate an ATS-friendly resume for:
{{name}}
Education: {{education}}
Skills: {{skills}}
Interests: {{interests}}
Experience: {{experience}}

Include:
- Professional summary
- Skills section
- Education
- Experience (if any)
- Projects (if any)
- Certifications (if any)

Format: Plain text, no markdown.
```
- **Output**: Resume string, merged into final JSON.

---

## 4. Step: Skill & Employment Readiness Agent
- **Purpose**: Identify missing/weak skills and create a learning roadmap.
- **Prompt Template**:
```
Based on the profile and recommended roles, identify:
- Missing or weak skills
- Recommended certifications
- Suggested academic/personal projects
- A step-by-step skill development roadmap

Return as JSON fields:
{
  "missing_skills": [...],
  "certifications": [...],
  "projects": [...],
  "roadmap": [...]
}
```
- **Output**: Merged into final JSON.

---

## 5. Step: Final Output Step
- **Purpose**: Consolidate all outputs and return to FastAPI.
- **Action**: Merge all agent outputs into a single JSON object.
- **Response Body**: Return the consolidated JSON to the webhook caller.

---

## 6. Webhook URL
- After saving the workflow, copy the webhook URL from the Manual Trigger step.
- Paste into `backend/.env` as `RELAY_WEBHOOK_URL`.

---

## 7. Testing
- Use tools like Postman or curl to POST a sample payload to the webhook URL.
- Verify the response matches the expected JSON structure.
- Ensure FastAPI correctly forwards the response to the frontend.

---

## Notes
- Ensure all prompts are clear and consistent.
- Use conditional steps if needed (e.g., if experience is empty, skip experience section in resume).
- Keep the response size reasonable for frontend rendering.
- Add error handling in Relay.app if any step fails.
