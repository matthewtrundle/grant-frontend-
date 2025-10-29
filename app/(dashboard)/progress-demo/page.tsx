/**
 * Progress Tracker Demo Page
 * Test page to demonstrate ProgressTracker functionality
 */

"use client";

import { useState } from "react";
import { MockProgressTracker } from "@/components/ui/progress-tracker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, PlayCircle, RotateCcw, Info } from "lucide-react";

export default function ProgressDemoPage() {
  const [showMockProgress, setShowMockProgress] = useState(false);
  const [mockKey, setMockKey] = useState(0);
  const [completionMessage, setCompletionMessage] = useState("");

  const startMockProgress = () => {
    setShowMockProgress(true);
    setCompletionMessage("");
    setMockKey((prev) => prev + 1);
  };

  const handleMockComplete = () => {
    setCompletionMessage("Mock generation completed successfully!");
    setTimeout(() => {
      setShowMockProgress(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Badge variant="secondary" className="mb-2">
          <Sparkles className="mr-1 h-3 w-3" />
          Demo Page
        </Badge>
        <h1 className="text-4xl font-bold">Progress Tracker Demo</h1>
        <p className="text-lg text-muted-foreground">
          Test the animated progress tracking with real-time SSE updates and completion celebrations.
        </p>
      </div>

      {/* Mock Progress Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Mock Progress Tracker</CardTitle>
          <CardDescription>
            Simulates a 30-second application generation with animated progress updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showMockProgress ? (
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Click the button below to start a mock progress simulation. The progress will
                  update smoothly through all 5 phases with step transitions and a confetti
                  celebration at completion.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={startMockProgress}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Mock Generation
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <MockProgressTracker
                key={mockKey}
                onComplete={handleMockComplete}
                duration={30000} // 30 seconds
              />

              {completionMessage && (
                <Alert className="border-green-500 bg-green-50">
                  <AlertDescription className="text-green-700 font-medium">
                    {completionMessage}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowMockProgress(false);
                  setCompletionMessage("");
                }}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Real SSE Integration Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-blue-900">Real SSE Integration</CardTitle>
          <CardDescription className="text-blue-700">
            How to integrate with your backend Server-Sent Events endpoint
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-blue-900">
          <div>
            <p className="font-semibold mb-2">Component Usage:</p>
            <pre className="bg-blue-100 p-4 rounded-lg overflow-x-auto">
{`<ProgressTracker
  applicationId="app-123"
  token="auth-token"
  sseEndpoint="/api/v1/stage4/progress"
  onComplete={(data) => {
    console.log("Generation complete:", data);
  }}
  onError={(error) => {
    console.error("Generation error:", error);
  }}
/>`}
            </pre>
          </div>

          <div>
            <p className="font-semibold mb-2">Backend SSE Response Format:</p>
            <pre className="bg-blue-100 p-4 rounded-lg overflow-x-auto">
{`{
  "progress": 45,
  "step": "Generating Technical Approach...",
  "phase": "Generating Sections",
  "eta": 120,
  "status": "running" | "completed" | "error",
  "error": "Optional error message"
}`}
            </pre>
          </div>

          <div>
            <p className="font-semibold mb-2">Features:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Real-time progress updates via Server-Sent Events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Smooth progress animations (no jumps)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Automatic reconnection with exponential backoff (5 attempts)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Current step display with fade transitions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>5-phase visualization with icons and colors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>ETA display (estimated time remaining)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Confetti celebration on completion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Error handling and display</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Progress Phases Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Phases</CardTitle>
          <CardDescription>
            The 5 phases of grant application generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Phase 1: Analyzing RFP",
                range: "0-20%",
                description: "Parsing grant requirements and identifying key evaluation criteria",
                color: "bg-blue-50 text-blue-900 border-blue-200",
              },
              {
                name: "Phase 2: Retrieving Examples",
                range: "20-40%",
                description: "Fetching similar grant applications from vector database",
                color: "bg-purple-50 text-purple-900 border-purple-200",
              },
              {
                name: "Phase 3: Generating Sections",
                range: "40-75%",
                description: "Multi-agent AI system writing all application sections",
                color: "bg-yellow-50 text-yellow-900 border-yellow-200",
              },
              {
                name: "Phase 4: Running Assessors",
                range: "75-95%",
                description: "3 parallel assessors scoring technical, business, and academic quality",
                color: "bg-green-50 text-green-900 border-green-200",
              },
              {
                name: "Phase 5: Finalizing",
                range: "95-100%",
                description: "Consistency checking and document compilation",
                color: "bg-pink-50 text-pink-900 border-pink-200",
              },
            ].map((phase, index) => (
              <Card key={index} className={`${phase.color} border`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold">{phase.name}</p>
                    <Badge variant="outline">{phase.range}</Badge>
                  </div>
                  <p className="text-sm">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              {
                done: true,
                text: "Create ProgressTracker component with Framer Motion",
              },
              {
                done: true,
                text: "Implement SSE connection with EventSource API",
              },
              {
                done: true,
                text: "Add smooth progress bar animations",
              },
              {
                done: true,
                text: "Display current step with fade transitions",
              },
              {
                done: true,
                text: "Add 5-phase visualization with icons",
              },
              {
                done: true,
                text: "Implement reconnection logic with exponential backoff",
              },
              {
                done: true,
                text: "Add confetti celebration on completion",
              },
              {
                done: true,
                text: "Create MockProgressTracker for testing",
              },
              {
                done: false,
                text: "Backend SSE endpoint implementation (requires FastAPI)",
              },
              {
                done: false,
                text: "Integrate into /generate page",
              },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    item.done ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {item.done ? "✓" : "○"}
                </div>
                <span className={item.done ? "text-gray-900" : "text-gray-500"}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
