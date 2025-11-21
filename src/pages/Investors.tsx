import { useState } from 'react';
import { LoggedInNav } from '../components/LoggedInNav';
import { Search, Filter, Bookmark, ChevronDown, ChevronUp } from 'lucide-react';
import { mockInvestors } from '../data/mockInvestors';

export function Investors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'high-match' | 'saved'>('all');
  const [expandedInvestor, setExpandedInvestor] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [savedInvestors, setSavedInvestors] = useState<Set<string>>(new Set());

  const toggleSaved = (id: string) => {
    setSavedInvestors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredInvestors = mockInvestors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.thesis.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      selectedTab === 'all' ||
      (selectedTab === 'high-match' && investor.matchLevel >= 85) ||
      (selectedTab === 'saved' && savedInvestors.has(investor.id));

    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LoggedInNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investor Finder</h1>
          <p className="text-gray-600">Connect with investors aligned to your startup</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-20">
              <h2 className="font-bold text-gray-900 mb-4">Filters</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investor Type</label>
                  {['Venture Capital', 'Angel Group', 'Seed Fund', 'Growth Equity'].map(type => (
                    <label key={type} className="flex items-center space-x-2 mb-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stage Focus</label>
                  {['Idea', 'MVP', 'Early Revenue', 'Scaling'].map(stage => (
                    <label key={stage} className="flex items-center space-x-2 mb-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">{stage}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check Size</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="">All sizes</option>
                    <option value="50K-250K">$50K - $250K</option>
                    <option value="250K-1M">$250K - $1M</option>
                    <option value="1M-5M">$1M - $5M</option>
                    <option value="5M+">$5M+</option>
                  </select>
                </div>

                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm">
                  Clear all filters
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search investors..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </button>
              </div>

              <div className="flex space-x-4 mt-4 border-b border-gray-200">
                {[
                  { key: 'all', label: 'All investors' },
                  { key: 'high-match', label: 'High-match for you' },
                  { key: 'saved', label: 'Saved' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key as any)}
                    className={`pb-3 px-4 font-medium transition-all ${
                      selectedTab === tab.key
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredInvestors.length === 0 ? (
                <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                  <p className="text-gray-600">No investors found matching your criteria</p>
                </div>
              ) : (
                filteredInvestors.map(investor => (
                  <div key={investor.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{investor.name}</h3>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                            {investor.matchLevel}% match
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{investor.type}</p>
                        <p className="text-gray-700 mb-4">{investor.thesis}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                            {investor.checkSize}
                          </span>
                          {investor.stageFocus.map(stage => (
                            <span key={stage} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                              {stage}
                            </span>
                          ))}
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {investor.location}
                          </span>
                          <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                            {investor.michiganPortfolioCount} MI portfolio companies
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-sm text-gray-600 font-medium">Sectors:</span>
                          {investor.sectors.map(sector => (
                            <span key={sector} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                              {sector}
                            </span>
                          ))}
                        </div>

                        {expandedInvestor === investor.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                            <h4 className="font-semibold text-gray-900 mb-2">Next Steps</h4>
                            <ul className="list-disc list-inside space-y-1 mb-4 text-sm text-gray-700">
                              <li>Research their portfolio companies to understand their investment thesis</li>
                              <li>Prepare a concise pitch deck highlighting your traction and team</li>
                              <li>Look for warm introductions through your network</li>
                              <li>Follow their activity on social media to find the right timing</li>
                            </ul>
                            <a
                              href="#"
                              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                            >
                              Visit website
                            </a>
                          </div>
                        )}

                        <button
                          onClick={() => setExpandedInvestor(expandedInvestor === investor.id ? null : investor.id)}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                        >
                          <span>{expandedInvestor === investor.id ? 'Show less' : 'View profile'}</span>
                          {expandedInvestor === investor.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => toggleSaved(investor.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all ml-4"
                      >
                        <Bookmark
                          className={`h-6 w-6 ${savedInvestors.has(investor.id) ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`}
                        />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
