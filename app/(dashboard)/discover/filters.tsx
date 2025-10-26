/**
 * Grant Discovery Filters Component
 * Filter grants by technology, funding amount, and keywords
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, DollarSign, Sparkles } from "lucide-react";

export interface GrantFilters {
  technology: string;
  funding_amount_min?: number;
  funding_amount_max?: number;
  keywords: string[];
}

interface GrantFiltersComponentProps {
  onSearch: (filters: GrantFilters) => void;
  isLoading?: boolean;
  initialTechnology?: string;
}

export function GrantFiltersComponent({
  onSearch,
  isLoading,
  initialTechnology = "",
}: GrantFiltersComponentProps) {
  const [technology, setTechnology] = useState(initialTechnology);
  const [fundingMin, setFundingMin] = useState("");
  const [fundingMax, setFundingMax] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleSearch = () => {
    const filters: GrantFilters = {
      technology: technology.trim(),
      keywords,
    };

    // Add funding amounts if provided
    const minAmount = parseFloat(fundingMin);
    const maxAmount = parseFloat(fundingMax);

    if (!isNaN(minAmount) && minAmount > 0) {
      filters.funding_amount_min = minAmount;
    }

    if (!isNaN(maxAmount) && maxAmount > 0) {
      filters.funding_amount_max = maxAmount;
    }

    onSearch(filters);
  };

  const handleClear = () => {
    setTechnology(initialTechnology);
    setFundingMin("");
    setFundingMax("");
    setKeywords([]);
    setKeywordInput("");
  };

  const hasFilters =
    technology !== initialTechnology ||
    fundingMin !== "" ||
    fundingMax !== "" ||
    keywords.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Find Your Perfect Grants
        </CardTitle>
        <CardDescription>
          Filter grants by technology, funding amount, and keywords to find the best matches
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Technology */}
        <div className="space-y-2">
          <Label htmlFor="technology">Technology / Focus Area</Label>
          <Input
            id="technology"
            placeholder="e.g., AI, renewable energy, biotechnology"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <p className="text-xs text-muted-foreground">
            Describe your core technology or research area
          </p>
        </div>

        {/* Funding Range */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Funding Amount Range
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Input
                id="funding-min"
                type="number"
                placeholder="Min ($)"
                value={fundingMin}
                onChange={(e) => setFundingMin(e.target.value)}
                min="0"
                step="10000"
              />
              <p className="text-xs text-muted-foreground">Minimum</p>
            </div>
            <div className="space-y-1">
              <Input
                id="funding-max"
                type="number"
                placeholder="Max ($)"
                value={fundingMax}
                onChange={(e) => setFundingMax(e.target.value)}
                min="0"
                step="10000"
              />
              <p className="text-xs text-muted-foreground">Maximum</p>
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div className="space-y-2">
          <Label htmlFor="keywords">Additional Keywords (Optional)</Label>
          <div className="flex gap-2">
            <Input
              id="keywords"
              placeholder="Add keyword and press Enter"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleAddKeyword}
              disabled={!keywordInput.trim()}
            >
              +
            </Button>
          </div>
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="gap-1">
                  {keyword}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            className="flex-1"
            onClick={handleSearch}
            disabled={isLoading || !technology.trim()}
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Searching..." : "Search Grants"}
          </Button>
          {hasFilters && (
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={isLoading}
            >
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
