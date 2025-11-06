import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertTriangle, HelpCircle } from "lucide-react";
import { ChecklistTask } from "@shared/schema";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ChecklistItemProps {
  task: ChecklistTask;
  completed: boolean;
  onToggle: (taskId: string, completed: boolean) => void;
}

export function ChecklistItem({ task, completed, onToggle }: ChecklistItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasDetails = task.description || task.subtasks || task.helpText;

  return (
    <div
      className={cn(
        "group rounded-lg border border-card-border bg-card p-4 transition-all",
        "hover-elevate"
      )}
      data-testid={`task-${task.id}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          id={task.id}
          checked={completed}
          onCheckedChange={(checked) => onToggle(task.id, checked as boolean)}
          className="mt-0.5 flex-shrink-0"
          data-testid={`checkbox-${task.id}`}
        />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start gap-2 flex-wrap">
            <label
              htmlFor={task.id}
              className={cn(
                "flex-1 text-base font-medium cursor-pointer leading-relaxed",
                completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </label>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {task.isImportant && (
                <Badge variant="destructive" className="text-xs">
                  Important
                </Badge>
              )}
              {task.isBonus && (
                <Badge variant="secondary" className="text-xs">
                  Bonus
                </Badge>
              )}
              {task.link && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 gap-1.5"
                  asChild
                  data-testid={`link-${task.id}`}
                >
                  <a href={task.link} target="_blank" rel="noopener noreferrer">
                    <span className="text-xs">Open</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {task.description}
            </p>
          )}

          {task.warning && (
            <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-destructive">{task.warning}</p>
            </div>
          )}

          {task.subtasks && task.subtasks.length > 0 && (
            <ul className="space-y-1.5 ml-0.5">
              {task.subtasks.map((subtask) => (
                <li
                  key={subtask.id}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span className="flex-1 font-mono text-xs bg-muted px-2 py-1 rounded">
                    {subtask.text}
                  </span>
                  {subtask.link && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-1.5"
                      asChild
                    >
                      <a href={subtask.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {task.helpText && hasDetails && (
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 gap-1.5 text-muted-foreground"
                  data-testid={`toggle-help-${task.id}`}
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span className="text-xs">
                    {isOpen ? "Hide help" : "Need help?"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="flex items-start gap-2 p-3 rounded-md bg-primary/5 border border-primary/10">
                  <HelpCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{task.helpText}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </div>
    </div>
  );
}
