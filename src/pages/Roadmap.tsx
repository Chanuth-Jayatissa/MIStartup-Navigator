import { useState } from 'react';
import { LoggedInNav } from '../components/LoggedInNav';
import { Plus, RefreshCw } from 'lucide-react';
import { mockRoadmapTasks } from '../data/mockRoadmap';
import { RoadmapTask } from '../types';

export function Roadmap() {
  const [tasks, setTasks] = useState<RoadmapTask[]>(mockRoadmapTasks);
  const [showCompleted, setShowCompleted] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRegenerate = () => {
    setTasks([...mockRoadmapTasks]);
  };

  const bucketConfig = {
    this_week: { title: 'This Week', color: 'blue' },
    this_month: { title: 'This Month', color: 'green' },
    later: { title: 'Later', color: 'gray' }
  };

  const completedTasks = tasks.filter(t => t.completed);
  const activeTasks = tasks.filter(t => !t.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      <LoggedInNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Roadmap</h1>
            <p className="text-gray-600">Stay on track with personalized milestones</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
            >
              {showCompleted ? 'Hide' : 'Show'} completed ({completedTasks.length})
            </button>
            <button
              onClick={handleRegenerate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Regenerate roadmap</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(Object.keys(bucketConfig) as Array<keyof typeof bucketConfig>).map(bucket => {
            const bucketTasks = activeTasks.filter(t => t.bucket === bucket);
            const config = bucketConfig[bucket];

            return (
              <div key={bucket} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">{config.title}</h2>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                    {bucketTasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {bucketTasks.map(task => (
                    <div
                      key={task.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="mt-1 rounded"
                        />
                        <div className="flex-1">
                          <span className={`inline-block px-2 py-1 bg-${config.color}-50 text-${config.color}-700 text-xs rounded mb-2`}>
                            {task.category}
                          </span>
                          <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                          {task.description && (
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          )}
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            {task.targetDate && <span>📅 {task.targetDate}</span>}
                            <span className="capitalize">• {task.source}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-gray-600 hover:text-blue-600 font-medium flex items-center justify-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Add task</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {showCompleted && completedTasks.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Completed Tasks</h2>
            <div className="space-y-2">
              {completedTasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 border border-gray-200 rounded-lg opacity-60"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => toggleTask(task.id)}
                      className="rounded"
                    />
                    <div>
                      <span className="text-sm text-gray-600 line-through">{task.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
