import { ChecklistSection as ChecklistSectionType } from "@shared/schema";
import { ChecklistItem } from "./ChecklistItem";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistSectionProps {
  section: ChecklistSectionType;
  completedTasks: Set<string>;
  onToggleTask: (taskId: string, completed: boolean) => void;
}

export function ChecklistSection({
  section,
  completedTasks,
  onToggleTask,
}: ChecklistSectionProps) {
  const [isOpen, setIsOpen] = useState(!section.collapsible);

  if (section.tasks.length === 0) {
    return (
      <div className="space-y-4" data-testid={`section-${section.id}`}>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {section.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  const completedCount = section.tasks.filter((task) =>
    completedTasks.has(task.id)
  ).length;
  const totalCount = section.tasks.length;
  const isComplete = completedCount === totalCount;

  const SectionContent = () => (
    <div className="space-y-3">
      {section.tasks.map((task) => (
        <ChecklistItem
          key={task.id}
          task={task}
          completed={completedTasks.has(task.id)}
          onToggle={onToggleTask}
        />
      ))}
    </div>
  );

  if (!section.collapsible) {
    return (
      <div className="space-y-4" data-testid={`section-${section.id}`}>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {section.description}
            </p>
          )}
        </div>
        <SectionContent />
      </div>
    );
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border border-card-border bg-card overflow-hidden"
      data-testid={`section-${section.id}`}
    >
      <CollapsibleTrigger
        className="w-full p-6 flex items-center justify-between gap-4 hover-elevate active-elevate-2"
        data-testid={`toggle-section-${section.id}`}
      >
        <div className="flex items-start gap-3 flex-1 text-left min-w-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
              {section.title}
            </h2>
            {section.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Badge
            variant={isComplete ? "default" : "secondary"}
            className={cn("text-xs", isComplete && "bg-accent hover:bg-accent")}
            data-testid={`badge-progress-${section.id}`}
          >
            {completedCount}/{totalCount}
          </Badge>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform flex-shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-6 pb-6 pt-2">
          <SectionContent />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
