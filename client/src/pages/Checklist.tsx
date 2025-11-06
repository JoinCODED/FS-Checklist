import { useState, useEffect } from "react";
import { checklistData } from "@shared/schema";
import { CodedLogo } from "@/components/CodedLogo";
import { ProgressBar } from "@/components/ProgressBar";
import { ChecklistSection } from "@/components/ChecklistSection";
import { QuickReference } from "@/components/QuickReference";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { ConclusionMessage } from "@/components/ConclusionMessage";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

const STORAGE_KEY = "coded-checklist-progress";

export default function Checklist() {
  const [showConfetti, setShowConfetti] = useState(false);
  const { theme, setTheme } = useTheme();
  const { width, height } = useWindowSize();

  const { data: serverProgress, isLoading } = useQuery<Record<string, boolean>>({
    queryKey: ["/api/progress"],
    initialData: () => {
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
        }
      }
      return {};
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ taskId, completed }: { taskId: string; completed: boolean }) => {
      return await apiRequest("POST", "/api/progress", { taskId, completed });
    },
    onMutate: async ({ taskId, completed }) => {
      await queryClient.cancelQueries({ queryKey: ["/api/progress"] });
      
      const previousProgress = queryClient.getQueryData<Record<string, boolean>>(["/api/progress"]);
      
      queryClient.setQueryData<Record<string, boolean>>(["/api/progress"], (old = {}) => {
        return { ...old, [taskId]: completed };
      });
      
      return { previousProgress };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousProgress) {
        queryClient.setQueryData(["/api/progress"], context.previousProgress);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });

  const completedTasks = new Set<string>(
    Object.entries(serverProgress || {})
      .filter(([_, completed]) => completed)
      .map(([taskId]) => taskId)
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Array.from(completedTasks))
    );
  }, [completedTasks]);

  const totalTasks = checklistData.reduce(
    (sum, section) => sum + section.tasks.length,
    0
  );

  const completedCount = completedTasks.size;

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    const newCompletedCount = completed 
      ? completedCount + 1 
      : completedCount - 1;

    try {
      await updateProgressMutation.mutateAsync({ taskId, completed });
      
      if (completed && newCompletedCount === totalTasks) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (error) {
      console.error("Failed to update progress", error);
    }
  };

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
            <CodedLogo />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Data Science Bootcamp
            </h1>
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
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {section.title}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  <WelcomeMessage />
                </div>
              );
            }

            return (
              <ChecklistSection
                key={section.id}
                section={section}
                completedTasks={completedTasks}
                onToggleTask={handleToggleTask}
              />
            );
          })}

          <QuickReference />

          <ConclusionMessage />
        </div>
      </main>

      <footer className="border-t border-border py-8 mt-16">
        <div className="container max-w-4xl mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            CODED Human Capital Development Company © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
