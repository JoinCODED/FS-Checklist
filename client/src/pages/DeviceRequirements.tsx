import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CodedLogo } from "@/components/CodedLogo";

const deviceRequirementsData = {
  title: "CODED - FullStack Bootcamp Devices Requirements",
  description: "Every student should have a portable laptop where they can bring it to campus, and go back home with it.",
  requirements: {
    RAM: {
      Minimum: "8GB",
      Recommended: "16GB",
      NiceToHave: "32GB (will not need more)"
    },
    Processor: {
      Minimum: "Intel Core i5 or AMD Ryzen 5",
      Recommended: "Intel Core i7 or AMD Ryzen 7",
      NiceToHave: "Intel Core i9, AMD Ryzen 9, or Apple M2/M4 Pro"
    },
    Storage: {
      Minimum: "256GB SSD",
      Recommended: "512GB SSD",
      NiceToHave: "1TB SSD"
    },
    ScreenSize: {
      Minimum: "13\"",
      Recommended: "13 to 15\"",
      NiceToHave: "15\""
    },
    ManufactureYear: {
      Minimum: "2020+",
      Recommended: "2023+",
      NiceToHave: "Latest year"
    },
    OperatingSystem: {
      Minimum: "Windows 10+ / MacOS 12+",
      Recommended: "Windows 10+ / MacOS Big Sur",
      NiceToHave: "Latest versions"
    }
  },
  exampleRecommendations: [
    {
      name: "Apple MacBook Pro, M4 Pro Chip, 24GB RAM, 512GB SSD, 14-inch, MX2H3AB/A - Space Black",
      vendor: "Xcite Kuwait",
      url: "https://www.xcite.com/apple-macbook-pro-m4-pro-chip-24gb-ram-512gb-ssd-14-inch-mx2h3ab-a-space-black/p?srsltid=AfmBOoo74H6SQOdQ6kK1Z_8Gw84JqyMingzu8hgLBRzqU3UEodFRXBKJ"
    },
    {
      name: "Lenovo Yoga Slim 7 Laptop 13 Inch Intel Core i5-1240P 16GB RAM 1TB SSD - Grey",
      vendor: "Best Alyousifi",
      url: "https://best.com.kw/en/product/82U90084AX/Lenovo-Yoga-Slim-7-Laptop-13-Inch-Intel-Core-i5-1240P-16GB-RAM-1TB-SSD---Grey-"
    },
    {
      name: "LENOVO IdeaPad Flex 5 Laptop, Intel Core i5, 16GB RAM, 512GB SSD, 14-inch, Intel Graphics Xe, Windows 11 Home, 82R700KWAX – Gray",
      vendor: "Xcite Kuwait",
      url: "https://www.xcite.com/lenovo-ideapad-flex-5-laptop-intel-core-i5-16gb-ram-512gb-ssd-14-inch-intel-graphics-xe-windows-11-home-82r700kwax-gray/p"
    },
    {
      name: "HP Envy x360 2 in 1 Laptop, Intel Core i7, 16GB RAM, 512GB SSD, 13.3-inch, Intel Iris Xe Graphics, Windows 11 Home, 13-BF0018NE – Silver",
      vendor: "Xcite Kuwait",
      url: "https://www.xcite.com/hp-15-2in1-laptop-intel-core-i7-16gb-ram-512gb-ssd-13-3-inch-intel-iris-xe-windows-11-home-13-bf0018ne-silver/p"
    },
    {
      name: "Apple MacBook Air M1, RAM 8GB, 256GB SSD 13.3-inch, (2020) - MGN63AB/A - Space Grey",
      vendor: "Xcite Kuwait",
      url: "https://www.xcite.com/apple-macbook-air-m1-ram-8gb-256gb-ssd-13-3-inch-2020-space-grey/p?queryID=282ef4a1feaf3e242e24585e047da4ea&objectID=176350&indexName=prod_kw_en_products"
    }
  ]
};

export default function DeviceRequirements() {
  const requirementCategories = ["Minimum", "Recommended", "NiceToHave"] as const;

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
              {deviceRequirementsData.title}
            </h1>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {deviceRequirementsData.description}
          </p>

          <div className="space-y-6">
            {Object.entries(deviceRequirementsData.requirements).map(([category, specs]) => (
              <Card key={category} className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {requirementCategories.map((tier) => (
                    <div key={tier} className="space-y-2">
                      <h3 className="text-sm font-medium text-foreground">
                        {tier === "NiceToHave" ? "Nice to Have" : tier}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {specs[tier]}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="pt-4">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Example Recommendations
            </h2>
            <div className="space-y-3">
              {deviceRequirementsData.exampleRecommendations.map((recommendation, index) => (
                <Card key={index} className="p-4 hover-elevate">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground mb-1">
                        {recommendation.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {recommendation.vendor}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 gap-1.5 flex-shrink-0"
                      asChild
                      data-testid={`link-recommendation-${index}`}
                    >
                      <a href={recommendation.url} target="_blank" rel="noopener noreferrer">
                        <span className="text-xs">View</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
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
