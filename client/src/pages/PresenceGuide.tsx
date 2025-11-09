import { CodedLogo } from "@/components/CodedLogo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const presenceGuideData = {
  "title": "Trainee Presence Guide",
  "sections": {
    "Professional Appearance": {
      "note": "As part of CODED's goal to be a leader in our field, we aim to follow key guidelines for both offline and online presence.",
      "rules": [
        {
          "Dress Code": {
            "type": "Smart / Business casual",
            "points": [
              "Look professional.",
              "No Shorts or Short Skirts: Employees are required to wear pants, skirts, or dresses that are of an appropriate length. Skirts and dresses should be longer than knee-length. Shorts are not permitted.",
              "No Exposure of the Chest Area: All clothing should fully cover the chest area. Low-cut tops, shirts with plunging necklines, or other clothing that reveals the chest are not permitted.",
              "Shirt Sleeve Policy: All must wear shirts with sleeves. Sleeveless tops, tank tops, or spaghetti straps are not allowed. Shirts should have sleeves that extend at least to the mid-upper arm for a professional appearance."
            ]
          }
        },
        "Online Presence: Ensure that your profile photo and name are up-to-date and match your real-world identity across all online communication tools. This helps trainees easily recognize and connect with you.",
        "Tattoo Policy: Cover visible tattoos at CODED campus and during class.",
        "Accessory Restrictions: Keep it simple; no flashy or noisy accessories."
      ]
    },
    "Communication and Interaction": {
      "rules": [
        "Positive Engagement: Greet others with a smile, be friendly.",
        "Support and Discipline: Request assistance from the education team within your bootcamp to get help with challenges and explain concepts clearly.",
        "Professional Boundaries: Don't share personal contact info, avoid over-socializing, and be patient when texting the education team. They will assist you when they can.",
        "Behavioral Standards: No swearing, bullying, or threats—keep a good attitude.",
        "Calm Conflict Resolution: Stay calm during conflicts and report issues immediately to CODED."
      ]
    },
    "Inside our Classroom": {
      "rules": [
        "No Phones: No personal phones during class unless really needed.",
        "Stay Focused: Keep personal talks for after class and make it safe for trainees to ask questions.",
        "Trainees Only in Class: No guests allowed; the classroom is for trainees only.",
        "Keep your place Clean: Don't leave your desk messy at the end of the day. Let's make sure you and other trainees have the best environment while teaching.",
        "Announcements: Make sure you turn on your Discord notifications so you can receive all announcements."
      ]
    },
    "Ethics and Professional Development": {
      "rules": [
        "Respect Everyone: Be kind to all cultures and treat every trainee fairly. Speak clearly in Arabic or English.",
        "Be Punctual: Start and end classes on time.",
        "Stay Adaptable: Adjust lessons based on feedback and class progress.",
        "Keep Improving: Regularly seek feedback to improve teaching.",
        {
          "Education Communication": [
            "Always keep your instructor and TAs informed if you will be late, attending online, or can't make it.",
            "Also, make sure to respond to them when they reach out to you. This way, our team can stay aligned with your needs and won't have to worry about you."
          ]
        }
      ]
    }
  }
};

export default function PresenceGuide() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background z-50">
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
              {presenceGuideData.title}
            </h1>
          </div>

          <div className="space-y-8">
            {Object.entries(presenceGuideData.sections).map(([sectionTitle, sectionData]: [string, any]) => (
              <Card key={sectionTitle} className="p-6 md:p-8">
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    {sectionTitle}
                  </h2>
                  
                  {sectionData.note && (
                    <p className="text-sm text-muted-foreground italic">
                      {sectionData.note}
                    </p>
                  )}
                  
                  <div className="space-y-4">
                    {sectionData.rules.map((rule: any, index: number) => {
                      if (typeof rule === 'string') {
                        const [title, ...rest] = rule.split(':');
                        const description = rest.join(':').trim();
                        return (
                          <div key={index} className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">{title}:</span> {description}
                            </p>
                          </div>
                        );
                      } else if (typeof rule === 'object') {
                        const ruleKey = Object.keys(rule)[0];
                        const ruleValue = rule[ruleKey];
                        
                        if (ruleKey === 'Dress Code') {
                          return (
                            <div key={index} className="space-y-3">
                              <h3 className="font-medium">{ruleKey}</h3>
                              <p className="text-sm text-muted-foreground">
                                Type: {ruleValue.type}
                              </p>
                              <ul className="list-disc list-inside space-y-2 text-sm ml-2">
                                {ruleValue.points.map((point: string, pointIndex: number) => (
                                  <li key={pointIndex}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          );
                        } else if (ruleKey === 'Education Communication') {
                          return (
                            <div key={index} className="space-y-2">
                              <p className="font-medium text-sm">{ruleKey}:</p>
                              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                                {(ruleValue as string[]).map((item, itemIndex) => (
                                  <li key={itemIndex}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          );
                        }
                      }
                      return null;
                    })}
                  </div>
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
