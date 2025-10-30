"use client";

import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GradientAnimatedButton } from "@/components/ui/animated-button";
import { Building2, Globe } from "lucide-react";

const companyInfoSchema = z.object({
  company_name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
});

type CompanyInfoValues = z.infer<typeof companyInfoSchema>;

interface CompanyInfoStepProps {
  onNext: (data: any) => void;
  initialData?: any;
}

export function CompanyInfoStep({ onNext, initialData }: CompanyInfoStepProps) {
  const form = useForm<CompanyInfoValues>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      company_name: initialData?.company_name || "",
      website: initialData?.website || "",
    },
  });

  function onSubmit(data: CompanyInfoValues) {
    onNext(data);
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
          <span className="text-xs text-purple-400 font-semibold tracking-wide">STEP 1 OF 3</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Company Information</h2>
        <p className="text-white/60 text-lg">
          Tell us about your company so we can match you with the right grants
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  Company Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="BioTech Innovations Inc"
                    className="bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/40">
                  The legal name of your company or organization
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  Website URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    className="bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/40">
                  Your company website (optional)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-4">
            <GradientAnimatedButton
              type="submit"
              className="w-full md:w-auto"
              disabled={!form.formState.isValid}
            >
              Continue
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </GradientAnimatedButton>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
