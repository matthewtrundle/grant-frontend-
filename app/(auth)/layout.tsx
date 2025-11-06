export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden flex items-center justify-center">
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

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
