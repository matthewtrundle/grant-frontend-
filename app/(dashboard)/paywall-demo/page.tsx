/**
 * Paywall Modal Demo Page
 * Test page to demonstrate PaywallModal animations and functionality
 */

"use client";

import { useState } from "react";
import { PaywallModal, usePaywallModal } from "@/components/ui/paywall-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Sparkles } from "lucide-react";

export default function PaywallDemoPage() {
  const { isOpen, stage, openModal, closeModal } = usePaywallModal();
  const [lastPaymentStage, setLastPaymentStage] = useState<string | null>(null);

  const handlePaymentSuccess = () => {
    setLastPaymentStage(stage);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Badge variant="secondary" className="mb-2">
          <Sparkles className="mr-1 h-3 w-3" />
          Demo Page
        </Badge>
        <h1 className="text-4xl font-bold">Paywall Modal Demo</h1>
        <p className="text-lg text-muted-foreground">
          Test the animated payment modals for Stage 3 and Stage 4 premium features.
        </p>
      </div>

      {/* Payment Success Indicator */}
      {lastPaymentStage && (
        <Card className="border-green-500 bg-green-50/50">
          <CardContent className="pt-6">
            <p className="text-green-700 font-medium">
              ✓ Mock payment successful for {lastPaymentStage === "stage3" ? "Grant Analysis" : "Full Application"}!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Demo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stage 3 Demo Card */}
        <Card className="border-2 hover:border-purple-300 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">Stage 3</Badge>
              <Badge variant="outline" className="text-ocean-700 border-ocean-600">
                <Lock className="mr-1 h-3 w-3" />
                $199
              </Badge>
            </div>
            <CardTitle>Grant Analysis</CardTitle>
            <CardDescription>
              Comprehensive analysis with eligibility assessment, budget, timeline, and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Eligibility assessment with confidence scores</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Detailed budget recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Project timeline with milestones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Risk analysis and mitigation strategies</span>
              </li>
            </ul>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              onClick={() => openModal("stage3")}
            >
              <Lock className="mr-2 h-4 w-4" />
              Open Stage 3 Modal
            </Button>
          </CardContent>
        </Card>

        {/* Stage 4 Demo Card */}
        <Card className="border-2 hover:border-yellow-300 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">Stage 4</Badge>
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                <Lock className="mr-1 h-3 w-3" />
                $999
              </Badge>
            </div>
            <CardTitle>Full Application</CardTitle>
            <CardDescription>
              Complete grant application generation with multi-agent AI writing system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Complete grant application generation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Multi-agent AI writing system</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>3-round quality assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Unlimited revisions for 30 days</span>
              </li>
            </ul>
            <Button
              className="w-full bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700"
              onClick={() => openModal("stage4")}
            >
              <Lock className="mr-2 h-4 w-4" />
              Open Stage 4 Modal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features List */}
      <Card>
        <CardHeader>
          <CardTitle>Modal Features</CardTitle>
          <CardDescription>
            The PaywallModal component includes the following animations and features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-ocean-700">
                1
              </span>
              <div>
                <span className="font-medium">Backdrop Blur Animation</span>
                <p className="text-sm text-muted-foreground">Smooth fade-in of blurred backdrop</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-ocean-700">
                2
              </span>
              <div>
                <span className="font-medium">Modal Scale & Slide Animation</span>
                <p className="text-sm text-muted-foreground">Content scales and slides up on entrance</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-ocean-700">
                3
              </span>
              <div>
                <span className="font-medium">Staggered Feature List</span>
                <p className="text-sm text-muted-foreground">Features appear sequentially with stagger delay</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-ocean-700">
                4
              </span>
              <div>
                <span className="font-medium">Loading Spinner Animation</span>
                <p className="text-sm text-muted-foreground">Rotating spinner during payment processing</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-ocean-700">
                5
              </span>
              <div>
                <span className="font-medium">Close Button Hover Effect</span>
                <p className="text-sm text-muted-foreground">Scale animation on hover and tap</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-ocean-700">
                6
              </span>
              <div>
                <span className="font-medium">AnimatePresence Exit Animation</span>
                <p className="text-sm text-muted-foreground">Smooth scale-down and fade-out on close</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Implementation Notes */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-blue-900">Implementation Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-900">
          <p>
            <strong>Mock Payment:</strong> This demo uses localStorage to simulate payments. In production, integrate with Stripe Checkout API.
          </p>
          <p>
            <strong>Integration:</strong> Use the <code className="px-1.5 py-0.5 bg-blue-100 rounded">usePaywallModal</code> hook to manage modal state, or control it with your own state management.
          </p>
          <p>
            <strong>Customization:</strong> The modal supports different gradient colors and features for each stage (stage3 = purple gradient, stage4 = yellow-to-purple gradient).
          </p>
        </CardContent>
      </Card>

      {/* Paywall Modal Component */}
      <PaywallModal
        isOpen={isOpen}
        onClose={closeModal}
        stage={stage}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
