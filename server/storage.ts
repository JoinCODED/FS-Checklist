import {
  type ChecklistProgress,
  type InsertChecklistProgress,
  type User,
  type UpsertUser,
  checklistProgress,
  users,
} from "@shared/schema";
import { db } from "../db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getProgressByUserId(userId: string): Promise<ChecklistProgress[]>;
  updateProgress(
    userId: string,
    taskId: string,
    completed: boolean
  ): Promise<ChecklistProgress>;
  getAllProgress(userId: string): Promise<Map<string, boolean>>;
  getAllUsersProgress(): Promise<ChecklistProgress[]>;
  resetProgress(userId: string): Promise<void>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getAllUsersProgress(): Promise<ChecklistProgress[]> {
    return await db.select().from(checklistProgress);
  }

  async getProgressByUserId(userId: string): Promise<ChecklistProgress[]> {
    return await db
      .select()
      .from(checklistProgress)
      .where(eq(checklistProgress.userId, userId));
  }

  async updateProgress(
    userId: string,
    taskId: string,
    completed: boolean
  ): Promise<ChecklistProgress> {
    const existing = await db
      .select()
      .from(checklistProgress)
      .where(
        and(
          eq(checklistProgress.userId, userId),
          eq(checklistProgress.taskId, taskId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      const updated = await db
        .update(checklistProgress)
        .set({ completed })
        .where(
          and(
            eq(checklistProgress.userId, userId),
            eq(checklistProgress.taskId, taskId)
          )
        )
        .returning();
      return updated[0];
    }

    const inserted = await db
      .insert(checklistProgress)
      .values({ userId, taskId, completed })
      .returning();
    return inserted[0];
  }

  async getAllProgress(userId: string): Promise<Map<string, boolean>> {
    const userProgress = await this.getProgressByUserId(userId);
    const result = new Map<string, boolean>();
    userProgress.forEach((p) => {
      result.set(p.taskId, p.completed);
    });
    return result;
  }

  async resetProgress(userId: string): Promise<void> {
    await db
      .delete(checklistProgress)
      .where(eq(checklistProgress.userId, userId));
  }
}

export const storage = new DbStorage();
