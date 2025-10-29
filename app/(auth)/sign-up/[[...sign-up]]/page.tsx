import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center">
      <SignUp
        afterSignUpUrl="/onboarding"
        appearance={{
          elements: {
            card: "backdrop-blur-xl bg-white/[0.03] border border-white/10",
            headerTitle: "text-white",
            headerSubtitle: "text-white/60",
            socialButtonsBlockButton: "border-white/10 bg-white/5 text-white hover:bg-white/10",
            formButtonPrimary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
            formFieldLabel: "text-white",
            formFieldInput: "bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-purple-500",
            footerActionLink: "text-purple-400 hover:text-purple-300",
          },
        }}
      />
    </div>
  );
}
