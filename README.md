# HiiNen

**Project:** HiiNen (Tiv: "Se Hii Nen" = "Let's Start")

**Status:** Deploying to Production 🚀

**Purpose:** HiiNen is an AI-powered co-founder platform that helps first-time entrepreneurs ideate, validate, and grow startup ideas.

**Core Features:**
- Generate startup ideas.
- Validate concepts with AI feedback.
- Connect to mentorship and knowledge resources.
- Build step-by-step startup roadmaps.

**Tech Stack:**
- **Frontend:** Next.js (React 19), Tailwind CSS v4.
- **Backend:** (Planned) Node.js/Express or Python/Flask.
- **Database:** (Planned) SQLite/MySQL/PostgreSQL.
- **Deployment:** GitHub, local dev first.

---

## Project Structure

Hii_Nen/
├─ frontend/ # Next.js app
│ ├─ src/
│ │ ├─ app/ # Next.js App Router pages
│ │ ├─ components/ # React UI components
│ │ ├─ styles/ # Global styles
│ ├─ tailwind.config.js (planned)
│ ├─ postcss.config.mjs
│ ├─ package.json
│ ├─ next.config.mjs
├─ backend/ # Planned backend folder
├─ README.md


---

## Conventions

- **Use TypeScript (optional)** for type safety.
- Use **App Router** in Next.js.
- Use **Tailwind CSS** for styling.
- Add custom colors/fonts later in `tailwind.config.js`.

---

## Notes for Copilot

- This project should follow modular, reusable React components.
- Use functional components with hooks (useState, useEffect).
- Use Tailwind utility classes for all styling.
- Keep `src/components/` clean and well-named.
- Document your code with clear comments so Copilot can help generate consistent patterns.
