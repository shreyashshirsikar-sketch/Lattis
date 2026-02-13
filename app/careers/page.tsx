// app/careers/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Target,
  Zap,
  Building,
  Users,
  Heart,
  Coffee,
  Trophy,
  Globe,
  Code,
  Palette,
  Megaphone,
  BarChart,
  DollarSign,
  Shield,
  ArrowRight,
  MapPin,
  Clock,
  GraduationCap,
  Check,
  Menu,
  X,
  Twitter,
  Linkedin,
  ChevronRight,
  Briefcase,
  Lightbulb,
  TrendingUp,
  Handshake,
  UserPlus,
  Search,
  Mail
} from 'lucide-react';

export default function CareersPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const values = [
    {
      icon: Heart,
      title: "Build Together",
      description: "We believe meaningful products are built through collaboration. Every voice matters in shaping our platform."
    },
    {
      icon: Zap,
      title: "Ship & Iterate",
      description: "We value shipping fast, learning from real users, and continuously improving based on feedback."
    },
    {
      icon: Target,
      title: "Solve Real Problems",
      description: "We focus on solving actual pain points for students and startups, not just building features."
    },
    {
      icon: Globe,
      title: "Think Holistically",
      description: "We consider the entire ecosystem—from student aspirations to startup growth needs."
    }
  ];

  const benefits = [
    {
      icon: Trophy,
      title: "Meaningful Equity",
      description: "Own a piece of what you're building with competitive equity packages"
    },
    {
      icon: Coffee,
      title: "Flexible Work",
      description: "Remote-first with flexible hours that work for you"
    },
    {
      icon: Shield,
      title: "Learning Stipend",
      description: "$1,000 annual budget for courses, books, and conferences"
    },
    {
      icon: Users,
      title: "Direct Impact",
      description: "See your work directly impact thousands of early-stage collaborations"
    },
    {
      icon: DollarSign,
      title: "Home Office Setup",
      description: "$800 to create your ideal remote workspace"
    },
    {
      icon: GraduationCap,
      title: "Mentorship",
      description: "Work directly with experienced founders and mentors"
    }
  ];

  const openPositions = [
    {
      id: 1,
      title: "Frontend Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
      experience: "2+ years",
      description: "Build intuitive interfaces for our matching platform using Next.js, React, and TypeScript. You'll work on features that directly connect students with startup opportunities.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "UI/UX"]
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
      experience: "2+ years",
      description: "Design user-centered experiences for our platform. You'll work on everything from user profiles to matching algorithms, ensuring seamless collaboration.",
      skills: ["Figma", "User Research", "Prototyping", "UI/UX", "Design Systems"]
    },
    {
      id: 3,
      title: "Community Builder",
      department: "Growth",
      type: "Full-time",
      location: "Remote",
      experience: "1+ years",
      description: "Build and nurture our early community of students and startups. Organize virtual events, gather feedback, and create engagement strategies.",
      skills: ["Community Building", "Event Planning", "Content Creation", "Communication"]
    },
    {
      id: 4,
      title: "Full-Stack Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
      experience: "3+ years",
      description: "Build scalable backend services and APIs that power our matching platform. Work on everything from authentication to recommendation algorithms.",
      skills: ["Node.js", "TypeScript", "PostgreSQL", "API Design", "System Architecture"]
    }
  ];

  const interviewProcess = [
    {
      step: 1,
      title: "Initial Chat",
      duration: "30 minutes",
      description: "Meet a founder, discuss your background, and learn about Lattis"
    },
    {
      step: 2,
      title: "Work Sample",
      duration: "2-3 hours",
      description: "Complete a practical challenge or present your portfolio"
    },
    {
      step: 3,
      title: "Team Collaboration",
      duration: "60 minutes",
      description: "Work with team members on a collaborative problem"
    },
    {
      step: 4,
      title: "Founder Conversation",
      duration: "30 minutes",
      description: "Discuss vision alignment and growth opportunities"
    }
  ];

  const teamMembers = [
    {
      name: "Shreyash Shirsikar",
      role: "Product Vision & Strategy",
      focus: "Platform architecture and user experience"
    },
    {
      name: "Yugandhara Patil",
      role: "User Experience & Design",
      focus: "Interface design and user research"
    },
    {
      name: "Upasana Wagh",
      role: "Growth & Community",
      focus: "User acquisition and community building"
    },
    {
      name: "Atharv Bachhav",
      role: "Technology & Infrastructure",
      focus: "System architecture and technical execution"
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
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-sm text-gray-600 hover:text-[#7373D7] transition-colors cursor-pointer"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection('positions')}
                className="text-sm text-gray-600 hover:text-[#7373D7] transition-colors cursor-pointer"
              >
                Open Positions
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="text-sm text-gray-600 hover:text-[#7373D7] transition-colors cursor-pointer"
              >
                Hiring Process
              </button>
              <button
                onClick={() => scrollToSection('team')}
                className="text-sm text-gray-600 hover:text-[#7373D7] transition-colors cursor-pointer"
              >
                Our Team
              </button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="#apply"
                className="bg-gradient-to-r from-[#7373D7] to-[#6363C7] text-white text-sm px-5 py-2 rounded-lg hover:opacity-95 transition-opacity"
              >
                Apply Now
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
                <button
                  onClick={() => scrollToSection('benefits')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  Benefits
                </button>
                <button
                  onClick={() => scrollToSection('positions')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  Open Positions
                </button>
                <button
                  onClick={() => scrollToSection('process')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  Hiring Process
                </button>
                <button
                  onClick={() => scrollToSection('team')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  Our Team
                </button>
                <div className="pt-4 space-y-3 border-t border-gray-100">
                  <Link
                    href="#apply"
                    className="block py-2.5 text-center bg-[#7373D7] text-white rounded-lg"
                  >
                    Apply Now
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
              <Briefcase className="w-4 h-4" />
              Join Our Founding Team
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build the platform that connects
              <span className="block text-[#7373D7]">talent with opportunity</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              We're creating a platform where students gain real startup experience and early-stage companies find their perfect match. Join us in shaping the future of startup collaboration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('why-join')}
                className="px-8 py-3.5 bg-gradient-to-r from-[#7373D7] to-[#6363C7] text-white rounded-lg hover:opacity-95 font-medium text-base transition-opacity"
              >
                Why Join Lattis →
              </button>
              <button
                onClick={() => scrollToSection('positions')}
                className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-medium text-base flex items-center justify-center gap-3 transition-colors"
              >
                <Users className="w-4 h-4" />
                View Open Positions
              </button>
            </div>
          </div>
        </section>

        {/* Why Join Now */}
        <section id="why-join" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#7373D7]/5 to-[#6363C7]/5 rounded-2xl p-8 md:p-12 border border-[#7373D7]/20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Why Join Lattis Now?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  This is a unique opportunity to shape a product from the ground up.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <Target className="w-8 h-8 text-[#7373D7]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Founding Team Impact</h3>
                  <p className="text-gray-600 text-sm">
                    Work directly with all founders and shape company culture from day one. Your input will directly influence product direction.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <Zap className="w-8 h-8 text-[#7373D7]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Accelerated Growth</h3>
                  <p className="text-gray-600 text-sm">
                    Learn faster than anywhere else. You'll own meaningful features, work across the stack, and develop skills that typically take years.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <TrendingUp className="w-8 h-8 text-[#7373D7]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Real User Impact</h3>
                  <p className="text-gray-600 text-sm">
                    See your work directly help students launch careers and startups find talent. Every feature you build solves real problems for real people.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <div className="bg-gradient-to-r from-[#7373D7]/5 to-[#6363C7]/5 rounded-2xl p-8 border border-[#7373D7]/20">
              <p className="text-xl text-gray-700 italic mb-6">
                "To democratize access to startup opportunities for students and simplify talent acquisition for early-stage companies."
              </p>
              <p className="text-gray-600">
                We're building the infrastructure that makes meaningful connections between aspiring professionals and innovative startups. Every feature we build, every line of code we write, serves this mission.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="values" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide how we build, collaborate, and grow together.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#7373D7]/30 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Perks & Benefits
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We take care of our team so you can focus on building something meaningful.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#7373D7]/30 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="w-12 h-12 bg-[#7373D7]/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#7373D7]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="positions" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Open Positions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our founding team and help shape the future of startup collaboration.
              </p>
            </div>
            
            <div className="space-y-6">
              {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="bg-white rounded-xl p-8 border border-gray-100 hover:border-[#7373D7]/30 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                        <span className="px-3 py-1 bg-[#7373D7]/10 text-[#7373D7] rounded-full text-xs font-medium">
                          {position.department}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-6 text-sm">{position.description}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <GraduationCap className="w-4 h-4" />
                          {position.experience}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {position.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Link
                      href={`#apply`}
                      onClick={() => {
                        const applySection = document.getElementById('apply');
                        if (applySection) {
                          applySection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7373D7] to-[#6363C7] text-white px-6 py-3 rounded-lg hover:opacity-95 transition-opacity font-medium whitespace-nowrap"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                Don't see a perfect match? We're always looking for talented people passionate about our mission.
              </p>
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 text-[#7373D7] hover:text-[#6363C7] font-medium"
              >
                Send us your resume anyway
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Interview Process */}
        <section id="process" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Hiring Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Transparent, respectful, and designed to bring out the best in you.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {interviewProcess.map((step) => (
                <div
                  key={step.step}
                  className="relative text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-xl flex items-center justify-center text-white font-bold text-lg mb-6 mx-auto">
                    {step.step}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <div className="text-sm text-[#7373D7] font-medium mb-3">
                    {step.duration}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  
                  {step.step < 4 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-200 transform translate-x-4 -translate-y-6" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-white rounded-xl p-8 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Our Commitment to You</h4>
                  <p className="text-gray-600 text-sm">
                    We respect your time. The entire process takes 3-4 hours max, and we'll provide feedback at every stage. You'll hear back from us within 5 business days after each step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section id="team" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Meet Our Founding Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join a small, passionate team creating meaningful impact in the startup ecosystem.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#7373D7]/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white font-semibold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{member.name}</h3>
                  <div className="text-sm text-[#7373D7] font-medium text-center mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm text-center">{member.focus}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                You'll work directly with all founders, contributing to both strategy and execution.
              </p>
            </div>
          </div>
        </section>

        {/* Application Section */}
        <section id="apply" className="py-20 bg-gradient-to-r from-[#7373D7] to-[#6363C7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to build with us?
            </h2>
            <p className="text-white/90 mb-10 max-w-xl mx-auto text-lg">
              Join our founding team and help shape the future of startup collaboration.
            </p>
            
            <div className="bg-white rounded-2xl p-8 text-left mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6">How to Apply</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#7373D7]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#7373D7] font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Email Your Application</h4>
                    <p className="text-gray-600 text-sm">
                      Send your resume and any relevant portfolio/GitHub links to:
                    </p>
                    <div className="mt-2">
                      <a 
                        href="mailto:careers@lattis.com" 
                        className="inline-flex items-center gap-2 text-[#7373D7] font-medium hover:text-[#6363C7]"
                      >
                        <Mail className="w-4 h-4" />
                        careers@lattis.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#7373D7]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#7373D7] font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Include in Your Email</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-[#7373D7] mt-1">•</span>
                        <span>The position you're applying for</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#7373D7] mt-1">•</span>
                        <span>Why you're interested in Lattis specifically</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#7373D7] mt-1">•</span>
                        <span>What excites you about startup collaboration</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#7373D7]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#7373D7] font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Subject Line Format</h4>
                    <p className="text-gray-600 text-sm">
                      Use: <span className="font-mono bg-gray-100 px-2 py-1 rounded">[Position] Application - [Your Name]</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@lattis.com?subject=Career Inquiry&body=Hi Lattis Team,%0D%0A%0D%0AI'm interested in learning more about opportunities at Lattis. Please find my details below:%0D%0A%0D%0A- Position: [Position of Interest]%0D%0A- Name: [Your Name]%0D%0A- LinkedIn/Portfolio: [Link]%0D%0A%0D%0ABest regards,%0D%0A[Your Name]"
                className="bg-white text-[#7373D7] px-8 py-3.5 rounded-lg hover:bg-gray-50 font-semibold text-base transition-colors"
              >
                Email Your Application
              </a>
            </div>
            
            <div className="mt-8 text-white/80 text-sm">
              We're an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all team members.
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
                <h4 className="font-semibold text-gray-200 mb-6">Careers</h4>
                <ul className="space-y-3">
                  <li><button onClick={() => scrollToSection('benefits')} className="text-gray-400 hover:text-white text-sm transition-colors text-left">Benefits</button></li>
                  <li><button onClick={() => scrollToSection('positions')} className="text-gray-400 hover:text-white text-sm transition-colors text-left">Open Positions</button></li>
                  <li><button onClick={() => scrollToSection('process')} className="text-gray-400 hover:text-white text-sm transition-colors text-left">Hiring Process</button></li>
                  <li><button onClick={() => scrollToSection('team')} className="text-gray-400 hover:text-white text-sm transition-colors text-left">Our Team</button></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-200 mb-6">Company</h4>
                <ul className="space-y-3">
                  <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
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