/**
 * Stage 3: Grant Analysis Page
 * Displays comprehensive grant analysis with eligibility, timeline, budget, and recommendations
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
  Stage3AnalyzeRequest,
  Stage3AnalyzeResponse,
  Grant,
} from "@/types/api";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  TrendingUp,
  FileText,
  Target,
  Shield,
  Lightbulb,
} from "lucide-react";
import { PaymentGate } from "../components/payment-gate";

export default function AnalyzePage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Stage1ProfileResponse | null>(null);
  const [grant, setGrant] = useState<Grant | null>(null);
  const [analysis, setAnalysis] = useState<Stage3AnalyzeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load profile and grant from localStorage on mount
  useEffect(() => {
    const profileData = localStorage.getItem("profile_data");
    const grantId = localStorage.getItem("current_grant_id");

    if (profileData) {
      try {
        setProfile(JSON.parse(profileData));
      } catch (err) {
        console.error("Error parsing profile data:", err);
      }
    }

    // In a real app, we'd load grant details from the backend
    // For now, we'll trigger analysis immediately if we have both
    if (profileData && grantId) {
      runAnalysis(JSON.parse(profileData).profile_id, parseInt(grantId));
    } else {
      setError("Missing profile or grant information. Please start from the discovery page.");
    }
  }, []);

  const runAnalysis = async (companyProfileId: number, grantId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await getToken();

      const request: Stage3AnalyzeRequest = {
        company_profile_id: companyProfileId,
        grant_id: grantId,
        analysis_depth: "comprehensive",
      };

      const response = await apiRequest<Stage3AnalyzeResponse>(
        "/stage3/analyze",
        token,
        {
          method: "POST",
          body: JSON.stringify(request),
        }
      );

      setAnalysis(response);
      toast({
        title: "Analysis Complete",
        description: "Your grant analysis is ready to review",
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      const errorMessage = error.data?.detail || error.message || "Failed to analyze grant";
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateApplication = () => {
    if (analysis) {
      localStorage.setItem("current_analysis_id", analysis.analysis_id.toString());
      router.push("/generate");
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
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
            <span>{error || "Failed to load analysis"}</span>
            <Button variant="outline" size="sm" onClick={() => router.push("/discover")}>
              Back to Discovery
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Show analysis results
  return (
    <PaymentGate stage="stage3">
      <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">Stage 3</Badge>
            <h1 className="text-3xl font-bold">Grant Analysis</h1>
          </div>
          {analysis && (
            <Badge variant={analysis.eligibility.eligible ? "default" : "destructive"}>
              {analysis.eligibility.eligible ? "Eligible" : "Not Eligible"}
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          Comprehensive analysis of grant fit, timeline, budget, and requirements
        </p>
      </div>

      {/* Profile Summary */}
      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
          <strong>{profile.company_name}</strong> • TRL {profile.trl}
        </AlertDescription>
      </Alert>

      {analysis && (
        <>
          {/* Eligibility Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {analysis.eligibility.eligible ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                Eligibility Assessment
              </CardTitle>
              <CardDescription>
                Confidence: {Math.round(analysis.eligibility.confidence * 100)}%
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={analysis.eligibility.confidence * 100} className="h-2" />
              <div className="space-y-2">
                {analysis.eligibility.reasons.map((reason, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className={analysis.eligibility.eligible ? "text-green-600" : "text-red-600"}>
                      {analysis.eligibility.eligible ? "✓" : "✗"}
                    </span>
                    <span className="text-sm">{reason}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Budget Recommendation
              </CardTitle>
              <CardDescription>Total: {formatCurrency(analysis.budget.total)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.budget.categories.map((category, index) => (
                  <div key={index} className="space-y-1 border-b pb-3 last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(category.amount)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.justification}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Project Timeline
              </CardTitle>
              <CardDescription>
                {analysis.timeline.milestones.length} key milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.timeline.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{milestone.name}</span>
                        <span className="text-sm text-muted-foreground">{milestone.deadline}</span>
                      </div>
                      {milestone.dependencies.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          Dependencies: {milestone.dependencies.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Success Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Success Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.success_factors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Risks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risks & Mitigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.risks.map((risk, index) => (
                    <div key={index} className="space-y-1 border-b pb-3 last:border-0">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                        <span className="text-sm font-medium">{risk.risk}</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">{risk.mitigation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Action Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Ready to Generate Your Application?</h3>
                  <p className="text-sm text-muted-foreground">
                    Use our AI to create a complete, competitive grant application
                  </p>
                </div>
                <Button size="lg" onClick={handleGenerateApplication}>
                  Generate Application
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cost Info */}
          <Alert>
            <DollarSign className="h-4 w-4" />
            <AlertDescription>
              Analysis Cost: {formatCurrency(analysis.cost)} • Status: {analysis.status}
            </AlertDescription>
          </Alert>
        </>
      )}
      </div>
    </PaymentGate>
  );
}
