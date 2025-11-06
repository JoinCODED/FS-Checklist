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
- **Persistence**: Progress saved to backend API with localStorage fallback

### User Experience
- **Dark/Light Theme**: Full theme support with smooth transitions
- **Confetti Celebration**: Visual celebration when 100% completion is reached
- **Mobile Responsive**: Optimized for all device sizes
- **Collapsible Sections**: Clean organization with expandable/collapsible section cards
- **Loading States**: Beautiful skeleton screens while data loads
- **Error Handling**: Graceful fallback to localStorage if API fails

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
- **In-memory storage** for development
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
│   │   │   └── use-window-size.tsx    # Window dimensions for confetti
│   │   ├── pages/
│   │   │   └── Checklist.tsx          # Main checklist page
│   │   └── index.css                  # Theme colors and utilities
├── server/
│   ├── routes.ts                      # API endpoints
│   └── storage.ts                     # In-memory storage interface
└── shared/
    └── schema.ts                      # Shared types and checklist data
```

## API Endpoints

### GET /api/progress
Returns progress for the default user as a Record<string, boolean>

**Response:**
```json
{
  "wifi": true,
  "chrome": true,
  "discord-join": false
}
```

### POST /api/progress
Updates progress for a specific task

**Request:**
```json
{
  "taskId": "wifi",
  "completed": true
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "default-user",
  "taskId": "wifi",
  "completed": true
}
```

## Data Model

### ChecklistProgress
- `id`: Unique identifier
- `userId`: User identifier (currently using "default-user")
- `taskId`: Task identifier
- `completed`: Boolean completion status

### ChecklistSection
- `id`: Section identifier
- `title`: Section title
- `description`: Optional description
- `collapsible`: Whether section can be collapsed
- `tasks`: Array of ChecklistTask

### ChecklistTask
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

**2025-11-06**: Complete implementation with database persistence
- Created complete checklist system with all sections and tasks (19 total)
- Implemented CODED brand colors and typography (Blue primary, Green accent)
- Added dark/light theme support with smooth transitions
- Integrated PostgreSQL database via Neon with WebSocket support
- Implemented TanStack Query with optimistic updates for instant UI feedback
- Added localStorage as offline fallback/initial data
- Removed all emoji usage per design guidelines
- Fixed confetti celebration trigger to work correctly at 100% completion
- Configured Drizzle ORM with proper WebSocket constructor for Neon
- All end-to-end tests passing: progress tracking, persistence, confetti, theme toggle

## User Preferences

- Font: Manrope (headings), Helvetica Neue (body)
- Brand Colors: Blue primary (#1E90FF), Green accent (#10B981)
- Design Style: Modern, clean, student-friendly
- No emoji usage in UI

## Development

The application runs on port 5000 with hot reload enabled. Both frontend (Vite) and backend (Express) are served from the same port.

To start: The workflow "Start application" runs `npm run dev`
