# CODED Student Checklist - Design Guidelines

## Design Approach

**Selected Approach:** Hybrid - Drawing inspiration from productivity tools (Notion, Linear, Todoist) with student-friendly warmth and clarity.

**Core Principle:** Create a simple, encouraging checklist experience that feels accomplishing rather than overwhelming. Focus on clarity, progress visibility, and mobile-first usability.

## Typography System

**Font Stack:**
- **Headings:** Manrope (600-700 weight) via Google Fonts
- **Body:** Helvetica Neue (400-500 weight), fallback to system fonts
- **Monospace:** For codes/credentials (e.g., WiFi passwords)

**Type Scale:**
- Page Title: text-3xl md:text-4xl font-bold
- Section Headers: text-xl md:text-2xl font-semibold  
- Task Text: text-base md:text-lg font-normal
- Helper Text: text-sm font-normal
- Labels/Meta: text-xs font-medium uppercase tracking-wide

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component gaps: gap-4 to gap-6
- Section padding: p-6 md:p-8
- Card spacing: space-y-4
- Tight groupings: space-y-2

**Container Strategy:**
- Max width: max-w-3xl mx-auto (optimal reading width for checklists)
- Mobile padding: px-4
- Desktop padding: px-6 md:px-8
- Full-height app container with scrollable content area

## Component Library

### Progress Tracking
**Overall Progress Bar:**
- Fixed at top of page or within header
- Full-width background with animated fill
- Display percentage text prominently
- Height: h-3 with rounded-full styling
- Smooth transitions on progress updates

**Section Progress Indicators:**
- Small circular badges showing "X/Y completed"
- Positioned near section headers

### Checklist Sections
**Collapsible Section Cards:**
- Border with subtle shadow (shadow-sm)
- Rounded corners: rounded-lg
- Background treatment (awaiting color palette)
- Expandable/collapsible with smooth transitions
- Header with section title, icon, and completion count
- Padding: p-6 when expanded

### Task Items
**Individual Checkboxes:**
- Custom styled checkboxes (not native)
- Size: w-6 h-6 with proper touch targets (min 44x44px)
- Rounded: rounded-md
- Animated checkmark on completion
- Strike-through text when checked
- Nested sub-tasks indented with connecting lines

**Task Layout:**
- Flexbox: flex items-start gap-3
- Checkbox on left, content on right
- Supporting text/instructions below main task
- Expandable details for complex tasks

### Information Cards
**Quick Reference Cards** (WiFi, Contact Info):
- Distinct visual treatment from task cards
- Icon + label + copyable value
- Click-to-copy functionality
- Compact layout: p-4 with reduced spacing

### Welcome & Motivational Elements
**Welcome Header:**
- Friendly greeting with emoji support
- Concise orientation message
- CODED logo integration (awaiting asset)
- Padding: py-8 md:py-12

**Encouragement Messages:**
- Subtle inline messages between sections
- Emoji usage for warmth (👋 ✨ 😄 🔥)
- Light styling to not compete with tasks

### Buttons & Actions
**Primary Actions:**
- Prominent buttons for critical actions (Sign Contract, Join Discord)
- Padding: px-6 py-3
- Rounded: rounded-lg
- Font: font-semibold text-base

**Secondary Actions:**
- Ghost or outline treatment
- Smaller padding: px-4 py-2

### Navigation/Header
**Sticky Header:**
- Contains logo, title, and overall progress
- Shadow on scroll for depth
- Height: h-16 md:h-20
- z-index: z-50

## Mobile Optimization

**Critical Mobile Considerations:**
- All touch targets minimum 44x44px
- Single column layout on mobile
- Expandable sections collapsed by default on small screens
- Bottom padding for comfortable thumb reach
- Fixed header that doesn't obstruct content
- Swipe gestures for collapsible sections (optional enhancement)

## Interaction Patterns

**Checkbox Interactions:**
- Immediate visual feedback (checkmark animation)
- Progress bar updates in real-time
- Confetti/celebration on 100% completion (subtle)
- Local storage persistence across sessions

**Section Expansion:**
- Smooth height transitions (transition-all duration-300)
- Rotate icon indicator (chevron/arrow)
- Focus management for accessibility

**Progress Tracking:**
- Auto-save every interaction
- Visual confirmation of saves
- Section-level and overall completion tracking

## Accessibility Requirements

- All checkboxes with proper labels and ARIA attributes
- Keyboard navigation support (Tab, Space, Enter)
- Focus indicators visible and clear (ring-2 ring-offset-2)
- Color contrast ratios meeting WCAG AA standards (pending color palette)
- Screen reader announcements for progress updates
- Semantic HTML structure (sections, lists, headings hierarchy)

## Content Organization

**Primary Sections (in order):**
1. **Welcome & Overview** - Greeting, context, overall progress
2. **First Things First** - WiFi, Chrome, CoLab, Kaggle, Discord download
3. **Discord Setup** - Join server, set name, upload photo
4. **Notion Setup** - Signup, wait for permissions
5. **Essentials** - Contract, networking, goodie bag, photo submission
6. **Read at Home** - Device requirements, evaluation metrics, contact info
7. **Quick Reference** - WiFi credentials, contact number (always visible/sticky)

**Content Density:**
- Generous whitespace between sections (space-y-8)
- Tight grouping within related tasks (space-y-2)
- Clear visual separation between section types

## Special Notes

**Awaiting Assets:**
- CODED color palette (critical - do not proceed with color decisions)
- CODED logo file
- Once received, apply consistently across all brand touchpoints

**No Hero Image:** This is a functional app, not a marketing page - no large hero imagery needed.

**Tone:** Friendly, encouraging, supportive - this is a student's first interaction with CODED, make it welcoming and confidence-building.