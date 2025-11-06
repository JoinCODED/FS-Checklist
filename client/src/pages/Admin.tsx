import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CodedLogo } from "@/components/CodedLogo";
import { ArrowLeft, Users, CheckCircle, TrendingUp } from "lucide-react";
import { Link } from "wouter";

interface UserStat {
  userId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  completedTasks: number;
  totalTasks: number;
  completionRate: number;
}

interface TaskStat {
  taskId: string;
  taskTitle: string;
  sectionId: string;
  sectionTitle: string;
  completedBy: number;
  totalUsers: number;
  completionRate: number;
}

interface AdminStats {
  totalUsers: number;
  totalTasks: number;
  avgCompletionRate: number;
  userStats: UserStat[];
  taskStats: TaskStat[];
}

export default function Admin() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: stats, isLoading: statsLoading, error } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
    retry: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }

    if (error && error.message.includes("403")) {
      toast({
        title: "Access Denied",
        description: "You don't have admin permissions.",
        variant: "destructive",
      });
    }
  }, [authLoading, isAuthenticated, error, toast]);

  if (authLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to view the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Checklist
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) return null;

  const getUserDisplayName = (userStat: UserStat) => {
    if (userStat.firstName && userStat.lastName) {
      return `${userStat.firstName} ${userStat.lastName}`;
    }
    if (userStat.firstName) return userStat.firstName;
    if (userStat.email) return userStat.email;
    return "Unknown User";
  };

  const groupedTasks = stats.taskStats.reduce((acc, task) => {
    if (!acc[task.sectionTitle]) {
      acc[task.sectionTitle] = [];
    }
    acc[task.sectionTitle].push(task);
    return acc;
  }, {} as Record<string, TaskStat[]>);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <CodedLogo />
              <div className="hidden md:block text-sm text-muted-foreground">Admin Dashboard</div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-to-checklist">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Checklist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Orientation Progress Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track student completion rates and monitor overall progress.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-users">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-tasks">{stats.totalTasks}</div>
              <p className="text-xs text-muted-foreground">Orientation checklist items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-avg-completion">{stats.avgCompletionRate}%</div>
              <p className="text-xs text-muted-foreground">Across all students</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
            <CardDescription>Individual completion rates for all students</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.userStats.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No students registered yet
                    </TableCell>
                  </TableRow>
                ) : (
                  stats.userStats
                    .sort((a, b) => b.completionRate - a.completionRate)
                    .map((userStat) => (
                      <TableRow key={userStat.userId} data-testid={`row-user-${userStat.userId}`}>
                        <TableCell className="font-medium">
                          {getUserDisplayName(userStat)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {userStat.email || "N/A"}
                        </TableCell>
                        <TableCell>
                          {userStat.completedTasks} / {userStat.totalTasks}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={userStat.completionRate} className="h-2 w-24" />
                            <span className="text-sm text-muted-foreground w-10">
                              {userStat.completionRate}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Completion Rates</CardTitle>
            <CardDescription>
              How many students have completed each task
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(groupedTasks).map(([sectionTitle, tasks]) => (
              <div key={sectionTitle} className="space-y-3">
                <h3 className="font-semibold text-sm text-foreground">{sectionTitle}</h3>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div key={task.taskId} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="text-sm">{task.taskTitle}</div>
                        <div className="text-xs text-muted-foreground">
                          {task.completedBy} / {task.totalUsers} students
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={task.completionRate} className="h-2 w-24" />
                        <span className="text-sm text-muted-foreground w-10">
                          {task.completionRate}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
