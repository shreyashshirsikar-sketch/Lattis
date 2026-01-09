// app/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Users, 
  Briefcase, 
  TrendingUp, 
  UserPlus, 
  Search, 
  Handshake,
  Twitter,
  Linkedin,
  ArrowRight,
  Check,
  Menu,
  X,
  Target,
  Sparkles,
  Zap,
  Building,
  Lightbulb,
  GraduationCap
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to specific section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu on click
  };

  const opportunities = [
    {
      company: "Fintech Self",
      role: "Frontend Developer Intern",
      type: "Hiring",
      location: "London, UK",
      logo: "💳",
      description: "Join our team to build the next generation of financial dashboards using React and TypeScript. Ideal for students with some web development experience.",
      status: "Posted 2 days ago"
    },
    {
      company: "FeedStream",
      role: "Seed Round - $500k",
      type: "Funding",
      location: "Boston, MA",
      logo: "🔄",
      description: "AI-powered waste management platform seeking early investors. We've processed 1M+ transactions with 40% MoM growth.",
      status: "Closing in 2 weeks"
    },
    {
      company: "HealthTech Pro",
      role: "Technical Co-founder",
      type: "Co-founder",
      location: "San Francisco",
      logo: "❤️",
      description: "Seeking a CTO with ML/AI experience to join our healthcare startup. We have FDA approval and early clinical trial results.",
      status: "Active"
    }
  ];

  const steps = [
    { 
      number: 1, 
      title: "Build Your Profile", 
      description: "Tell us about your background, skills, and what you're looking for. Be specific about your goals.", 
      icon: UserPlus 
    },
    { 
      number: 2, 
      title: "Discover Opportunities", 
      description: "Use smart filters to find exactly what matches your criteria—whether it's talent, funding, or partnerships.", 
      icon: Search 
    },
    { 
      number: 3, 
      title: "Start Collaborating", 
      description: "Connect directly and begin working together. We provide tools to manage projects and track progress.", 
      icon: Handshake 
    }
  ];

  const roles = [
    {
      title: "Students & Aspiring Builders",
      icon: GraduationCap,
      description: "Learn by doing in real startup environments. Build your portfolio, find internships, and grow with early-stage teams.",
      points: ["Build real-world projects", "Find startup internships", "Connect directly with founders"]
    },
    {
      title: "Early-Stage Startups",
      icon: Building,
      description: "Validate your idea, find co-founders, get feedback, and connect with mentors and early-stage investors.",
      points: ["Validate your idea", "Find co-founders", "Get expert feedback"]
    },
    {
      title: "Investors & Angels",
      icon: Lightbulb,
      description: "Discover promising startups in their earliest phases. Evaluate founders, products, and make informed investment decisions.",
      points: ["Early-stage access", "Direct founder access", "Informed decisions"]
    }
  ];

  return (
    <>
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 text-lg">Lattis</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {/* How It Works link */}
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm text-gray-600 hover:text-[#7373D7] transition-colors cursor-pointer"
              >
                How it works
              </button>
              
              {/* For Students link */}
              <button
                onClick={() => scrollToSection('for-students')}
                className="text-sm text-gray-600 hover:text-[#7373D7] transition-colors cursor-pointer"
              >
                For Students
              </button>
              
              {/* For Investors link */}
              <button
                onClick={() => scrollToSection('for-investors')}
                className="text-sm text-gray-600 hover:text-[#7373D7] transition-colors cursor-pointer"
              >
                For Investors
              </button>
              
              {/* For Startups link */}
              <button
                onClick={() => scrollToSection('for-startups')}
                className="text-sm text-gray-600 hover:text-[#7373D7] transition-colors cursor-pointer"
              >
                For Startups
              </button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-[#7373D7] px-4 py-2 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-[#7373D7] to-[#6363C7] text-white text-sm px-5 py-2 rounded-lg hover:opacity-95 transition-opacity"
              >
                Get started
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="space-y-3">
                {/* How It Works link */}
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  How it works
                </button>
                
                {/* For Students link */}
                <button
                  onClick={() => scrollToSection('for-students')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  For Students
                </button>
                
                {/* For Investors link */}
                <button
                  onClick={() => scrollToSection('for-investors')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  For Investors
                </button>
                
                {/* For Startups link */}
                <button
                  onClick={() => scrollToSection('for-startups')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  For Startups
                </button>
                
                <div className="pt-4 space-y-3 border-t border-gray-100">
                  <Link
                    href="/login"
                    className="block py-2.5 text-center text-gray-600 border border-gray-200 rounded-lg"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="block py-2.5 text-center bg-[#7373D7] text-white rounded-lg"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="font-inter">
        {/* Hero Section */}
        <section className="pt-20 pb-32 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-[#7373D7]/10 text-[#7373D7] px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Your Gateway to the Startup World
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Where early ideas meet
              <span className="block text-[#7373D7]">the right people</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you're learning, building, or investing—Lattis connects you to the right people, opportunities, and tools from day one.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/signup"
                className="px-8 py-3.5 bg-gradient-to-r from-[#7373D7] to-[#6363C7] text-white rounded-lg hover:opacity-95 font-medium text-base transition-opacity"
              >
                Start exploring →
              </Link>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-medium text-base flex items-center justify-center gap-3 transition-colors"
              >
                <Play className="w-4 h-4" />
                See how it works
              </button>
            </div>
            
            <div className="inline-flex items-center gap-6 text-sm text-gray-500">
              <span>Join our early community</span>
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Students</span>
                <span className="text-gray-400">•</span>
                <span className="font-medium text-gray-700">Founders</span>
                <span className="text-gray-400">•</span>
                <span className="font-medium text-gray-700">Investors</span>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center md:text-left">
                <div className="w-12 h-12 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <Zap className="w-6 h-6 text-[#7373D7]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Real Startup Experience</h3>
                <p className="text-gray-600 text-sm">
                  Learn by doing in live startup environments. Get hands-on experience with early-stage products and teams.
                </p>
              </div>
              
              <div className="text-center md:text-left">
                <div className="w-12 h-12 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <Target className="w-6 h-6 text-[#7373D7]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Validate Before You Launch</h3>
                <p className="text-gray-600 text-sm">
                  Test your ideas with real feedback from the community. Make informed decisions before going to market.
                </p>
              </div>
              
              <div className="text-center md:text-left">
                <div className="w-12 h-12 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <Sparkles className="w-6 h-6 text-[#7373D7]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Direct Connections</h3>
                <p className="text-gray-600 text-sm">
                  Connect directly with founders, team members, and investors. No middlemen, just meaningful conversations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Built for every stage of innovation
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Different roles, shared mission. We've created specific tools for each part of the early-stage ecosystem.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {roles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#7373D7]/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-xl flex items-center justify-center mb-8">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{role.title}</h3>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{role.description}</p>
                    <ul className="space-y-3">
                      {role.points.map((point, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700">
                          <Check className="w-4 h-4 text-[#7373D7]" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
<section id="how-it-works" className="py-20 bg-white">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        How Lattis Works
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Simple process designed for action and meaningful connections.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-12">
      {steps.map((step) => {
        const Icon = step.icon;
        return (
          <div key={step.title} className="text-center">
            
            {/* Icon */}
            <div className="w-16 h-16 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Icon className="w-7 h-7 text-[#7373D7]" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>


        {/* For Students Section */}
        <section id="for-students" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Students: Launch Your Career in Startups
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Gain real-world experience, build your portfolio, and connect with early-stage startups.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#7373D7]/10 text-[#7373D7] px-3 py-1 rounded-full text-sm font-medium mb-6">
                    <GraduationCap className="w-4 h-4" />
                    For Students
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Start building your portfolio with real projects
                  </h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Work on real startup projects and build your portfolio</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Find internships and part-time roles in early-stage companies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Learn directly from founders and experienced team members</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Get mentorship and guidance for your career path</span>
                    </li>
                  </ul>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7373D7] to-[#6363C7] text-white px-6 py-3 rounded-lg hover:opacity-95 transition-opacity font-medium"
                  >
                    Explore Student Opportunities
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Internships</h4>
                        <p className="text-gray-600 text-sm">Part-time and full-time roles</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Project Work</h4>
                        <p className="text-gray-600 text-sm">Build real products and features</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Mentorship</h4>
                        <p className="text-gray-600 text-sm">Guidance from experienced founders</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Investors Section */}
        <section id="for-investors" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Investors: Discover Early-Stage Opportunities
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get access to vetted startups, evaluate teams, and make informed investment decisions.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-[#7373D7]/5 to-[#6363C7]/5 rounded-2xl p-8 border border-[#7373D7]/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#7373D7]/20 text-[#7373D7] px-3 py-1 rounded-full text-sm font-medium mb-6">
                    <TrendingUp className="w-4 h-4" />
                    For Investors
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Access curated startup pipeline
                  </h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Access pre-vetted startups in their earliest phases</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Evaluate founders and teams directly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Track progress and traction in real-time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Connect with other investors in your network</span>
                    </li>
                  </ul>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7373D7] to-[#6363C7] text-white px-6 py-3 rounded-lg hover:opacity-95 transition-opacity font-medium"
                  >
                    Explore Investment Opportunities
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Startup Pipeline</h4>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Pre-seed stage</span>
                        <span className="text-sm font-semibold">45+ startups</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Seed stage</h4>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Traction proven</span>
                        <span className="text-sm font-semibold">28+ startups</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Series A ready</h4>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Scaling phase</span>
                        <span className="text-sm font-semibold">12+ startups</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Average funding raised</span>
                        <span className="font-semibold text-gray-900">$1.2M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Startups Section */}
        <section id="for-startups" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Startups: Build Your Dream Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find talent, get feedback, connect with investors, and grow your early-stage company.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <UserPlus className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Recruit Talent</h4>
                        <p className="text-gray-600 text-sm">Find interns, co-founders, and early employees</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Get Feedback</h4>
                        <p className="text-gray-600 text-sm">Validate ideas with targeted user testing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Find Investors</h4>
                        <p className="text-gray-600 text-sm">Connect with angels and early-stage VCs</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 bg-[#7373D7]/10 text-[#7373D7] px-3 py-1 rounded-full text-sm font-medium mb-6">
                    <Building className="w-4 h-4" />
                    For Startups
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Everything you need to launch and grow
                  </h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Find technical and non-technical co-founders</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Recruit interns and early team members</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Validate product ideas with real users</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#7373D7] mt-1 flex-shrink-0" />
                      <span className="text-gray-600">Connect with investors and advisors</span>
                    </li>
                  </ul>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7373D7] to-[#6363C7] text-white px-6 py-3 rounded-lg hover:opacity-95 transition-opacity font-medium"
                  >
                    Start Building Your Startup
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Opportunities */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Current opportunities</h2>
                <p className="text-gray-600">Real projects, partnerships, and funding opportunities</p>
              </div>
              <Link 
                href="/opportunities" 
                className="mt-4 md:mt-0 text-[#7373D7] hover:text-[#6363C7] font-medium text-sm flex items-center gap-2 transition-colors"
              >
                Browse all opportunities
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#7373D7]/30 transition-all duration-300 hover:shadow-md flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#7373D7]/10 rounded-lg flex items-center justify-center text-xl">
                      👨‍💻
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">CampusConnect</h3>
                      <p className="text-gray-500 text-sm">Remote</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">UI/UX Design Intern</h4>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Help design a platform connecting students with campus events. Early-stage startup looking for students passionate about improving campus life. Portfolio projects welcome.
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    Part-time
                  </span>
                  <span className="text-xs text-gray-500">3-5 applicants</span>
                </div>
                
                <button className="w-full py-3 border border-gray-200 text-gray-700 rounded-lg hover:border-[#7373D7] hover:text-[#7373D7] font-medium text-sm transition-colors mt-auto">
                  Apply now
                </button>
              </div>

              <div
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#7373D7]/30 transition-all duration-300 hover:shadow-md flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#7373D7]/10 rounded-lg flex items-center justify-center text-xl">
                      🍃
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">EcoBuddy</h3>
                      <p className="text-gray-500 text-sm">Pre-seed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">Feedback & Testing</h4>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Testing sustainable shopping app with 200+ beta users. Looking for early feedback and user testing from environmentally-conscious students.
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    Pre-launch
                  </span>
                  <span className="text-xs text-gray-500">Open for testing</span>
                </div>
                
                <button className="w-full py-3 border border-gray-200 text-gray-700 rounded-lg hover:border-[#7373D7] hover:text-[#7373D7] font-medium text-sm transition-colors mt-auto">
                  Give feedback
                </button>
              </div>

              <div
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#7373D7]/30 transition-all duration-300 hover:shadow-md flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#7373D7]/10 rounded-lg flex items-center justify-center text-xl">
                      📚
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">StudyPool</h3>
                      <p className="text-gray-500 text-sm">Co-founder needed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">Technical Co-founder</h4>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Looking for a technical co-founder to build a peer-to-peer study platform. Currently has MVP with 50 active student users. Equity-based opportunity.
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                    Equity
                  </span>
                  <span className="text-xs text-gray-500">2 founders onboard</span>
                </div>
                
                <button className="w-full py-3 border border-gray-200 text-gray-700 rounded-lg hover:border-[#7373D7] hover:text-[#7373D7] font-medium text-sm transition-colors mt-auto">
                  Connect
                </button>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-[#7373D7]/5 to-[#6363C7]/5 rounded-xl p-6 border border-[#7373D7]/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[#7373D7]/30">
                    <Users className="w-6 h-6 text-[#7373D7]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Looking for early feedback?</h4>
                    <p className="text-gray-600 text-sm">
                      Share your startup idea with our community of students and get valuable insights
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#7373D7]/5 to-[#6363C7]/5 rounded-xl p-6 border border-[#7373D7]/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[#7373D7]/30">
                    <GraduationCap className="w-6 h-6 text-[#7373D7]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Want real startup experience?</h4>
                    <p className="text-gray-600 text-sm">
                      Join early-stage projects and build your portfolio while learning
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-[#7373D7] to-[#6363C7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Join a community built for startups—from the start
            </h2>
            <p className="text-white/90 mb-10 max-w-xl mx-auto text-lg">
              Where students learn, founders build, and investors discover—all in one place designed for early-stage innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-white text-[#7373D7] px-8 py-3.5 rounded-lg hover:bg-gray-50 font-semibold text-base transition-colors"
              >
                Sign up early
              </Link>
              <Link
                href="/demo"
                className="bg-transparent border-2 border-white/30 text-white px-8 py-3.5 rounded-lg hover:border-white/50 font-medium text-base transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-xl">Lattis</span>
                </div>
                <p className="text-gray-400 text-sm mb-8 max-w-md leading-relaxed">
                  Where early ideas meet the right people. Join us in building the future of startup collaboration.
                </p>
                <div className="flex items-center gap-4">
                  <Link href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-200 mb-6">Platform</h4>
                <ul className="space-y-3">
                  <li><button onClick={() => scrollToSection('how-it-works')} className="text-gray-400 hover:text-white text-sm transition-colors text-left">How it works</button></li>
                  <li><button onClick={() => scrollToSection('for-students')} className="text-gray-400 hover:text-white text-sm transition-colors text-left">For Students</button></li>
                  <li><button onClick={() => scrollToSection('for-startups')} className="text-gray-400 hover:text-white text-sm transition-colors text-left">For Startups</button></li>
                  <li><button onClick={() => scrollToSection('for-investors')} className="text-gray-400 hover:text-white text-sm transition-colors text-left">For Investors</button></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-200 mb-6">Company</h4>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</Link></li>
                  <li><Link href="/careers" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</Link></li>
                  <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm text-center">
                © {new Date().getFullYear()} Lattis. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}