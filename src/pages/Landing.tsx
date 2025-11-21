import { Link } from 'react-router-dom';
import { LoggedOutNav } from '../components/LoggedOutNav';
import { Rocket, Target, Users, TrendingUp, MapPin, DollarSign, Award } from 'lucide-react';

export function Landing() {
  const howItWorksSteps = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: 'Tell us about your startup',
      description: 'Share your vision, stage, and goals through our quick intake process'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Get matched with grants & investors',
      description: 'Receive personalized recommendations based on your unique profile'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: 'Follow your roadmap',
      description: 'Take action on curated next steps to accelerate your growth'
    }
  ];

  const stats = [
    { value: '$2.5B+', label: 'Available Funding' },
    { value: '150+', label: 'Active Investors' },
    { value: '200+', label: 'Grant Programs' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <LoggedOutNav />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Accelerate Your Michigan Startup Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Personalized grants, investors, and next steps — built for Michigan founders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/onboarding"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started — It's Free
            </Link>
            <a
              href="#ecosystem"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-lg transition-all"
            >
              Explore the Michigan ecosystem
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="for-founders" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to unlock your startup's potential</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Michigan Advantage
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Michigan is home to a thriving startup ecosystem with world-class universities,
                innovative companies, and a supportive network of investors and accelerators.
                Our state offers unique advantages for founders ready to build something extraordinary.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Strategic Location</h4>
                    <p className="text-gray-600">Access to major markets and manufacturing expertise</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Abundant Funding</h4>
                    <p className="text-gray-600">Hundreds of grants and active investor community</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Top Talent</h4>
                    <p className="text-gray-600">Leading universities producing exceptional graduates</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Research Universities</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Accelerators</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$2.5B+</div>
                  <div className="text-sm text-gray-600">Venture Capital</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1,000+</div>
                  <div className="text-sm text-gray-600">Tech Startups</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ecosystem" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Join Michigan's Innovation Economy?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your journey today and connect with the resources you need to succeed
          </p>
          <Link
            to="/onboarding"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Rocket className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">MIStartup Navigator</span>
              </div>
              <p className="text-gray-400 text-sm">
                Built for Michigan DevFest
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ecosystem</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Founders</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
