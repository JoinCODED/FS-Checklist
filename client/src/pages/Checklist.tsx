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
import { RotateCcw, HandHeart, Sparkles, MapPin, Copy, BookOpen } from "lucide-react";
import { Link } from "wouter";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
                        
                        <div className="space-y-3 pt-2">
                          <p className="text-sm text-muted-foreground">Read your presence guide</p>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="default"
                                className="gap-2"
                                data-testid="button-presence-guide"
                              >
                                <BookOpen className="h-4 w-4" />
                                Trainee Presence Guide
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">Trainee Presence Guide</DialogTitle>
                                <DialogDescription className="sr-only">
                                  Guidelines for professional appearance, communication, classroom behavior, and ethics
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6 mt-4">
                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold">Professional Appearance 👔</h3>
                                  <p className="text-sm text-muted-foreground">
                                    ✨ As part of CODED's goal to be a leader in our field, we aim to follow key guidelines for both offline and online presence.
                                  </p>
                                  <div className="space-y-3">
                                    <div className="space-y-2">
                                      <h4 className="font-medium">Dress Code</h4>
                                      <p className="text-sm text-muted-foreground">Type: Smart / Business casual</p>
                                      <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>Look professional</li>
                                        <li>No Shorts or Short Skirts 🩳👗: Employees are required to wear pants, skirts, or dresses that are of an appropriate length. Skirts and dresses should be longer than knee-length. Shorts are not permitted.</li>
                                        <li>No Exposure of the Chest Area 🚫: All clothing should fully cover the chest area. Low-cut tops, shirts with plunging necklines, or other clothing that reveals the chest are not permitted.</li>
                                        <li>Shirt Sleeve Policy 👕: All must wear shirts with sleeves. Sleeveless tops, tank tops, or spaghetti straps are not allowed. Shirts should have sleeves that extend at least to the mid-upper arm for a professional appearance.</li>
                                      </ul>
                                    </div>
                                    <p className="text-sm">
                                      <span className="font-medium">Online Presence 💻:</span> Ensure that your profile photo and name are up-to-date and match your real-world identity across all online communication tools. This helps trainees easily recognize and connect with you.
                                    </p>
                                    <p className="text-sm">
                                      <span className="font-medium">Tattoo Policy 👘:</span> Cover visible tattoos at CODED campus and during class.
                                    </p>
                                    <p className="text-sm">
                                      <span className="font-medium">Accessory Restrictions 💥:</span> Keep it simple; no flashy or noisy accessories.
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold">Communication and Interaction 📡</h3>
                                  <ul className="space-y-2 text-sm">
                                    <li><span className="font-medium">Positive Engagement 😊:</span> Greet others with a smile, be friendly.</li>
                                    <li><span className="font-medium">Support and Discipline 👍:</span> Request assistance from the education team within your bootcamp to get help with challenges and explain concepts clearly.</li>
                                    <li><span className="font-medium">Professional Boundaries 🚫:</span> Don't share personal contact info, avoid over-socializing, and be patient when texting the education team. They will assist you when they can.</li>
                                    <li><span className="font-medium">Behavioral Standards ❌:</span> No swearing, bullying, or threats—keep a good attitude.</li>
                                    <li><span className="font-medium">Calm Conflict Resolution 🧘‍♂️:</span> Stay calm during conflicts and report issues immediately to CODED.</li>
                                  </ul>
                                </div>

                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold">Inside our Classroom 🧑🏻‍🏫</h3>
                                  <ul className="space-y-2 text-sm">
                                    <li><span className="font-medium">No Phones 📵:</span> No personal phones during class unless really needed.</li>
                                    <li><span className="font-medium">Stay Focused 🎯:</span> Keep personal talks for after class and make it safe for trainees to ask questions.</li>
                                    <li><span className="font-medium">Trainees Only in Class 🚫👥:</span> No guests allowed; the classroom is for trainees only.</li>
                                    <li><span className="font-medium">Keep your place Clean 🧼:</span> Don't leave your desk messy at the end of the day. Let's make sure you and other trainees have the best environment while teaching.</li>
                                    <li><span className="font-medium">Announcements 🎙️:</span> Make sure you turn on your Discord notifications so you can receive all announcements.</li>
                                  </ul>
                                </div>

                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold">Ethics and Professional Development 🎥</h3>
                                  <ul className="space-y-2 text-sm">
                                    <li><span className="font-medium">Respect Everyone 🌍:</span> Be kind to all cultures and treat every trainee fairly. Speak clearly in Arabic or English.</li>
                                    <li><span className="font-medium">Be Punctual ⏰:</span> Start and end classes on time.</li>
                                    <li><span className="font-medium">Stay Adaptable 🔄:</span> Adjust lessons based on feedback and class progress.</li>
                                    <li><span className="font-medium">Keep Improving 📈:</span> Regularly seek feedback to improve teaching.</li>
                                    <li>
                                      <div className="space-y-1">
                                        <span className="font-medium">Education Communication 📲:</span>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                          <li>Always keep your instructor and TAs informed if you will be late, attending online, or can't make it.</li>
                                          <li>Also, make sure to respond to them when they reach out to you. This way, our team can stay aligned with your needs and won't have to worry about you.</li>
                                        </ul>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
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
