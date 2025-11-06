import {
  type ChecklistProgress,
  type InsertChecklistProgress,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProgressByUserId(userId: string): Promise<ChecklistProgress[]>;
  updateProgress(
    userId: string,
    taskId: string,
    completed: boolean
  ): Promise<ChecklistProgress>;
  getAllProgress(userId: string): Promise<Map<string, boolean>>;
}

export class MemStorage implements IStorage {
  private progress: Map<string, ChecklistProgress>;

  constructor() {
    this.progress = new Map();
  }

  async getProgressByUserId(userId: string): Promise<ChecklistProgress[]> {
    return Array.from(this.progress.values()).filter(
      (p) => p.userId === userId
    );
  }

  async updateProgress(
    userId: string,
    taskId: string,
    completed: boolean
  ): Promise<ChecklistProgress> {
    const key = `${userId}-${taskId}`;
    const existing = this.progress.get(key);

    if (existing) {
      const updated = { ...existing, completed };
      this.progress.set(key, updated);
      return updated;
    }

    const newProgress: ChecklistProgress = {
      id: randomUUID(),
      userId,
      taskId,
      completed,
    };
    this.progress.set(key, newProgress);
    return newProgress;
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

export const storage = new MemStorage();
