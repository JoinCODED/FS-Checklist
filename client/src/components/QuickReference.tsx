import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wifi, Phone, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface QuickReferenceProps {
  className?: string;
}

export function QuickReference({ className = "" }: QuickReferenceProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`p-6 ${className}`} data-testid="quick-reference">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Wifi className="h-5 w-5 text-white" />
          Quick reference
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
            <Wifi className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0 space-y-2">
              <p className="text-sm font-medium text-foreground">WiFi credentials</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <code className="text-sm font-mono bg-background px-2 py-1 rounded flex-1">
                    Students / Students2 / Campus-B
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard("Students", "WiFi name")}
                    data-testid="button-copy-wifi"
                  >
                    {copiedItem === "WiFi name" ? (
                      <Check className="h-3.5 w-3.5 text-accent" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-sm font-mono bg-background px-2 py-1 rounded flex-1">
                    joincoded.com
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard("joincoded.com", "WiFi password")}
                    data-testid="button-copy-password"
                  >
                    {copiedItem === "WiFi password" ? (
                      <Check className="h-3.5 w-3.5 text-accent" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
            <Phone className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0 space-y-1">
              <p className="text-sm font-medium text-foreground">CODED Education Number</p>
              <div className="flex items-center justify-between gap-2">
                <code className="text-sm font-mono bg-background px-2 py-1 rounded flex-1">
                  55421902
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => copyToClipboard("55421902", "Phone number")}
                  data-testid="button-copy-phone"
                >
                  {copiedItem === "Phone number" ? (
                    <Check className="h-3.5 w-3.5 text-accent" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
