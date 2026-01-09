'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, Plus, Upload, Link, 
  Building2, Target, Calendar,
  Globe, Image as ImageIcon, Rocket,
  ArrowRight, AlertCircle, Users,
  TrendingUp, Briefcase
} from 'lucide-react';

export default function StartupSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Color variables following 60-30-10 rule
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

    // Combine data
    const savedData = JSON.parse(localStorage.getItem('profileData') || '{}');
    const completeData = {
      ...savedData,
      ...form,
      type: 'startup',
      completed: true,
      createdAt: new Date().toISOString()
    };

    console.log('Saving startup:', completeData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    localStorage.removeItem('profileData');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colorScheme.background }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                      Startup Profile Setup
                    </h1>
                    <p className="text-lg text-gray-600">
                      Tell us about your startup to connect with the ecosystem
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Setup Progress
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      3/3
                    </span>
                  </div>
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500 bg-green-600"
                      style={{ width: '100%' }}
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-50">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
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
                    <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                      <Building2 className="w-4 h-4" />
                      Startup Name *
                    </label>
                    <input
                      type="text"
                      value={form.startupName}
                      onChange={(e) => setForm(prev => ({ ...prev, startupName: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-gray-900"
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
                    <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                      <Briefcase className="w-4 h-4" />
                      Industry *
                    </label>
                    <select
                      value={form.industry}
                      onChange={(e) => setForm(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-gray-900"
                    >
                      <option value="" className="text-gray-500">Select industry</option>
                      {industries.map(ind => (
                        <option key={ind.id} value={ind.id} className="text-gray-900">{ind.name}</option>
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
                  {/* Stage */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
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
                              <span className={`font-medium block ${isSelected ? 'text-green-600' : 'text-gray-900'}`}>
                                {stage.name}
                              </span>
                              <span className="text-xs text-gray-500 block">
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

                  {/* Team Size & Founded Year */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Users className="w-4 h-4" />
                          Team Size
                        </label>
                        <select
                          value={form.teamSize}
                          onChange={(e) => setForm(prev => ({ ...prev, teamSize: e.target.value }))}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-gray-900"
                        >
                          <option value="" className="text-gray-500">Team size</option>
                          {teamSizes.map((size) => (
                            <option key={size} value={size} className="text-gray-900">{size}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Calendar className="w-4 h-4" />
                          Founded
                        </label>
                        <input
                          type="number"
                          value={form.foundedYear}
                          onChange={(e) => setForm(prev => ({ ...prev, foundedYear: e.target.value }))}
                          min="2000"
                          max={new Date().getFullYear()}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-gray-900"
                          placeholder="2024"
                        />
                      </div>
                    </div>

                    {/* Funding Stage */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <TrendingUp className="w-4 h-4" />
                        Funding Stage
                      </label>
                      <select
                        value={form.fundingStage}
                        onChange={(e) => setForm(prev => ({ ...prev, fundingStage: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-gray-900"
                      >
                        <option value="" className="text-gray-500">Select stage</option>
                        {fundingStages.map((stage) => (
                          <option key={stage} value={stage} className="text-gray-900">{stage}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                    <Globe className="w-4 h-4" />
                    Product Description *
                    <span className="text-xs font-normal text-gray-400">
                      (Min. 50 characters)
                    </span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors resize-none text-gray-900"
                    placeholder="Describe what problem you're solving and your solution..."
                    rows={4}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
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
                  {/* Website */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
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
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors text-gray-900"
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

                  {/* Media Uploads */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
                      <ImageIcon className="w-4 h-4" />
                      Media Assets
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Logo Upload */}
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
                              <p className="text-sm font-medium text-gray-600">Logo</p>
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

                      {/* Banner Upload */}
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
                              <p className="text-sm font-medium text-gray-600">Banner</p>
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
                  <label className="flex items-center gap-2 font-semibold text-sm text-gray-700">
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
                              <span className="font-medium text-gray-900 block">
                                {goal.label}
                              </span>
                              <span className="text-xs text-gray-500 block">
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
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Your startup will be visible to investors and partners</span>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group min-w-[200px] bg-green-600 text-white hover:bg-green-700"
                      style={{ opacity: loading ? 0.7 : 1 }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) {
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
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
              </form>
            </div>
          </div>

          {/* Right Column - Preview & Stats */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Startup Preview */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Startup Preview
                  </h3>
                  <p className="text-sm text-gray-500">How investors will see your startup</p>
                </div>

                <div className="space-y-4">
                  {/* Header */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        {form.logo ? (
                          <div className="text-sm font-bold text-green-700">LOGO</div>
                        ) : (
                          <Building2 className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          {form.startupName || 'Your Startup'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {industries.find(i => i.id === form.industry)?.name || 'Industry'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Stage</p>
                      <p className="font-medium text-gray-900">
                        {stages.find(s => s.id === form.stage)?.name || 'Not set'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Founded</p>
                      <p className="font-medium text-gray-900">
                        {form.foundedYear || 'Not set'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Team Size</p>
                      <p className="font-medium text-gray-900">
                        {form.teamSize || 'Not set'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Funding</p>
                      <p className="font-medium text-gray-900">
                        {form.fundingStage || 'Not set'}
                      </p>
                    </div>
                  </div>

                  {/* Goals Preview */}
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <p className="text-xs text-gray-400">Primary Goals</p>
                    </div>
                    <div className="space-y-2">
                      {form.goals.slice(0, 3).map((goal) => (
                        <div key={goal} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{goal}</span>
                        </div>
                      ))}
                      {form.goals.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{form.goals.length - 3} more goals
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Card */}
              <div className="p-5 rounded-xl border border-green-100 bg-green-50/50">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-green-600">
                    <Rocket className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">
                      Why Complete Your Profile?
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
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