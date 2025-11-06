"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
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
  { id: 4, title: "Complete", description: "Profile created successfully" },
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

      // Upload files if any
      let uploadedFileUrls: string[] = [];
      if (data.uploaded_files && data.uploaded_files.length > 0) {
        try {
          const formData = new FormData();
          for (const uploadedFile of data.uploaded_files) {
            if (uploadedFile.file) {
              formData.append("files", uploadedFile.file);
            }
          }

          const uploadResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/stage1/upload`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          if (uploadResponse.ok) {
            const uploadResult = await uploadResponse.json();
            uploadedFileUrls = uploadResult.uploaded_files.map((f: any) => f.url);
            console.log("Files uploaded successfully:", uploadResult);
          } else {
            console.warn("File upload failed, continuing without files");
          }
        } catch (uploadError) {
          console.error("File upload error:", uploadError);
          // Continue without files rather than blocking onboarding
        }
      }

      // Create Stage 1 profile
      const profileData = {
        ...data,
        uploaded_file_urls: uploadedFileUrls,
      };

      const response = await apiRequest<Stage1ProfileResponse>(
        "/stage1/profile",
        token,
        {
          method: "POST",
          body: JSON.stringify(profileData),
        }
      );

      // Update Clerk metadata with profile info
      await user?.update({
        publicMetadata: {
          companyName: data.company_name,
          profileId: response.profile_id,
          trl: response.trl,
          technologySummary: response.technology_summary,
          uploadedFiles: uploadedFileUrls,
          onboardingComplete: true,
        },
      });

      // MVP: Show success state instead of auto-redirecting
      // Admin will manually trigger grant generation with profile_id
      setCurrentStep(4); // Show success page (step 4)
    } catch (error) {
      console.error("Onboarding error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Sophisticated background layers - Clerk.com style */}
      <div className="absolute inset-0">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,60,255,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(60,120,255,0.05),transparent_50%)]" />

        {/* Circuit pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="onboarding-circuit"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="30" x2="120" y2="30" stroke="#8B5CF6" strokeWidth="0.5" />
              <line x1="0" y1="60" x2="120" y2="60" stroke="#6366F1" strokeWidth="0.5" />
              <line x1="0" y1="90" x2="120" y2="90" stroke="#8B5CF6" strokeWidth="0.5" />
              <line x1="30" y1="0" x2="30" y2="120" stroke="#8B5CF6" strokeWidth="0.5" />
              <line x1="60" y1="0" x2="60" y2="120" stroke="#6366F1" strokeWidth="0.5" />
              <line x1="90" y1="0" x2="90" y2="120" stroke="#8B5CF6" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="2" fill="#8B5CF6" opacity="0.5" />
              <circle cx="60" cy="60" r="2" fill="#6366F1" opacity="0.5" />
              <circle cx="90" cy="90" r="2" fill="#8B5CF6" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#onboarding-circuit)" />
        </svg>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-16">
        {/* Header with better typography */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm text-purple-400 font-medium">Company Profile Setup</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Welcome{user?.firstName && `, ${user.firstName}`}!
          </h1>
          <p className="text-xl text-white/60">
            Let's set up your company profile to start finding grants
          </p>
        </motion.div>

        {/* Enhanced Progress Bar - hidden on success page */}
        {currentStep < 4 && (
          <div className="mb-10">
            <div className="flex justify-between mb-3">
              {STEPS.slice(0, 3).map((step) => (
                <div
                  key={step.id}
                  className="flex-1 text-center"
                >
                  <div className={`text-sm font-semibold mb-1 ${
                    step.id <= currentStep ? "text-purple-400" : "text-white/30"
                  }`}>
                    {step.title}
                  </div>
                  <div className={`text-xs ${
                    step.id <= currentStep ? "text-white/60" : "text-white/20"
                  }`}>
                    {step.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom progress bar with glow */}
            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-sm opacity-50"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            <div className="text-center text-sm text-white/40 mt-3 font-medium">
              Step {currentStep} of 3
            </div>
          </div>
        )}

        {/* Glassmorphic Card - Clerk.com style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative group"
        >
          {/* Glow effect on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

          {/* Main card */}
          <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl pointer-events-none" />

            <div className="relative">
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
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-12"
                  >
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
                        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                      You're all set, {user?.firstName || 'there'}! 🎉
                    </h2>

                    <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
                      Thank you for completing your profile. Our AI agents are now analyzing your innovation against our database of 1,500+ grants to find the best matches for your technology and stage.
                    </p>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8 max-w-lg mx-auto">
                      <p className="text-sm text-white/80 mb-2">
                        <strong className="text-purple-400">Profile ID:</strong> {user?.publicMetadata?.profileId || 'Processing...'}
                      </p>
                      <p className="text-sm text-white/80 mb-2">
                        <strong className="text-purple-400">Technology Readiness Level:</strong> TRL {user?.publicMetadata?.trl || 'Calculating...'}
                      </p>
                      <p className="text-sm text-white/80">
                        <strong className="text-purple-400">Company:</strong> {user?.publicMetadata?.companyName || formData.company_name}
                      </p>
                    </div>

                    <div className="text-left max-w-lg mx-auto mb-8 p-5 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                      <p className="text-sm font-bold text-purple-300 mb-4 flex items-center gap-2">
                        <span className="text-lg">🤖</span>
                        What happens next?
                      </p>
                      <div className="space-y-3 text-sm text-white/80">
                        <div className="flex items-start gap-3">
                          <span className="text-xl">⚡</span>
                          <div>
                            <strong className="text-white font-semibold">Now:</strong> Our AI is searching through 1,500+ NIH grants using advanced vector search to find opportunities that match your technology, stage, and team profile.
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-xl">🎯</span>
                          <div>
                            <strong className="text-white font-semibold">Within 24 hours:</strong> You'll receive your personalized grant matches with fit scores and detailed analysis in your dashboard.
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-xl">📚</span>
                          <div>
                            <strong className="text-white font-semibold">In the meantime:</strong> Explore your dashboard for grant-writing resources, timeline guidance, and best practices.
                          </div>
                        </div>
                      </div>
                    </div>

                    <GradientAnimatedButton
                      onClick={() => router.push("/dashboard")}
                      className="w-full md:w-auto"
                    >
                      Go to Dashboard
                    </GradientAnimatedButton>

                    <p className="text-xs text-white/40 mt-4">
                      Check back within 24 hours for your personalized grant matches
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-3 text-center"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm text-green-400/90 font-medium">Your data is safe with us</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm text-blue-400/90 font-medium">We keep your information private</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
