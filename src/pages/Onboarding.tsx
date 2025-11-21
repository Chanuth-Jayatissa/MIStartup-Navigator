import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface OnboardingData {
  full_name: string;
  email: string;
  founder_role: string;
  founder_location: string;
  startup_name: string;
  startup_description: string;
  startup_industry: string;
  startup_business_model: string;
  startup_stage: string;
  team_size: string;
  revenue_status: string;
  product_readiness: string;
  primary_goals: string[];
  funding_plans: string;
  funding_amount_range: string;
  challenges: string[];
}

const initialData: OnboardingData = {
  full_name: '',
  email: '',
  founder_role: '',
  founder_location: '',
  startup_name: '',
  startup_description: '',
  startup_industry: '',
  startup_business_model: '',
  startup_stage: '',
  team_size: '',
  revenue_status: '',
  product_readiness: '',
  primary_goals: [],
  funding_plans: '',
  funding_amount_range: '',
  challenges: []
};

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 6;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'primary_goals' | 'challenges', value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return data.full_name && data.email && data.founder_role && data.founder_location;
      case 2:
        return data.startup_name && data.startup_description && data.startup_industry && data.startup_business_model;
      case 3:
        return data.startup_stage && data.team_size && data.revenue_status && data.product_readiness;
      case 4:
        return data.primary_goals.length > 0 && data.funding_plans;
      case 5:
        return data.challenges.length > 0;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep() && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    localStorage.setItem('userProfile', JSON.stringify({
      ...data,
      onboarding_completed: true
    }));

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map(s => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`h-2 w-full rounded-full transition-all ${
                    s <= step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
              <p className="text-gray-600 mb-6">Let's start with your basic information</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.full_name}
                  onChange={e => updateData('full_name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => updateData('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.founder_role}
                  onChange={e => updateData('founder_role', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select role</option>
                  <option value="Founder/CEO">Founder/CEO</option>
                  <option value="Co-Founder">Co-Founder</option>
                  <option value="Technical Lead">Technical Lead</option>
                  <option value="Product Lead">Product Lead</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.founder_location}
                  onChange={e => updateData('founder_location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ann Arbor, MI"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Startup</h2>
              <p className="text-gray-600 mb-6">Tell us about what you're building</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Startup Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.startup_name}
                  onChange={e => updateData('startup_name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Acme Inc"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  One-line Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.startup_description}
                  onChange={e => updateData('startup_description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="We help businesses automate their workflows"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry/Sector <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.startup_industry}
                  onChange={e => updateData('startup_industry', e.target.value)}
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Model <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {['B2B', 'B2C', 'B2B2C', 'Marketplace'].map(model => (
                    <button
                      key={model}
                      onClick={() => updateData('startup_business_model', model)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        data.startup_business_model === model
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Stage & Traction</h2>
              <p className="text-gray-600 mb-6">Where are you in your journey?</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Stage <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.startup_stage}
                  onChange={e => updateData('startup_stage', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select stage</option>
                  <option value="Idea">Idea</option>
                  <option value="MVP">MVP</option>
                  <option value="Early Revenue">Early Revenue</option>
                  <option value="Scaling">Scaling</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Size <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.team_size}
                  onChange={e => updateData('team_size', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select team size</option>
                  <option value="Solo founder">Solo founder</option>
                  <option value="2-3 people">2-3 people</option>
                  <option value="4-10 people">4-10 people</option>
                  <option value="11-25 people">11-25 people</option>
                  <option value="26+ people">26+ people</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.revenue_status}
                  onChange={e => updateData('revenue_status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select status</option>
                  <option value="Pre-revenue">Pre-revenue</option>
                  <option value="First revenue">First revenue</option>
                  <option value="$1-10K MRR">$1-10K MRR</option>
                  <option value="$10-50K MRR">$10-50K MRR</option>
                  <option value="$50K+ MRR">$50K+ MRR</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Readiness <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.product_readiness}
                  onChange={e => updateData('product_readiness', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select readiness</option>
                  <option value="Concept only">Concept only</option>
                  <option value="In development">In development</option>
                  <option value="Beta/testing">Beta/testing</option>
                  <option value="Launched">Launched</option>
                </select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Goals</h2>
              <p className="text-gray-600 mb-6">What are you looking to achieve?</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Primary Goals <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Raise funding',
                    'Find co-founder',
                    'Build MVP',
                    'Get first customers',
                    'Scale revenue',
                    'Join accelerator',
                    'Hire team',
                    'Build partnerships'
                  ].map(goal => (
                    <button
                      key={goal}
                      onClick={() => toggleArrayItem('primary_goals', goal)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        data.primary_goals.includes(goal)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Plans <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.funding_plans}
                  onChange={e => updateData('funding_plans', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select plan</option>
                  <option value="Bootstrap">Bootstrap</option>
                  <option value="Seeking grants">Seeking grants</option>
                  <option value="Seeking angel investment">Seeking angel investment</option>
                  <option value="Seeking VC">Seeking VC</option>
                  <option value="Already funded">Already funded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Amount Range
                </label>
                <select
                  value={data.funding_amount_range}
                  onChange={e => updateData('funding_amount_range', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select range (optional)</option>
                  <option value="$0-50K">$0-50K</option>
                  <option value="$50-250K">$50-250K</option>
                  <option value="$250K-1M">$250K-1M</option>
                  <option value="$1M-5M">$1M-5M</option>
                  <option value="$5M+">$5M+</option>
                </select>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Challenges</h2>
              <p className="text-gray-600 mb-6">What are your biggest obstacles?</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Challenges <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Finding funding',
                    'Product development',
                    'Customer acquisition',
                    'Team building',
                    'Market validation',
                    'Legal/compliance',
                    'Sales & marketing',
                    'Time management'
                  ].map(challenge => (
                    <button
                      key={challenge}
                      onClick={() => toggleArrayItem('challenges', challenge)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        data.challenges.includes(challenge)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {challenge}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any other challenges or details you'd like to share..."
                />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Profile</h2>
              <p className="text-gray-600 mb-6">Make sure everything looks good</p>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Founder Info</h3>
                  <p className="text-sm text-gray-700"><strong>Name:</strong> {data.full_name}</p>
                  <p className="text-sm text-gray-700"><strong>Email:</strong> {data.email}</p>
                  <p className="text-sm text-gray-700"><strong>Role:</strong> {data.founder_role}</p>
                  <p className="text-sm text-gray-700"><strong>Location:</strong> {data.founder_location}</p>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Startup Info</h3>
                  <p className="text-sm text-gray-700"><strong>Name:</strong> {data.startup_name}</p>
                  <p className="text-sm text-gray-700"><strong>Description:</strong> {data.startup_description}</p>
                  <p className="text-sm text-gray-700"><strong>Industry:</strong> {data.startup_industry}</p>
                  <p className="text-sm text-gray-700"><strong>Model:</strong> {data.startup_business_model}</p>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Stage & Traction</h3>
                  <p className="text-sm text-gray-700"><strong>Stage:</strong> {data.startup_stage}</p>
                  <p className="text-sm text-gray-700"><strong>Team:</strong> {data.team_size}</p>
                  <p className="text-sm text-gray-700"><strong>Revenue:</strong> {data.revenue_status}</p>
                  <p className="text-sm text-gray-700"><strong>Product:</strong> {data.product_readiness}</p>
                  <button
                    onClick={() => setStep(3)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Goals</h3>
                  <p className="text-sm text-gray-700"><strong>Primary Goals:</strong> {data.primary_goals.join(', ')}</p>
                  <p className="text-sm text-gray-700"><strong>Funding:</strong> {data.funding_plans}</p>
                  {data.funding_amount_range && (
                    <p className="text-sm text-gray-700"><strong>Amount:</strong> {data.funding_amount_range}</p>
                  )}
                  <button
                    onClick={() => setStep(4)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Challenges</h3>
                  <p className="text-sm text-gray-700">{data.challenges.join(', ')}</p>
                  <button
                    onClick={() => setStep(5)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center space-x-2 px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            {step < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!validateStep()}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing your answers...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Finish & See My Matches</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
