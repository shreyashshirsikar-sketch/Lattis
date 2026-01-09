'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Rocket, TrendingUp, 
  CheckCircle, Calendar, Bell, 
  Search, MessageSquare, Settings,
  Briefcase, Building2, Target,
  ArrowRight, LogOut
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const colorScheme = {
    primary: '#0F0F0F',
    secondary: '#4B5563',
    accent: '#6366F1',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    border: '#E5E7EB'
  };

  useEffect(() => {
    // Load profile data
    const savedProfile = localStorage.getItem('completeProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Redirect to setup if no profile
      router.push('/profile-setup');
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
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'startup':
        return <Rocket className="w-5 h-5 text-green-600" />;
      case 'investor':
        return <TrendingUp className="w-5 h-5 text-purple-600" />;
      default:
        return <User className="w-5 h-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
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
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                      <User className="w-8 h-8 text-blue-600" />
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
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                    {getRoleIcon(profile.type)}
                    <span className="text-sm font-medium capitalize">
                      {profile.type}
                    </span>
                  </div>
                </div>
                <p className="text-gray-500">@{profile.username} • {profile.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
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
                <p className="text-sm text-gray-500">Your profile is 100% complete</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Role</p>
                      <p className="font-medium capitalize">{profile.type}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-50">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Status</p>
                      <p className="font-medium">Active • Verified</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-50">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Member Since</p>
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
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Search className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium">Find Opportunities</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium">View Messages</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-medium">Edit Profile</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Center Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to Lattis!</h2>
                  <p className="opacity-90 mb-4">
                    Your profile is complete. Start exploring opportunities and connecting with the community.
                  </p>
                  <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
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
                <p className="text-sm text-gray-500">Connections</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-bold mb-1" style={{ color: colorScheme.primary }}>
                  0
                </div>
                <p className="text-sm text-gray-500">Messages</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-bold mb-1" style={{ color: colorScheme.primary }}>
                  0
                </div>
                <p className="text-sm text-gray-500">Opportunities</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-bold mb-1" style={{ color: colorScheme.primary }}>
                  100%
                </div>
                <p className="text-sm text-gray-500">Profile Complete</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold" style={{ color: colorScheme.primary }}>
                  Recent Activity
                </h2>
                <button className="text-sm text-blue-600 font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Profile Completed</p>
                      <p className="text-sm text-gray-600">Your profile setup is complete</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">Welcome to Lattis</p>
                      <p className="text-sm text-gray-600">Explore features and get started</p>
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