import { useUser } from "@clerk/nextjs";

export interface UserProfile {
  companyName?: string;
  profileId?: number;
  trl?: number;
  technologySummary?: string;
  onboardingComplete?: boolean;
}

export function useProfile() {
  const { user, isLoaded } = useUser();

  const profile: UserProfile = {
    companyName: user?.publicMetadata?.companyName as string | undefined,
    profileId: user?.publicMetadata?.profileId as number | undefined,
    trl: user?.publicMetadata?.trl as number | undefined,
    technologySummary: user?.publicMetadata?.technologySummary as string | undefined,
    onboardingComplete: user?.publicMetadata?.onboardingComplete as boolean | undefined,
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;

    await user.update({
      publicMetadata: {
        ...user.publicMetadata,
        ...data,
      },
    });
  };

  return {
    profile,
    updateProfile,
    isLoaded,
    user,
    hasProfile: Boolean(profile.profileId),
    hasCompletedOnboarding: Boolean(profile.onboardingComplete),
  };
}
