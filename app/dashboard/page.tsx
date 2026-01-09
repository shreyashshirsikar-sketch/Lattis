'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Rocket, TrendingUp, CheckCircle, Edit } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load profile from localStorage or API
    const saved = localStorage.getItem('profileData');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7373D7] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'professional': return <User className="w-5 h-5" />;
      case 'startup': return <Rocket className="w-5 h-5" />;
      case 'investor': return <TrendingUp className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#7373D7] to-[#6363C7] w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <button
              onClick={() => router.push('/profile-setup')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-[#7373D7] to-[#6363C7] rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {profile?.name || 'User'}! 👋
              </h1>
              <p className="opacity-90">
                Your {profile?.role} profile is complete and ready to go
              </p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl">
              {getRoleIcon(profile?.role)}
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Profile Status</h3>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Basic Info</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Role Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Preferences</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Profile Views</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Connections</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Next Steps</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <p className="font-medium text-gray-900">Complete your profile</p>
                <p className="text-sm text-gray-500">Add more details (80% complete)</p>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <p className="font-medium text-gray-900">Explore feed</p>
                <p className="text-sm text-gray-500">See relevant content</p>
              </button>
            </div>
          </div>
        </div>

        {/* Role-specific Dashboard */}
        {profile?.role === 'professional' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Professional Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#7373D7] transition-colors text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Find Opportunities</h4>
                <p className="text-gray-600 text-sm">Browse startups looking for talent</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#7373D7] transition-colors text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Join Communities</h4>
                <p className="text-gray-600 text-sm">Connect with like-minded professionals</p>
              </button>
            </div>
          </div>
        )}

        {profile?.role === 'startup' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Startup Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#7373D7] transition-colors text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Find Talent</h4>
                <p className="text-gray-600 text-sm">Browse professionals</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#7373D7] transition-colors text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Connect with Investors</h4>
                <p className="text-gray-600 text-sm">Find funding opportunities</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#7373D7] transition-colors text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Get Feedback</h4>
                <p className="text-gray-600 text-sm">Share your product for reviews</p>
              </button>
            </div>
          </div>
        )}

        {profile?.role === 'investor' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Investor Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#7373D7] transition-colors text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Browse Startups</h4>
                <p className="text-gray-600 text-sm">Discover investment opportunities</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#7373D7] transition-colors text-left">
                <h4 className="font-semibold text-gray-900 mb-2">View Pitch Requests</h4>
                <p className="text-gray-600 text-sm">Review incoming pitches</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}