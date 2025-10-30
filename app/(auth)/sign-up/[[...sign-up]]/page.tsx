import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      afterSignUpUrl="/onboarding"
      appearance={{
        elements: {
          card: "bg-white shadow-2xl",
          headerTitle: "text-gray-900",
          headerSubtitle: "text-gray-600",
          socialButtonsBlockButton: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
          formButtonPrimary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
          formFieldLabel: "text-gray-700",
          formFieldInput: "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500",
          footerActionLink: "text-purple-600 hover:text-purple-700",
        },
      }}
    />
  );
}
