import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { CodedLogo } from "@/components/CodedLogo";

const curriculumData = {
  program: "Full Stack & AI Bootcamp",
  phase: "Phase 1",
  weeks: {
    "Week 1": {
      topics: [
        "Ideation & Lean Thinking",
        "Agile & Scrum: Product Management",
        "UI/UX: Designing interfaces with AI"
      ]
    },
    "Week 2": {
      topics: [
        "Introduction to development",
        "How to use AI tools for building applications",
        "Authentication & Authorization"
      ]
    }
  }
};

export default function Curriculum() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <CodedLogo />
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Link href="/checklist">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {curriculumData.program}
              </h1>
              <p className="text-base text-muted-foreground mt-1">
                {curriculumData.phase}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(curriculumData.weeks).map(([week, content]) => (
              <Card key={week} className="p-6 md:p-8">
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    {week}
                  </h2>
                  <ul className="space-y-3">
                    {content.topics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {topic}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <Link href="/checklist">
              <Button variant="outline" className="gap-2" data-testid="button-back-to-checklist">
                <ArrowLeft className="h-4 w-4" />
                Back to Checklist
              </Button>
            </Link>
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
