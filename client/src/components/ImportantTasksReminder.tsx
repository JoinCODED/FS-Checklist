import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import type { ChecklistTask } from "@shared/schema";

interface ImportantTasksReminderProps {
  incompleteTasks: Array<{ task: ChecklistTask; sectionTitle: string }>;
  onTaskClick: (taskId: string) => void;
}

export function ImportantTasksReminder({ incompleteTasks, onTaskClick }: ImportantTasksReminderProps) {
  if (incompleteTasks.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-destructive/10 border-destructive/30" data-testid="card-important-tasks-reminder">
      <div className="flex items-start gap-4">
        <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Important Reminder
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Please complete these critical tasks to ensure a smooth start to your bootcamp experience.
            </p>
          </div>
          <ul className="space-y-2">
            {incompleteTasks.map(({ task, sectionTitle }) => (
              <li key={task.id} className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => onTaskClick(task.id)}
                    className="text-left text-sm text-foreground font-medium"
                    data-testid={`link-important-task-${task.id}`}
                  >
                    {task.title} <span className="text-muted-foreground">({sectionTitle})</span>
                  </button>
                  {task.id === "contract" && (
                    <div className="flex items-center gap-3">
                      <a
                        href="https://mail.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                        data-testid="link-gmail-contract"
                      >
                        Click for Gmail
                        <span className="text-xs">→</span>
                      </a>
                      <a
                        href="https://outlook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                        data-testid="link-outlook-contract"
                      >
                        Click for Outlook
                        <span className="text-xs">→</span>
                      </a>
                    </div>
                  )}
                </div>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">•</span>
              <p className="text-sm text-foreground font-medium" data-testid="text-email-reminder">
                Remember to complete setting up your trainee coded email sent to you by admission email
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
