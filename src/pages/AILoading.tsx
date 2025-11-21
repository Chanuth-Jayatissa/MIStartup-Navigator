import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Search, Target, CheckCircle, Loader2 } from 'lucide-react';

interface LoadingStep {
  id: number;
  icon: any;
  title: string;
  description: string;
  duration: number;
}

const loadingSteps: LoadingStep[] = [
  {
    id: 1,
    icon: Brain,
    title: "Analyzing your profile",
    description: "Understanding your startup's unique characteristics...",
    duration: 2000
  },
  {
    id: 2,
    icon: Target,
    title: "Categorizing your company",
    description: "Identifying industry, stage, and funding needs...",
    duration: 2500
  },
  {
    id: 3,
    icon: Search,
    title: "Searching grant database",
    description: "Scanning 1,000+ funding opportunities across Michigan...",
    duration: 2500
  },
  {
    id: 4,
    icon: Sparkles,
    title: "AI matching in progress",
    description: "Calculating compatibility scores for each opportunity...",
    duration: 2500
  },
  {
    id: 5,
    icon: CheckCircle,
    title: "Finalizing your matches",
    description: "Preparing your personalized dashboard...",
    duration: 1500
  }
];

export function AILoading() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        setCurrentStep(currentStep + 1);
      }, loadingSteps[currentStep].duration);

      return () => clearTimeout(timer);
    } else {
      // All steps completed, navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    }
  }, [currentStep, navigate]);

  const progress = ((currentStep) / loadingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 animate-pulse">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI is working its magic
            </h1>
            <p className="text-gray-600">
              Personalizing your grant matches based on your profile
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
          </div>

          {/* Loading Steps */}
          <div className="space-y-4">
            {loadingSteps.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = completedSteps.includes(index);
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 scale-105 shadow-md'
                      : isCompleted
                      ? 'bg-green-50'
                      : 'bg-gray-50 opacity-50'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse'
                        : isCompleted
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    {isActive ? (
                      <Loader2 className="h-6 w-6 text-white animate-spin" />
                    ) : isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <Icon className="h-6 w-6 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        isActive
                          ? 'text-blue-900'
                          : isCompleted
                          ? 'text-green-900'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isActive
                          ? 'text-blue-700'
                          : isCompleted
                          ? 'text-green-700'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fun Facts Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <p className="text-sm">
                <span className="font-semibold">Did you know?</span> Michigan offers over $500M in startup funding annually
              </p>
            </div>
          </div>
        </div>

        {/* Floating particles animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            >
              <div
                className="w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-30"
                style={{
                  transform: `scale(${0.5 + Math.random() * 1.5})`
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
