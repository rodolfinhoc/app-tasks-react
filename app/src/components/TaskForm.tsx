import { useState } from 'react';
import { api } from '../services/api';
import { type Task } from '../types/task';
import { Plus, Loader2 } from 'lucide-react';

interface Props {
  onAdd: (task: Task) => void;
}

export function TaskForm({ onAdd }: Props) {
  const [descricao, setDescricao] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const res = await api.post<Task>('/tasks', { descricao });
      onAdd(res.data);
      setDescricao('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 mx-1"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Digite uma nova tarefa..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={!descricao.trim() || isSubmitting}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-w-[120px] sm:min-w-[140px] text-sm sm:text-base"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : (
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
          <span className="xs:inline">
            {isSubmitting ? 'Adicionando...' : 'Adicionar'}
          </span>
        </button>
      </div>
    </form>
  );
}