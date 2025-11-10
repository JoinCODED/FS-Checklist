import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { CodedLogo } from "@/components/CodedLogo";

const evaluationMetricsData = {
  title: "Full Stack & AI Trainee Evaluation Metrics",
  categories: {
    "Problem Solving": [
      "How does the trainee typically approach unfamiliar problems?",
      "How well does the trainee debug issues?",
      "Does the trainee consistently attempt to solve a problem before asking for help?"
    ],
    "System Design": [
      "How structured is the student's approach to building applications or components?",
      "Does the trainee understand and implement appropriate data flow?",
      "Does the trainee show awareness of design decisions (e.g., when to use components, services, etc.)?"
    ],
    "Collaboration & Communication": [
      "How well does the trainee explain their code and decisions?",
      "How actively does the trainee contribute to group work?",
      "Does the trainee accept and apply feedback constructively?"
    ],
    "Code Quality & Best Practices": [
      "How clean and maintainable is the trainee's code?",
      "Does the trainee write code with reusability and scalability in mind?",
      "Does the trainee follow naming conventions and file organization standards?"
    ],
    "Testing & Debugging": [
      "How often does the trainee test their work?",
      "How effective are their debugging skills?",
      "Does the trainee write or understand automated tests (where relevant)?"
    ],
    "Time Management": [
      "How does the trainee handle deadlines and deliverables?",
      "How well does the trainee manage their daily or weekly tasks?",
      "Does the trainee attend sessions and participate regularly?"
    ],
    "Secure Coding": [
      "How does the trainee handle user input and data?",
      "Does the trainee write code that avoids common vulnerabilities?",
      "Has the trainee demonstrated awareness of authentication, authorization, or encryption (if relevant)?"
    ]
  }
};

export default function EvaluationMetrics() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {evaluationMetricsData.title}
            </h1>
          </div>

          <div className="space-y-6">
            {Object.entries(evaluationMetricsData.categories).map(([category, questions]) => (
              <Card key={category} className="p-6 md:p-8">
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    {category}
                  </h2>
                  <ul className="space-y-3">
                    {questions.map((question, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {question}
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
