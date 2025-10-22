import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { type Task } from '../types/task';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { FilterBar } from '../components/FilterBar';
import { CheckCircle2, Calendar } from 'lucide-react';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'PENDENTE' | 'CONCLUIDA'>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Task[]>('/tasks')
      .then((res) => setTasks(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = tasks.filter((t) => filter === 'ALL' || t.status === filter);
  
  const completedCount = tasks.filter(t => t.status === 'CONCLUIDA').length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-3 sm:px-6 lg:px-8 safe-area-bottom">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-lg">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Minhas Tarefas
            </h1>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center gap-3 sm:gap-6 mb-4 px-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-white/20 flex-1 max-w-[140px]">
              <div className="flex items-center gap-1 sm:gap-2 justify-center sm:justify-start">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-600">Total</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 text-center sm:text-left">{totalCount}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-white/20 flex-1 max-w-[140px]">
              <div className="flex items-center gap-1 sm:gap-2 justify-center sm:justify-start">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-600">Concluídas</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 text-center sm:text-left">{completedCount}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6 px-1">
          <TaskForm onAdd={(t) => setTasks([t, ...tasks])} />
          <FilterBar filter={filter} onChange={setFilter} />
          
          {loading ? (
            <div className="flex justify-center items-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <TaskList
              tasks={filtered}
              onUpdate={(u) => setTasks(tasks.map((t) => (t.id === u.id ? u : t)))}
              onDelete={(id) => setTasks(tasks.filter((t) => t.id !== id))}
            />
          )}
        </div>
      </div>
    </div>
  );
}