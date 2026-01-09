'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Rocket, TrendingUp, 
  CheckCircle, Calendar, Bell, 
  Search, MessageSquare, Settings,
  Briefcase, Building2, Target,
  ArrowRight, LogOut, Loader2
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const colorScheme = {
    primary: '#0F0F0F',       // 60% - Main text
    secondary: '#4B5563',     // 30% - Secondary text
    accent: '#6366F1',        // 10% - Accent color (Indigo)
    background: '#F9FAFB',    // Background
    surface: '#FFFFFF',       // Surface/Cards
    border: '#E5E7EB'         // Borders
  };

  useEffect(() => {
    // Load profile data
    const savedProfile = localStorage.getItem('completeProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Check if there's any incomplete setup
      const profileData = localStorage.getItem('profileData');
      const selectedRole = localStorage.getItem('selectedRole');
      
      if (profileData || selectedRole) {
        // Redirect to continue setup
        router.push('/profile-setup');
      } else {
        // No profile at all, redirect to role selection
        router.push('/profile-setup');
      }
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    // Clear all localStorage
    localStorage.clear();
    router.push('/');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'professional':
        return <Briefcase className="w-5 h-5" style={{ color: colorScheme.accent }} />;
      case 'startup':
        return <Rocket className="w-5 h-5" style={{ color: colorScheme.accent }} />;
      case 'investor':
        return <TrendingUp className="w-5 h-5" style={{ color: colorScheme.accent }} />;
      default:
        return <User className="w-5 h-5" style={{ color: colorScheme.accent }} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colorScheme.background }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: colorScheme.accent }} />
          <p style={{ color: colorScheme.secondary }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colorScheme.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-100 border-4 border-white rounded-full overflow-hidden shadow-sm">
                  {profile.photo ? (
                    <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `${colorScheme.accent}20` }}>
                      <User className="w-8 h-8" style={{ color: colorScheme.accent }} />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold" style={{ color: colorScheme.primary }}>
                    Welcome back, {profile.name?.split(' ')[0]}!
                  </h1>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: `${colorScheme.accent}10` }}>
                    {getRoleIcon(profile.type)}
                    <span className="text-sm font-medium capitalize" style={{ color: colorScheme.accent }}>
                      {profile.type}
                    </span>
                  </div>
                </div>
                <p style={{ color: colorScheme.secondary }}>@{profile.username} • {profile.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" style={{ color: colorScheme.secondary }} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" style={{ color: colorScheme.secondary }} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2" style={{ color: colorScheme.primary }}>
                  Profile Overview
                </h2>
                <p style={{ color: colorScheme.secondary }}>Your profile is 100% complete</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colorScheme.accent}20` }}>
                      <User className="w-5 h-5" style={{ color: colorScheme.accent }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase" style={{ color: colorScheme.secondary }}>Role</p>
                      <p className="font-medium capitalize">{profile.type}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colorScheme.accent}20` }}>
                      <Target className="w-5 h-5" style={{ color: colorScheme.accent }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase" style={{ color: colorScheme.secondary }}>Status</p>
                      <p className="font-medium">Active • Verified</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colorScheme.accent}20` }}>
                      <Calendar className="w-5 h-5" style={{ color: colorScheme.accent }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase" style={{ color: colorScheme.secondary }}>Member Since</p>
                      <p className="font-medium">
                        {new Date(profile.completedAt || Date.now()).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4" style={{ color: colorScheme.primary }}>
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colorScheme.accent}20` }}>
                      <Search className="w-4 h-4" style={{ color: colorScheme.accent }} />
                    </div>
                    <span className="font-medium" style={{ color: colorScheme.primary }}>Find Opportunities</span>
                  </div>
                  <ArrowRight className="w-4 h-4" style={{ color: colorScheme.secondary }} />
                </button>

                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colorScheme.accent}20` }}>
                      <MessageSquare className="w-4 h-4" style={{ color: colorScheme.accent }} />
                    </div>
                    <span className="font-medium" style={{ color: colorScheme.primary }}>View Messages</span>
                  </div>
                  <ArrowRight className="w-4 h-4" style={{ color: colorScheme.secondary }} />
                </button>

                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colorScheme.accent}20` }}>
                      <Building2 className="w-4 h-4" style={{ color: colorScheme.accent }} />
                    </div>
                    <span className="font-medium" style={{ color: colorScheme.primary }}>Edit Profile</span>
                  </div>
                  <ArrowRight className="w-4 h-4" style={{ color: colorScheme.secondary }} />
                </button>
              </div>
            </div>
          </div>

          {/* Center Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Banner */}
            <div className="rounded-xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${colorScheme.accent}, #818cf8)` }}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to Lattis!</h2>
                  <p className="opacity-90 mb-4">
                    Your profile is complete. Start exploring opportunities and connecting with the community.
                  </p>
                  <button className="px-6 py-2 bg-white font-semibold rounded-lg hover:bg-gray-100 transition-colors" style={{ color: colorScheme.accent }}>
                    Get Started
                  </button>
                </div>
                <div className="w-24 h-24 opacity-20">
                  {profile.type === 'professional' && <Briefcase className="w-full h-full" />}
                  {profile.type === 'startup' && <Rocket className="w-full h-full" />}
                  {profile.type === 'investor' && <TrendingUp className="w-full h-full" />}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-bold mb-1" style={{ color: colorScheme.primary }}>
                  0
                </div>
                <p style={{ color: colorScheme.secondary }}>Connections</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-bold mb-1" style={{ color: colorScheme.primary }}>
                  0
                </div>
                <p style={{ color: colorScheme.secondary }}>Messages</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-bold mb-1" style={{ color: colorScheme.primary }}>
                  0
                </div>
                <p style={{ color: colorScheme.secondary }}>Opportunities</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-bold mb-1" style={{ color: colorScheme.primary }}>
                  100%
                </div>
                <p style={{ color: colorScheme.secondary }}>Profile Complete</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold" style={{ color: colorScheme.primary }}>
                  Recent Activity
                </h2>
                <button className="text-sm font-medium" style={{ color: colorScheme.accent }}>View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${colorScheme.accent}10`, borderColor: `${colorScheme.accent}20` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center" style={{ borderColor: `${colorScheme.accent}30` }}>
                      <CheckCircle className="w-5 h-5" style={{ color: colorScheme.accent }} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: colorScheme.primary }}>Profile Completed</p>
                      <p style={{ color: colorScheme.secondary }}>Your profile setup is complete</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                      <Bell className="w-5 h-5" style={{ color: colorScheme.secondary }} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: colorScheme.primary }}>Welcome to Lattis</p>
                      <p style={{ color: colorScheme.secondary }}>Explore features and get started</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}