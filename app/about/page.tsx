// app/about/page.tsx
'use client';

import { 
  Sparkles, Target, Users, Heart, Globe, Shield, Zap, 
  Award, Building, Handshake, Rocket, Check, ArrowRight,
  ChevronRight, TrendingUp, Lightbulb, Briefcase,
  Twitter, Linkedin, Menu, X, Mail, MapPin, Github
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to specific section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Team members data
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Former Product Lead at Techstars, passionate about connecting talent with opportunity. Built products used by 1M+ users.",
      image: "/team/sarah-chen.jpg", // Placeholder path - you'll need to add actual images
      initials: "SC",
      gender: "female",
      social: {
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/sarahchen",
        email: "sarah@lattis.com"
      }
    },
    {
      name: "Michael Rodriguez",
      role: "Co-Founder & CTO",
      bio: "Ex-engineering lead at Stripe, YC alum. Building scalable platforms for early-stage collaboration and matching.",
      image: "/team/michael-rodriguez.jpg",
      initials: "MR",
      gender: "male",
      social: {
        linkedin: "https://linkedin.com/in/michaelrodriguez",
        twitter: "https://twitter.com/michaelrodriguez",
        email: "michael@lattis.com"
      }
    },
    {
      name: "Priya Patel",
      role: "Head of Community",
      bio: "Community builder with 8+ years in startup ecosystems. Previously built communities at WeWork and Techstars.",
      image: "/team/priya-patel.jpg",
      initials: "PP",
      gender: "female",
      social: {
        linkedin: "https://linkedin.com/in/priyapatel",
        twitter: "https://twitter.com/priyapatel",
        email: "priya@lattis.com"
      }
    },
    {
      name: "James Wilson",
      role: "Head of Product",
      bio: "Product designer and developer focused on user experience. Previously led product at early-stage startups.",
      image: "/team/james-wilson.jpg",
      initials: "JW",
      gender: "male",
      social: {
        linkedin: "https://linkedin.com/in/jameswilson",
        twitter: "https://twitter.com/jameswilson",
        email: "james@lattis.com"
      }
    }
  ];

  // Function to get gradient color based on gender
  const getGradientByGender = (gender: string) => {
    return gender === "female" 
      ? "from-purple-500 to-pink-500" 
      : "from-blue-500 to-cyan-500";
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header - EXACT copy from homepage */}
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
              
              {/* For Professionals link */}
              <button
                onClick={() => scrollToSection('for-students')}
                className="text-sm text-gray-600 hover:text-[#7373D7] transition-colors cursor-pointer"
              >
                For Professionals
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
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  How it works
                </button>
                
                <button
                  onClick={() => scrollToSection('for-students')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  For Professionals
                </button>
                
                <button
                  onClick={() => scrollToSection('for-startups')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#7373D7]"
                >
                  For Startups
                </button>
                
                <Link
                  href="/about"
                  className="block w-full text-left py-2 text-[#7373D7] font-medium"
                >
                  About
                </Link>
                
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

      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#7373D7]/10 text-[#7373D7] px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Where early ideas meet
            <span className="block text-[#7373D7]">the right people</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Lattis was born from a simple observation: brilliant ideas often struggle to find the right talent.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3.5 bg-gradient-to-r from-[#7373D7] to-[#6363C7] text-white rounded-lg hover:opacity-95 font-medium">
              Join Our Community
            </button>
            <button className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-medium flex items-center gap-2">
              Learn More
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white -mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#7373D7]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3,000+</div>
              <div className="text-gray-600 text-sm">Community Members</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-[#7373D7]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600 text-sm">Early-Stage Startups</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-8 h-8 text-[#7373D7]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2,000+</div>
              <div className="text-gray-600 text-sm">Successful Connections</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7373D7]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-[#7373D7]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">40+</div>
              <div className="text-gray-600 text-sm">Countries Represented</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#7373D7]/10 text-[#7373D7] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Democratizing startup opportunities</h2>
              <p className="text-gray-600 text-lg mb-6">
                We believe talent and great ideas are everywhere, but opportunities aren't distributed equally.
              </p>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#7373D7]/10 rounded-lg flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-[#7373D7]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Our Vision</h4>
                    <p className="text-gray-600">A world where anyone with talent can contribute to innovation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Lattis Exists</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>Startups waste months finding the right people</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>Talented people struggle to find projects</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>Networks are fragmented across platforms</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>Portfolios don't showcase collaboration skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Principles that guide everything we build</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#7373D7]/30">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community First</h3>
              <p className="text-gray-600">Great things happen when talented people come together.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#7373D7]/30">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600">No hidden fees, equal access for everyone.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#7373D7]/30">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600">Connecting talent across borders and time zones.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#7373D7]/30">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Action-Oriented</h3>
              <p className="text-gray-600">We're about doing, not just talking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - NEW */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#7373D7]/10 text-[#7373D7] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Our Team
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet the people behind Lattis
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're a diverse team of builders, designers, and community organizers passionate about democratizing access to startup opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 hover:border-[#7373D7]/30 transition-all duration-300 hover:shadow-xl overflow-hidden group"
              >
                {/* Profile Image/Placeholder */}
                <div className="relative h-64 overflow-hidden">
                  {/* Colored gradient background based on gender */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradientByGender(member.gender)} opacity-90 group-hover:scale-110 transition-transform duration-500`} />
                  
                  {/* Profile circle with initials */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                      <span className="text-4xl font-bold text-white">{member.initials}</span>
                    </div>
                  </div>
                  
                  {/* Decorative pattern */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#7373D7] font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {member.bio}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <Link href={member.social.linkedin} className="text-gray-400 hover:text-[#7373D7] transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </Link>
                    <Link href={member.social.twitter} className="text-gray-400 hover:text-[#7373D7] transition-colors">
                      <Twitter className="w-4 h-4" />
                    </Link>
                    <Link href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-[#7373D7] transition-colors">
                      <Mail className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From idea to growing community</p>
          </div>
          <div className="space-y-12">
            <div className="flex items-start gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-xl flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-[#7373D7]">2024</span>
                <h3 className="text-2xl font-semibold text-gray-900 my-2">The Beginning</h3>
                <p className="text-gray-600">Born from our own struggles finding the right people for projects.</p>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-xl flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-[#7373D7]">2024</span>
                <h3 className="text-2xl font-semibold text-gray-900 my-2">First Prototype</h3>
                <p className="text-gray-600">Tested with 50+ early adopters from startup communities.</p>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-[#7373D7]">2025</span>
                <h3 className="text-2xl font-semibold text-gray-900 my-2">Official Launch</h3>
                <p className="text-gray-600">Public launch with 1,000+ users across 30+ countries.</p>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#7373D7] to-[#6363C7] rounded-xl flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-[#7373D7]">Today</span>
                <h3 className="text-2xl font-semibold text-gray-900 my-2">Building Future</h3>
                <p className="text-gray-600">Expanding based on community feedback and growing network.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#7373D7] to-[#6363C7]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join?</h2>
          <p className="text-white/90 mb-10 text-lg">
            Whether building, joining, or investing—your journey starts here.
          </p>
          <button className="bg-white text-[#7373D7] px-8 py-3.5 rounded-lg hover:bg-gray-50 font-semibold flex items-center gap-2 mx-auto">
            Get Started Today
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer - EXACT copy from homepage */}
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
                <li><button onClick={() => scrollToSection('for-students')} className="text-gray-400 hover:text-white text-sm transition-colors text-left">For Professionals </button></li>
                <li><button onClick={() => scrollToSection('for-startups')} className="text-gray-400 hover:text-white text-sm transition-colors text-left">For Startups</button></li>
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
  );
}