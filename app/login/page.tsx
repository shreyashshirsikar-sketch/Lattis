'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Twitter,
  Linkedin,
  ChevronRight
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Login attempt:', { email, password, rememberMe });
      
      // Save basic user authentication flag
      localStorage.setItem('isAuthenticated', 'true');
      
      // Clear any previous incomplete setup data
      localStorage.removeItem('selectedRole');
      localStorage.removeItem('profileData');
      localStorage.removeItem('professionalPrefs');
      localStorage.removeItem('startupPrefs');
      
      // Set user data (simulated - replace with actual API response)
      const userData = {
        email,
        isAuthenticated: true,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setIsLoading(false);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const benefits = [
    "Professionals: Find projects, build portfolio",
    "Startups: Find talent, get feedback",
    "Investors: Discover startups, track progress",
    "Incubators: Support portfolio, connect mentors",
    "Update your profile and preferences",
    "Stay updated on platform progress"
  ];

  return (
    <>
      {/* Minimal Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 tracking-tight">Lattis</span>
            </Link>
            
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">New to Lattis?</span>
              <Link
                href="/signup"
                className="text-sm text-[#7373D7] font-medium px-3 py-1.5 rounded-lg"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="font-inter min-h-screen bg-white pt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            {/* Left Column - Content */}
            <div className="lg:pl-8">
              <div className="mb-12">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-8 group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  Back to home
                </Link>
                
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 bg-[#7373D7]/10 text-[#7373D7] px-3 py-1 rounded-full text-sm font-medium mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    Welcome Back
                  </div>
                  
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-snug">
                    Continue building<br />
                    <span className="bg-gradient-to-r from-[#7373D7] to-[#6363C7] bg-clip-text text-transparent">
                      your future
                    </span>
                  </h1>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Sign in to access your dashboard, discover opportunities, and connect with the right people.
                  </p>
                </div>
              </div>

              {/* Benefits List */}
              <div className="mb-12">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
                  What you can do on Lattis
                </h3>
                <div className="space-y-3.5">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-[#7373D7] flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Early Access Callout */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">LT</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Be part of building Lattis</h4>
                    <p className="text-sm text-gray-500">Join our early community and help shape the platform</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We're creating a platform to connect early-stage innovators. Have questions? hello@lattis.com
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign in to your account</h2>
                  <p className="text-gray-500 text-sm">Enter your credentials to continue</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none transition-all ${
                          isFocused.email 
                            ? 'border-[#7373D7] ring-1 ring-[#7373D7]/20' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-gray-500 hover:text-[#7373D7] transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                        className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none transition-all ${
                          isFocused.password 
                            ? 'border-[#7373D7] ring-1 ring-[#7373D7]/20' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {isPasswordVisible ? (
                          <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-[#7373D7] focus:ring-[#7373D7] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2.5 block text-sm text-gray-600">
                      Remember me for 30 days
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#7373D7] text-white rounded-lg hover:bg-[#6363C7] font-medium text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        // Handle Google login
                        localStorage.setItem('isAuthenticated', 'true');
                        localStorage.removeItem('selectedRole');
                        localStorage.removeItem('profileData');
                        localStorage.removeItem('professionalPrefs');
                        localStorage.removeItem('startupPrefs');
                        router.push('/dashboard');
                      }}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Continue with Google</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        // Handle LinkedIn login
                        localStorage.setItem('isAuthenticated', 'true');
                        localStorage.removeItem('selectedRole');
                        localStorage.removeItem('profileData');
                        localStorage.removeItem('professionalPrefs');
                        localStorage.removeItem('startupPrefs');
                        router.push('/dashboard');
                      }}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white"
                    >
                      <svg className="w-4 h-4" fill="#0077B5" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Continue with LinkedIn</span>
                    </button>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link 
                      href="/signup" 
                      className="font-medium text-gray-900 hover:text-[#7373D7] transition-colors"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 tracking-tight">Lattis</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link 
                href="/privacy" 
                className="hover:text-gray-700 transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-gray-700 transition-colors"
              >
                Terms
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-gray-700 transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="https://twitter.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link 
                href="https://linkedin.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Lattis. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}