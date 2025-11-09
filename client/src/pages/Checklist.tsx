import { useState, useEffect, useMemo } from "react";
import { checklistData, type ChecklistTask } from "@shared/schema";
import { CodedLogo } from "@/components/CodedLogo";
import { ProgressBar } from "@/components/ProgressBar";
import { ChecklistSection } from "@/components/ChecklistSection";
import { QuickReference } from "@/components/QuickReference";
import { ConclusionMessage } from "@/components/ConclusionMessage";
import { LoadingState } from "@/components/LoadingState";
import { ImportantTasksReminder } from "@/components/ImportantTasksReminder";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RotateCcw, HandHeart, Sparkles, MapPin, Copy, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "coded-checklist-progress";

export default function Checklist() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const { width, height } = useWindowSize();
  const { toast } = useToast();

  // Load progress from localStorage instead of server
  const [localProgress, setLocalProgress] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const result: Record<string, boolean> = {};
        parsed.forEach((taskId: string) => {
          result[taskId] = true;
        });
        return result;
      } catch (e) {
        console.error("Failed to parse stored progress", e);
        return {};
      }
    }
    return {};
  });

  const serverProgress = localProgress;
  const isLoading = false;
  const progressError = null;

  const completedTasks = useMemo(() => {
    return new Set<string>(
      Object.entries(serverProgress || {})
        .filter(([_, completed]) => completed)
        .map(([taskId]) => taskId)
    );
  }, [serverProgress]);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Array.from(completedTasks))
    );
  }, [completedTasks]);

  const updateProgressMutation = useMutation({
    mutationFn: async ({ taskId, completed }: { taskId: string; completed: boolean }) => {
      // Update localStorage directly
      const updated = { ...localProgress, [taskId]: completed };
      setLocalProgress(updated);
      return updated;
    },
    onSuccess: (data, { completed }) => {
      const newCompletedCount = Object.values(data).filter(Boolean).length;
      if (completed && newCompletedCount === totalTasks) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    },
  });

  const totalTasks = checklistData.reduce(
    (sum, section) => sum + section.tasks.length,
    0
  );

  const completedCount = completedTasks.size;

  const incompleteImportantTasks = useMemo(() => {
    const tasks: Array<{ task: ChecklistTask; sectionTitle: string }> = [];
    checklistData.forEach((section) => {
      section.tasks.forEach((task) => {
        if (task.isImportant && !completedTasks.has(task.id)) {
          tasks.push({ task, sectionTitle: section.title });
        }
      });
    });
    return tasks;
  }, [completedTasks]);

  const handleScrollToTask = (taskId: string) => {
    const element = document.querySelector(`[data-task-id="${taskId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const checkbox = element.querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (checkbox) {
        setTimeout(() => {
          checkbox.focus();
        }, 500);
      }
    }
  };

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    try {
      await updateProgressMutation.mutateAsync({ taskId, completed });
    } catch (error) {
      console.error("Failed to update progress", error);
    }
  };

  const resetProgressMutation = useMutation({
    mutationFn: async () => {
      // Reset localStorage directly
      setLocalProgress({});
      localStorage.removeItem(STORAGE_KEY);
      return {};
    },
    onSuccess: () => {
      setResetDialogOpen(false);
      toast({
        title: "Progress reset",
        description: "All your progress has been cleared successfully",
      });
    },
  });

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" asChild>
              <a>
                <CodedLogo />
              </a>
            </Link>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-primary flex-shrink-0 mt-1" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Full Stack & AI Bootcamp
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Orientation Checklist
            </p>
          </div>

          <ProgressBar current={completedCount} total={totalTasks} />
        </div>

        <div className="space-y-8">
          {checklistData.map((section, index) => {
            if (section.id === "welcome") {
              return (
                <div key={section.id} className="space-y-6">
                  <Card className="p-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/10">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <HandHeart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div className="space-y-2">
                          <h2 className="text-xl font-semibold text-foreground">
                            {section.title}
                          </h2>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/10">
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <h2 className="text-xl font-semibold text-foreground">
                          When you arrive at CODED
                        </h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">WiFi Name:</p>
                          <div className="bg-muted/50 p-3 rounded-md">
                            <p className="text-sm font-mono text-foreground">Students / Students2</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">WiFi Password:</p>
                          <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between gap-2">
                            <p className="text-sm font-mono text-foreground">joincoded.com</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0"
                              onClick={() => {
                                navigator.clipboard.writeText("joincoded.com");
                                toast({ description: "Password copied to clipboard" });
                              }}
                              data-testid="button-copy-password"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-4 pt-2">
                          <p className="text-sm text-muted-foreground">Read your presence guide</p>
                          <Link href="/presence-guide">
                            <Button
                              variant="default"
                              className="gap-2"
                              data-testid="button-presence-guide"
                            >
                              <BookOpen className="h-4 w-4" />
                              Trainee Presence Guide
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            }

            return (
              <div key={section.id}>
                <ChecklistSection
                  section={section}
                  completedTasks={completedTasks}
                  onToggleTask={handleToggleTask}
                />
                {section.id === "essentials" && incompleteImportantTasks.length > 0 && (
                  <div className="mt-8">
                    <ImportantTasksReminder
                      incompleteTasks={incompleteImportantTasks}
                      onTaskClick={handleScrollToTask}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <QuickReference />

          <ConclusionMessage />

          <div className="flex justify-center mt-12">
            <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2"
                  data-testid="button-reset-progress"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset All Progress
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your checklist progress. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-testid="button-cancel-reset">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => resetProgressMutation.mutate()}
                    disabled={resetProgressMutation.isPending}
                    className="bg-destructive hover:bg-destructive/90"
                    data-testid="button-confirm-reset"
                  >
                    {resetProgressMutation.isPending ? "Resetting..." : "Reset Progress"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 mt-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            CODED Human Capital Development Company © 2025 The Go To Place For Tech Education
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Vibe Coded by Yousif Aldousari
          </p>
          <p className="text-xs text-muted-foreground">
            Supervised by Moudhi Albannai
          </p>
        </div>
      </footer>
    </div>
  );
}
