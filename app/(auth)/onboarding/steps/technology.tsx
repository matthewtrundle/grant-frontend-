"use client";

import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
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
import { ChevronLeft, FileText } from "lucide-react";
import { FileUpload, UploadedFile } from "@/components/ui/file-upload";

const technologySchema = z.object({
  technology: z.string().min(10, {
    message: "Technology description must be at least 10 characters.",
  }),
  description: z.string().optional(),
  intellectual_property: z.string().optional(),
  market_size: z.string().optional(),
  uploaded_files: z.array(z.any()).optional(),
});

type TechnologyValues = z.infer<typeof technologySchema>;

interface TechnologyStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export function TechnologyStep({ onNext, onBack, initialData }: TechnologyStepProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const form = useForm<TechnologyValues>({
    resolver: zodResolver(technologySchema),
    defaultValues: {
      technology: initialData?.technology || "",
      description: initialData?.description || "",
      intellectual_property: initialData?.intellectual_property || "",
      market_size: initialData?.market_size || "",
      uploaded_files: initialData?.uploaded_files || [],
    },
  });

  const handleFilesChange = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    form.setValue("uploaded_files", files);
  };

  function onSubmit(data: TechnologyValues) {
    // Include uploaded files in the submission
    onNext({
      ...data,
      uploaded_files: uploadedFiles,
    });
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
          <span className="text-xs text-purple-400 font-semibold tracking-wide">STEP 2 OF 3</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Your Innovation</h2>
        <p className="text-white/60 text-lg">
          Tell us about the technology, the market opportunity, and share any supporting documents
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="technology"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">What are you building? *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Example: We're developing an AI-powered diagnostic tool that helps doctors detect early-stage pancreatic cancer using non-invasive blood tests..."
                    className="min-h-[120px] bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-offset-0 backdrop-blur-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/50">
                  Tell us about your technology and the impact it will have (the more detail, the better our matches)
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
                <FormLabel className="text-white font-medium">Anything else we should know?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your mission, the market you're targeting, or why this matters to you..."
                    className="min-h-[100px] bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-offset-0 backdrop-blur-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/50">
                  Optional, but helps us understand the bigger picture
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="intellectual_property"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Intellectual Property & Patents</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 3 patents filed (USPTO #123456, #234567, #345678), trade secrets in AI algorithm, exclusive license from MIT..."
                    className="min-h-[100px] bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-offset-0 backdrop-blur-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/50">
                  Optional: Patents, trade secrets, exclusive licenses, or IP strategy. This strengthens grant applications.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="market_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Market Size & Opportunity</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., $50B global market, 2M potential customers in US, growing 15% annually..."
                    className="min-h-[80px] bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-purple-500 focus:ring-purple-500 focus:ring-offset-0 backdrop-blur-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-white/50">
                  Optional: Market size estimates, growth rate, target customers. Helps identify commercial potential.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File Upload Section - Enhanced */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
            <FormField
              control={form.control}
              name="uploaded_files"
              render={() => (
                <FormItem>
                  <FormLabel className="text-white font-semibold flex items-center gap-2 text-base">
                    <FileText className="w-5 h-5 text-purple-400" />
                    Supporting Documents
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      accept=".pdf,.doc,.docx,.pptx,.txt"
                      maxSize={50}
                      maxFiles={5}
                      onFilesChange={handleFilesChange}
                    />
                  </FormControl>
                  <FormDescription className="text-white/60 mt-3">
                    <strong className="text-purple-400">Got pitch decks, technical docs, or product specs?</strong> Drop them here (non-confidential only). This helps our AI understand your innovation better and find more relevant grants. Max 50MB per file.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
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
