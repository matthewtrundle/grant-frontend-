/**
 * Paywall Modal Component
 * Animated modal for premium feature upgrades with Stripe integration
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Lock, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: "stage3" | "stage4";
  onPaymentSuccess?: () => void;
}

const PRICING = {
  stage3: {
    name: "Grant Analysis",
    tagline: "Deep insights powered by AI",
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
    gradient: "from-purple-600 to-purple-700",
    glowColor: "rgba(147, 51, 234, 0.5)",
  },
  stage4: {
    name: "Full Application",
    tagline: "Complete grant writing in 48 hours",
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
    gradient: "from-yellow-500 to-purple-600",
    glowColor: "rgba(234, 179, 8, 0.5)",
  },
};

export function PaywallModal({
  isOpen,
  onClose,
  stage,
  onPaymentSuccess,
}: PaywallModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const plan = PRICING[stage];

  const handleCheckout = async () => {
    setIsProcessing(true);

    // Mock payment processing (replace with real Stripe integration)
    setTimeout(() => {
      // Store mock payment in localStorage
      const paidStages = JSON.parse(localStorage.getItem("paid_stages") || "{}");
      paidStages[stage] = true;
      localStorage.setItem("paid_stages", JSON.stringify(paidStages));

      setIsProcessing(false);
      onPaymentSuccess?.();
      onClose();

      // Show success toast (if toast system is available)
      if (typeof window !== "undefined" && window.dispatchEvent) {
        window.dispatchEvent(
          new CustomEvent("show-toast", {
            detail: {
              type: "success",
              title: "Payment successful",
              description: `You now have access to ${plan.name}.`,
            },
          })
        );
      }
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient background */}
              <div
                className={cn(
                  "relative p-6 bg-gradient-to-r text-white rounded-t-xl",
                  plan.gradient
                )}
              >
                {/* Close button */}
                <motion.button
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>

                {/* Premium badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="mb-3 bg-white/20 text-white border-white/30"
                  >
                    <Lock className="mr-1 h-3 w-3" />
                    Premium Feature
                  </Badge>
                </motion.div>

                {/* Product name and tagline */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    {plan.name}
                    <Sparkles className="h-7 w-7" />
                  </h2>
                  <p className="text-white/90 text-lg">{plan.tagline}</p>
                </motion.div>

                {/* Price display */}
                <motion.div
                  className="mt-6 flex items-baseline gap-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-white/80 text-lg">one-time payment</span>
                </motion.div>
              </div>

              {/* Features list */}
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <p className="font-semibold text-gray-900 text-lg">
                    What&apos;s included:
                  </p>
                  <motion.ul
                    className="space-y-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                  >
                    {plan.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Mock payment notice */}
                <motion.div
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium text-blue-900 text-sm">
                        Mock Payment Mode
                      </p>
                      <p className="text-blue-700 text-sm">
                        This is a demonstration. No actual payment will be
                        processed. In production, this would integrate with
                        Stripe Checkout.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  className="space-y-3 pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    size="lg"
                    className={cn(
                      "w-full text-lg shadow-lg hover:shadow-xl transition-all",
                      "bg-gradient-to-r",
                      plan.gradient
                    )}
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Processing...
                      </motion.div>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Continue to Checkout
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    Secure checkout powered by Stripe
                  </p>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  className="flex items-center justify-center gap-6 pt-4 border-t"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Money-back guarantee</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook for managing paywall modal state
 */
export function usePaywallModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<"stage3" | "stage4">("stage3");

  const openModal = (stageToOpen: "stage3" | "stage4") => {
    setStage(stageToOpen);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    stage,
    openModal,
    closeModal,
  };
}
