/**
 * Progress Tracker Component
 * Real-time progress tracking with Server-Sent Events (SSE)
 * For Stage 4: Application Generation
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "./progress";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Alert, AlertDescription } from "./alert";
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock,
  Sparkles,
  FileText,
  Search,
  Wand2,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface ProgressUpdate {
  progress: number;
  step: string;
  phase: string;
  eta?: number;
  status: "running" | "completed" | "error";
  error?: string;
}

interface ProgressTrackerProps {
  applicationId: string;
  token: string;
  onComplete?: (data: ProgressUpdate) => void;
  onError?: (error: string) => void;
  autoStart?: boolean;
  sseEndpoint?: string;
}

const PROGRESS_PHASES = [
  {
    name: "Analyzing RFP",
    icon: Search,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    range: [0, 20],
  },
  {
    name: "Retrieving Examples",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    range: [20, 40],
  },
  {
    name: "Generating Sections",
    icon: Wand2,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    range: [40, 75],
  },
  {
    name: "Running Assessors",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-50",
    range: [75, 95],
  },
  {
    name: "Finalizing",
    icon: Sparkles,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    range: [95, 100],
  },
];

function getCurrentPhase(progress: number) {
  return PROGRESS_PHASES.find(
    (phase) => progress >= phase.range[0] && progress <= phase.range[1]
  ) || PROGRESS_PHASES[0];
}

export function ProgressTracker({
  applicationId,
  token,
  onComplete,
  onError,
  autoStart = true,
  sseEndpoint = "/api/v1/stage4/progress",
}: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Initializing...");
  const [eta, setEta] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "running" | "completed" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentPhase = getCurrentPhase(progress);
  const PhaseIcon = currentPhase.icon;

  // Format ETA
  const formatEta = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Trigger confetti celebration
  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  // Connect to SSE
  const connect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const url = `${sseEndpoint}/${applicationId}?token=${encodeURIComponent(token)}`;

    try {
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log("SSE connection established");
        setReconnectAttempts(0);
        setStatus("running");
      };

      eventSource.onmessage = (event) => {
        try {
          const data: ProgressUpdate = JSON.parse(event.data);

          // Smooth progress animation (don't jump)
          setProgress((prev) => {
            const diff = data.progress - prev;
            if (diff > 10) {
              // Large jump - animate incrementally
              return prev + 1;
            }
            return data.progress;
          });

          setCurrentStep(data.step);
          if (data.eta !== undefined) setEta(data.eta);

          if (data.status === "completed") {
            setStatus("completed");
            setProgress(100);
            triggerConfetti();
            eventSource.close();
            onComplete?.(data);
          } else if (data.status === "error") {
            setStatus("error");
            setError(data.error || "An unexpected error occurred");
            eventSource.close();
            onError?.(data.error || "An unexpected error occurred");
          }
        } catch (err) {
          console.error("Error parsing SSE data:", err);
        }
      };

      eventSource.onerror = (err) => {
        console.error("SSE connection error:", err);
        eventSource.close();

        // Reconnection logic with exponential backoff
        if (status !== "completed" && reconnectAttempts < 5) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 10000);
          console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttempts + 1}/5)`);

          reconnectTimeoutRef.current = setTimeout(() => {
            setReconnectAttempts((prev) => prev + 1);
            connect();
          }, delay);
        } else if (reconnectAttempts >= 5) {
          setStatus("error");
          setError("Connection lost. Please refresh the page.");
          onError?.("Connection lost after multiple attempts");
        }
      };
    } catch (err) {
      console.error("Error creating EventSource:", err);
      setStatus("error");
      setError("Failed to establish connection");
      onError?.("Failed to establish connection");
    }
  };

  // Auto-start connection
  useEffect(() => {
    if (autoStart) {
      connect();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [autoStart, applicationId, token]);

  // Smooth progress animation when large jumps occur
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100 && status === "running") {
          return Math.min(prev + 0.5, 99); // Never reach 100 until server confirms
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [status]);

  return (
    <Card className="border-2">
      <CardContent className="pt-6 space-y-6">
        {/* Header with Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: status === "running" ? 360 : 0,
              }}
              transition={{
                duration: 2,
                repeat: status === "running" ? Infinity : 0,
                ease: "linear",
              }}
            >
              {status === "completed" ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : status === "error" ? (
                <AlertCircle className="h-6 w-6 text-red-600" />
              ) : (
                <Loader2 className="h-6 w-6 text-primary" />
              )}
            </motion.div>

            <div>
              <h3 className="font-semibold text-lg">
                {status === "completed"
                  ? "Application Complete!"
                  : status === "error"
                  ? "Generation Failed"
                  : "Generating Application"}
              </h3>
              {eta && status === "running" && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Estimated time: {formatEta(eta)}
                </p>
              )}
            </div>
          </div>

          <Badge
            variant={
              status === "completed"
                ? "default"
                : status === "error"
                ? "destructive"
                : "secondary"
            }
          >
            {Math.round(progress)}%
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Current Phase Indicator */}
        <motion.div
          className={cn("flex items-center gap-3 p-4 rounded-lg", currentPhase.bgColor)}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <PhaseIcon className={cn("h-5 w-5", currentPhase.color)} />
          <div className="flex-1">
            <p className={cn("font-medium", currentPhase.color)}>
              {currentPhase.name}
            </p>
            <p className="text-xs text-gray-600">
              Phase {PROGRESS_PHASES.indexOf(currentPhase) + 1} of {PROGRESS_PHASES.length}
            </p>
          </div>
        </motion.div>

        {/* Phase Timeline */}
        <div className="space-y-3">
          {PROGRESS_PHASES.map((phase, index) => {
            const isComplete = progress > phase.range[1];
            const isCurrent =
              progress >= phase.range[0] && progress <= phase.range[1];
            const Icon = phase.icon;

            return (
              <motion.div
                key={phase.name}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                    isComplete
                      ? "bg-green-100 text-green-600"
                      : isCurrent
                      ? cn(phase.bgColor, phase.color)
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isComplete
                        ? "text-green-600"
                        : isCurrent
                        ? phase.color
                        : "text-gray-500"
                    )}
                  >
                    {phase.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {phase.range[0]}% - {phase.range[1]}%
                  </p>
                </div>
                {isCurrent && (
                  <motion.div
                    className="h-2 w-2 rounded-full bg-current"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Error Message */}
        {status === "error" && error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Completion Message */}
        {status === "completed" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Your grant application has been successfully generated and is ready to review!
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Reconnecting Indicator */}
        {reconnectAttempts > 0 && status === "running" && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              Reconnecting... (Attempt {reconnectAttempts}/5)
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Mock Progress Tracker (for testing without backend)
 */
export function MockProgressTracker({
  onComplete,
  duration = 30000, // 30 seconds default
}: {
  onComplete?: () => void;
  duration?: number;
}) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Initializing...");

  useEffect(() => {
    const steps = [
      { progress: 10, step: "Analyzing RFP requirements..." },
      { progress: 20, step: "Identifying key evaluation criteria..." },
      { progress: 30, step: "Retrieving similar grant examples..." },
      { progress: 40, step: "Analyzing successful applications..." },
      { progress: 50, step: "Generating Executive Summary..." },
      { progress: 60, step: "Writing Technical Approach..." },
      { progress: 70, step: "Creating Budget Justification..." },
      { progress: 80, step: "Running technical assessor..." },
      { progress: 85, step: "Running business assessor..." },
      { progress: 90, step: "Running academic assessor..." },
      { progress: 95, step: "Checking consistency..." },
      { progress: 100, step: "Finalizing application..." },
    ];

    const stepDuration = duration / steps.length;

    steps.forEach((step, index) => {
      setTimeout(() => {
        setProgress(step.progress);
        setCurrentStep(step.step);

        if (step.progress === 100) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          onComplete?.();
        }
      }, stepDuration * index);
    });
  }, [duration, onComplete]);

  const currentPhase = getCurrentPhase(progress);
  const PhaseIcon = currentPhase.icon;

  return (
    <Card className="border-2">
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
            <h3 className="font-semibold text-lg">Generating Application</h3>
          </div>
          <Badge>{Math.round(progress)}%</Badge>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          className={cn("flex items-center gap-3 p-4 rounded-lg", currentPhase.bgColor)}
          key={currentPhase.name}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <PhaseIcon className={cn("h-5 w-5", currentPhase.color)} />
          <p className={cn("font-medium", currentPhase.color)}>
            {currentPhase.name}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
