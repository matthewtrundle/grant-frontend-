import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background layers - matching onboarding style */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,60,255,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(60,120,255,0.05),transparent_50%)]" />

        {/* Circuit pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="auth-circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <line x1="0" y1="30" x2="120" y2="30" stroke="#8B5CF6" strokeWidth="0.5" />
              <line x1="0" y1="60" x2="120" y2="60" stroke="#6366F1" strokeWidth="0.5" />
              <line x1="0" y1="90" x2="120" y2="90" stroke="#8B5CF6" strokeWidth="0.5" />
              <line x1="30" y1="0" x2="30" y2="120" stroke="#8B5CF6" strokeWidth="0.5" />
              <line x1="60" y1="0" x2="60" y2="120" stroke="#6366F1" strokeWidth="0.5" />
              <line x1="90" y1="0" x2="90" y2="120" stroke="#8B5CF6" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="2" fill="#8B5CF6" opacity="0.5" />
              <circle cx="60" cy="60" r="2" fill="#6366F1" opacity="0.5" />
              <circle cx="90" cy="90" r="2" fill="#8B5CF6" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#auth-circuit)" />
        </svg>
      </div>

      {/* Clerk Sign-Up Component with custom styling */}
      <div className="relative z-10">
        <SignUp
          afterSignUpUrl="/onboarding"
          appearance={{
            elements: {
              // Main card - glassmorphic style
              rootBox: "mx-auto",
              card: "backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-2xl",

              // Header
              headerTitle: "text-white font-bold text-2xl",
              headerSubtitle: "text-white/60",

              // Form elements
              formButtonPrimary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all",
              formFieldLabel: "text-white/90 font-medium",
              formFieldInput: "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all",

              // Footer links
              footerActionLink: "text-purple-400 hover:text-purple-300 font-medium",
              footerActionText: "text-white/60",

              // Divider
              dividerLine: "bg-white/10",
              dividerText: "text-white/40",

              // Social buttons (if re-enabled later)
              socialButtonsBlockButton: "border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all",
              socialButtonsBlockButtonText: "text-white font-medium",

              // Other elements
              formFieldInputShowPasswordButton: "text-white/60 hover:text-white",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-purple-400 hover:text-purple-300",
            },
          }}
        />
      </div>
    </div>
  );
}
