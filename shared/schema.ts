import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const checklistProgress = pgTable("checklist_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  taskId: text("task_id").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const insertChecklistProgressSchema = createInsertSchema(checklistProgress).omit({
  id: true,
});

export type InsertChecklistProgress = z.infer<typeof insertChecklistProgressSchema>;
export type ChecklistProgress = typeof checklistProgress.$inferSelect;

export interface ChecklistTask {
  id: string;
  title: string;
  description?: string;
  link?: string;
  internalRoute?: string;
  warning?: string;
  subtasks?: ChecklistSubtask[];
  helpText?: string;
  isBonus?: boolean;
  isImportant?: boolean;
  isRecommended?: boolean;
}

export interface ChecklistSubtask {
  id: string;
  text: string;
  link?: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  description?: string;
  emoji?: string;
  tasks: ChecklistTask[];
  collapsible: boolean;
}

export const checklistData: ChecklistSection[] = [
  {
    id: "welcome",
    title: "Welcome to CODED",
    description: "Hi, and welcome to CODED! Make sure you complete the following tasks before you leave. The team is with you, feel free to ask them.",
    collapsible: false,
    tasks: [],
  },
  {
    id: "first-things-first",
    title: "First things first",
    description: "Go to the snack bar, take a cup of coffee or tea, take a snack, and check the following boxes",
    collapsible: true,
    tasks: [
      {
        id: "chrome",
        title: "Download Chrome on your laptop",
        link: "https://www.google.com/chrome",
        isRecommended: true,
      },
      {
        id: "cursor",
        title: "Download Cursor on your laptop",
        link: "https://cursor.com/download",
      },
      {
        id: "git",
        title: "Download git on your laptop and install it",
        link: "https://git-scm.com/downloads",
      },
      {
        id: "whatsapp-contact",
        title: "CODED Education Team WhatsApp",
        link: "https://wa.me/96555421902",
        subtasks: [
          { id: "whatsapp-number", text: "55421902" },
        ],
      },
    ],
  },
  {
    id: "discord",
    title: "Discord",
    collapsible: true,
    tasks: [
      {
        id: "discord-download",
        title: "Download Discord on both your laptop and mobile",
        link: "https://discord.com/download",
        warning: "DON'T CREATE A NEW SERVER! YOU WILL JOIN OUR SERVER",
      },
      {
        id: "discord-join",
        title: "Click this link to join our server",
        link: "https://discord.gg/4RJPMEM6W5",
        helpText: "Now you should be able to see our channels",
      },
      {
        id: "discord-name",
        title: "Name yourself on Discord with your first name and family name",
        description: "Please don't use nicknames",
        helpText: "Right-click your name in the server member list → Change Nickname",
      },
      {
        id: "discord-photo",
        title: "Upload a unique photo of yourself",
        description: "It's nice for your colleagues and instructors to know who you are in the first few days based on your photo",
        isBonus: true,
        helpText: "User Settings → My Account → Change Avatar",
      },
    ],
  },
  {
    id: "google-account",
    title: "Google Account",
    collapsible: true,
    tasks: [
      {
        id: "google-account",
        title: "Login using @coded.edu.kw account",
        description: "Sent by CODED admission in your email. Assistant mentor can help you in the process.",
      },
    ],
  },
  {
    id: "notion",
    title: "Github & Notion",
    collapsible: true,
    tasks: [
      {
        id: "github-signup",
        title: "Signup to github",
        link: "https://github.com",
        description: "Remember your GitHub username, we will ask you later for it",
      },
      {
        id: "notion-signup",
        title: "Sign up to Notion",
        link: "https://www.notion.so/signup",
      },
      {
        id: "notion-wait",
        title: "Wait for the mentors to give you permission to access Notion",
        description: "Your mentor will add you to the workspace",
      },
      {
        id: "notion-verify",
        title: "Verify you can access the courses",
        description: "Once you see the courses appearing to you, it means you're good to go!",
      },
    ],
  },
  {
    id: "essentials",
    title: "Essentials",
    collapsible: true,
    tasks: [
      {
        id: "github-picture-form",
        title: "Fill this form to submit your GitHub Account and Picture",
        link: "https://airtable.com/appGSMF2eEC2s4abA/pagxHeida0bCbwok3/form",
        description: "We will not use this picture in any midea, and will only be for the team to know your faster",
      },
      {
        id: "contract",
        title: "Read and sign the contract",
        description: "You should have received it on your registered email",
        isImportant: true,
      },
      {
        id: "networking",
        title: "Meet your instructors and mentors, discuss with them about the bootcamp, their work, and your goals",
      },
    ],
  },
  {
    id: "read-at-home",
    title: "Read at home",
    collapsible: true,
    tasks: [
      {
        id: "device-requirements",
        title: "Check your device requirements",
        description: "Make sure they match the specs for CODED - Full Stack & AI Bootcamp",
        internalRoute: "/device-requirements",
      },
      {
        id: "evaluation-metrics",
        title: "Check how the instruction team will evaluate your performance",
        description: "Review the Fullstack Trainee Evaluation Metrics",
        internalRoute: "/evaluation-metrics",
      },
    ],
  },
];
