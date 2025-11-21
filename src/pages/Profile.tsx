import { useState } from 'react';
import { LoggedInNav } from '../components/LoggedInNav';
import { Edit2, Save, X } from 'lucide-react';

export function Profile() {
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile || {});
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = () => {
    setFormData(profile || {});
    setIsEditing(false);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LoggedInNav />

      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          Profile updated successfully!
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
            >
              <Edit2 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Founder Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name || ''}
                    onChange={e => updateField('full_name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.full_name || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={e => updateField('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.email || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                {isEditing ? (
                  <select
                    value={formData.founder_role || ''}
                    onChange={e => updateField('founder_role', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select role</option>
                    <option value="Founder/CEO">Founder/CEO</option>
                    <option value="Co-Founder">Co-Founder</option>
                    <option value="Technical Lead">Technical Lead</option>
                    <option value="Product Lead">Product Lead</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile?.founder_role || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.founder_location || ''}
                    onChange={e => updateField('founder_location', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.founder_location || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Startup Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Startup Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.startup_name || ''}
                    onChange={e => updateField('startup_name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.startup_name || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                {isEditing ? (
                  <select
                    value={formData.startup_industry || ''}
                    onChange={e => updateField('startup_industry', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    <option value="SaaS">SaaS</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="FinTech">FinTech</option>
                    <option value="EdTech">EdTech</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="CleanTech">CleanTech</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile?.startup_industry || 'Not set'}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">One-line Pitch</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.startup_description || ''}
                    onChange={e => updateField('startup_description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.startup_description || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Model</label>
                {isEditing ? (
                  <select
                    value={formData.startup_business_model || ''}
                    onChange={e => updateField('startup_business_model', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select model</option>
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                    <option value="B2B2C">B2B2C</option>
                    <option value="Marketplace">Marketplace</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile?.startup_business_model || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Stage</label>
                {isEditing ? (
                  <select
                    value={formData.startup_stage || ''}
                    onChange={e => updateField('startup_stage', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select stage</option>
                    <option value="Idea">Idea</option>
                    <option value="MVP">MVP</option>
                    <option value="Early Revenue">Early Revenue</option>
                    <option value="Scaling">Scaling</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile?.startup_stage || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                {isEditing ? (
                  <select
                    value={formData.team_size || ''}
                    onChange={e => updateField('team_size', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select size</option>
                    <option value="Solo founder">Solo founder</option>
                    <option value="2-3 people">2-3 people</option>
                    <option value="4-10 people">4-10 people</option>
                    <option value="11-25 people">11-25 people</option>
                    <option value="26+ people">26+ people</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile?.team_size || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Goals & Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goals</label>
                {isEditing ? (
                  <p className="text-sm text-gray-500">Edit in onboarding</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile?.primary_goals && profile.primary_goals.length > 0 ? (
                      profile.primary_goals.map((goal, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                          {goal}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">Not set</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Funding Plans</label>
                {isEditing ? (
                  <select
                    value={formData.funding_plans || ''}
                    onChange={e => updateField('funding_plans', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select plan</option>
                    <option value="Bootstrap">Bootstrap</option>
                    <option value="Seeking grants">Seeking grants</option>
                    <option value="Seeking angel investment">Seeking angel investment</option>
                    <option value="Seeking VC">Seeking VC</option>
                    <option value="Already funded">Already funded</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile?.funding_plans || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Funding Amount Range</label>
                {isEditing ? (
                  <select
                    value={formData.funding_amount_range || ''}
                    onChange={e => updateField('funding_amount_range', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select range</option>
                    <option value="$0-50K">$0-50K</option>
                    <option value="$50-250K">$50-250K</option>
                    <option value="$250K-1M">$250K-1M</option>
                    <option value="$1M-5M">$1M-5M</option>
                    <option value="$5M+">$5M+</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile?.funding_amount_range || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Challenges</label>
                {isEditing ? (
                  <p className="text-sm text-gray-500">Edit in onboarding</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile?.challenges && profile.challenges.length > 0 ? (
                      profile.challenges.map((challenge, idx) => (
                        <span key={idx} className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">
                          {challenge}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">Not set</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
