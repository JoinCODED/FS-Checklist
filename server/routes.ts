import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";

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

  const httpServer = createServer(app);

  return httpServer;
}
