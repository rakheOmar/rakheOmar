# Agents — Portfolio Project

## Overview

This is a personal portfolio website built with **Astro 5**, **React 19**, and **Tailwind CSS 4**. It showcases projects, hackathons, certifications, and skills. The site is deployed at `https://rakheomar.me` and uses shadcn/ui components throughout the UI layer.

**Key architecture notes:**
- Astro handles routing and static/SSR pages (`src/pages/`)
- React components are used for interactive UI (`src/components/`)
- shadcn/ui components live in `src/components/ui/` (excluded from Biome linting)
- Custom portfolio sections are Astro files in `src/components/portfolio/`
- Static data lives in `src/data/portfolio.json` and `src/data/projects.json`
- CSS is managed via Tailwind 4 with CSS variables in `src/styles/global.css`

---

## Commands

### Development

```bash
npm run dev          # Start dev server at http://localhost:3000 (exposes to network)
```

### Build

```bash
npm run build        # Production build to ./dist/
npm run preview      # Preview the production build
npm run astro        # Run Astro CLI directly
```

### Linting & Formatting

```bash
npm run check        # Run Ultracite check (Biome) — lint + type-check
npm run fix          # Run Ultracite fix — auto-fix linting/formatting issues
```

### Type Checking

```bash
npm exec -- tsc --noEmit              # Full TypeScript check
npm exec -- tsc --noEmit <file>       # Check single file
```

---

## Code Style

### Enforced Tool: Ultracite (Biome)

This project uses **Ultracite** (a Biome preset) as the single source of truth for all linting and formatting. The Biome config (`biome.jsonc`) extends `ultracite/biome/core` and `ultracite/biome/astro`, excluding `src/components/ui` (shadcn components).

- **Check**: `npm run check`
- **Fix**: `npm run fix`

### TypeScript Conventions

- Prefer explicit types for parameters and return values where they aid clarity.
- Use `unknown` over `any` for genuinely unknown types.
- Use `as const` for immutable literal values.
- Prefer type narrowing over type assertions.
- Replace magic numbers with named constants.

### React Conventions

- Use function components only. No class components.
- Hooks must be called at the top level, never conditionally.
- Always include complete dependency arrays for hooks.
- Use unique IDs (not array indices) for list keys.
- Nest children between opening/closing tags; avoid passing JSX as props.
- Do not define components inside other components.
- Prefer `className` in React files (Astro uses `class`).

### Astro Conventions

- Use `.astro` extension for static page/layout components.
- Use `client:*` directives only for components that need interactivity (React components).
- Props interfaces should be defined with TypeScript.
- Use `import.meta.env` for environment variables (prefix public ones with `PUBLIC_`).

### Import Conventions

- Use path aliases (`@/` → `src/`, `@/components/ui` → `src/components/ui`, `@/lib` → `src/lib`, `@/hooks` → `src/hooks`).
- Do NOT use barrel files that re-export everything.
- Import directly from source files.
- shadcn/ui: use the `cn()` utility from `@/lib/utils` for merging class names.

### CSS & Tailwind

- All styling via Tailwind utility classes in `className`.
- Design tokens defined as CSS variables in `src/styles/global.css`.
- shadcn/ui color scheme: `stone` base color with CSS variables (`--primary`, `--muted`, etc.).
- Avoid inline styles unless absolutely necessary.
- Use `cn()` from `@/lib/utils` for conditional class merging.

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProjectCard`, `HackathonSection` |
| Files | kebab-case | `project-card.tsx`, `hackathon-section.astro` |
| Functions/variables | camelCase | `useMobile`, `handleSubmit` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_ITEMS`, `API_BASE_URL` |
| Types/Interfaces | PascalCase | `ProjectProps`, `HackathonData` |

### Error Handling

- Throw `Error` objects with descriptive messages; never throw plain strings.
- Avoid `try`/`catch` blocks that only re-throw.
- Prefer early returns over deep nesting for error cases.
- Remove `console.log`, `debugger`, and `alert` before committing.

### Security

- Add `rel="noopener noreferrer"` when using `target="_blank"`.
- Avoid `dangerouslySetInnerHTML` unless necessary.
- Validate and sanitize any user input.

### Performance

- Avoid spread syntax in loop accumulators.
- Use top-level regex literals instead of creating them inside loops.
- Prefer specific imports over namespace imports.
- For images, use `@unpic/astro` or `@unpic/react` for optimized image handling.

---

## Project Structure

```
src/
├── components/
│   ├── ui/                     # shadcn/ui components (excluded from Biome)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── ...
│   ├── portfolio/              # Portfolio section Astro components
│   │   ├── intro-section.astro
│   │   ├── project-section.astro
│   │   ├── skills-section.astro
│   │   └── ...
│   ├── kibo-ui/glimpse/        # Custom React components
│   ├── contact-section.tsx
│   ├── hackathon-card.tsx
│   └── theme-provider.tsx
├── data/
│   ├── portfolio.json          # Portfolio content (name, socials, skills, etc.)
│   └── projects.json           # Projects data
├── layouts/
│   └── layout.astro            # Main page layout
├── pages/
│   ├── index.astro             # Home page
│   ├── blog.astro
│   └── projects.astro
├── hooks/
│   └── use-mobile.js
├── lib/
│   └── utils.ts                # cn() utility
└── styles/
    └── global.css              # Tailwind + CSS variables
```

---

## Data Management

Portfolio content is managed through JSON files in `src/data/`:

- **`portfolio.json`** — Contains intro, social links, skills, education, certifications, hackathons, and navigation links.
- **`projects.json`** — Contains project entries with name, description, tech stack, links, and media.

When adding/modifying portfolio content, edit the JSON files rather than hardcoding values in components.

---

## Available Skills

The following skill instructions are loaded automatically and take precedence over this file when active:

- **`ultracite`** — Biome/Ultracite code standards. Applied to all JS/TS/React edits.
- **`vercel-react-best-practices`** — React performance optimization patterns.
- **`shadcn`** — shadcn/ui component management and conventions.
- **`skill-creator`** — Creating and improving skills.

---

## Workflow Notes

1. Run `npm run fix` before committing to auto-fix formatting/linting.
2. Run `npm run check` to verify no issues remain.
3. Do not manually format code that Ultracite auto-fixes.
4. shadcn/ui components in `src/components/ui/` are managed via CLI (`npx shadcn@latest add <component>`) and are excluded from Biome checks.
5. Use `npm run dev` to test changes locally before building.
6. TypeScript errors should be fixed before committing — run `npm exec -- tsc --noEmit`.
