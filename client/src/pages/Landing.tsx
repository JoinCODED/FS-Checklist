import { CodedLogo } from "@/components/CodedLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <CodedLogo />
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="space-y-12">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              Welcome to CODED
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your journey into Data Science starts here. Complete your orientation checklist before the bootcamp begins.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-login"
            >
              Get Started
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Track Progress</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete 19 essential tasks organized into logical sections to prepare for your bootcamp experience.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Save Anywhere</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your progress is saved automatically and syncs across all your devices, so you can pick up where you left off.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Celebrate Success</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Watch your progress grow with our visual tracker and get a special celebration when you complete everything.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            CODED Data Science Bootcamp - Orientation Checklist
          </p>
        </div>
      </footer>
    </div>
  );
}
