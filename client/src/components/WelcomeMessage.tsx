import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function WelcomeMessage() {
  return (
    <Card className="p-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/10">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              You look good today!
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              You really do!
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
