/**
 * Stage 4: Application Generation Page
 * Generates complete grant application with multi-agent AI system
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api/client";
import type {
  Stage1ProfileResponse,
  Stage4GenerateRequest,
  Stage4GenerateResponse,
} from "@/types/api";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  FileText,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { PaymentGate } from "../components/payment-gate";

export default function GeneratePage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Stage1ProfileResponse | null>(null);
  const [application, setApplication] = useState<Stage4GenerateResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Load profile and trigger generation on mount
  useEffect(() => {
    const profileData = localStorage.getItem("profile_data");
    const grantId = localStorage.getItem("current_grant_id");
    const analysisId = localStorage.getItem("current_analysis_id");

    if (profileData) {
      try {
        const parsedProfile: Stage1ProfileResponse = JSON.parse(profileData);
        setProfile(parsedProfile);

        // Auto-start generation if we have all required data
        if (grantId && analysisId) {
          generateApplication(
            parsedProfile.profile_id,
            parseInt(grantId),
            parseInt(analysisId)
          );
        } else {
          setError("Missing grant or analysis information. Please complete Stage 3 first.");
        }
      } catch (err) {
        console.error("Error parsing profile data:", err);
        setError("Failed to load profile data");
      }
    } else {
      setError("No profile found. Please start from the profile page.");
    }
  }, []);

  const generateApplication = async (
    companyId: number,
    grantId: number,
    analysisId: number
  ) => {
    setIsGenerating(true);
    setError(null);
    setProgress(0);

    try {
      const token = await getToken();

      const request: Stage4GenerateRequest = {
        company_id: companyId,
        grant_id: grantId,
        analysis_id: analysisId,
        max_iterations: 3,
        target_score: 8.0,
      };

      // Simulate progress while generating
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 90));
      }, 1000);

      const response = await apiRequest<Stage4GenerateResponse>(
        "/stage4/generate-application",
        token,
        {
          method: "POST",
          body: JSON.stringify(request),
        }
      );

      clearInterval(progressInterval);
      setProgress(100);
      setApplication(response);

      toast({
        title: "Application Generated!",
        description: `Generated ${response.sections.length} sections with ${response.overall_score.toFixed(1)}/10 score`,
      });
    } catch (error: any) {
      console.error("Generation error:", error);
      const errorMessage = error.data?.detail || error.message || "Failed to generate application";
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!application) return;

    // Create a text document with all sections
    let content = `# Grant Application\n\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n`;
    content += `Overall Score: ${application.overall_score.toFixed(1)}/10\n`;
    content += `Generation Time: ${application.generation_time.toFixed(2)}s\n\n`;
    content += `---\n\n`;

    application.sections.forEach((section, index) => {
      content += `## ${index + 1}. ${section.title}\n\n`;
      content += `${section.content}\n\n`;
      content += `**Word Count**: ${section.word_count} | `;
      content += `**Scores**: Technical ${section.scores.technical}/10, `;
      content += `Business ${section.scores.business}/10, `;
      content += `Academic ${section.scores.academic}/10\n\n`;
      content += `---\n\n`;
    });

    // Consistency check
    content += `## Consistency Check\n\n`;
    content += `Status: ${application.consistency_check.passed ? "✓ Passed" : "✗ Failed"}\n\n`;
    if (application.consistency_check.issues.length > 0) {
      content += `Issues:\n`;
      application.consistency_check.issues.forEach((issue) => {
        content += `- ${issue}\n`;
      });
    }

    // Create and download file
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grant-application-${application.application_id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Your application has been downloaded as a markdown file",
    });
  };

  // Get score color
  const getScoreColor = (score: number): string => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-orange-600";
  };

  // Show loading state
  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">Stage 4</Badge>
            <h1 className="text-3xl font-bold">Generating Application</h1>
          </div>
          <p className="text-muted-foreground">
            Our AI agents are writing your grant application...
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-lg font-medium">{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-center text-sm text-muted-foreground">
              {progress < 30 && "Analyzing requirements..."}
              {progress >= 30 && progress < 60 && "Writing sections..."}
              {progress >= 60 && progress < 90 && "Assessing quality..."}
              {progress >= 90 && "Finalizing application..."}
            </div>
          </CardContent>
        </Card>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This may take 2-5 minutes. Our multi-agent AI system is crafting a competitive application.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Show error state
  if (error || !profile) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error || "Failed to generate application"}</span>
            <Button variant="outline" size="sm" onClick={() => router.push("/analyze")}>
              Back to Analysis
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Show application results
  return (
    <PaymentGate stage="stage4">
      <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">Stage 4</Badge>
            <h1 className="text-3xl font-bold">Grant Application</h1>
          </div>
          {application && (
            <Button onClick={handleDownload} size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Application
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">
          AI-generated grant application with quality scoring
        </p>
      </div>

      {/* Profile Summary */}
      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
          <strong>{profile.company_name}</strong> • TRL {profile.trl}
        </AlertDescription>
      </Alert>

      {application && (
        <>
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Overall Quality Score
                </span>
                <span className={`text-3xl font-bold ${getScoreColor(application.overall_score)}`}>
                  {application.overall_score.toFixed(1)}/10
                </span>
              </CardTitle>
              <CardDescription>
                Generated {application.sections.length} sections in {application.generation_time.toFixed(2)}s
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={application.overall_score * 10} className="h-2" />
            </CardContent>
          </Card>

          {/* Consistency Check */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {application.consistency_check.passed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                Consistency Check
              </CardTitle>
              <CardDescription>
                {application.consistency_check.passed
                  ? "All sections are consistent and aligned"
                  : `${application.consistency_check.issues.length} issues found`}
              </CardDescription>
            </CardHeader>
            {!application.consistency_check.passed && (
              <CardContent>
                <ul className="space-y-2">
                  {application.consistency_check.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>

          {/* Application Sections */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Application Sections</h2>
            {application.sections.map((section, index) => (
              <Card key={section.section_id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {index + 1}. {section.title}
                    </span>
                    <Badge variant="secondary">{section.word_count} words</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span className={getScoreColor(section.scores.average)}>
                      Average: {section.scores.average.toFixed(1)}/10
                    </span>
                    <span className="text-xs">
                      Technical: {section.scores.technical}/10 • Business: {section.scores.business}/10 • Academic: {section.scores.academic}/10
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {section.content.split("\n").map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-2 text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cost Info */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Generation Cost: ${application.cost.toFixed(2)} • Status: {application.status}
            </AlertDescription>
          </Alert>
        </>
      )}
      </div>
    </PaymentGate>
  );
}
