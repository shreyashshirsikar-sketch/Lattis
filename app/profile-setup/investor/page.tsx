'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  Check, Globe, Eye, EyeOff, TrendingUp, 
  Building2, Target, MapPin, Filter, 
  Shield, Users, ArrowRight, AlertCircle,
  Briefcase,
  DollarSign,
  Loader2,
  Save
} from 'lucide-react';
import { useAutoSave } from '@/app/hooks/useAutoSave';

export default function InvestorSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileData, setProfileData] = useState<any>(null);
  
  const colorScheme = {
    primary: '#0F0F0F',
    secondary: '#4B5563',
    accent: '#6366F1',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B'
  };

  const [form, setForm] = useState({
    investorType: '',
    experience: '',
    industries: [] as string[],
    investmentRange: '',
    preferredStage: '',
    geography: '',
    allowPitches: true,
    showPublic: true,
    portfolioSize: '',
    typicalCheckSize: ''
  });

  // Use auto-save hook
  const { isSaving, lastSaved, manualSave } = useAutoSave({
    data: form,
    storageKey: 'investorPrefs',
    delay: 1500,
    onSave: (savedData) => {
      console.log('Auto-saved investor preferences:', savedData);
    }
  });

  const investorTypes = [
    {
      id: 'angel',
      title: 'Angel Investor',
      desc: 'Individual investor providing early-stage capital',
      icon: Users
    },
    {
      id: 'vc',
      title: 'Venture Capital',
      desc: 'Institutional investor managing fund capital',
      icon: Building2
    },
    {
      id: 'microvc',
      title: 'Micro-VC',
      desc: 'Small venture capital fund focusing on early-stage',
      icon: TrendingUp
    },
    {
      id: 'mentor',
      title: 'Mentor/Advisor',
      desc: 'Provide guidance and connections more than capital',
      icon: Briefcase
    },
    {
      id: 'corporate',
      title: 'Corporate Investor',
      desc: 'Strategic investments from established companies',
      icon: Building2
    }
  ];

  const industries = [
    { id: 'tech', name: 'Technology' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'fintech', name: 'Fintech' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'saas', name: 'SaaS' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'edtech', name: 'Edtech' },
    { id: 'energy', name: 'Clean Energy' },
    { id: 'biotech', name: 'Biotech' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'consumer', name: 'Consumer' },
    { id: 'industrial', name: 'Industrial Tech' }
  ];

  const investmentRanges = [
    'Under $10,000',
    '$10,000 - $50,000',
    '$50,000 - $250,000',
    '$250,000 - $1,000,000',
    '$1,000,000 - $5,000,000',
    '$5,000,000+'
  ];

  const stages = [
    'Pre-seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C+',
    'Growth'
  ];

  const experienceLevels = [
    '0-2 years',
    '3-5 years',
    '6-10 years',
    '10-15 years',
    '15+ years'
  ];

  // Load saved profile data and investor preferences
  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (!savedData) {
      router.push('/profile-setup');
      return;
    }
    
    const data = JSON.parse(savedData);
    setProfileData(data);
    
    // Load saved investor preferences if exists
    const investorPrefs = localStorage.getItem('investorPrefs');
    if (investorPrefs) {
      setForm(JSON.parse(investorPrefs));
    }
  }, [router]);

  const handleGoBack = () => {
    manualSave(); // Save before going back
    router.push('/profile-setup/basic');
  };

  const handleIndustryToggle = (industry: string) => {
    setForm(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.investorType) {
      newErrors.investorType = 'Please select an investor type';
    }

    if (!form.experience) {
      newErrors.experience = 'Please select experience level';
    }

    if (form.industries.length === 0) {
      newErrors.industries = 'Please select at least one industry';
    }

    if (!form.investmentRange) {
      newErrors.investmentRange = 'Please select investment range';
    }

    if (!form.preferredStage) {
      newErrors.preferredStage = 'Please select preferred stage';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Final manual save before submission
    manualSave();

    // Combine data
    const savedData = JSON.parse(localStorage.getItem('profileData') || '{}');
    const completeData = {
      ...savedData,
      ...form,
      type: 'investor',
      completed: true,
      completedAt: new Date().toISOString(),
      profileCompleted: true
    };

    // Save complete profile
    localStorage.setItem('completeProfile', JSON.stringify(completeData));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Clear setup data (optional, depends on your flow)
    localStorage.removeItem('profileData');
    localStorage.removeItem('selectedRole');
    localStorage.removeItem('investorPrefs');
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colorScheme.background }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section with Auto-Save Indicator */}
        <div className="mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight" style={{ color: colorScheme.primary }}>
                      Investor Profile Setup
                    </h1>
                    <p className="text-lg" style={{ color: colorScheme.secondary }}>
                      Complete your investor profile to access deals
                    </p>
                    
                    {/* Auto-save status indicator */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {isSaving ? (
                          <>
                            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs text-blue-600">Saving...</span>
                          </>
                        ) : lastSaved ? (
                          <>
                            <Save className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-gray-500">
                              Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400">Changes auto-save</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Indicator with Back Button */}
              <div className="flex flex-col items-end gap-4">
                <button
                  onClick={handleGoBack}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Basic Info
                </button>
                
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: colorScheme.secondary }}>
                        Setup Progress
                      </span>
                      <span className="text-sm font-bold" style={{ color: colorScheme.accent }}>
                        3/3
                      </span>
                    </div>
                    <div className="w-48 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: '100%',
                          backgroundColor: colorScheme.accent 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 pt-2">
                      Step 3: Investor Preferences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                       style={{ backgroundColor: `${colorScheme.accent}10` }}>
                    <Target className="w-5 h-5" style={{ color: colorScheme.accent }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: colorScheme.primary }}>
                      Investment Preferences
                    </h2>
                    <p className="text-gray-500">Define your investment criteria and strategy</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Investor Type Grid */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                    <Users className="w-4 h-4" />
                    Investor Type *
                  </label>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {investorTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = form.investorType === type.id;

                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, investorType: type.id }))}
                          className={`
                            relative p-4 border-2 rounded-lg text-left transition-all duration-200
                            ${isSelected 
                              ? 'border-blue-500 bg-blue-50 shadow-sm' 
                              : 'border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isSelected ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                <Icon className={`w-5 h-5 ${
                                  isSelected ? 'text-blue-600' : 'text-gray-600'
                                }`} />
                              </div>
                              <span className="font-medium text-gray-900">
                                {type.title}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              {type.desc}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2">
                              <Check className="w-4 h-4 text-blue-500" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.investorType && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.investorType}
                    </p>
                  )}
                </div>

                {/* Experience & Check Size */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                      <TrendingUp className="w-4 h-4" />
                      Years of Experience *
                    </label>
                    <select
                      value={form.experience}
                      onChange={(e) => setForm(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-gray-900"
                    >
                      <option value="" className="text-gray-500">Select experience level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level} className="text-gray-900">{level}</option>
                      ))}
                    </select>
                    {errors.experience && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                      <DollarSign className="w-4 h-4" />
                      Typical Check Size *
                    </label>
                    <select
                      value={form.investmentRange}
                      onChange={(e) => setForm(prev => ({ ...prev, investmentRange: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-gray-900"
                    >
                      <option value="" className="text-gray-500">Select check size</option>
                      {investmentRanges.map((range) => (
                        <option key={range} value={range} className="text-gray-900">{range}</option>
                      ))}
                    </select>
                    {errors.investmentRange && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.investmentRange}
                      </p>
                    )}
                  </div>
                </div>

                {/* Industries of Interest */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                    <Filter className="w-4 h-4" />
                    Industries of Interest *
                    <span className="text-xs font-normal text-gray-400">
                      (Select all that apply)
                    </span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {industries.map((industry) => {
                      const isSelected = form.industries.includes(industry.name);
                      return (
                        <button
                          key={industry.id}
                          type="button"
                          onClick={() => handleIndustryToggle(industry.name)}
                          className={`
                            p-3 border-2 rounded-lg flex items-center justify-between transition-all duration-200
                            ${isSelected 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <span className="text-sm font-medium text-gray-900">
                            {industry.name}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-blue-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Selected: <span className="font-bold">{form.industries.length}</span> industries
                    </p>
                    {errors.industries && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.industries}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stage & Geography */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                      <Target className="w-4 h-4" />
                      Preferred Stage *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {stages.map((stage) => (
                        <button
                          key={stage}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, preferredStage: stage }))}
                          className={`
                            p-3 border-2 rounded-lg text-center transition-all duration-200
                            ${form.preferredStage === stage 
                              ? 'border-blue-500 bg-blue-50 font-medium text-blue-600' 
                              : 'border-gray-200 hover:border-gray-300 text-gray-900'
                            }
                          `}
                        >
                          {stage}
                        </button>
                      ))}
                    </div>
                    {errors.preferredStage && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.preferredStage}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                      <MapPin className="w-4 h-4" />
                      Geography Focus
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Globe className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={form.geography}
                        onChange={(e) => setForm(prev => ({ ...prev, geography: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-gray-900"
                        placeholder="Global, North America, Europe, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Visibility Settings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">
                      Privacy & Visibility
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          Allow startup pitch requests
                        </p>
                        <p className="text-sm text-gray-600">
                          Startups can send you investment pitches directly
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, allowPitches: !prev.allowPitches }))}
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                          form.allowPitches ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`
                          absolute top-1 w-5 h-5 bg-white rounded-full transition-transform
                          ${form.allowPitches ? 'translate-x-8' : 'translate-x-1'}
                        `} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          Show profile publicly
                        </p>
                        <p className="text-sm text-gray-600">
                          Your investor profile will be visible to all users
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, showPublic: !prev.showPublic }))}
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                          form.showPublic ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`
                          absolute top-1 w-5 h-5 bg-white rounded-full transition-transform
                          ${form.showPublic ? 'translate-x-8' : 'translate-x-1'}
                        `} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Updated Form Actions with Back Button */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Your data is encrypted and secure</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group min-w-[200px] bg-blue-600 text-white hover:bg-blue-700"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Setting up your profile...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete Investor Profile</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Profile Preview
                  </h3>
                  <p className="text-sm text-gray-500">How investors will see your profile</p>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-sm text-blue-600">
                        {form.investorType ? 
                          investorTypes.find(t => t.id === form.investorType)?.title : 
                          'Investor Type'
                        }
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Check Size</p>
                      <p className="font-medium text-gray-900">
                        {form.investmentRange || 'Not set'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Experience</p>
                      <p className="font-medium text-gray-900">
                        {form.experience || 'Not set'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Stage Focus</p>
                      <p className="font-medium text-gray-900">
                        {form.preferredStage || 'Not set'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Industries</p>
                      <p className="font-medium text-gray-900">
                        {form.industries.length || 0}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-xs text-gray-400">Geography Focus</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {form.geography || 'Global'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/50">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-600">
                    <TrendingUp className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">
                      Why complete your profile?
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Access to curated deal flow</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Matching with relevant startups</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Investor networking events</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Portfolio management tools</span>
                      </li>
                    </ul>
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