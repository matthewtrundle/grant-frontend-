"use client";

import { UserProfile } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/lib/hooks/use-profile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
  const { profile } = useProfile();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, profile, and security settings
        </p>
      </div>

      {/* Company Profile Summary */}
      {profile.companyName && (
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Company Name:</span>
              <span className="font-medium">{profile.companyName}</span>
            </div>
            {profile.trl && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Technology Readiness Level:</span>
                <Badge>{profile.trl}</Badge>
              </div>
            )}
            <div className="pt-4">
              <Link href="/profile">
                <Button variant="outline" className="w-full">
                  Edit Company Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clerk User Profile */}
      <UserProfile
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-none",
            navbar: "bg-white/[0.03] border-b border-white/10",
            navbarButton: "text-white hover:bg-white/5",
            navbarButtonActive: "text-purple-400 bg-white/5",
            pageScrollBox: "bg-transparent",
            profileSection: "border-white/10",
            profileSectionTitle: "text-white",
            profileSectionContent: "text-white/80",
            formFieldLabel: "text-white",
            formFieldInput: "bg-white/5 border-white/10 text-white",
            formButtonPrimary: "bg-gradient-to-r from-ocean-600 via-teal-600 to-ocean-700",
            headerTitle: "text-white",
            headerSubtitle: "text-white/60",
          },
        }}
      >
        <UserProfile.Page label="Company" url="company">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Company Information</h3>
            <p className="text-sm text-white/60">
              Your company profile is managed separately from your user account.
            </p>
            {profile.companyName ? (
              <div className="space-y-2">
                <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Company</span>
                    <span className="font-medium text-white">{profile.companyName}</span>
                  </div>
                  {profile.trl && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">TRL</span>
                      <Badge>{profile.trl}</Badge>
                    </div>
                  )}
                </div>
                <Link href="/profile">
                  <Button variant="outline" className="w-full">
                    Edit Company Profile
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10 text-center">
                <p className="text-sm text-white/60 mb-3">
                  You haven't created a company profile yet.
                </p>
                <Link href="/profile">
                  <Button className="bg-gradient-to-r from-ocean-600 via-teal-600 to-ocean-700">
                    Create Company Profile
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </UserProfile.Page>
      </UserProfile>
    </div>
  );
}
