import os
from typing import Optional
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL", "<SUPABASE_URL>")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "<SUPABASE_KEY>")

_supabase: Optional[Client] = None


def _is_placeholder(value: str) -> bool:
    return not value or value.startswith("<")


def get_supabase() -> Client:
    global _supabase
    url = os.environ.get("SUPABASE_URL", SUPABASE_URL)
    key = os.environ.get("SUPABASE_KEY", SUPABASE_KEY)

    if _is_placeholder(url) or _is_placeholder(key):
        raise RuntimeError("Supabase is not configured. Set SUPABASE_URL and SUPABASE_KEY in backend/.env")

    if _supabase is None:
        _supabase = create_client(url, key)
    return _supabase

def store_user_profile(profile: dict):
    sb = get_supabase()
    return sb.table('user_profiles').insert(profile).execute()

def store_ai_output(user_id: int, ai_output: dict):
    allowed_keys = {
        "career_roles",
        "missing_skills",
        "certifications",
        "projects",
        "resume",
        "roadmap",
    }
    filtered = {k: ai_output.get(k) for k in allowed_keys if k in ai_output}
    data = {"user_id": user_id, **filtered}
    sb = get_supabase()
    return sb.table('ai_outputs').insert(data).execute()
