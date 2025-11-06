import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const DEFAULT_USER_ID = "default-user";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/progress", async (req, res) => {
    try {
      const progress = await storage.getAllProgress(DEFAULT_USER_ID);
      const result: Record<string, boolean> = {};
      progress.forEach((completed, taskId) => {
        result[taskId] = completed;
      });
      res.json(result);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const schema = z.object({
        taskId: z.string(),
        completed: z.boolean(),
      });

      const { taskId, completed } = schema.parse(req.body);
      const progress = await storage.updateProgress(
        DEFAULT_USER_ID,
        taskId,
        completed
      );
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
