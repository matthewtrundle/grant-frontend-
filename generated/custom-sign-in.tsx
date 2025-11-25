```typescript
'use client';

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * Custom Sign-In Form Component
 * 
 * A fully-featured sign-in form with glassmorphic dark theme design,
 * email/password authentication, and comprehensive error handling.
 * Uses Clerk's headless authentication API for a seamless auth experience.
 * 
 * Features:
 * - Email and password validation
 * - Password visibility toggle
 * - Loading states and error handling
 * - Responsive glassmorphic design
 * - Accessibility compliant
 */
export default function CustomSignInForm() {
  const router = useRouter();
  const { signIn } = useSignIn();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle form submission
   * Validates inputs and attempts sign-in through Clerk API
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Create sign-in attempt using Clerk's headless API
      const result = await signIn?.create({
        identifier: email,
        password: password,
      });

      switch (result?.status) {
        case 'complete':
          // Sign-in successful, set active session and redirect
          await signIn?.setActive({ session: result.createdSessionId });
          router.push('/dashboard');
          break;
        
        case 'needs_first_factor':
          setError('Invalid email or password');
          break;
          
        case 'needs_second_factor':
          // Handle 2FA if enabled
          router.push('/sign-in/verify');
          break;
          
        default:
          setError('An unexpected error occurred. Please try again.');
      }
    } catch (err: any) {
      // Handle specific Clerk errors
      if (err.errors?.[0]?.code === 'form_identifier_not_found') {
        setError('No account found with this email address');
      } else if (err.errors?.[0]?.code === 'form_password_incorrect') {
        setError('Invalid password');
      } else if (err.errors?.[0]?.code === 'too_many_attempts') {
        setError('Too many attempts. Please try again later');
      } else if (err.errors?.[0]?.longMessage) {
        setError(err.errors[0].longMessage);
      } else {
        setError('Network error. Please check your connection and try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear error when user starts typing
   */
  const handleInputChange = () => {
    if (error) setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
      
      {/* Circuit Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          {/* Glassmorphic Card */}
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-white/60 text-sm">Sign in to your account to continue</p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Sign-In Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-white/80">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleInputChange();
                  }}
                  onFocus={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 hover:bg-white/8"
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white/80">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handleInputChange();
                    }}
                    onFocus={handleInputChange}
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 hover:bg-white/8"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing you in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                Don't have an account?{' '}
                <a
                  href="/sign-up"
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
                >
                  Sign up instead
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```