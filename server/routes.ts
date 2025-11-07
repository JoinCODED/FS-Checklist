import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin } from "./replitAuth";
import { z } from "zod";
import { checklistData } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getAllProgress(userId);
      const result: Record<string, boolean> = {};
      progress.forEach((completed, taskId) => {
        result[taskId] = completed;
      });
      console.log(`[GET /api/progress] Returning ${Object.keys(result).length} tasks for user ${userId}`);
      res.json(result);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", isAuthenticated, async (req: any, res) => {
    try {
      const schema = z.object({
        taskId: z.string(),
        completed: z.boolean(),
      });

      const userId = req.user.claims.sub;
      const { taskId, completed } = schema.parse(req.body);
      console.log(`[POST /api/progress] Updating task ${taskId} to ${completed} for user ${userId}`);
      const progress = await storage.updateProgress(
        userId,
        taskId,
        completed
      );
      console.log(`[POST /api/progress] Successfully updated. Current progress count:`, await storage.getAllProgress(userId));
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        console.error("Error updating progress:", error);
        res.status(500).json({ error: "Failed to update progress" });
      }
    }
  });

  app.delete("/api/progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      console.log(`[DELETE /api/progress] Resetting all progress for user ${userId}`);
      await storage.resetProgress(userId);
      console.log(`[DELETE /api/progress] Successfully reset progress for user ${userId}`);
      res.json({ success: true, message: "Progress reset successfully" });
    } catch (error) {
      console.error("Error resetting progress:", error);
      res.status(500).json({ error: "Failed to reset progress" });
    }
  });

  app.get("/api/admin/stats", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const allProgress = await storage.getAllUsersProgress();

      const totalTasks = checklistData.reduce((sum, section) => sum + section.tasks.length, 0);
      
      const userStats = users.map(user => {
        const userProgress = allProgress.filter(p => p.userId === user.id && p.completed);
        const completedCount = userProgress.length;
        const completionRate = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;
        
        return {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          completedTasks: completedCount,
          totalTasks,
          completionRate: Math.round(completionRate),
        };
      });

      const taskStats = checklistData.flatMap(section => 
        section.tasks.map(task => {
          const completedByUsers = allProgress.filter(
            p => p.taskId === task.id && p.completed
          ).length;
          return {
            taskId: task.id,
            taskTitle: task.title,
            sectionId: section.id,
            sectionTitle: section.title,
            completedBy: completedByUsers,
            totalUsers: users.length,
            completionRate: users.length > 0 ? Math.round((completedByUsers / users.length) * 100) : 0,
          };
        })
      );

      res.json({
        totalUsers: users.length,
        totalTasks,
        avgCompletionRate: userStats.length > 0 
          ? Math.round(userStats.reduce((sum, u) => sum + u.completionRate, 0) / userStats.length)
          : 0,
        userStats,
        taskStats,
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
