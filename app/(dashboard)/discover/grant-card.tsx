/**
 * Grant Card Component
 * Displays individual grant with fit score and details
 */

import { Grant } from "@/types/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, DollarSign, ExternalLink, TrendingUp } from "lucide-react";
import Link from "next/link";

interface GrantCardProps {
  grant: Grant;
  onAnalyze?: (grantId: number) => void;
}

export function GrantCard({ grant, onAnalyze }: GrantCardProps) {
  // Determine fit score color based on score
  const getFitScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format deadline
  const formatDeadline = (deadline: string): string => {
    const date = new Date(deadline);
    const now = new Date();
    const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return "Closed";
    if (daysUntil === 0) return "Today";
    if (daysUntil === 1) return "Tomorrow";
    if (daysUntil < 30) return `${daysUntil} days`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const deadlineDate = formatDeadline(grant.deadline);
  const isUrgent = deadlineDate.includes("days") || deadlineDate === "Today" || deadlineDate === "Tomorrow";

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-xl line-clamp-2">{grant.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span className="font-medium">{grant.agency}</span>
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={grant.fit_score >= 80 ? "default" : "secondary"} className="whitespace-nowrap">
              <TrendingUp className="mr-1 h-3 w-3" />
              {grant.fit_score}% Match
            </Badge>
            {isUrgent && (
              <Badge variant="destructive" className="whitespace-nowrap">
                {deadlineDate}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Fit Score Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Fit Score</span>
            <span className={`font-bold ${getFitScoreColor(grant.fit_score)}`}>
              {grant.fit_score}/100
            </span>
          </div>
          <Progress value={grant.fit_score} className="h-2" />
        </div>

        {/* Fit Reasons */}
        {grant.fit_reasons && grant.fit_reasons.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Why it's a good fit:</span>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {grant.fit_reasons.slice(0, 3).map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span className="line-clamp-2">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Grant Details */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">{formatCurrency(grant.funding_amount)}</div>
              <div className="text-xs text-muted-foreground">Funding</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className={`font-medium ${isUrgent ? "text-red-600" : ""}`}>
                {deadlineDate}
              </div>
              <div className="text-xs text-muted-foreground">Deadline</div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <a href={grant.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Grant
          </a>
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={() => onAnalyze?.(grant.grant_id)}
        >
          Analyze Grant
        </Button>
      </CardFooter>
    </Card>
  );
}
