```typescript
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

/**
 * Custom Sign-Up component for Next.js 14 with Clerk authentication
 * Implements a multi-step sign-up flow with email verification
 */
export default function CustomSignUpForm() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  
  // Form state
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Resend timer
  const [resendCountdown, setResendCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);
  
  // Refs
  const verificationInputRef = useRef<HTMLInputElement>(null);

  // Verification code input refs
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password strength calculation
  const getPasswordStrength = (password: string): { label: string; score: number; color: string } => {
    if (password.length === 0) return { label: "", score: 0, color: "transparent" };
    if (password.length < 8) return { label: "Too short", score: 1, color: "#ef4444" };
    if (password.length < 12) return { label: "Weak", score: 2, color: "#f97316" };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { label: "Fair", score: 3, color: "#eab308" };
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/g.test(password)) return { label: "Strong", score: 4, color: "#22c55e" };
    return { label: "Very Strong", score: 4, color: "#10b981" };
  };

  const passwordStrength = getPasswordStrength(password);

  // Form validation helpers
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const isFormValid = isValidEmail(email) && password.length >= 8 && passwordsMatch;

  // Resend countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // Auto-focus verification input when moving to step 2
  useEffect(() => {
    if (currentStep === 2 && verificationInputRef.current) {
      verificationInputRef.current.focus();
    }
  }, [currentStep]);

  // Handle code input navigation
  const handleCodeInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newCode = verificationCode.split('');
    newCode[index] = value;
    setVerificationCode(newCode.join(''));
    
    // Auto-focus next input
    if (value && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeInputKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  // Step 1: Submit email and password
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !isLoaded) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create sign-up attempt
      await signUp!.create({
        emailAddress: email,
        password: password,
      });

      // Prepare email verification
      await signUp!.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setCurrentStep(2);
    } catch (err: any) {
      console.error("Sign-up error:", err);
      setError(err.errors?.[0]?.longMessage || "An error occurred during sign-up");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify email code
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length !== 6 || !isLoaded) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await signUp!.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        // Set active session and redirect
        await setActive({ session: signUp!.createdSessionId });
        router.push("/onboarding");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.longMessage || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    if (!canResend || !isLoaded) return;

    setIsLoading(true);
    setError(null);

    try {
      await signUp!.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setResendCountdown(60);
      setCanResend(false);
    } catch (err: any) {
      console.error("Resend error:", err);
      setError(err.errors?.[0]?.longMessage || "Failed to resend verification code");
    } finally {
      setIsLoading(false);
    }
  };

  // Back to step 1
  const handleBackToStep1 = () => {
    setCurrentStep(1);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            linear-gradient(45deg, transparent 48%, rgba(147, 51, 234, 0.1) 49%, rgba(147, 51, 234, 0.1) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(59, 130, 246, 0.1) 49%, rgba(59, 130, 246, 0.1) 51%, transparent 52%)
          `,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 animate-pulse" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Step Indicator */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm">
              <span className="text-white/60">Step {currentStep} of 2</span>
            </div>
          </div>

          {/* Glassmorphic Card */}
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-2xl shadow-black/30 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">
                {currentStep === 1 ? "Create Account" : "Verify Email"}
              </h1>
              <p className="text-white/60 text-sm">
                {currentStep === 1 
                  ? "Join us to get started" 
                  : `We've sent a verification code to ${email}`}
              </p>
            </div>

            {/* Step 1: Email & Password */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleStep1Submit}
                  className="space-y-6"
                >
                  {/* Error Display */}
                  {error && (
                    <div 
                      className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm"
                      role="alert"
                      aria-live="polite"
                    >
                      {error}
                    </div>
                  )}

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-white/80 text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-white/80 text-sm font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all pr-12"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <span className="text-white/40 hover:text-white transition-colors">
                          {showPassword ? "🙈" : "👁️"}
                        </span>
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {password.length > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex-1 bg-white/10 rounded-full h-1">
                          <div
                            className="h-1 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${(passwordStrength.score / 4) * 100}%`,
                              backgroundColor: passwordStrength.color
                            }}
                          />
                        </div>
                        <span className="text-white/60">{passwordStrength.label}</span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Input */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-white/80 text-sm font-medium">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border ${
                        confirmPassword.length > 0 ? (passwordsMatch ? 'border-green-500/50' : 'border-red-500/50') : 'border-white/10'
                      } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all`}
                      placeholder="Confirm your password"
                      required
                    />
                    {confirmPassword.length > 0 && !passwordsMatch && (
                      <p className="text-red-400 text-xs">Passwords don't match</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      "Continue"
                    )}
                  </button>

                  {/* Sign In Link */}
                  <div className="text-center">
                    <Link
                      href="/sign-in"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      Already have an account? Sign in
                    </Link>
                  </div>
                </motion.form>
              )}

              {/* Step 2: Email Verification */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Error Display */}
                  {error && (
                    <div 
                      className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm"
                      role="alert"
                      aria-live="polite"
                    >
                      {error}
                    </div>
                  )}

                  {/* Verification Code Input */}
                  <div className="space-y-4">
                    <label className="block text-white/80 text-sm font-medium text-center">
                      Enter 6-digit verification code
                    </label>
                    
                    <div className="flex justify-center gap-3">
                      {Array.from({ length: 6 }, (_, index) => (
                        <input
                          key={index}
                          ref={(el) => (codeInputRefs.current[index] = el)}
                          type="text"
                          maxLength={1}
                          value={verificationCode[index] || ""}
                          onChange={(e) => handleCodeInputChange(index, e.target.value)}
                          onKeyDown={(e) => handleCodeInputKeyDown(index, e)}
                          className="w-12 h-12 text-center bg-white/5 border border-white/10 rounded-lg text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                          aria-label={`Verification code digit ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Verification Actions */}
                  <div className="space-y-4">
                    <button
                      type="submit"
                      onClick={handleStep2Submit}
                      disabled={verificationCode.length !== 6 || isLoading}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Verifying...
                        </div>
                      ) : (
                        "Verify Email"
                      )}
                    </button>

                    <div className="text-center space-y-2">
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={!canResend || isLoading}
                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {canResend ? (
                          "Resend code"
                        ) : (
                          `Resend in ${resendCountdown}s`
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleBackToStep1}
                        className="text-sm text-white/60 hover:text-white transition-colors block mx-auto"
                      >
                        ← Back to email entry
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
