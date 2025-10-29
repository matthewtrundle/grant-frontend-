"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { GradientAnimatedButton } from "@/components/ui/animated-button";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome to <AnimatedGradientText glow>Grant Automation</AnimatedGradientText>
        </h1>
        <p className="text-xl text-gray-600">
          Let&apos;s get started with your grant application journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stage 1: Company Profile */}
        <Card className="border-2 border-primary-200">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">Stage 1</Badge>
              <Badge className="bg-success text-white">FREE</Badge>
            </div>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>
              Create your profile and get TRL assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Technology Readiness Level (TRL) assessment</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>AI-powered company profiling</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Ready for grant matching</span>
              </li>
            </ul>
            <Link href="/profile">
              <GradientAnimatedButton className="w-full">
                Start Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </GradientAnimatedButton>
            </Link>
          </CardContent>
        </Card>

        {/* Stage 2: Grant Discovery */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">Stage 2</Badge>
              <Badge className="bg-success text-white">FREE</Badge>
            </div>
            <CardTitle>Grant Discovery</CardTitle>
            <CardDescription>
              Find matching grant opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>AI-powered grant search</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Fit scores (0-100)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Personalized recommendations</span>
              </li>
            </ul>
            <Button className="w-full" variant="outline" disabled>
              Complete Profile First
            </Button>
          </CardContent>
        </Card>

        {/* Stage 3: Grant Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">Stage 3</Badge>
              <Badge className="bg-primary-600 text-white">$199</Badge>
            </div>
            <CardTitle>Grant Analysis</CardTitle>
            <CardDescription>
              Deep RFP analysis and planning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Eligibility check</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Timeline & budget breakdown</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Success factors & risks</span>
              </li>
            </ul>
            <Button className="w-full" variant="outline" disabled>
              Complete Discovery First
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Guide */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Follow these steps to create your grant application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <p className="font-medium">Create Your Company Profile</p>
                <p className="text-sm text-gray-600">Tell us about your technology and get your TRL assessment (Free)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <p className="font-medium">Discover Matching Grants</p>
                <p className="text-sm text-gray-600">Find grants that match your profile with AI-powered search (Free)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <p className="font-medium">Analyze Your Top Choices</p>
                <p className="text-sm text-gray-600">Get detailed analysis, timeline, and budget for $199</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-semibold">
                4
              </div>
              <div>
                <p className="font-medium">Generate Full Application</p>
                <p className="text-sm text-gray-600">AI writes your complete grant application for $999</p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
