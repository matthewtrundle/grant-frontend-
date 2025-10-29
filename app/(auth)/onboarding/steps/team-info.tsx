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
      <h2 className="text-2xl font-bold text-white mb-2">Team Information</h2>
      <p className="text-white/60 mb-6">
        Tell us about your team&apos;s expertise and background (optional)
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="team_info"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Team & Expertise</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Founders, key team members, advisors, expertise..."
                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-purple-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/60">
                  Optional: Information about your team and their expertise. This can strengthen your grant applications.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="p-4 rounded-lg backdrop-blur-xl bg-purple-500/10 border border-purple-500/20">
            <p className="text-sm text-white/80">
              💡 <strong>Tip:</strong> Including team expertise can improve your grant match scores by 15-20%.
              Consider mentioning PhDs, industry experience, previous grants, or relevant publications.
            </p>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
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
                className="text-white/60 hover:text-white hover:bg-white/5"
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
