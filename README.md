# PeopleFusion — Employee Org Chart

> Frontend Developer Assignment — Interactive organisational chart built with Next.js 14, React 18, TypeScript, Redux Toolkit, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux)

---

## Table of Contents

- [Overview](#overview)
- [Live Features](#live-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [API](#api)
- [Known Issues](#known-issues)
- [Responsive Design](#responsive-design)
- [Acceptance Criteria](#acceptance-criteria)
- [Time Estimate](#time-estimate)

---

## Overview

PeopleFusion is an interactive organisational chart that displays employee relationships and reporting structures. Users can visualise company hierarchy starting from any employee, navigate the tree, search for people, and view detailed employee profiles.

> ⚠️ **API Note:** The assigned domain `worksync.global` has expired and is no longer reachable (redirects to a Namecheap parking page). The app includes an automatic **mock data fallback** — all features work fully. Once the domain is restored, the real API takes over with zero code changes.

---

## Live Features

- ✅ Hierarchical org chart tree with connector lines
- ✅ Expand / collapse individual nodes with **Contains N** badge
- ✅ **Collapse All** and **Expand All** controls
- ✅ Live employee search with highlighted matching nodes
- ✅ Click employee card to open details sidebar
- ✅ Purple header sidebar matching Figma design exactly
- ✅ Zoom in / out on the chart canvas
- ✅ All 7 test employee IDs (18, 21, 22, 23, 25, 29, 30)
- ✅ Loading skeletons, error state with retry, empty state
- ✅ Profile picture with coloured initials fallback
- ✅ Fully responsive — mobile, tablet, desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI Library | React 18 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS |
| State | Redux Toolkit + React Redux |
| HTTP | Axios + Next.js API Route proxy |
| Typography | DM Sans (Google Fonts) |
| Icons | Inline SVG (zero icon library) |
| Linting | ESLint + Prettier |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher → https://nodejs.org
- **npm** v9 or higher (comes with Node.js)

### Installation
```bash
# 1. Enter the project folder
cd peoplefusion-org-chart

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```

---

## Project Structure
```
peoplefusion-org-chart/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + Redux Provider
│   │   ├── page.tsx                # Home page
│   │   ├── providers.tsx           # Client-side Redux wrapper
│   │   ├── globals.css             # Tailwind base + animations
│   │   └── api/
│   │       └── org-chart/
│   │           └── route.ts        # Server-side API proxy
│   │
│   ├── components/
│   │   ├── OrgChart/
│   │   │   ├── OrgChartPage.tsx    # Full page layout + tabs
│   │   │   ├── ChartCanvas.tsx     # Scrollable chart area + zoom
│   │   │   ├── OrgTreeNode.tsx     # Recursive tree node renderer
│   │   │   ├── OrgNodeCard.tsx     # Employee card (Figma-matched)
│   │   │   ├── LeftSidebar.tsx     # Dark left navigation
│   │   │   ├── TopBar.tsx          # Breadcrumb + search top bar
│   │   │   ├── OrgChartSkeleton.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   └── EmptyState.tsx
│   │   │
│   │   ├── EmployeeSidebar/
│   │   │   └── EmployeeDrawer.tsx  # Purple header details drawer
│   │   │
│   │   ├── SearchBar/
│   │   │   └── SearchBar.tsx
│   │   │
│   │   └── UI/
│   │       ├── Avatar.tsx          # Photo + initials fallback
│   │       └── Badge.tsx
│   │
│   ├── hooks/
│   │   ├── useRedux.ts             # Typed dispatch + selector hooks
│   │   └── useOrgChart.ts          # All chart state and actions
│   │
│   ├── lib/
│   │   ├── apiClient.ts            # Axios instance + interceptors
│   │   ├── mockData.ts             # Fallback data (API is down)
│   │   └── utils.ts                # cn(), name helpers, tree search
│   │
│   ├── store/
│   │   ├── index.ts                # Redux store config
│   │   └── slices/
│   │       └── orgChartSlice.ts    # Async thunk + all reducers
│   │
│   └── types/
│       └── index.ts                # All TypeScript interfaces
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.json
└── .prettierrc
```

---

## Architecture

### State Management

All org chart state lives in a single Redux slice (`orgChartSlice.ts`). The `useOrgChart` custom hook exposes everything components need — no component accesses the Redux store directly.
```
Redux Store
└── orgChart slice
    ├── chartData          — tree root node
    ├── selectedEmployeeId — drives the sidebar
    ├── collapsedNodeIds   — which nodes are collapsed
    ├── searchQuery        — current search string
    ├── searchResults      — matching employee IDs
    ├── loadingState       — idle | loading | succeeded | failed
    └── error              — human-readable error message
```

### API Proxy Pattern
```
Browser → /api/org-chart?employeeId=18 (same origin, no CORS)
              ↓
    Next.js Route Handler (server-side)
              ↓
    worksync.global/api/... (real API, 5s timeout)
              ↓ (if unreachable)
    mockData.ts (automatic fallback)
```

This solves:
1. **CORS** — browser never contacts the external domain
2. **Resilience** — mock data when API is down

### Graceful Degradation

| Problem | Solution |
|---|---|
| Missing `profile_pic` | Deterministic coloured initials avatar |
| Missing `position` / `job_title` | Em dash fallback |
| Missing `full_name` | Constructed from `first_name` + `last_name` |
| API failure | `ErrorState` component with retry button |
| Empty response | `EmptyState` with ID selector |
| API domain down | Mock data served from proxy automatically |

---

## API

### Endpoint
```
GET https://worksync.global/api/relationship/people_chart/{employee_id}
```

### Authentication
```
Authorization: Bearer <token>
```

A non-expiring development token is included in `src/app/api/org-chart/route.ts`.

### Test Employee IDs
```
18  21  22  23  25  29  30
```

ID `18` loads automatically on first render.

### Response Shape
```ts
{
  status: "success",
  data: {
    employee: Employee,
    manager?: Employee,
    children?: OrgChartNode[]
  }
}
```

---

## Known Issues

### ⚠️ API Domain Expired

`worksync.global` has expired — visiting it shows a Namecheap domain parking page saying *"The domain has expired."*

**Impact:** All calls to the real API fail with a socket error.

**Fix applied:** The Next.js proxy route (`/api/org-chart/route.ts`) automatically serves mock data from `src/lib/mockData.ts` when the real API is unreachable. All 7 test employee IDs work with realistic hierarchical data.

**When the real API is restored:** No code changes needed. The proxy tries the real API first (5s timeout), and falls back to mock only if it fails.

---

## Responsive Design

| Breakpoint | Behaviour |
|---|---|
| Mobile `< 640px` | Hamburger menu, bottom sheet drawer (90vh), compact cards (200px), scrollable tabs |
| Tablet `640–1024px` | Left nav visible, side panel drawer, medium cards |
| Desktop `> 1024px` | Full Figma layout, wide sidebar (320px), all controls visible |

### Mobile Patterns

- **Left nav** — hidden by default, slides in as overlay when hamburger tapped
- **Employee drawer** — slides up from bottom as a sheet with drag handle
- **Cards** — 200px wide with smaller font sizes (`text-xs` vs `text-sm`)
- **Action buttons** — icon only on mobile, icon + label on `sm` and above

---

## Acceptance Criteria

### Functional

| Requirement | Status |
|---|---|
| Fetch data from API endpoint | ✅ Proxy + mock fallback |
| Collapse and expand the org chart | ✅ Per-node + collapse/expand all |
| Search for employee | ✅ Live search with highlighted results |
| Sidebar with employee details | ✅ Opens on card icon click |
| Hierarchical tree display | ✅ Recursive OrgTreeNode |
| Profile pictures, names, titles | ✅ Avatar with initials fallback |
| All test employee IDs (18–30) | ✅ ID selector always visible |
| Error handling for API failures | ✅ ErrorState with retry |
| Graceful handling of missing data | ✅ All fields optional with fallbacks |

### Design

| Requirement | Status |
|---|---|
| Matches Figma specifications | ✅ Cards, purple sidebar, dark nav |
| Responsive mobile/tablet/desktop | ✅ Bottom sheet, overlay nav |
| Hover, active, focus states | ✅ All interactive elements |
| Correct colours, typography, spacing | ✅ DM Sans, indigo-600, gray palette |

### Technical

| Requirement | Status |
|---|---|
| Next.js 14 + React 18 + TypeScript | ✅ |
| Tailwind CSS | ✅ |
| Redux Toolkit + React Redux | ✅ |
| Axios | ✅ |
| ESLint + Prettier | ✅ |
| No console errors or warnings | ✅ |

---

## Time Estimate

| Phase | Time |
|---|---|
| Setup, read brief, review Figma | 1.5 hrs |
| TypeScript types and utilities | 45 min |
| API layer, proxy route, mock data | 1.5 hrs |
| Redux slice and custom hooks | 1.5 hrs |
| UI components (Avatar, Badge, states) | 1.5 hrs |
| Org chart tree and connector lines | 2.5 hrs |
| Employee cards (Figma pixel-match) | 1.5 hrs |
| Sidebar drawer (purple header) | 1.5 hrs |
| Page layout (nav, tabs, zoom) | 1.5 hrs |
| Mobile responsiveness | 2 hrs |
| Bug fixes and debugging | 1.5 hrs |
| Testing and polish | 1 hr |
| **Total** | **~18 hrs** |

---

## Submission

Send to: **Developer@tokenwell.io**

Include:
- Link to this GitHub repository
- Brief summary of implementation approach
- Challenges encountered and how they were solved
- Estimated time spent

---

*Built for the PeopleFusion frontend assignment.*
