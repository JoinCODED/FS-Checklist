import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Phone, BookOpen } from "lucide-react";

export function ConclusionMessage() {
  return (
    <Card className="p-8 bg-gradient-to-br from-primary/10 via-background to-secondary/5 border-primary/20">
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="space-y-3 flex-1">
            <h3 className="text-2xl font-bold text-foreground">
              Welcome to CODED!
            </h3>
            <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
              <p>
                You are now part of CODED, and this is just the start of something big that we are here to support you reach your end goal.
              </p>
              <p>
                As part of CODED we wish that you take your time to read CODED Bootcamp and Campus Guide Trainee Presence Guide.
              </p>
              <p>
                And if you have any questions or concerns during your academic journey to never hesitate to reach out to:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="default"
                size="lg"
                className="gap-2"
                asChild
                data-testid="button-call-coded"
              >
                <a href="tel:+96555421902">
                  <Phone className="h-4 w-4" />
                  CODED Education: 55421902
                </a>
              </Button>
              <Button
                variant="default"
                size="lg"
                className="gap-2"
                asChild
                data-testid="button-presence-guide"
              >
                <a href="https://coded-programs.notion.site/Trainee-Presence-Guide-13cf3e92b8f680369013fe9c89f4c48f" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4" />
                  Trainee Presence Guide
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
