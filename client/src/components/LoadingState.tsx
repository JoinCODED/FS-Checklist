import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function LoadingState() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-12 w-96" />
            <Skeleton className="h-8 w-64" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
