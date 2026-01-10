'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, Plus, Upload, Link, 
  Building2, Target, Calendar,
  Globe, Image as ImageIcon, Rocket,
  ArrowRight, AlertCircle, Users,
  TrendingUp, Briefcase,
  Loader2,
  ArrowLeft,
  Save
} from 'lucide-react';
import { useAutoSave } from '@/app/hooks/useAutoSave';

export default function StartupSetup() {
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
    success: '#10B981'
  };

  const [form, setForm] = useState({
    startupName: '',
    industry: '',
    stage: '',
    foundedYear: new Date().getFullYear().toString(),
    description: '',
    website: '',
    logo: null as File | null,
    banner: null as File | null,
    goals: [] as string[],
    teamSize: '',
    fundingStage: ''
  });

  const industries = [
    { id: 'tech', name: 'Technology' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'fintech', name: 'Fintech' },
    { id: 'edtech', name: 'Education (EdTech)' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'saas', name: 'SaaS' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'social', name: 'Social Media' },
    { id: 'clean', name: 'Clean Energy' },
    { id: 'biotech', name: 'Biotech' }
  ];

  const stages = [
    { id: 'idea', name: 'Idea', desc: 'Concept stage, pre-development' },
    { id: 'prototype', name: 'Prototype', desc: 'Initial product built' },
    { id: 'mvp', name: 'MVP', desc: 'Minimum viable product launched' },
    { id: 'early', name: 'Early Traction', desc: 'First customers/users' },
    { id: 'scaling', name: 'Scaling', desc: 'Growing user base/revenue' },
    { id: 'growth', name: 'Growth', desc: 'Rapid expansion phase' }
  ];

  const teamSizes = [
    '1 (Solo Founder)',
    '2-5',
    '6-10',
    '11-25',
    '26-50',
    '50+'
  ];

  const fundingStages = [
    'Bootstrapped',
    'Pre-seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C+'
  ];

  const goalsOptions = [
    { id: 'feedback', label: 'Get product feedback', desc: 'Validate your product with users' },
    { id: 'team', label: 'Find team members', desc: 'Hire co-founders or early employees' },
    { id: 'mentors', label: 'Connect with mentors', desc: 'Get guidance from experienced founders' },
    { id: 'funds', label: 'Raise funds', desc: 'Secure investment for growth' },
    { id: 'traction', label: 'Build early traction', desc: 'Acquire first customers' },
    { id: 'partners', label: 'Find partners', desc: 'Strategic partnerships and collaborations' }
  ];

  // Use auto-save hook
  const { isSaving, lastSaved, manualSave } = useAutoSave({
    data: form,
    storageKey: 'startupPrefs',
    delay: 1500,
    onSave: (savedData) => {
      console.log('Auto-saved startup preferences:', savedData);
    }
  });

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (!savedData) {
      router.push('/profile-setup');
      return;
    }
    
    const data = JSON.parse(savedData);
    setProfileData(data);
    
    // Load saved startup prefs if exists
    const startupPrefs = localStorage.getItem('startupPrefs');
    if (startupPrefs) {
      setForm(JSON.parse(startupPrefs));
    }
  }, [router]);

  const handleGoBack = () => {
    manualSave(); // Save before going back
    router.push('/profile-setup/basic');
  };

  const handleGoalToggle = (goal: string) => {
    setForm(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleFileUpload = (field: 'logo' | 'banner') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setForm(prev => ({ ...prev, [field]: file }));
      // Trigger manual save after file upload
      manualSave();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.startupName.trim()) {
      newErrors.startupName = 'Please enter your startup name';
    }

    if (!form.industry) {
      newErrors.industry = 'Please select an industry';
    }

    if (!form.stage) {
      newErrors.stage = 'Please select your startup stage';
    }

    if (!form.description.trim()) {
      newErrors.description = 'Please provide a description';
    } else if (form.description.length < 50) {
      newErrors.description = 'Description should be at least 50 characters';
    }

    if (form.website && !isValidUrl(form.website)) {
      newErrors.website = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
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
      type: 'startup',
      completed: true,
      completedAt: new Date().toISOString(),
      profileCompleted: true
    };

    // Save complete profile
    localStorage.setItem('completeProfile', JSON.stringify(completeData));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Clear setup data
    localStorage.removeItem('profileData');
    localStorage.removeItem('selectedRole');
    localStorage.removeItem('startupPrefs');
    
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
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight" style={{ color: colorScheme.primary }}>
                      Startup Profile Setup
                    </h1>
                    <p className="text-lg" style={{ color: colorScheme.secondary }}>
                      Tell us about your startup to connect with the ecosystem
                    </p>
                    
                    {/* Auto-save status indicator */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {isSaving ? (
                          <>
                            <div className="w-3 h-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs text-green-600">Saving...</span>
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
                      <span className="text-sm font-bold" style={{ color: colorScheme.success }}>
                        3/3
                      </span>
                    </div>
                    <div className="w-48 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: '100%',
                          backgroundColor: colorScheme.success 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 pt-2">
                      Step 3: Startup Details
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
                       style={{ backgroundColor: `${colorScheme.success}20` }}>
                    <Building2 className="w-5 h-5" style={{ color: colorScheme.success }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: colorScheme.primary }}>
                      Startup Information
                    </h2>
                    <p className="text-gray-500">Provide details about your venture</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Startup Name & Industry */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                      <Building2 className="w-4 h-4" />
                      Startup Name *
                    </label>
                    <input
                      type="text"
                      value={form.startupName}
                      onChange={(e) => setForm(prev => ({ ...prev, startupName: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                      style={{ color: colorScheme.primary }}
                      placeholder="Your startup name"
                    />
                    {errors.startupName && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.startupName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                      <Briefcase className="w-4 h-4" />
                      Industry *
                    </label>
                    <select
                      value={form.industry}
                      onChange={(e) => setForm(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                      style={{ color: colorScheme.primary }}
                    >
                      <option value="" className="text-gray-500">Select industry</option>
                      {industries.map(ind => (
                        <option key={ind.id} value={ind.id}>{ind.name}</option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.industry}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stage & Team Size */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                      <Target className="w-4 h-4" />
                      Current Stage *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {stages.map((stage) => {
                        const isSelected = form.stage === stage.id;
                        return (
                          <button
                            key={stage.id}
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, stage: stage.id }))}
                            className={`
                              p-3 border-2 rounded-lg transition-all duration-200 text-left
                              ${isSelected 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300'
                              }
                            `}
                          >
                            <div className="space-y-1">
                              <span className={`font-medium block ${isSelected ? 'text-green-600' : ''}`}
                                    style={isSelected ? {} : { color: colorScheme.primary }}>
                                {stage.name}
                              </span>
                              <span className="text-xs block" style={{ color: colorScheme.secondary }}>
                                {stage.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {errors.stage && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.stage}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium" style={{ color: colorScheme.secondary }}>
                          <Users className="w-4 h-4" />
                          Team Size
                        </label>
                        <select
                          value={form.teamSize}
                          onChange={(e) => setForm(prev => ({ ...prev, teamSize: e.target.value }))}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                          style={{ color: colorScheme.primary }}
                        >
                          <option value="" className="text-gray-500">Team size</option>
                          {teamSizes.map((size) => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium" style={{ color: colorScheme.secondary }}>
                          <Calendar className="w-4 h-4" />
                          Founded
                        </label>
                        <input
                          type="number"
                          value={form.foundedYear}
                          onChange={(e) => setForm(prev => ({ ...prev, foundedYear: e.target.value }))}
                          min="2000"
                          max={new Date().getFullYear()}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                          style={{ color: colorScheme.primary }}
                          placeholder="2024"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-medium" style={{ color: colorScheme.secondary }}>
                        <TrendingUp className="w-4 h-4" />
                        Funding Stage
                      </label>
                      <select
                        value={form.fundingStage}
                        onChange={(e) => setForm(prev => ({ ...prev, fundingStage: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                        style={{ color: colorScheme.primary }}
                      >
                        <option value="" className="text-gray-500">Select stage</option>
                        {fundingStages.map((stage) => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                    <Globe className="w-4 h-4" />
                    Product Description *
                    <span className="text-xs font-normal text-gray-400">
                      (Min. 50 characters)
                    </span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors resize-none"
                    style={{ color: colorScheme.primary }}
                    placeholder="Describe what problem you're solving and your solution..."
                    rows={4}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-sm" style={{ color: colorScheme.secondary }}>
                      {form.description.length}/500 characters
                    </p>
                    {errors.description && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Website & Media Uploads */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                      <Link className="w-4 h-4" />
                      Website / Demo Link
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Globe className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        value={form.website}
                        onChange={(e) => setForm(prev => ({ ...prev, website: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                        style={{ color: colorScheme.primary }}
                        placeholder="https://yourstartup.com"
                      />
                    </div>
                    {errors.website && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.website}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                      <ImageIcon className="w-4 h-4" />
                      Media Assets
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="block">
                        <div className={`
                          aspect-square border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
                          flex flex-col items-center justify-center p-4
                          ${form.logo 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                          }
                        `}>
                          {form.logo ? (
                            <div className="text-center">
                              <div className="text-green-600 font-medium text-sm mb-1">✓ Uploaded</div>
                              <p className="text-xs text-gray-500 truncate">{form.logo.name}</p>
                            </div>
                          ) : (
                            <>
                              <Upload className={`w-6 h-6 mb-2 ${form.logo ? 'text-green-500' : 'text-gray-400'}`} />
                              <p className="text-sm font-medium" style={{ color: colorScheme.secondary }}>Logo</p>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileUpload('logo')}
                        />
                      </label>

                      <label className="block">
                        <div className={`
                          aspect-square border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
                          flex flex-col items-center justify-center p-4
                          ${form.banner 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                          }
                        `}>
                          {form.banner ? (
                            <div className="text-center">
                              <div className="text-green-600 font-medium text-sm mb-1">✓ Uploaded</div>
                              <p className="text-xs text-gray-500 truncate">{form.banner.name}</p>
                            </div>
                          ) : (
                            <>
                              <Upload className={`w-6 h-6 mb-2 ${form.banner ? 'text-green-500' : 'text-gray-400'}`} />
                              <p className="text-sm font-medium" style={{ color: colorScheme.secondary }}>Banner</p>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileUpload('banner')}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Goals Section */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                    <Target className="w-4 h-4" />
                    Your Startup Goals
                    <span className="text-xs font-normal text-gray-400">
                      (Select all that apply)
                    </span>
                  </label>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {goalsOptions.map((goal) => {
                      const isSelected = form.goals.includes(goal.label);
                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => handleGoalToggle(goal.label)}
                          className={`
                            p-4 border-2 rounded-lg text-left transition-all duration-200
                            ${isSelected 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <span className="font-medium block" style={{ color: colorScheme.primary }}>
                                {goal.label}
                              </span>
                              <span className="text-xs block" style={{ color: colorScheme.secondary }}>
                                {goal.desc}
                              </span>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm" style={{ color: colorScheme.secondary }}>
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Your startup will be visible to investors and partners</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group min-w-[200px]"
                        style={{ 
                          backgroundColor: colorScheme.success,
                          color: 'white'
                        }}
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Launching your startup...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete Startup Profile</span>
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
                  <h3 className="text-lg font-bold" style={{ color: colorScheme.primary }}>
                    Startup Preview
                  </h3>
                  <p className="text-sm text-gray-500">How investors will see your startup</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border"
                       style={{ 
                         background: 'linear-gradient(to right, rgba(187, 247, 208, 0.5), rgba(167, 243, 208, 0.5))',
                         borderColor: 'rgba(134, 239, 172, 0.5)'
                       }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                           style={{ backgroundColor: `${colorScheme.success}20` }}>
                        {form.logo ? (
                          <div className="text-sm font-bold" style={{ color: colorScheme.success }}>LOGO</div>
                        ) : (
                          <Building2 className="w-6 h-6" style={{ color: colorScheme.success }} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg" style={{ color: colorScheme.primary }}>
                          {form.startupName || 'Your Startup'}
                        </h4>
                        <p className="text-sm" style={{ color: colorScheme.secondary }}>
                          {industries.find(i => i.id === form.industry)?.name || 'Industry'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Stage</p>
                      <p className="font-medium" style={{ color: colorScheme.primary }}>
                        {stages.find(s => s.id === form.stage)?.name || 'Not set'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Founded</p>
                      <p className="font-medium" style={{ color: colorScheme.primary }}>
                        {form.foundedYear || 'Not set'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Team Size</p>
                      <p className="font-medium" style={{ color: colorScheme.primary }}>
                        {form.teamSize || 'Not set'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Funding</p>
                      <p className="font-medium" style={{ color: colorScheme.primary }}>
                        {form.fundingStage || 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <p className="text-xs text-gray-400">Primary Goals</p>
                    </div>
                    <div className="space-y-2">
                      {form.goals.slice(0, 3).map((goal) => (
                        <div key={goal} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorScheme.success }}></div>
                          <span className="text-sm" style={{ color: colorScheme.primary }}>{goal}</span>
                        </div>
                      ))}
                      {form.goals.length > 3 && (
                        <div className="text-xs" style={{ color: colorScheme.secondary }}>
                          +{form.goals.length - 3} more goals
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border"
                   style={{ 
                     borderColor: `${colorScheme.success}30`,
                     backgroundColor: `${colorScheme.success}10`
                   }}>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded flex items-center justify-center"
                       style={{ backgroundColor: colorScheme.success }}>
                    <Rocket className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2" style={{ color: colorScheme.primary }}>
                      Why Complete Your Profile?
                    </h4>
                    <ul className="space-y-2 text-sm" style={{ color: colorScheme.secondary }}>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Visibility to investors and partners</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Access to startup resources</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Matching with relevant talent</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Featured in startup directory</span>
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