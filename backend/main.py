from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

from supabase_client import store_user_profile, store_ai_output

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RELAY_WEBHOOK_URL = os.environ.get("RELAY_WEBHOOK_URL", "<RELAY_WEBHOOK_URL>")

MOCK_DATA = {
    "career_roles": ["Frontend Developer", "UI/UX Designer", "Full Stack Engineer"],
    "missing_skills": ["React Native", "GraphQL", "AWS"],
    "certifications": ["Meta Front-End Developer", "Google UX Design", "AWS Certified Developer"],
    "projects": ["Build a Personal Portfolio", "E-commerce Dashboard", "Task Management App"],
    "roadmap": [
        "Month 1: Master Advanced React & Hooks",
        "Month 2: Learn State Management (Redux/Zustand)",
        "Month 3: Build a Full Stack Project with Node.js"
    ],
    "resume": "PROFESSIONAL SUMMARY:\nMotivated developer with expertise in React and Python.\n\nEXPERIENCE:\nBuilt various web applications using modern tech stack.\n\nSKILLS:\nReact, FastAPI, Python, JavaScript."
}

class UserProfile(BaseModel):
    name: str
    education: str
    skills: str
    interests: str
    experience: str = ""

@app.post("/process-profile")
def process_profile(profile: UserProfile, background_tasks: BackgroundTasks):
    payload = profile.dict()
    
    # helper for background task
    def save_data_to_db(payload: dict, ai_output: dict):
        try:
            user_profile_res = store_user_profile(payload)
            user_id = None
            if user_profile_res and hasattr(user_profile_res, 'data') and user_profile_res.data:
                user_id = user_profile_res.data[0].get('id')
            
            if user_id:
                store_ai_output(user_id, ai_output)
        except Exception:
            pass

    try:
        # 1. Call Relay (Critical Path - User waits for this)
        # relay_response = requests.post(RELAY_WEBHOOK_URL, json=payload, timeout=300)
        # relay_response.raise_for_status()
        # ai_output = relay_response.json()

        # FORCE MOCK DATA (User out of credits / Debug Mode)
        print("Using Mock Data (Forced Mode)")
        ai_output = MOCK_DATA

        # 2. Schedule DB save in background (Non-blocking)
        background_tasks.add_task(save_data_to_db, payload, ai_output)

        # 3. Validate and Return result
        if ai_output.get("status") == "timeout":
             # Fallback to Mock Data on Timeout/Error for Demo purposes
             print("Relay timed out. Using Mock Data.")
             ai_output = MOCK_DATA
            
        required_keys = ["career_roles", "roadmap", "career recommendations", "skill development roadmap"]
        # if not any(key in ai_output for key in required_keys):
        #      if "runId" in ai_output:
        #          return {"error": "Relay workflow is not returning data. Please add a 'Webhook Response' step."}
             
        #      # Fallback to Mock Data on Invalid Data/Credit Exhaustion
        #      print("Invalid Data/Credits Exhausted. Using Mock Data.")
        #      ai_output = MOCK_DATA

        # Data Transformation for Frontend Compatibility
        transformed_output = {}

        # Helper to clean lists
        def clean_list(data):
            if isinstance(data, list):
                return [x for x in data if x and str(x).lower() != "none"]
            if isinstance(data, str) and data.lower() != "none":
                return [data]
            return []

        # 1. Map Career Roles
        transformed_output["career_roles"] = []
        if "career recommendations" in ai_output:
            roles = ai_output["career recommendations"]
            if isinstance(roles, list):
                if len(roles) > 0 and isinstance(roles[0], dict):
                    transformed_output["career_roles"] = [r.get("Job role", str(r)) for r in roles]
                else:
                    transformed_output["career_roles"] = roles
        elif "career_roles" in ai_output:
             transformed_output["career_roles"] = ai_output["career_roles"]
        
        transformed_output["career_roles"] = clean_list(transformed_output["career_roles"])

        # Prepare Roadmap Data Source
        roadmap_data = ai_output.get("skill development roadmap", {})
        if not isinstance(roadmap_data, dict):
            roadmap_data = {}

        # 2. Map Certifications (Robust Search)
        cert_keys = ["Recommended certifications", "recommended certifications", "certifications"]
        raw_certs = None
        
        # Check top level
        for key in cert_keys:
            if key in ai_output:
                raw_certs = ai_output[key]
                break
        
        # Check inside roadmap_data if not found
        if not raw_certs:
            for key in cert_keys:
                 if key in roadmap_data:
                     raw_certs = roadmap_data[key]
                     break
        
        transformed_output["certifications"] = clean_list(raw_certs)

        # 3. Map Missing Skills
        raw_skills = ai_output.get("missing_skills")
        if not raw_skills and "Skills to learn" in roadmap_data:
             raw_skills = roadmap_data["Skills to learn"]
        
        transformed_output["missing_skills"] = clean_list(raw_skills)

        # 4. Map Projects
        raw_projects = ai_output.get("projects") or ai_output.get("Practice projects")
        if not raw_projects and "Practice projects" in roadmap_data:
             raw_projects = roadmap_data["Practice projects"]
             
        transformed_output["projects"] = clean_list(raw_projects)

        # 5. Map Roadmap (Visual Timeline only)
        if "skill development roadmap" in ai_output:
            raw_roadmap = ai_output["skill development roadmap"]
            if isinstance(raw_roadmap, dict):
                 # Filter out keys that are likely other categories
                 exclude_keys = ["Recommended certifications", "Skills to learn", "Practice projects", "career recommendations"]
                 timeline_items = []
                 for k, v in raw_roadmap.items():
                     if k not in exclude_keys and str(v).lower() != "none":
                         timeline_items.append(f"{k}: {v}")
                 transformed_output["roadmap"] = timeline_items
            else:
                 transformed_output["roadmap"] = clean_list(raw_roadmap)
        else:
            transformed_output["roadmap"] = clean_list(ai_output.get("roadmap", []))

        # 6. Map Resume
        resume = ai_output.get("professional resume", ai_output.get("resume", ""))
        transformed_output["resume"] = ""
        
        if isinstance(resume, dict):
            # Define a professional order for sections
            section_order = ["Professional summary", "Skills", "Experience", "Education", "Projects"]
            resume_str = ""
            
            # Add Name header if available in payload
            name = payload.get("name", "Generated Resume").upper()
            resume_str += f"{name.center(60)}\n"
            resume_str += "="*60 + "\n\n"

            for section in section_order:
                # Case-insensitive lookup
                key = next((k for k in resume.keys() if k.lower() == section.lower()), None)
                if key:
                    content = resume[key]
                    resume_str += f"{section.upper()}\n"
                    resume_str += "-"*len(section) + "\n"
                    
                    if isinstance(content, list):
                        resume_str += "\n".join(f"* {str(i)}" for i in content)
                    elif isinstance(content, dict):
                        resume_str += "\n".join(f"* {sub_k}: {sub_v}" for sub_k, sub_v in content.items())
                    else:
                        resume_str += str(content)
                    
                    resume_str += "\n\n"

            # Add remaining sections
            for k, v in resume.items():
                if not any(k.lower() == s.lower() for s in section_order):
                        content = v
                        if isinstance(v, list):
                            content = "\n".join(f"* {str(i)}" for i in v)
                        elif isinstance(v, dict):
                            content = "\n".join(f"* {sub_k}: {sub_v}" for sub_k, sub_v in v.items())
                        else:
                            content = str(v)
                        
                        resume_str += f"{k.upper()}\n{content}\n\n"

            transformed_output["resume"] = resume_str
        elif isinstance(resume, str) and resume.lower() != "none":
            transformed_output["resume"] = resume

        print(f"DEBUG: Processed Output keys: {transformed_output.keys()}")
        return transformed_output

    except Exception as e:
        return {"error": f"Relay.app workflow error: {str(e)}"}
