"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api/client";
import type { Stage1ProfileRequest, Stage1ProfileResponse } from "@/types/api";
import { Loader2 } from "lucide-react";

const profileFormSchema = z.object({
  company_name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  technology: z.string().min(10, {
    message: "Technology description must be at least 10 characters.",
  }),
  description: z.string().optional(),
  team_info: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      company_name: "",
      website: "",
      technology: "",
      description: "",
      team_info: "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);

    try {
      const token = await getToken();

      const response = await apiRequest<Stage1ProfileResponse>(
        "/stage1/profile",
        token,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      toast({
        title: "Profile Created!",
        description: `Your TRL is ${response.trl}. Profile ID: ${response.profile_id}`,
      });

      // Store profile_id for next stages
      localStorage.setItem("current_profile_id", response.profile_id.toString());
      localStorage.setItem("profile_data", JSON.stringify(response));

      // Redirect to discovery
      router.push("/discover");
    } catch (error: any) {
      console.error("Profile creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name *</FormLabel>
              <FormControl>
                <Input placeholder="BioTech Innovations Inc" {...field} />
              </FormControl>
              <FormDescription>
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
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>
                Your company website (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technology"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technology Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="AI-powered drug discovery platform using machine learning to identify novel therapeutic targets..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
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
              <FormLabel>Company Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional context about your company, mission, or market..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optional: Additional details about your company
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="team_info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Information</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Founders, key team members, advisors, expertise..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optional: Information about your team and their expertise
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Generating Profile..." : "Generate Company Profile"}
        </Button>
      </form>
    </Form>
  );
}
