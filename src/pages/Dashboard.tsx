import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoggedInNav } from '../components/LoggedInNav';
import { TrendingUp, DollarSign, Target, Calendar, Bookmark, ExternalLink, Send, Lightbulb } from 'lucide-react';
import { mockGrants } from '../data/mockGrants';
import { mockInvestors } from '../data/mockInvestors';
import { mockRoadmapTasks } from '../data/mockRoadmap';

export function Dashboard() {
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const [activeTab, setActiveTab] = useState<'grants' | 'investors'>('grants');
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const topGrants = mockGrants.slice(0, 3);
  const topInvestors = mockInvestors.slice(0, 3);
  const thisWeekTasks = mockRoadmapTasks.filter(t => t.bucket === 'this_week').slice(0, 3);
  const thisMonthTasks = mockRoadmapTasks.filter(t => t.bucket === 'this_month').slice(0, 2);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    setAiMessages([
      ...aiMessages,
      { role: 'user', content: aiInput },
      {
        role: 'assistant',
        content: 'Based on your profile, I recommend focusing on the Michigan Small Business Development Fund. Your early-stage SaaS startup aligns well with their criteria. I can also help you prepare your pitch deck and connect with Ann Arbor angel investors.'
      }
    ]);
    setAiInput('');
  };

  const suggestedPrompts = [
    'How do I prepare for investor meetings?',
    'What grants am I eligible for?',
    'Help me prioritize my roadmap',
    'Connect me with mentors in my industry'
  ];

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-gray-50">
      <LoggedInNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Hi, {firstName}!</h1>
              {profile?.startup_name && (
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{profile.startup_name}</span>
                  {profile.startup_stage && (
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm font-medium">
                      {profile.startup_stage}
                    </span>
                  )}
                </div>
              )}
            </div>
            <Link
              to="/profile"
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-all"
            >
              Update intake
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <span className="text-sm text-gray-500">Opportunities</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{mockGrants.length}</div>
            <div className="text-sm text-gray-600">Funding opportunities</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-sm text-gray-500">Network</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{mockInvestors.length}</div>
            <div className="text-sm text-gray-600">Investors aligned</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <Target className="h-8 w-8 text-orange-600" />
              <span className="text-sm text-gray-500">Progress</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {Math.round((mockRoadmapTasks.filter(t => t.completed).length / mockRoadmapTasks.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Roadmap progress</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="h-8 w-8 text-red-600" />
              <span className="text-sm text-gray-500">Upcoming</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {mockGrants.filter(g => g.status === 'closing_soon').length}
            </div>
            <div className="text-sm text-gray-600">Deadlines this month</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top Matches</h2>

              <div className="flex space-x-4 border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('grants')}
                  className={`pb-3 px-4 font-medium transition-all ${
                    activeTab === 'grants'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grants & programs
                </button>
                <button
                  onClick={() => setActiveTab('investors')}
                  className={`pb-3 px-4 font-medium transition-all ${
                    activeTab === 'investors'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Investors
                </button>
              </div>

              <div className="space-y-4">
                {activeTab === 'grants' ? (
                  <>
                    {topGrants.map(grant => (
                      <div key={grant.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{grant.name}</h3>
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                {grant.matchLevel}% match
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{grant.organization}</p>
                            <p className="text-sm text-gray-700 mb-3">{grant.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">{grant.type}</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{grant.amount}</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Due: {grant.deadline}</span>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Bookmark className="h-5 w-5 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <Link
                      to="/grants"
                      className="block text-center py-3 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      See all grants →
                    </Link>
                  </>
                ) : (
                  <>
                    {topInvestors.map(investor => (
                      <div key={investor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{investor.name}</h3>
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                {investor.matchLevel}% match
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{investor.type}</p>
                            <p className="text-sm text-gray-700 mb-3">{investor.thesis}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">{investor.checkSize}</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{investor.location}</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {investor.michiganPortfolioCount} MI portfolio
                              </span>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Bookmark className="h-5 w-5 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <Link
                      to="/investors"
                      className="block text-center py-3 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      See all investors →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Your Roadmap</h2>
                <Link to="/roadmap" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Open full →
                </Link>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">This Week</h3>
                  <div className="space-y-2">
                    {thisWeekTasks.map(task => (
                      <div key={task.id} className="flex items-start space-x-2 text-sm">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">{task.category}</span>
                          <p className="text-gray-700 mt-1">{task.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">This Month</h3>
                  <div className="space-y-2">
                    {thisMonthTasks.map(task => (
                      <div key={task.id} className="flex items-start space-x-2 text-sm">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded">{task.category}</span>
                          <p className="text-gray-700 mt-1">{task.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">AI Assistant</h2>
              </div>

              <div className="mb-3 space-y-2 max-h-40 overflow-y-auto">
                {aiMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white ml-4'
                        : 'bg-white text-gray-700 mr-4'
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>

              <form onSubmit={handleAiSubmit} className="mb-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={e => setAiInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>

              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAiInput(prompt)}
                    className="text-xs px-3 py-1.5 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Michigan Ecosystem Highlights</h2>
            <div className="space-y-3">
              {[
                { name: 'Ann Arbor SPARK', type: 'Economic Development', location: 'Ann Arbor' },
                { name: 'TechTown Detroit', type: 'Accelerator', location: 'Detroit' },
                { name: 'Grand Rapids SmartZone', type: 'Innovation Hub', location: 'Grand Rapids' }
              ].map((org, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                  <div>
                    <h3 className="font-semibold text-gray-900">{org.name}</h3>
                    <p className="text-sm text-gray-600">{org.type} • {org.location}</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-3">
              {mockGrants
                .filter(g => g.status === 'closing_soon')
                .slice(0, 3)
                .map(grant => (
                  <div key={grant.id} className="flex justify-between items-center p-3 border border-orange-200 bg-orange-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{grant.name}</h3>
                      <p className="text-xs text-gray-600">Due: {grant.deadline}</p>
                    </div>
                    <span className="px-2 py-1 bg-orange-200 text-orange-700 text-xs rounded-full font-medium">
                      Soon
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}
