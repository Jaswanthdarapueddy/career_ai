# Deployment Guide: Vercel Monorepo

This guide explains how to deploy the **CareerAI** project as a Full Stack application on **Vercel**.

---

## Deployment Steps

1.  **Push to GitHub`: Ensure your latest code (with the `api` folder and root `package.json`) is pushed to GitHub.
2.  **Import to Vercel**:
    *   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **Add New...** -> **Project**.
    *   Select your GitHub repository.
3.  **Project Configuration**:
    *   **Framework Preset**: Select **Vite** (It should auto-detect).
    *   **Root Directory**: Keep as `./` (Root).
    *   **Environment Variables**:
        *   Add any required variables (e.g. `RELAY_WEBHOOK_URL`, `SUPABASE_URL`, `SUPABASE_KEY`).
        *   **Important**: You do **NOT** need `VITE_API_URL` anymore because the frontend and backend are on the same domain!
4.  **Deploy**: Click **Deploy**.

---

## Verification
Once deployed, Vercel will automatically route requests from `/api/*` to your Python backend and everything else to your React frontend.

