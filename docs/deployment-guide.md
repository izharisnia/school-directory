# Deployment Guide

## 1) Database
- Create MySQL DB (PlanetScale/Railway/local).
- Run `database/schema.sql`. Optionally add `database/seed.sql`.

## 2) Backend (Render/Railway)
- Set env: DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT=3306, PORT=4000,
  UPLOAD_DIR=../../frontend/public/schoolImages, PUBLIC_PREFIX=/schoolImages.
- Build & run. Ensure logs show `✅ DB connected`.

## 3) Frontend (Vercel)
- Set `NEXT_PUBLIC_API_URL` to your backend URL (https://your-api.onrender.com).
- Deploy. Test:
  - Add school at `/addSchool`.
  - Browse at `/showSchools`.
