import {
  type ChecklistProgress,
  type InsertChecklistProgress,
  checklistProgress,
} from "@shared/schema";
import { db } from "../db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getProgressByUserId(userId: string): Promise<ChecklistProgress[]>;
  updateProgress(
    userId: string,
    taskId: string,
    completed: boolean
  ): Promise<ChecklistProgress>;
  getAllProgress(userId: string): Promise<Map<string, boolean>>;
}

export class DbStorage implements IStorage {
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
}

export const storage = new DbStorage();
