import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookText, Phone, GraduationCap, ExternalLink } from "lucide-react";
import { Link } from "wouter";

interface QuickReferenceProps {
  className?: string;
}

export function QuickReference({ className = "" }: QuickReferenceProps) {
  return (
    <Card className={`p-6 ${className}`} data-testid="quick-reference">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <BookText className="h-5 w-5 text-[#14243F]" />
          Quick reference
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
            <Phone className="h-5 w-5 text-[#14243F] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0 space-y-3">
              <p className="text-sm font-medium text-foreground">Contact Education Team</p>
              <Button
                variant="default"
                size="lg"
                asChild
                data-testid="button-call-coded"
              >
                <a href="tel:+96555421902">
                  CODED Education: 55421902
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
            <GraduationCap className="h-5 w-5 text-[#14243F] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0 space-y-3">
              <p className="text-sm font-medium text-foreground">Full Stack & AI Curriculum</p>
              <Button
                className="gap-2 bg-[#14243F] hover:bg-[#14243F]/90 text-white"
                asChild
                data-testid="button-view-curriculum"
              >
                <Link href="/curriculum">
                  <ExternalLink className="h-4 w-4" />
                  View Curriculum
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
