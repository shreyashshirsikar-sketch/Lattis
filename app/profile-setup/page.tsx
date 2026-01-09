'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Rocket, TrendingUp, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function RoleSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const colorScheme = {
    primary: '#0F0F0F',
    secondary: '#4B5563',
    accent: '#6366F1',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    border: '#E5E7EB',
    success: '#10B981'
  };

  const roles = [
    {
      id: 'professional',
      title: 'Professional',
      subtitle: 'Individual Contributor',
      desc: 'Grow your skills, discover career opportunities, and collaborate with peers.',
      icon: User,
      features: ['Skill Development', 'Networking', 'Career Growth']
    },
    {
      id: 'startup',
      title: 'Startup',
      subtitle: 'Founder & Team',
      desc: 'Build your venture, hire top talent, connect with investors and mentors.',
      icon: Rocket,
      features: ['Fundraising', 'Talent Acquisition', 'Mentorship']
    },
    {
      id: 'investor',
      title: 'Investor',
      subtitle: 'Angel & VC',
      desc: 'Discover promising startups, mentor founders, and invest in innovative ideas.',
      icon: TrendingUp,
      features: ['Deal Flow', 'Portfolio Management', 'Due Diligence']
    }
  ];

  const handleContinue = () => {
    if (!selectedRole) return;
    setLoading(true);
    
    // Save role selection to localStorage
    localStorage.setItem('selectedRole', selectedRole);
    
    // Clear any existing profile data
    localStorage.removeItem('profileData');
    
    // Redirect to basic profile with role parameter
    setTimeout(() => {
      router.push(`/profile-setup/basic?role=${selectedRole}`);
    }, 500);
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colorScheme.background }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">L</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight" style={{ color: colorScheme.primary }}>
                      Welcome to Lattis
                    </h1>
                    <p className="text-lg" style={{ color: colorScheme.secondary }}>
                      Join the future of professional networking
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" style={{ color: colorScheme.accent }} />
                    </div>
                    <p className="text-sm" style={{ color: colorScheme.secondary }}>
                      Select your primary role to customize your experience
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-w-[180px]">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{ color: colorScheme.secondary }}>
                      Setup Progress
                    </span>
                    <span className="text-sm font-bold" style={{ color: colorScheme.accent }}>
                      0/3
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: '0%', backgroundColor: colorScheme.accent }}></div>
                  </div>
                  <p className="text-xs text-gray-500 pt-2">
                    Step 1 of 3: Role Selection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Role Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                       style={{ backgroundColor: `${colorScheme.accent}10` }}>
                    <User className="w-5 h-5" style={{ color: colorScheme.accent }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: colorScheme.primary }}>
                      Select Your Role
                    </h2>
                    <p className="text-gray-500">Choose how you'll use Lattis</p>
                  </div>
                </div>
              </div>

              {/* Role Cards Grid */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;

                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`
                        relative group p-5 border-2 rounded-xl text-left transition-all duration-300
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-sm transform scale-[1.02]' 
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
                        }
                      `}
                    >
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              isSelected ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg" style={{ color: colorScheme.primary }}>
                              {role.title}
                            </h3>
                            <p className="text-sm" style={{ color: colorScheme.secondary }}>
                              {role.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed" style={{ color: colorScheme.secondary }}>
                          {role.desc}
                        </p>

                        <div className="space-y-2 pt-3 border-t border-gray-100">
                          <p className="text-xs font-medium text-gray-400 uppercase">Features include:</p>
                          <div className="flex flex-wrap gap-2">
                            {role.features.map((feature, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium"
                                style={{ color: colorScheme.secondary }}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="pt-6 border-t border-gray-100">
                <button
                  onClick={handleContinue}
                  disabled={!selectedRole || loading}
                  className={`
                    w-full py-4 font-semibold rounded-xl transition-all duration-300 
                    flex items-center justify-center gap-3 group
                    ${!selectedRole ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  style={{ 
                    backgroundColor: selectedRole ? colorScheme.accent : '#E5E7EB',
                    color: 'white'
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Setting up your account...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue as {selectedRoleData?.title}</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-sm mt-4" style={{ color: colorScheme.secondary }}>
                  You can change this anytime in your account settings.
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-5 rounded-xl border" 
                 style={{ 
                   backgroundColor: `${colorScheme.accent}05`,
                   borderColor: `${colorScheme.accent}20`
                 }}>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded flex items-center justify-center" 
                     style={{ backgroundColor: colorScheme.accent }}>
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: colorScheme.primary }}>
                    Why choose a role?
                  </h4>
                  <p className="text-sm" style={{ color: colorScheme.secondary }}>
                    Your role determines the features, content, and community you'll see. 
                    We'll customize your experience based on your selection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2" style={{ color: colorScheme.primary }}>
                    Role Preview
                  </h3>
                  <p className="text-sm text-gray-500">What you'll get with this role</p>
                </div>

                {selectedRoleData ? (
                  <div className="space-y-6">
                    <div className="p-5 rounded-lg border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                          {(() => {
                            const Icon = selectedRoleData.icon;
                            return <Icon className="w-8 h-8" style={{ color: colorScheme.accent }} />;
                          })()}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg" style={{ color: colorScheme.primary }}>
                            {selectedRoleData.title}
                          </h4>
                          <p className="text-sm" style={{ color: colorScheme.secondary }}>
                            {selectedRoleData.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-sm font-medium" style={{ color: colorScheme.primary }}>
                          Key Benefits:
                        </h5>
                        <ul className="space-y-2">
                          {selectedRoleData.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorScheme.success }}></div>
                              <span className="text-sm" style={{ color: colorScheme.secondary }}>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-5 rounded-lg border border-gray-100">
                      <h5 className="text-sm font-medium mb-4" style={{ color: colorScheme.primary }}>
                        Community Overview
                      </h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold" style={{ color: colorScheme.primary }}>10K+</div>
                          <div className="text-xs text-gray-500">Active Members</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold" style={{ color: colorScheme.primary }}>500+</div>
                          <div className="text-xs text-gray-500">Monthly Connections</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm" style={{ color: colorScheme.secondary }}>
                      Select a role to see preview
                    </p>
                  </div>
                )}
              </div>

              <div className="p-5 rounded-xl border" 
                   style={{ 
                     backgroundColor: `${colorScheme.accent}05`,
                     borderColor: `${colorScheme.accent}20`
                   }}>
                <h4 className="font-semibold text-sm mb-3" style={{ color: colorScheme.primary }}>
                  Next Steps
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-white border border-gray-300 flex items-center justify-center">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: colorScheme.secondary }}>
                      Role Selection
                    </span>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="w-6 h-6 rounded-lg bg-white border border-gray-300 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-400">2</span>
                    </div>
                    <span className="text-sm" style={{ color: colorScheme.secondary }}>
                      Basic Profile
                    </span>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="w-6 h-6 rounded-lg bg-white border border-gray-300 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-400">3</span>
                    </div>
                    <span className="text-sm" style={{ color: colorScheme.secondary }}>
                      Role Setup
                    </span>
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