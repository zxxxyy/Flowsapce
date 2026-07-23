# FlowSpace — Software Architecture V2 (IndonesiaNEXT MVP)

A lightweight, single-user student productivity web application designed to help university students manage assignments, calculate smart priority based on deadlines and difficulty, and answer the question: **"What should I work on today?"**

Designed specifically for rapid 3-hour hackathon execution without backend dependencies or unnecessary complexity.

---

## 1. High-Level Architecture

```
+-------------------------------------------------------------------------+
|                               FLOWSPACE                                 |
|                       (React 18 + Vite SPA)                             |
+-------------------------------------------------------------------------+
    |                                                                 |
    v                                                                 v
+------------------------------------+              +---------------------+
|        STATE MANAGEMENT            |              |   LOCAL STORAGE     |
|  - TaskContext (Global State)      |  <=========> |  - Key: 'flowspace' |
|  - React useState / useReducer     |   Sync Read  |    tasks array      |
|  - LocalStorage Auto-Sync          |   & Write    |  - Settings config  |
+------------------------------------+              +---------------------+
    |
    v
+-------------------------------------------------------------------------+
|                          COMPONENTS LAYER                               |
|  - Layout (Header, Sidebar)                                             |
|  - Dashboard Page (SummaryCards, TodayFocus, UpcomingList, Progress)    |
|  - Tasks Page (TaskTable, TaskFormModal, FilterBar, PriorityBadge)      |
|  - Settings Page (Clear Data, Export/Import JSON)                       |
+-------------------------------------------------------------------------+
```

---

## 2. Scalable Folder Structure

```
FlowSpace/
├── docs/
│   └── ARCHITECTURE.md
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                # Icons & SVGs
│   ├── components/            # Reusable UI & Feature Components
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── layout/            # DashboardLayout, Header, Sidebar
│   │   ├── dashboard/         # SummaryCards, TodaysFocusCard, UpcomingDeadlines, ProgressCard
│   │   └── tasks/             # TaskFormModal, TaskCard, TaskList, TaskFilter, PriorityBadge
│   ├── context/               # React Context Providers
│   │   └── TaskContext.tsx    # State management & LocalStorage persistence
│   ├── data/                  # Initial sample mock assignments
│   │   └── initialTasks.ts
│   ├── hooks/                 # Custom React Hooks
│   │   └── useTasks.ts        # Access TaskContext easily
│   ├── pages/                 # Top-level Page Views
│   │   ├── DashboardPage.tsx
│   │   ├── TasksPage.tsx
│   │   └── SettingsPage.tsx
│   ├── services/              # Pure Storage Service
│   │   └── storageService.ts  # LocalStorage wrapper
│   ├── types/                 # TypeScript Types
│   │   └── index.ts           # Task, Priority, Difficulty, Status, Summary interfaces
│   ├── utils/                 # Pure helper functions
│   │   ├── priorityCalculator.ts # Smart Priority logic
│   │   └── dateUtils.ts       # date-fns formatters & deadline diffs
│   ├── App.tsx                # App router wrapper & layout root
│   ├── index.css              # Tailwind styles & theme variables
│   └── main.tsx               # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 3. Component Tree

```
App
 └── TaskProvider (React Context)
      └── DashboardLayout
           ├── Header (App Title, Today's Date, Quick Add Task Button)
           ├── Sidebar (Navigation: Dashboard, Tasks, Settings)
           └── Page Container
                ├── DashboardPage (Route: / or /dashboard)
                │    ├── SummaryCards (Total, Pending, Completed, Overdue cards)
                │    ├── TodaysFocus (Top 3 urgent/high-priority pending tasks)
                │    ├── UpcomingDeadlines (List of tasks due in next 7 days)
                │    └── ProgressCard (Visual progress bar & completion rate %)
                ├── TasksPage (Route: /tasks)
                │    ├── TaskHeader (Search, Filter by Course/Status/Priority, Create Button)
                │    ├── TaskList
                │    │    └── TaskCard (Status Checkbox, Title, Course, PriorityBadge, Actions)
                │    └── TaskFormModal (Create & Edit Assignment form with Zod validation)
                └── SettingsPage (Route: /settings)
                     ├── StorageStats (Total stored tasks count)
                     └── DataActions (Reset Data, Seed Demo Tasks, Export JSON)
```

---

## 4. Routing Plan

| Route Path | View Component | Description |
|---|---|---|
| `/` | `DashboardPage` | Main Overview: Summary Cards, Today's Focus & Deadlines |
| `/dashboard` | `DashboardPage` | Alias for dashboard main overview |
| `/tasks` | `TasksPage` | Full Assignment Manager: CRUD, Filters, Search |
| `/settings` | `SettingsPage` | Local storage management, sample data reset |

---

## 5. Core TypeScript Domain Model

```typescript
export type Priority = 'high' | 'medium' | 'low';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  courseName: string;
  deadline: string; // ISO format string: YYYY-MM-DD
  difficulty: Difficulty;
  status: TaskStatus;
  calculatedPriority: Priority;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  overdueTasks: number;
  completionRate: number; // 0 to 100 percentage
  todaysFocus: Task[];
  upcomingDeadlines: Task[];
}
```

---

## 6. Smart Priority Calculation Engine

```typescript
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { Difficulty, Priority } from '../types';

export function calculatePriority(deadlineISO: string, difficulty: Difficulty): Priority {
  const today = new Date();
  const deadlineDate = parseISO(deadlineISO);
  const daysRemaining = differenceInCalendarDays(deadlineDate, today);

  // 1. Calculate Base Priority by Deadline
  let basePriority: Priority = 'low';
  if (daysRemaining <= 2) {
    basePriority = 'high';
  } else if (daysRemaining <= 7) {
    basePriority = 'medium';
  } else {
    basePriority = 'low';
  }

  // 2. Adjust for Difficulty (Hard increases priority by 1 level)
  if (difficulty === 'hard') {
    if (basePriority === 'low') return 'medium';
    if (basePriority === 'medium') return 'high';
    return 'high';
  }

  return basePriority;
}
```

---

## 7. 3-Hour Development Roadmap

- **Phase 1: Project Setup** (Vite, React, TypeScript, Tailwind CSS, shadcn/ui, types)
- **Phase 2: Layout** (DashboardLayout, Header, Sidebar)
- **Phase 3: Task CRUD** (storageService, TaskContext, TaskFormModal, TaskList)
- **Phase 4: Smart Priority** (calculatePriority algorithm integration)
- **Phase 5: Dashboard** (SummaryCards calculations & rendering)
- **Phase 6: Today's Focus** (Filter top 3 highest priority tasks)
- **Phase 7: Progress** (Completion rate % and progress bar)
- **Phase 8: Testing** (Local storage persistence & edge cases)
- **Phase 9: Deployment** (Production build & Vercel deployment)
