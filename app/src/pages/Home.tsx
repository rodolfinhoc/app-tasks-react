import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { type Task } from '../types/task';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { FilterBar } from '../components/FilterBar';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'PENDENTE' | 'CONCLUIDA'>('ALL');

  useEffect(() => {
    api.get<Task[]>('/tasks').then((res) => setTasks(res.data));
  }, []);

  const filtered = tasks.filter((t) => filter === 'ALL' || t.status === filter);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col items-center pt-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Minhas Tarefas</h1>

      <div className="w-full px-4">
        <TaskForm onAdd={(t) => setTasks([t, ...tasks])} />
        <FilterBar filter={filter} onChange={setFilter} />
        <TaskList
          tasks={filtered}
          onUpdate={(u) => setTasks(tasks.map((t) => (t.id === u.id ? u : t)))}
          onDelete={(id) => setTasks(tasks.filter((t) => t.id !== id))}
        />
      </div>
    </div>
  );
}
