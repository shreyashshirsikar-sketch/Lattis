'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Upload, Camera, MapPin, User, AtSign, FileText, Check, AlertCircle } from 'lucide-react';

export default function BasicProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || '';

  const [form, setForm] = useState({
    photo: '',
    name: '',
    username: '',
    location: '',
    bio: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoPreview, setPhotoPreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const colorScheme = {
    primary: '#0F0F0F',
    secondary: '#4B5563',
    accent: '#6366F1',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    border: '#E5E7EB'
  };

  // Load saved data if exists
  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    const savedRole = localStorage.getItem('selectedRole');
    
    if (savedData) {
      const data = JSON.parse(savedData);
      setForm(prev => ({ ...prev, ...data }));
      if (data.photo) setPhotoPreview(data.photo);
    }
    
    // Ensure role is set
    if (!role && savedRole) {
      router.replace(`/profile-setup/basic?role=${savedRole}`);
    }
  }, [role, router]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'File size must be less than 2MB' }));
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setForm(prev => ({ ...prev, photo: result }));
      setPhotoPreview(result);
      setUploading(false);
      setErrors(prev => ({ ...prev, photo: '' }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!form.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Save to localStorage
    const profileData = { ...form, role };
    localStorage.setItem('profileData', JSON.stringify(profileData));
    
    // Go to role-specific setup based on role
    if (role === 'investor') {
      router.push('/profile-setup/investor');
    } else if (role === 'professional') {
      router.push('/profile-setup/professional');
    } else if (role === 'startup') {
      router.push('/profile-setup/startup');
    } else {
      // Fallback to role selection
      router.push('/profile-setup');
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      validateForm();
    }
  }, [form]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colorScheme.background }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold" style={{ color: colorScheme.primary }}>
                      Profile Setup
                    </h1>
                    <p className="text-gray-500">Basic Information • Step 2/3</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: colorScheme.secondary }}>Progress</span>
                    <div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: '33%',
                          backgroundColor: colorScheme.accent 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold" style={{ color: colorScheme.primary }}>33%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left - Form Panel */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" 
                       style={{ backgroundColor: `${colorScheme.accent}10` }}>
                    <User className="w-6 h-6" style={{ color: colorScheme.accent }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: colorScheme.primary }}>
                      Personal Details
                    </h2>
                    <p className="text-gray-500">Complete all required fields</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Photo Section */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Camera className="w-5 h-5" style={{ color: colorScheme.secondary }} />
                        <h3 className="font-semibold" style={{ color: colorScheme.primary }}>
                          Profile Photo
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Add a professional profile photo</p>
                      
                      {errors.photo && (
                        <div className="flex items-center gap-2 text-red-500 text-sm mb-3">
                          <AlertCircle className="w-4 h-4" />
                          {errors.photo}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden">
                          {photoPreview ? (
                            <img 
                              src={photoPreview} 
                              alt="Profile" 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <User className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <label className="absolute -bottom-2 -right-2 bg-white border-2 border-gray-300 p-2 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-200">
                          <Camera className="w-4 h-4" style={{ color: colorScheme.primary }} />
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            disabled={uploading}
                          />
                        </label>
                      </div>

                      <div>
                        <label className="inline-flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                          <Upload className="w-4 h-4" style={{ color: colorScheme.secondary }} />
                          <span className="font-medium" style={{ color: colorScheme.primary }}>
                            {uploading ? 'Uploading...' : 'Upload'}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            disabled={uploading}
                          />
                        </label>
                        <p className="text-xs text-gray-400 mt-2">JPG, PNG • 2MB max</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-sm" 
                           style={{ color: colorScheme.secondary }}>
                      <User className="w-4 h-4" />
                      Full Name *
                    </label>
                    <div>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                        className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none transition-colors ${
                          errors.name 
                            ? 'border-red-300 focus:border-red-400' 
                            : 'border-gray-300 focus:border-gray-400'
                        }`}
                        placeholder="John Doe"
                        style={{ color: colorScheme.primary }}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-sm" 
                           style={{ color: colorScheme.secondary }}>
                      <AtSign className="w-4 h-4" />
                      Username *
                    </label>
                    <div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2" 
                              style={{ color: colorScheme.secondary }}>
                          @
                        </span>
                        <input
                          type="text"
                          value={form.username}
                          onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-lg focus:outline-none transition-colors ${
                            errors.username 
                              ? 'border-red-300 focus:border-red-400' 
                              : 'border-gray-300 focus:border-gray-400'
                          }`}
                          placeholder="johndoe"
                          style={{ color: colorScheme.primary }}
                        />
                      </div>
                      {errors.username && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.username}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-sm" 
                           style={{ color: colorScheme.secondary }}>
                      <MapPin className="w-4 h-4" />
                      Location *
                    </label>
                    <div>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                        className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none transition-colors ${
                          errors.location 
                            ? 'border-red-300 focus:border-red-400' 
                              : 'border-gray-300 focus:border-gray-400'
                        }`}
                        placeholder="New York, USA"
                        style={{ color: colorScheme.primary }}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Role Display Box */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-sm" 
                           style={{ color: colorScheme.secondary }}>
                      Role
                    </label>
                    <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg">
                      <span className="font-medium" style={{ color: colorScheme.primary }}>
                        {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Not Selected'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-semibold text-sm" 
                         style={{ color: colorScheme.secondary }}>
                    <FileText className="w-4 h-4" />
                    Bio <span className="font-normal text-gray-400">(Optional)</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={form.bio}
                      onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about yourself..."
                      rows={4}
                      maxLength={160}
                      style={{ color: colorScheme.primary }}
                    />
                    <div className="absolute bottom-3 right-3">
                      <span className={`text-sm font-medium ${
                        form.bio.length >= 150 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {form.bio.length}/160
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>All information is secure and encrypted</span>
                    </div>
                    
                    <button
                      type="submit"
                      className="px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                      style={{ 
                        backgroundColor: colorScheme.accent,
                        color: 'white'
                      }}
                    >
                      <span>Continue to {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Next'} Setup</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right - Preview Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6">
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2" style={{ color: colorScheme.primary }}>
                    Profile Preview
                  </h3>
                  <p className="text-sm text-gray-500">Live preview of your profile</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 mb-6 rounded-lg"
                     style={{ backgroundColor: `${colorScheme.accent}05` }}>
                  <div className="w-20 h-20 bg-gray-100 border-4 border-white rounded-lg overflow-hidden mb-4 shadow-sm">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <h4 className="font-bold text-lg mb-1" style={{ color: colorScheme.primary }}>
                    {form.name || 'Your Name'}
                  </h4>
                  <p className="text-gray-500 mb-3">@{form.username || 'username'}</p>
                  
                  <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
                    <span className="font-medium text-sm" style={{ color: colorScheme.accent }}>
                      {role ? role.toUpperCase() : 'ROLE'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded flex items-center justify-center" 
                           style={{ backgroundColor: `${colorScheme.accent}10` }}>
                        <MapPin className="w-4 h-4" style={{ color: colorScheme.accent }} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase">Location</p>
                        <p className="font-medium" style={{ color: colorScheme.primary }}>
                          {form.location || 'Not specified'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded flex items-center justify-center" 
                           style={{ backgroundColor: `${colorScheme.accent}10` }}>
                        <FileText className="w-4 h-4" style={{ color: colorScheme.accent }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-400 uppercase mb-2">About</p>
                        <p className="text-sm" style={{ color: colorScheme.primary }}>
                          {form.bio || 'No bio provided yet'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium" style={{ color: colorScheme.secondary }}>
                          Profile Completion
                        </span>
                        <span className="font-bold" style={{ color: colorScheme.accent }}>
                          {form.name && form.username && form.location ? '33%' : '0%'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full" 
                             style={{ 
                               width: form.name && form.username && form.location ? '33%' : '0%',
                               backgroundColor: colorScheme.accent 
                             }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${form.name && form.username && form.location ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm" style={{ color: colorScheme.secondary }}>
                          Basic Info
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span className="text-sm" style={{ color: colorScheme.secondary }}>
                          {role} Details
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span className="text-sm" style={{ color: colorScheme.secondary }}>
                          Preferences
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg border border-blue-100"
                   style={{ backgroundColor: `${colorScheme.accent}05` }}>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded flex items-center justify-center" 
                       style={{ backgroundColor: colorScheme.accent }}>
                    <AlertCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: colorScheme.primary }}>
                      Pro Tip
                    </h4>
                    <p className="text-sm" style={{ color: colorScheme.secondary }}>
                      Use a professional headshot and complete all fields for better visibility.
                    </p>
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