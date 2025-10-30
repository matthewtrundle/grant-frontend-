"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { CircuitBackground } from "@/components/ui/animated-background";
import { PremiumMotionCard } from "@/components/ui/motion-card";
import { Progress } from "@/components/ui/progress";
import { CompanyInfoStep } from "./steps/company-info";
import { TechnologyStep } from "./steps/technology";
import { TeamInfoStep } from "./steps/team-info";
import { apiRequest } from "@/lib/api/client";
import type { Stage1ProfileResponse } from "@/types/api";

const STEPS = [
  { id: 1, title: "Company Info", description: "Tell us about your company" },
  { id: 2, title: "Technology", description: "Describe your innovation" },
  { id: 3, title: "Team", description: "Your team and expertise" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = (stepData: any) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete(updatedData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async (data: any) => {
    setIsSubmitting(true);

    try {
      const token = await getToken();

      // Create Stage 1 profile
      const response = await apiRequest<Stage1ProfileResponse>(
        "/stage1/profile",
        token,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      // Update Clerk metadata with profile info
      await user?.update({
        publicMetadata: {
          companyName: data.company_name,
          profileId: response.profile_id,
          trl: response.trl,
          technologySummary: response.technology_summary,
          onboardingComplete: true,
        },
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative">
      <div className="relative z-10 container mx-auto max-w-3xl px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-xl text-gray-600">
            Let&apos;s set up your company profile to start finding grants
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`text-sm font-medium ${
                  step.id <= currentStep ? "text-purple-600" : "text-gray-400"
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-center text-sm text-gray-600 mt-2">
            Step {currentStep} of {STEPS.length}
          </div>
        </div>

        {/* Step Content */}
        <PremiumMotionCard className="bg-white shadow-2xl border border-gray-200 p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <CompanyInfoStep
                key="step1"
                onNext={handleNext}
                initialData={formData}
              />
            )}
            {currentStep === 2 && (
              <TechnologyStep
                key="step2"
                onNext={handleNext}
                onBack={handleBack}
                initialData={formData}
              />
            )}
            {currentStep === 3 && (
              <TeamInfoStep
                key="step3"
                onComplete={handleNext}
                onBack={handleBack}
                initialData={formData}
                isSubmitting={isSubmitting}
              />
            )}
          </AnimatePresence>
        </PremiumMotionCard>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-lg bg-white/60 border border-gray-200"
        >
          <p className="text-sm text-gray-600 text-center">
            🔒 Your information is secure and will only be used to match you with relevant grants
          </p>
        </motion.div>
      </div>
    </div>
  );
}
