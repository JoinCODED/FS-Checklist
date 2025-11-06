# CODED Student Orientation Checklist

A beautiful, mobile-friendly orientation checklist system for CODED Data Science Bootcamp students.

## Overview

This application helps new students complete their onboarding tasks before starting the bootcamp. It features a progressive checklist with real-time progress tracking, organized sections, and a clean, modern UI following CODED's brand guidelines.

## Features

### Core Functionality
- **Progressive Checklist**: Organized into logical sections (Welcome, First Steps, Discord, Notion, Essentials, Read at Home)
- **Real-time Progress Tracking**: Visual progress bar showing completion percentage and count
- **Task Management**: Individual checkboxes with support for:
  - External links to resources
  - Warning messages for important notes
  - Helpful instructions and tips
  - Subtasks with WiFi credentials and other details
  - Bonus and important task badges
- **Important Tasks Reminder**: Auto-hiding notification card that:
  - Lists all incomplete important tasks
  - Provides click-to-scroll navigation to each task
  - Auto-hides when all important tasks are completed (cannot be manually dismissed)
  - Helps students focus on critical onboarding steps
- **Quick Reference Cards**: Easy access to WiFi credentials and CODED contact number
- **Persistence**: Progress saved to PostgreSQL database with localStorage fallback
- **User Authentication**: Replit Auth (OpenID Connect) for secure login with session management
- **Admin Dashboard**: Comprehensive analytics dashboard for tracking student progress

### User Experience
- **Dark Mode**: Clean, modern dark theme throughout the application
- **Confetti Celebration**: Visual celebration when 100% completion is reached
- **Mobile Responsive**: Optimized for all device sizes
- **Collapsible Sections**: Clean organization with expandable/collapsible section cards
- **Loading States**: Beautiful skeleton screens while data loads
- **Error Handling**: Graceful fallback to localStorage if API fails
- **Multi-user Support**: Each student has their own account and progress tracking
- **Secure Access**: Protected routes with automatic session management

### Design
- **CODED Branding**: Official color palette
  - Navy Blue #14243F (Brand/Primary color)
  - Secondary Blue #004AA3 (Secondary color)
  - Light Gray #D2D2D2 (Tertiary color)
- **Typography**: Manrope for headings, Helvetica Neue for body text
- **Consistent Spacing**: Professional spacing and visual hierarchy
- **Accessible**: Proper ARIA labels, keyboard navigation, color contrast

## Technology Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** component library
- **TanStack Query** for data fetching and caching
- **Wouter** for routing
- **React Confetti** for celebration effects
- **jsPDF** for PDF generation

### Backend
- **Express.js** server
- **PostgreSQL** database (Neon) with WebSocket support
- **Drizzle ORM** for type-safe database queries
- **Replit Auth** (OpenID Connect) for authentication
- **Express Session** with PostgreSQL session store
- **Zod** for validation
- **RESTful API** endpoints

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChecklistItem.tsx           # Individual task checkbox
│   │   │   ├── ChecklistSection.tsx        # Collapsible section container
│   │   │   ├── CodedLogo.tsx               # CODED logo component
│   │   │   ├── ConclusionMessage.tsx       # Final welcome message
│   │   │   ├── ImportantTasksReminder.tsx  # Important tasks notification
│   │   │   ├── LoadingState.tsx            # Skeleton loading screen
│   │   │   ├── ProgressBar.tsx             # Progress visualization
│   │   │   ├── QuickReference.tsx          # WiFi/contact info card
│   │   │   └── WelcomeMessage.tsx          # Encouragement message
│   │   ├── hooks/
│   │   │   ├── use-theme.tsx          # Theme provider and hook
│   │   │   ├── use-window-size.tsx    # Window dimensions for confetti
│   │   │   └── useAuth.ts             # Authentication hook
│   │   ├── lib/
│   │   │   ├── authUtils.ts           # Auth utility functions
│   │   │   ├── pdfExport.ts           # PDF generation utility
│   │   ├── pages/
│   │   │   ├── Checklist.tsx          # Main checklist page
│   │   │   ├── Landing.tsx            # Landing page for unauthenticated users
│   │   │   └── Admin.tsx              # Admin dashboard
│   │   └── index.css                  # Theme colors and utilities
├── server/
│   ├── routes.ts                      # API endpoints
│   ├── storage.ts                     # Database storage interface
│   └── replitAuth.ts                  # Authentication middleware
└── shared/
    └── schema.ts                      # Shared types and checklist data
```

## API Endpoints

### Authentication
- **GET /api/login** - Initiates Replit Auth login flow
- **GET /api/login/callback** - Handles OAuth callback, creates/updates user
- **GET /api/logout** - Destroys session and redirects to landing
- **GET /api/user** - Returns current authenticated user or null

### Progress Tracking
- **GET /api/progress** - Returns progress for authenticated user as Record<string, boolean>
- **POST /api/progress** - Updates progress for a specific task
  - Request: `{ taskId: string, completed: boolean }`
  - Response: `{ id, userId, taskId, completed }`

### Admin (Protected)
- **GET /api/admin/stats** - Returns comprehensive statistics
  - Requires: isAdmin = true
  - Response: `{ totalUsers, totalTasks, avgCompletionRate, userStats[], taskStats[] }`

## Data Model

### Users
- `id`: Unique identifier (primary key, matches Replit Auth sub)
- `email`: User email
- `firstName`: User's first name
- `lastName`: User's last name
- `profileImageUrl`: Profile picture URL
- `isAdmin`: Boolean flag for admin access (default: false)
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

### Sessions
- `sid`: Session ID (primary key)
- `sess`: Session data (JSON)
- `expire`: Session expiration timestamp
- PostgreSQL-backed session store for Express Session

### ChecklistProgress
- `id`: Unique identifier
- `userId`: Foreign key to users table
- `taskId`: Task identifier
- `completed`: Boolean completion status

### ChecklistSection (Frontend Schema)
- `id`: Section identifier
- `title`: Section title
- `description`: Optional description
- `collapsible`: Whether section can be collapsed
- `tasks`: Array of ChecklistTask

### ChecklistTask (Frontend Schema)
- `id`: Task identifier
- `title`: Task title
- `description`: Optional description
- `link`: Optional external link
- `warning`: Optional warning message
- `subtasks`: Optional array of subtasks
- `helpText`: Optional help instructions
- `isBonus`: Bonus task badge
- `isImportant`: Important task badge

## Recent Changes

**2025-11-06**: Dark mode only - Removed theme toggle and PDF export
- Transitioned application to **dark mode only**:
  - Removed theme toggle buttons from all pages (Checklist, Admin)
  - Updated ThemeProvider to force dark mode permanently
  - Simplified CSS by removing light mode variables
  - All UI elements now use consistent dark theme styling
- Updated Important Tasks Reminder:
  - Removed dismiss button - card only auto-hides when tasks are completed
  - Ensures students cannot accidentally dismiss critical tasks
- Updated Progress Bar:
  - Removed rounded corners for square/sharp appearance
  - Applied gradient coloring using CODED Secondary Blue (#004AA3)
  - Gradient flows from lighter (#0056c9) through #004AA3 to darker (#003d8a)
- Removed Export to PDF feature:
  - Removed PDF export button from checklist page
  - Streamlined UI for cleaner student experience
- All changes tested and verified across Landing, Checklist pages

**2025-11-06**: Theme-aware UI components matching CODED brand guidelines
- Updated all UI components to use official CODED brand colors:
  - Checkboxes: White borders and fills in dark mode
  - Progress percentage text: White in dark mode
  - CODED logo icon: White background with navy [C] design
- Logo redesigned to match official CODED brand with square brackets [C] design
- All components optimized for dark mode display

**2025-11-06**: Important tasks reminder and PDF export features
- Implemented Important Tasks Reminder notification system:
  - Displays card with all incomplete important tasks
  - Click-to-scroll functionality for quick navigation to tasks
  - Auto-hides when all important tasks are completed (no manual dismiss)
  - Includes data-task-id attributes on checklist items for scroll targets
  - Enhanced UX with focus management and accessibility
- Added PDF Export functionality:
  - Generates branded PDF with student info, date, and progress
  - Lists all sections and tasks with completion indicators
  - Marks important tasks with [IMPORTANT] label
  - Handles long text with pagination
  - Provides fallback display for users with null names
  - Download button with success toast notification
- Updated to official CODED brand colors:
  - Navy Blue #14243F (Primary/Brand)
  - Secondary Blue #004AA3 (Secondary)
  - Light Gray #D2D2D2 (Tertiary)
  - WCAG AA contrast compliance verified
- Fixed progress calculation with useMemo to prevent re-render issues
- All features tested and architect-approved with TypeScript type improvements

**2025-11-06**: Multi-user authentication and admin dashboard
- Integrated Replit Auth (OpenID Connect) for secure user authentication
- Added PostgreSQL-backed session management with Express Session
- Created Landing page for unauthenticated users with brand messaging
- Implemented useAuth hook and protected routes pattern
- Built comprehensive Admin Dashboard with analytics:
  - Total students, tasks, and average completion statistics
  - Per-user progress tracking with completion percentages
  - Task-level analytics grouped by section
- Added isAdmin middleware for secure admin-only endpoints
- Removed unique constraint on email to support testing scenarios
- Fixed localStorage caching bug preventing server data sync
- All end-to-end tests passing: authentication flow, admin dashboard, progress tracking

**2025-11-06**: Initial implementation with database persistence
- Created complete checklist system with all sections and tasks (19 total)
- Implemented CODED brand colors and typography
- Implemented dark mode theme with professional styling
- Integrated PostgreSQL database via Neon with WebSocket support
- Implemented TanStack Query with optimistic updates for instant UI feedback
- Added localStorage as offline fallback/initial data
- Removed all emoji usage per design guidelines
- Fixed confetti celebration trigger to work correctly at 100% completion
- Configured Drizzle ORM with proper WebSocket constructor for Neon

## User Preferences

- Font: Manrope (headings), Helvetica Neue (body)
- Official Brand Colors:
  - Navy Blue #14243F (Brand/Primary)
  - Secondary Blue #004AA3 (Secondary)
  - Light Gray #D2D2D2 (Tertiary)
- Design Style: Modern, clean, student-friendly
- Theme: Dark mode only
- No emoji usage in UI

## Development

The application runs on port 5000 with hot reload enabled. Both frontend (Vite) and backend (Express) are served from the same port.

To start: The workflow "Start application" runs `npm run dev`
