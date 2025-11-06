"use client";

import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { GradientAnimatedButton } from "@/components/ui/animated-button";
import { ChevronLeft, Loader2 } from "lucide-react";

const teamInfoSchema = z.object({
  team_info: z.string().optional(),
});

type TeamInfoValues = z.infer<typeof teamInfoSchema>;

interface TeamInfoStepProps {
  onComplete: (data: any) => void;
  onBack: () => void;
  initialData?: any;
  isSubmitting: boolean;
}

export function TeamInfoStep({ onComplete, onBack, initialData, isSubmitting }: TeamInfoStepProps) {
  const form = useForm<TeamInfoValues>({
    resolver: zodResolver(teamInfoSchema),
    defaultValues: {
      team_info: initialData?.team_info || "",
    },
  });

  function onSubmit(data: TeamInfoValues) {
    onComplete(data);
  }

  function handleSkip() {
    onComplete({ team_info: "" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 mb-4">
          <span className="text-xs text-purple-400 font-semibold tracking-wide">STEP 3 OF 3</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Your Team</h2>
        <p className="text-white/60 text-lg">
          Grant reviewers love strong teams. Tell us about founders, advisors, and key expertise.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="team_info"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Team & Expertise</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., CEO: PhD in Bioengineering (MIT), 2 exits, 10 patents. CTO: Former Google AI lead, published in Nature. Advisors: Dr. Jane Smith (Harvard), prior SBIR Phase II winner..."
                    className="min-h-[120px] bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-offset-0 backdrop-blur-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/50">
                  Optional: Team members, their credentials (PhDs, publications, prior exits, relevant expertise), and advisors. Strong teams significantly improve grant success rates.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
            <p className="text-sm text-white/80">
              💡 <strong className="text-purple-400">Pro tip:</strong> Grant reviewers look for credibility signals like PhDs, industry veterans, previous grant successes, or publications. Even if you're early-stage, sharing your team's relevant experience helps build trust.
            </p>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleSkip}
                disabled={isSubmitting}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                Skip for now
              </Button>
              <GradientAnimatedButton
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Creating Profile..." : "Complete Setup"}
              </GradientAnimatedButton>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
