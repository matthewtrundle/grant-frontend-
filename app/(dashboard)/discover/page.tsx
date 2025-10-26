/**
 * Grant Discovery Page (Stage 2)
 * Search and filter grants with fit scores
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api/client";
import type {
  Stage1ProfileResponse,
  Stage2DiscoverRequest,
  Stage2DiscoverResponse,
  Grant,
} from "@/types/api";
import { GrantFiltersComponent, GrantFilters } from "./filters";
import { GrantCard } from "./grant-card";
import { AlertCircle, Sparkles, TrendingUp } from "lucide-react";

export default function DiscoverPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Stage1ProfileResponse | null>(null);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [totalFound, setTotalFound] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load profile from localStorage on mount
  useEffect(() => {
    const profileData = localStorage.getItem("profile_data");
    if (profileData) {
      try {
        const parsedProfile: Stage1ProfileResponse = JSON.parse(profileData);
        setProfile(parsedProfile);
      } catch (err) {
        console.error("Error parsing profile data:", err);
        setError("Could not load your profile. Please create a profile first.");
      }
    } else {
      setError("No profile found. Please create a profile first.");
    }
  }, []);

  const handleSearch = async (filters: GrantFilters) => {
    if (!profile) {
      toast({
        title: "Profile Required",
        description: "Please create a company profile first",
        variant: "destructive",
      });
      router.push("/profile");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const token = await getToken();

      const request: Stage2DiscoverRequest = {
        company_profile_id: profile.profile_id,
        technology: filters.technology,
        funding_amount_min: filters.funding_amount_min,
        funding_amount_max: filters.funding_amount_max,
        keywords: filters.keywords.length > 0 ? filters.keywords : undefined,
        limit: 20, // Default limit
      };

      const response = await apiRequest<Stage2DiscoverResponse>(
        "/stage2/discover",
        token,
        {
          method: "POST",
          body: JSON.stringify(request),
        }
      );

      setGrants(response.grants);
      setTotalFound(response.total_found);

      toast({
        title: "Search Complete",
        description: `Found ${response.total_found} matching grant${response.total_found !== 1 ? "s" : ""}`,
      });
    } catch (error: any) {
      console.error("Grant discovery error:", error);
      const errorMessage = error.data?.detail || error.message || "Failed to search grants";
      setError(errorMessage);
      toast({
        title: "Search Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = (grantId: number) => {
    // Store the grant_id and navigate to Stage 3 (analysis)
    localStorage.setItem("current_grant_id", grantId.toString());
    router.push("/analyze");
  };

  const handleCreateProfile = () => {
    router.push("/profile");
  };

  // Show loading skeleton while checking for profile
  if (!profile && !error) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  // Show error if no profile
  if (error && !profile) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={handleCreateProfile}>
              Create Profile
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Badge variant="secondary">Stage 2</Badge>
          <h1 className="text-3xl font-bold">Grant Discovery</h1>
        </div>
        <p className="text-muted-foreground">
          Find grants that match your technology and funding needs. Results are ranked by fit score.
        </p>
      </div>

      {/* Profile Summary */}
      {profile && (
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertDescription>
            <strong>{profile.company_name}</strong> • TRL {profile.trl} • {profile.technology_summary}
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <GrantFiltersComponent
        onSearch={handleSearch}
        isLoading={isLoading}
        initialTechnology={profile?.technology_summary || ""}
      />

      {/* Results */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      )}

      {error && hasSearched && !isLoading && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isLoading && hasSearched && grants.length === 0 && !error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No grants found matching your criteria. Try adjusting your filters or expanding your search.
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && grants.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold">
                {totalFound} Grant{totalFound !== 1 ? "s" : ""} Found
              </h2>
            </div>
            <Badge variant="secondary">
              Showing {grants.length} of {totalFound}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grants.map((grant) => (
              <GrantCard
                key={grant.grant_id}
                grant={grant}
                onAnalyze={handleAnalyze}
              />
            ))}
          </div>
        </>
      )}

      {/* Empty State - First Visit */}
      {!hasSearched && !isLoading && (
        <div className="text-center py-12 space-y-4">
          <Sparkles className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="text-lg font-medium">Ready to Find Grants?</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Use the filters above to search for grants that match your technology and funding needs.
            Results will be ranked by fit score.
          </p>
        </div>
      )}
    </div>
  );
}
