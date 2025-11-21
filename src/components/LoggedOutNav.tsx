import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';

export function LoggedOutNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Rocket className="h-7 w-7 text-blue-600" />
            <Link to="/" className="text-xl font-bold text-gray-900">
              MIStartup Navigator
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#ecosystem" className="text-gray-600 hover:text-gray-900 transition-colors">
              Ecosystem
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="#for-founders" className="text-gray-600 hover:text-gray-900 transition-colors">
              For Founders
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/onboarding"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slideDown">
            <div className="flex flex-col space-y-4">
              <a
                href="#ecosystem"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Ecosystem
              </a>
              <a
                href="#about"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                About
              </a>
              <a
                href="#for-founders"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                For Founders
              </a>
              <Link
                to="/onboarding"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
