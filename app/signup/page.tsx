'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  User,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    // Validate terms agreement
    if (!formData.agreeTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }

    try {
      // Create user data object
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
        isProfileComplete: false
      };

      // Save to localStorage (temporary until backend is connected)
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Save basic user authentication flag
      localStorage.setItem('isAuthenticated', 'true');
      
      // Clear any previous incomplete setup data
      localStorage.removeItem('selectedRole');
      localStorage.removeItem('profileData');
      localStorage.removeItem('professionalPrefs');
      localStorage.removeItem('startupPrefs');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Signup successful, redirecting to profile setup');
      
      // Redirect to profile setup
      router.push('/profile-setup');
      
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const benefits = [
    "Professionals: Gain hands-on experience, build portfolio, connect with founders",
    "Startups: Find co-founders, validate ideas, connect with investors",
    "Investors: Access startup pipeline, evaluate teams, track progress",
    "Incubators: Discover startups, support portfolio, connect with mentors",
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
              <span className="text-sm text-gray-500">Have an account?</span>
              <Link
                href="/login"
                className="text-sm text-[#7373D7] font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                Log in
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
                    Start Your Journey
                  </div>
                  
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-snug">
                    Join the future of<br />
                    <span className="bg-gradient-to-r from-[#7373D7] to-[#6363C7] bg-clip-text text-transparent">
                      early-stage innovation
                    </span>
                  </h1>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
Create your Lattis account to connect with startups, professionals, investors, and incubators. Get access to real projects, funding opportunities, and the right people to build what's next.                  </p>
                </div>
              </div>

              {/* Benefits List */}
              <div className="mb-12">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
                  What you'll get
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

              {/* Fixed: Early Access Callout - REPLACED TESTIMONIAL */}
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
                  We're creating a platform to connect early-stage innovators. Have questions? hello@lattis.in
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create your account</h2>
                  <p className="text-gray-500 text-sm">Enter your details to get started</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(prev => ({ ...prev, name: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, name: false }))}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none transition-all ${
                          isFocused.name 
                            ? 'border-[#7373D7] ring-1 ring-[#7373D7]/20' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

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
                        value={formData.email}
                        onChange={handleChange}
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                        className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none transition-all ${
                          isFocused.password 
                            ? 'border-[#7373D7] ring-1 ring-[#7373D7]/20' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="Create a strong password"
                        minLength={6}
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
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 6 characters
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(prev => ({ ...prev, confirmPassword: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, confirmPassword: false }))}
                        className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none transition-all ${
                          isFocused.confirmPassword 
                            ? 'border-[#7373D7] ring-1 ring-[#7373D7]/20' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {isConfirmPasswordVisible ? (
                          <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start pt-1">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#7373D7] focus:ring-[#7373D7] border-gray-300 rounded mt-0.5"
                    />
                    <label htmlFor="agreeTerms" className="ml-2.5 block text-sm text-gray-600 leading-tight">
                      I agree to the{' '}
                      <Link href="/terms" className="text-[#7373D7] hover:text-[#6363C7] transition-colors">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-[#7373D7] hover:text-[#6363C7] transition-colors">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !formData.agreeTerms}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#7373D7] text-white rounded-lg hover:bg-[#6363C7] font-medium text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
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

                  {/* Social Signup */}
                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        // Handle Google signup
                        console.log('Google signup');
                        
                        // Save basic user authentication flag
                        localStorage.setItem('isAuthenticated', 'true');
                        
                        // Clear any previous incomplete setup data
                        localStorage.removeItem('selectedRole');
                        localStorage.removeItem('profileData');
                        localStorage.removeItem('professionalPrefs');
                        localStorage.removeItem('startupPrefs');
                        
                        // Save temporary user data
                        localStorage.setItem('userData', JSON.stringify({
                          email: 'google-user@example.com',
                          name: 'Google User',
                          isProfileComplete: false
                        }));
                        router.push('/profile-setup');
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
                        // Handle LinkedIn signup
                        console.log('LinkedIn signup');
                        
                        // Save basic user authentication flag
                        localStorage.setItem('isAuthenticated', 'true');
                        
                        // Clear any previous incomplete setup data
                        localStorage.removeItem('selectedRole');
                        localStorage.removeItem('profileData');
                        localStorage.removeItem('professionalPrefs');
                        localStorage.removeItem('startupPrefs');
                        
                        // Save temporary user data
                        localStorage.setItem('userData', JSON.stringify({
                          email: 'linkedin-user@example.com',
                          name: 'LinkedIn User',
                          isProfileComplete: false
                        }));
                        router.push('/profile-setup');
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

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link 
                      href="/login" 
                      className="font-medium text-[#7373D7] hover:text-[#6363C7] transition-colors"
                    >
                      Sign in
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
              <a 
                href="https://twitter.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
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