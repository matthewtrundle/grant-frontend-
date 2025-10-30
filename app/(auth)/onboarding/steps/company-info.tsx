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
import { Input } from "@/components/ui/input";
import { GradientAnimatedButton } from "@/components/ui/animated-button";

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
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Information</h2>
      <p className="text-gray-600 mb-6">
        Tell us about your company so we can match you with the right grants
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Company Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="BioTech Innovations Inc"
                    className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-gray-600">
                  The legal name of your company or organization
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Website URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-gray-600">
                  Your company website (optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <GradientAnimatedButton
              type="submit"
              className="w-full md:w-auto"
              disabled={!form.formState.isValid}
            >
              Next: Technology
            </GradientAnimatedButton>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
