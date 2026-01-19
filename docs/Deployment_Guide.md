# Deployment Guide: Vercel & PythonAnywhere

This guide explains how to deploy the **CareerAI** project by splitting it into two parts:
1.  **Backend** (FastAPI) on **PythonAnywhere**
2.  **Frontend** (React) on **Vercel**

---

## Part 1: Deploy Backend to PythonAnywhere

1.  **Sign Up/Login**: Go to [PythonAnywhere](https://www.pythonanywhere.com/) and create an account.
2.  **Upload Code**:
    *   Go to the **Files** tab.
    *   Create a new directory (e.g., `mysite`).
    *   Upload `main.py`, `requirements.txt`, `.env`, and `supabase_client.py`.
3.  **Install Dependencies**:
    *   Open a **Bash** console.
    *   Run: `pip3.10 install -r requirements.txt --user`
4.  **Configure Web App**:
    *   Go to the **Web** tab.
    *   Click **Add a new web app**.
    *   Select **FastAPI** (if available) or **Manual configuration**.
    *   Select **Python 3.10**.
    *   **WSGI Configuration File**:
        *   Edit the WSGI file. DELETE everything and paste this:
        ```python
        import sys
        
        path = '/home/YOUR_USERNAME/mysite'  # Update with your actual path
        if path not in sys.path:
            sys.path.append(path)
        
        from main import app as application
        ```
5.  **Reload**: Click the green **Reload** button at the top of the Web tab.
6.  **Get URL**: Your backend URL will be `https://<your-username>.pythonanywhere.com`.

---

## Part 2: Prepare Frontend for Vercel

### 1. Update Code to use Environment Variables
In your local code, update `src/components/CareerFlow.jsx` to use a variable instead of the hardcoded proxy path.

**Modify line 30:**
```javascript
// BEFORE
const res = await fetch('/api/process-profile', { ... });

// AFTER
const API_URL = import.meta.env.VITE_API_URL || 'https://<your-username>.pythonanywhere.com'; // Fallback for safety
const res = await fetch(`${API_URL}/process-profile`, { ... });
```

### 2. Create Vercel Configuration (Optional but Recommended)
Create a file named `vercel.json` in the `career-ai-demo` folder:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Part 3: Deploy Frontend to Vercel

1.  **Push to GitHub**: Ensure your project is pushed to a GitHub repository.
2.  **Import to Vercel**:
    *   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **Add New...** -> **Project**.
    *   Select your GitHub repository.
3.  **Configure Project**:
    *   **Root Directory**: Click "Edit" and select `career-ai-demo`.
    *   **Environment Variables**:
        *   Key: `VITE_API_URL`
        *   Value: `https://<your-username>.pythonanywhere.com` (The URL from Part 1).
4.  **Deploy**: Click **Deploy**.

---

## Part 4: Final Connection Check

1.  Once Vercel finishes, open your new website URL.
2.  **Connection Test**: Generate a plan. The Frontend will send a request to your PythonAnywhere backend.
3.  **Note on CORS**: Your specific backend code currently allows all origins (`allow_origins=["*"]`), so it will work immediately with Vercel.
