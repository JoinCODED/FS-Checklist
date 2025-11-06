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
- **Quick Reference Cards**: Easy access to WiFi credentials and CODED contact number
- **Persistence**: Progress saved to PostgreSQL database with localStorage fallback
- **User Authentication**: Replit Auth (OpenID Connect) for secure login with session management
- **Admin Dashboard**: Comprehensive analytics dashboard for tracking student progress

### User Experience
- **Dark/Light Theme**: Full theme support with smooth transitions
- **Confetti Celebration**: Visual celebration when 100% completion is reached
- **Mobile Responsive**: Optimized for all device sizes
- **Collapsible Sections**: Clean organization with expandable/collapsible section cards
- **Loading States**: Beautiful skeleton screens while data loads
- **Error Handling**: Graceful fallback to localStorage if API fails
- **Multi-user Support**: Each student has their own account and progress tracking
- **Secure Access**: Protected routes with automatic session management

### Design
- **CODED Branding**: Custom color palette using CODED blue (primary) and green (accent)
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
│   │   │   ├── ChecklistItem.tsx      # Individual task checkbox
│   │   │   ├── ChecklistSection.tsx   # Collapsible section container
│   │   │   ├── CodedLogo.tsx          # CODED logo component
│   │   │   ├── ConclusionMessage.tsx  # Final welcome message
│   │   │   ├── LoadingState.tsx       # Skeleton loading screen
│   │   │   ├── ProgressBar.tsx        # Progress visualization
│   │   │   ├── QuickReference.tsx     # WiFi/contact info card
│   │   │   └── WelcomeMessage.tsx     # Encouragement message
│   │   ├── hooks/
│   │   │   ├── use-theme.tsx          # Theme provider and hook
│   │   │   ├── use-window-size.tsx    # Window dimensions for confetti
│   │   │   └── useAuth.ts             # Authentication hook
│   │   ├── lib/
│   │   │   └── authUtils.ts           # Auth utility functions
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
- Implemented CODED brand colors and typography (Blue primary, Green accent)
- Added dark/light theme support with smooth transitions
- Integrated PostgreSQL database via Neon with WebSocket support
- Implemented TanStack Query with optimistic updates for instant UI feedback
- Added localStorage as offline fallback/initial data
- Removed all emoji usage per design guidelines
- Fixed confetti celebration trigger to work correctly at 100% completion
- Configured Drizzle ORM with proper WebSocket constructor for Neon

## User Preferences

- Font: Manrope (headings), Helvetica Neue (body)
- Brand Colors: Blue primary (#1E90FF), Green accent (#10B981)
- Design Style: Modern, clean, student-friendly
- No emoji usage in UI

## Development

The application runs on port 5000 with hot reload enabled. Both frontend (Vite) and backend (Express) are served from the same port.

To start: The workflow "Start application" runs `npm run dev`
