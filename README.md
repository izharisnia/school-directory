# Savory-Style School Directory

A two-page assignment built with **Next.js + Express + MySQL**:
- **Add School** with image upload (react-hook-form + multer)
- **School Grid** like a restaurant menu (Savory theme vibe)
- **Detail page**, search + city filter, dark/light toggle

## Quick Start (Local Dev)

### 1) Database
- Create MySQL and run `database/schema.sql`.

### 2) Backend
```bash
cd backend
cp .env.example .env # (or edit .env as shown)
npm i
npm run dev

### 3) Frontend
```bash
cd ../frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
npm i
npm run dev

Visit http://localhost:3000.

Add a school at /addSchool. Images land in frontend/public/schoolImages and appear on the grid.

Deploy
See docs/deployment-guide.md.


## Root `package.json` (optional monorepo helper)
```json
{
  "name": "school-directory",
  "private": true,
  "scripts": {
    "dev:frontend": "npm --prefix frontend run dev",
    "dev:backend": "npm --prefix backend run dev"
  }
}
