/**
 * Mock Payment Gate Component
 * Simulates payment requirement for premium features
 * Replace with real Stripe integration in production
 */

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Lock, CreditCard } from "lucide-react";

interface PaymentGateProps {
  stage: "stage3" | "stage4";
  children: React.ReactNode;
}

export function PaymentGate({ stage, children }: PaymentGateProps) {
  const [hasPaid, setHasPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check localStorage for mock payment status
  useEffect(() => {
    const paidStages = JSON.parse(localStorage.getItem("paid_stages") || "{}");
    setHasPaid(paidStages[stage] === true);
  }, [stage]);

  const handleMockPayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const paidStages = JSON.parse(localStorage.getItem("paid_stages") || "{}");
      paidStages[stage] = true;
      localStorage.setItem("paid_stages", JSON.stringify(paidStages));
      setHasPaid(true);
      setIsProcessing(false);
    }, 1500);
  };

  // If user has paid, show the content
  if (hasPaid) {
    return <>{children}</>;
  }

  // Show payment gate
  const pricing = {
    stage3: {
      name: "Pro Plan",
      price: 199,
      features: [
        "Comprehensive grant analysis",
        "Eligibility assessment with confidence scores",
        "Detailed budget recommendations",
        "Project timeline with milestones",
        "Risk analysis and mitigation strategies",
        "Success factor identification",
        "Personalized recommendations",
      ],
    },
    stage4: {
      name: "Enterprise Plan",
      price: 999,
      features: [
        "Complete grant application generation",
        "Multi-agent AI writing system",
        "3-round quality assessment",
        "Consistency checking across sections",
        "Technical, business, and academic scoring",
        "Downloadable application document",
        "Unlimited revisions for 30 days",
      ],
    },
  };

  const plan = pricing[stage];

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="mb-4">
          <Lock className="mr-1 h-3 w-3" />
          Premium Feature
        </Badge>
        <h2 className="text-3xl font-bold">Upgrade to {plan.name}</h2>
        <p className="text-muted-foreground">
          Unlock powerful AI-driven grant {stage === "stage3" ? "analysis" : "writing"} capabilities
        </p>
      </div>

      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{plan.name}</span>
            <span className="text-4xl font-bold">${plan.price}</span>
          </CardTitle>
          <CardDescription>One-time payment for this grant application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="font-medium">What's included:</p>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Alert>
            <CreditCard className="h-4 w-4" />
            <AlertDescription>
              <strong>Mock Payment Mode</strong> - Click the button below to simulate payment. In
              production, this would integrate with Stripe.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={handleMockPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Simulate Payment - ${plan.price}
                </>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              No actual payment will be processed. This is a demo.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Questions? Contact us at support@grantautomation.ai
        </p>
      </div>
    </div>
  );
}
