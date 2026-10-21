# TaskFlow — Task Management Dashboard

A modern, fully functional task management dashboard built with **React.js**, **Vite**, and **Tailwind CSS**. Designed as a portfolio project to demonstrate React fundamentals while delivering a professional, production-quality user experience.

![React](https://img.shields.io/badge/React-19.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### Dashboard Overview
- **Real-time statistics** — Total, Completed, In Progress, and To Do task counts
- **Welcome banner** — Personalized greeting with date and productivity summary
- **Progress tracking** — Visual completion percentage with animated progress bar
- **Status distribution** — Color-coded breakdown of task statuses
- **Upcoming deadlines** — Tasks approaching due dates with overdue highlighting
- **Recent tasks** — Last updated tasks for quick access

### Task Management (Full CRUD)
- **Create** tasks with title, description, priority, status, due date, and category
- **Read** tasks in **List View** or **Grid View**
- **Update** task details, priority, and status
- **Delete** tasks with confirmation dialog
- **Quick status cycling** — Click the status icon to cycle through statuses

### Kanban Board
- Three-column layout: **To Do → In Progress → Completed**
- Move tasks between columns with directional buttons
- Live task counts per column
- Empty column states

### Search, Filter & Sort
- **Search** by title or description
- **Filter** by status (To Do, In Progress, Completed)
- **Filter** by priority (Low, Medium, High)
- **Sort** by newest, oldest, due date, or priority
- **Clear all filters** with one click

### Settings
- **Dark Mode / Light Mode** toggle with smooth transition
- **Display name** customization (persisted)
- **Reset data** — Restore sample tasks with confirmation

### Additional Highlights
- 🌙 Dark mode with custom CSS variables
- 📱 Fully responsive (desktop, tablet, mobile)
- 💾 Data persistence via **localStorage**
- ♿ Accessible with semantic HTML and keyboard support
- 🎨 Modern Inter typography from Google Fonts
- ✨ Smooth hover effects and micro-animations
- 🔴 Overdue task highlighting
- 📭 Polished empty states

---

## 🛠️ Tech Stack


| Technology       | Purpose                              |
|------------------|--------------------------------------|
| React.js 19      | UI library (functional components)   |
| Vite 6           | Build tool & dev server              |
| Tailwind CSS 4   | Utility-first CSS framework          |
| Lucide React     | Modern SVG icon library              |
| localStorage     | Client-side data persistence         |
| JavaScript ES6+  | Application logic                    |
| HTML5 & CSS3     | Structure and custom styling         |

---

## 🚀 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/taskflow-dashboard.git

# 2. Navigate to the project folder
cd taskflow-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The application will be available at **http://localhost:5173**

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.jsx      # Navigation sidebar
│   ├── Header.jsx       # Top bar with search & theme toggle
│   ├── StatCard.jsx     # Dashboard statistic card
│   ├── ProgressBar.jsx  # Visual progress indicator
│   ├── TaskCard.jsx     # Individual task display
│   ├── TaskModal.jsx    # Create/Edit task form modal
│   ├── TaskFilters.jsx  # Search, filter & sort controls
│   ├── ConfirmDialog.jsx# Confirmation modal for destructive actions
│   └── EmptyState.jsx   # Empty list placeholder
├── pages/               # Page-level components
│   ├── Dashboard.jsx    # Overview with stats and charts
│   ├── Tasks.jsx        # Full task management with views
│   ├── Board.jsx        # Kanban board
│   └── Settings.jsx     # User preferences
├── hooks/
│   └── useLocalStorage.js  # Custom hook for localStorage sync
├── data/
│   └── sampleTasks.js   # Initial demo task data
├── App.jsx              # Root component (state & routing)
├── main.jsx             # React entry point
└── index.css            # Global styles & design tokens
```

---

## 🧠 What I Learned

### React Fundamentals

**Components**
React components are reusable building blocks. Each file (e.g., `TaskCard.jsx`, `StatCard.jsx`) is a function that returns JSX — a syntax that looks like HTML but works inside JavaScript. Components accept **props** (inputs) and return UI.

**Props**
Props are how data flows from parent to child components. For example, `App.jsx` passes the `tasks` array to `Dashboard.jsx`, which then passes individual task objects to `TaskCard.jsx`. Props are read-only — a child never modifies the props it receives.

**useState**
`useState` is a React Hook that lets components remember values between renders. When state changes, React re-renders the component to reflect the new data. Example: `const [tasks, setTasks] = useState([])` creates a state variable `tasks` and a setter function `setTasks`.

**useEffect**
`useEffect` runs side effects — code that should execute after rendering. In TaskFlow, it's used to:
- Apply the theme to the document on theme change
- Load sample tasks on first visit
- Sync state with localStorage

**Event Handling**
React handles events using camelCase syntax (e.g., `onClick`, `onChange`). In TaskFlow, events drive form submissions, modal toggling, status changes, and navigation.

**LocalStorage**
The `useLocalStorage` custom hook combines `useState` and `useEffect` to automatically read from and write to the browser's localStorage. This means task data, theme preference, and user name persist across page refreshes without any backend.

### How CRUD Operations Work

1. **Create**: User fills the form in `TaskModal`. On submit, `App.jsx` generates a unique ID and adds the new task object to the `tasks` state array.
2. **Read**: Components receive tasks via props and use `.map()` to render each task as a `TaskCard`.
3. **Update**: Clicking Edit opens `TaskModal` pre-filled with task data. On save, `App.jsx` uses `.map()` to replace the matching task.
4. **Delete**: Clicking Delete opens `ConfirmDialog`. On confirm, `App.jsx` uses `.filter()` to remove the task by ID.

---

## 📝 University Presentation Summary

> TaskFlow is a task management dashboard I built using React.js to demonstrate core front-end development concepts. The application lets users create, view, edit, and delete tasks, organize them on a Kanban board, and track progress through an interactive dashboard.
>
> I used **React components** as reusable building blocks, **props** to pass data between components, and **React Hooks** (`useState` for managing state, `useEffect` for side effects) to make the app interactive. Data is saved in the browser's **localStorage** so tasks persist across page refreshes — no backend needed.
>
> The project also features a responsive design that works on desktop, tablet, and mobile, along with a dark mode toggle. I built it with Vite as the development tool and Tailwind CSS for styling.

---

## 📌 GitHub Repository Description

> A modern, responsive task management dashboard built with React.js, Vite, and Tailwind CSS. Features full CRUD operations, Kanban board, dark mode, and localStorage persistence. Portfolio project demonstrating React fundamentals.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
