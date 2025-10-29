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
import { ChevronLeft } from "lucide-react";

const technologySchema = z.object({
  technology: z.string().min(10, {
    message: "Technology description must be at least 10 characters.",
  }),
  description: z.string().optional(),
});

type TechnologyValues = z.infer<typeof technologySchema>;

interface TechnologyStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export function TechnologyStep({ onNext, onBack, initialData }: TechnologyStepProps) {
  const form = useForm<TechnologyValues>({
    resolver: zodResolver(technologySchema),
    defaultValues: {
      technology: initialData?.technology || "",
      description: initialData?.description || "",
    },
  });

  function onSubmit(data: TechnologyValues) {
    onNext(data);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-2">Your Technology</h2>
      <p className="text-white/60 mb-6">
        Describe your core innovation or technology - this helps us assess your Technology Readiness Level (TRL)
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="technology"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Technology Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="AI-powered drug discovery platform using machine learning to identify novel therapeutic targets..."
                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-purple-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/60">
                  Describe your core technology or innovation (minimum 10 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Company Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Additional context about your company, mission, or market..."
                    className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-purple-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/60">
                  Optional: Additional details about your company
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <GradientAnimatedButton
              type="submit"
              disabled={!form.formState.isValid}
            >
              Next: Team Info
            </GradientAnimatedButton>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
