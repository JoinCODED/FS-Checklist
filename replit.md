# CODED Student Orientation Checklist

## Overview

This application provides a mobile-friendly, progressive orientation checklist system for CODED Data Science Bootcamp students. Its primary purpose is to help new students complete their onboarding tasks efficiently before the bootcamp begins. The system features real-time progress tracking, organized sections, and a clean, modern UI aligned with CODED's branding. It aims to streamline the onboarding process, ensure students complete critical steps, and provide administrators with insights into student progress.

## User Preferences

- Font: Manrope (headings), Helvetica Neue (body)
- Official Brand Colors:
  - Navy Blue #14243F (Brand/Primary)
  - Secondary Blue #004AA3 (Secondary)
  - Light Gray #D2D2D2 (Tertiary)
- Design Style: Modern, clean, student-friendly
- Theme: Dark mode only
- No emoji usage in UI

## System Architecture

The application is built with a React TypeScript frontend and an Express.js backend.

### UI/UX Decisions
- **Design System**: Follows CODED's brand guidelines with specific color palettes (Navy Blue #14243F, Secondary Blue #004AA3, Light Gray #D2D2D2) and typography (Manrope for headings, Helvetica Neue for body).
- **Theme**: Exclusively dark mode, enforced application-wide.
- **Responsiveness**: Optimized for all device sizes.
- **Components**: Utilizes Shadcn UI for consistent, modern components.
- **User Feedback**: Includes confetti celebration on 100% completion, skeleton loading screens, and auto-hiding "Important Reminder" notifications for incomplete critical tasks.
- **Accessibility**: Designed with ARIA labels, keyboard navigation, and WCAG AA contrast compliance.

### Technical Implementations
- **Progressive Checklist**: Tasks are organized into logical, collapsible sections (e.g., Welcome, First Steps, Discord). Each task supports links, warnings, instructions, and subtasks, with badges for 'bonus' and 'important' tasks.
- **Real-time Tracking**: Visual progress bar and percentage display, with progress saved to PostgreSQL and localStorage fallback.
- **Authentication**: Secure user login via Replit Auth (OpenID Connect) with session management using Express Session and a PostgreSQL session store.
- **Admin Dashboard**: Provides comprehensive analytics for tracking student onboarding progress, including total users, completion rates, and per-user/per-task statistics.
- **Data Fetching**: TanStack Query is used for efficient data fetching, caching, and optimistic updates.
- **Routing**: Wouter handles frontend routing.

### Feature Specifications
- **Core Checklist**: Structured into sections like Welcome, First Steps, Discord, Notion, Essentials, Read at Home.
- **Task Details**: Individual tasks can include external links, warning messages, helpful instructions, subtasks, and 'bonus' or 'important' badges.
- **Important Reminder**: An auto-hiding notification lists incomplete important tasks and provides click-to-scroll navigation. It is not manually dismissible.
- **Quick Reference Cards**: Provide easy access to essential information like WiFi credentials and mentor contact details.
- **Reset Progress**: Button at the bottom of checklist allows users to clear all their progress with confirmation dialog for safety.
- **Multi-user Support**: Each student has their own account and progress tracking, with protected routes for authenticated access.

### System Design Choices
- **Frontend**: React with TypeScript, Tailwind CSS, Shadcn UI.
- **Backend**: Express.js with a RESTful API.
- **Database**: PostgreSQL (Neon) for primary data storage, utilizing Drizzle ORM for type-safe queries.
- **Validation**: Zod for data validation.

## External Dependencies

- **PostgreSQL (via Neon)**: Primary database for user data, checklist progress, and session storage.
- **Replit Auth (OpenID Connect)**: Used for secure user authentication and identity management.
- **Express Session**: Middleware for managing user sessions with a PostgreSQL store.
- **TanStack Query**: For server state management and data synchronization.
- **Wouter**: A small router library for React applications.
- **React Confetti**: For celebratory visual effects.
- **jsPDF**: (Removed as of recent changes) Previously used for PDF generation.