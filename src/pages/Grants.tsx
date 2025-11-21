import { useState, useEffect } from 'react';
import { LoggedInNav } from '../components/LoggedInNav';
import { Search, Filter, Bookmark, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { mockGrants } from '../data/mockGrants';
import { Grant } from '../types';
import { matchGrantsToProfile, getTopMatches } from '../services/grantMatcher';

export function Grants() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'high-match' | 'saved'>('all');
  const [expandedGrant, setExpandedGrant] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    stage: [] as string[],
    type: [] as string[],
    region: '',
    timeline: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [savedGrants, setSavedGrants] = useState<Set<string>>(new Set());
  const [matchedGrants, setMatchedGrants] = useState<Grant[]>([]);
  const [topMatches, setTopMatches] = useState<Grant[]>([]);

  // Run AI matching on component mount
  useEffect(() => {
    const userProfileString = localStorage.getItem('userProfileSerialized');
    if (userProfileString) {
      const matched = matchGrantsToProfile(mockGrants, userProfileString);
      setMatchedGrants(matched);
      setTopMatches(getTopMatches(matched));
    } else {
      setMatchedGrants(mockGrants);
    }
  }, []);

  const toggleSaved = (id: string) => {
    setSavedGrants(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const grantsToUse = matchedGrants.length > 0 ? matchedGrants : mockGrants;

  const filteredGrants = grantsToUse.filter(grant => {
    const matchesSearch = grant.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTab =
      selectedTab === 'all' ||
      (selectedTab === 'high-match' && grant.aiMatched) ||
      (selectedTab === 'saved' && savedGrants.has(grant.id));

    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LoggedInNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Grants & Funding Opportunities</h1>
          <p className="text-gray-600">Discover funding opportunities matched to your startup</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-20">
              <h2 className="font-bold text-gray-900 mb-4">Filters</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Startup Stage</label>
                  {['Idea', 'MVP', 'Early Revenue', 'Scaling'].map(stage => (
                    <label key={stage} className="flex items-center space-x-2 mb-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">{stage}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Funding Type</label>
                  {['grant', 'loan', 'program', 'accelerator'].map(type => (
                    <label key={type} className="flex items-center space-x-2 mb-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700 capitalize">{type}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="">All</option>
                    <option value="open">Open now</option>
                    <option value="closing_soon">Closing soon</option>
                    <option value="upcoming">Upcoming</option>
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
                    placeholder="Search grants..."
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
                  { key: 'all', label: 'All opportunities' },
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
              {filteredGrants.length === 0 ? (
                <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                  <p className="text-gray-600">No grants found matching your criteria</p>
                </div>
              ) : (
                filteredGrants.map(grant => (
                  <div key={grant.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{grant.organization}</h3>
                          {grant.aiMatched && (
                            <div className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                              <Sparkles className="h-4 w-4" />
                              <span>AI Match</span>
                            </div>
                          )}
                          {grant.matchLevel !== undefined && grant.matchLevel > 0 && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                              {grant.matchLevel}% match
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3 text-sm font-medium">{grant.type}</p>
                        <p className="text-gray-700 mb-4">{grant.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full capitalize">
                            {grant.type}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {grant.region}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {grant.amount}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            Due: {grant.deadline}
                          </span>
                          {grant.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {expandedGrant === grant.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                            <h4 className="font-semibold text-gray-900 mb-2">Eligibility Requirements</h4>
                            <ul className="list-disc list-inside space-y-1 mb-4">
                              {grant.eligibility.map((req, idx) => (
                                <li key={idx} className="text-sm text-gray-700">{req}</li>
                              ))}
                            </ul>
                            <a
                              href="#"
                              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                            >
                              Apply on official site
                            </a>
                          </div>
                        )}

                        <button
                          onClick={() => setExpandedGrant(expandedGrant === grant.id ? null : grant.id)}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                        >
                          <span>{expandedGrant === grant.id ? 'Show less' : 'View details'}</span>
                          {expandedGrant === grant.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => toggleSaved(grant.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all ml-4"
                      >
                        <Bookmark
                          className={`h-6 w-6 ${savedGrants.has(grant.id) ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`}
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
