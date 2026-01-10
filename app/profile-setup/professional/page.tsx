'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, Plus, X, Upload, Link, 
  Briefcase, GraduationCap, Target, 
  FileText, Globe, Award, ArrowRight,
  AlertCircle, UserCheck,
  Loader2,
  ArrowLeft,
  Save
} from 'lucide-react';
import { useAutoSave } from '@/app/hooks/useAutoSave';

export default function ProfessionalSetup() {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
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
    role: '',
    experience: '',
    currentCompany: '',
    education: '',
    portfolioLinks: [''],
    resume: null as File | null,
    goals: [] as string[],
    location: '',
    availability: ''
  });

  const goalsOptions = [
    { id: 'learn', label: 'Learn from startups', desc: 'Gain insights from startup culture' },
    { id: 'community', label: 'Join communities & events', desc: 'Network with professionals' },
    { id: 'work', label: 'Work with startups', desc: 'Find project-based opportunities' },
    { id: 'internship', label: 'Find internships or roles', desc: 'Discover career opportunities' },
    { id: 'portfolio', label: 'Build portfolio & experience', desc: 'Showcase your work' }
  ];

  const experienceLevels = [
    'Student',
    'Early-career (0-2 years)',
    'Professional (2-5 years)',
    'Senior (5+ years)',
    'Executive',
    'Founder'
  ];

  const availabilityOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Open to opportunities',
    'Not actively looking'
  ];

  // Combine form and skills for auto-save
  const professionalData = {
    form,
    skills
  };

  // Use auto-save hook
  const { isSaving, lastSaved, manualSave } = useAutoSave({
    data: professionalData,
    storageKey: 'professionalPrefs',
    delay: 1500,
    onSave: (savedData) => {
      console.log('Auto-saved professional preferences:', savedData);
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
    if (data.location) setForm(prev => ({ ...prev, location: data.location }));
    
    // Load saved professional prefs if exists
    const proPrefs = localStorage.getItem('professionalPrefs');
    if (proPrefs) {
      const prefs = JSON.parse(proPrefs);
      setForm(prefs.form);
      setSkills(prefs.skills || []);
    }
  }, [router]);

  const handleGoBack = () => {
    manualSave(); // Save before going back
    router.push('/profile-setup/basic');
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleGoalToggle = (goal: string) => {
    setForm(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setForm(prev => ({ ...prev, resume: file }));
    }
  };

  const addPortfolioLink = () => {
    setForm(prev => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, '']
    }));
  };

  const updatePortfolioLink = (index: number, value: string) => {
    const newLinks = [...form.portfolioLinks];
    newLinks[index] = value;
    setForm(prev => ({ ...prev, portfolioLinks: newLinks }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.role.trim()) {
      newErrors.role = 'Please enter your current role or area of study';
    }

    if (!form.experience) {
      newErrors.experience = 'Please select your experience level';
    }

    if (skills.length === 0) {
      newErrors.skills = 'Please add at least one skill';
    }

    if (form.portfolioLinks.some(link => link && !isValidUrl(link))) {
      newErrors.portfolioLinks = 'Please enter valid URLs';
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

    // Combine all data
    const savedData = JSON.parse(localStorage.getItem('profileData') || '{}');
    const completeData = {
      ...savedData,
      ...form,
      skills,
      type: 'professional',
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
    localStorage.removeItem('professionalPrefs');
    
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight" style={{ color: colorScheme.primary }}>
                      Professional Profile Setup
                    </h1>
                    <p className="text-lg" style={{ color: colorScheme.secondary }}>
                      Complete your professional profile to unlock opportunities
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
                      Step 3: Professional Details
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
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: colorScheme.primary }}>
                      Professional Information
                    </h2>
                    <p className="text-gray-500">Tell us about your career and goals</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Role & Experience */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                      <Briefcase className="w-4 h-4" />
                      Current Role / Area *
                    </label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                      style={{ color: colorScheme.primary }}
                      placeholder="Software Engineer, UX Designer, etc."
                    />
                    {errors.role && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.role}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                      <Award className="w-4 h-4" />
                      Experience Level *
                    </label>
                    <select
                      value={form.experience}
                      onChange={(e) => setForm(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                      style={{ color: colorScheme.primary }}
                    >
                      <option value="" className="text-gray-500">Select your level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    {errors.experience && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.experience}
                      </p>
                    )}
                  </div>
                </div>

                {/* Skills Section */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                    <Target className="w-4 h-4" />
                    Skills & Expertise *
                    <span className="text-xs font-normal text-gray-400">
                      (Add relevant skills)
                    </span>
                  </label>
                  
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                      style={{ color: colorScheme.primary }}
                      placeholder="Add skills (React, Design, Marketing, etc.)"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-100 rounded-lg transition-colors text-blue-600 font-medium"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-lg"
                      >
                        <span className="text-sm font-medium text-blue-700">{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {errors.skills && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.skills}
                    </p>
                  )}
                </div>

                {/* Goals Section */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                    <Target className="w-4 h-4" />
                    Your Goals on Lattis
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
                              ? 'border-blue-500 bg-blue-50' 
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
                              <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Portfolio & Resume */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                        <Globe className="w-4 h-4" />
                        Portfolio Links
                      </label>
                      <button
                        type="button"
                        onClick={addPortfolioLink}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        Add Link
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {form.portfolioLinks.map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Link className="w-4 h-4 text-gray-400" />
                          <input
                            type="url"
                            value={link}
                            onChange={(e) => updatePortfolioLink(index, e.target.value)}
                            className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                            style={{ color: colorScheme.primary }}
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                      ))}
                    </div>
                    {errors.portfolioLinks && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.portfolioLinks}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                      <FileText className="w-4 h-4" />
                      Resume (Optional)
                    </label>
                    
                    <label className="block">
                      <div className={`
                        flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
                        ${form.resume 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                        }
                      `}>
                        <Upload className={`w-8 h-8 mb-2 ${form.resume ? 'text-blue-500' : 'text-gray-400'}`} />
                        <div className="text-center">
                          <p className={`text-sm font-medium ${form.resume ? 'text-blue-600' : 'text-gray-600'}`}>
                            {form.resume ? form.resume.name : 'Click to upload resume'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX • Max 5MB</p>
                        </div>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-semibold text-sm" style={{ color: colorScheme.secondary }}>
                    <Briefcase className="w-4 h-4" />
                    Current Availability
                  </label>
                  <select
                    value={form.availability}
                    onChange={(e) => setForm(prev => ({ ...prev, availability: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors"
                    style={{ color: colorScheme.primary }}
                  >
                    <option value="" className="text-gray-500">Select availability</option>
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Form Actions */}
<div className="pt-6 border-t border-gray-100">
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-2 text-sm" style={{ color: colorScheme.secondary }}>
      <Check className="w-4 h-4 text-green-500" />
      <span>Your profile will be visible to relevant opportunities</span>
    </div>
    
    <div className="flex items-center gap-3">
      {/* REMOVED BACK BUTTON HERE */}
      
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group min-w-[200px]"
        style={{ 
          backgroundColor: colorScheme.accent,
          color: 'white'
        }}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Completing your profile...</span>
          </>
        ) : (
          <>
            <span>Complete Profile</span>
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
                    Profile Preview
                  </h3>
                  <p className="text-sm text-gray-500">How recruiters will see your profile</p>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-sm text-blue-600">
                        {form.role || 'Your Role'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Experience</p>
                      <p className="font-medium" style={{ color: colorScheme.primary }}>
                        {form.experience || 'Not set'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Skills</p>
                      <p className="font-medium" style={{ color: colorScheme.primary }}>
                        {skills.length || 0}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Goals</p>
                      <p className="font-medium" style={{ color: colorScheme.primary }}>
                        {form.goals.length || 0}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Availability</p>
                      <p className="font-medium" style={{ color: colorScheme.primary }}>
                        {form.availability || 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <p className="text-xs text-gray-400">Top Skills</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-white rounded text-xs font-medium" style={{ color: colorScheme.primary }}>
                          {skill}
                        </span>
                      ))}
                      {skills.length > 4 && (
                        <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-500">
                          +{skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/50">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-600">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: colorScheme.primary }}>
                      Benefits of Completing Your Profile
                    </h4>
                    <ul className="space-y-2 text-sm" style={{ color: colorScheme.secondary }}>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Access to exclusive job opportunities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Matching with relevant startups</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Professional networking events</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Skill development resources</span>
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