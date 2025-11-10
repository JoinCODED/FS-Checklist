import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function ConclusionMessage() {
  return (
    <Card className="p-8 bg-gradient-to-br from-primary/10 via-background to-secondary/5 border-primary/20">
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="space-y-3 flex-1">
            <h3 className="text-2xl font-bold text-foreground">
              Conclusion
            </h3>
            <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
              <p>
                Congratulation on finishing your first step into building the skills that will shape your future success
              </p>
              <p>
                You are now part of CODED, and this is just the start of something big that we are here to support you reach your end goal.
              </p>
              <p>
                As part of CODED we wish that you take your time to read CODED Bootcamp and Campus Guide Trainee Presence Guide.
              </p>
              <p>
                And if you have any questions or concerns during your academic journey never hesitate to reach out to the mentors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
