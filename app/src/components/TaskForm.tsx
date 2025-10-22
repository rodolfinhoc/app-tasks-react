import { useState } from 'react';
import { api } from '../services/api';
import { type Task } from '../types/task';

interface Props {
  onAdd: (task: Task) => void;
}

export function TaskForm({ onAdd }: Props) {
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao.trim()) return;
    const res = await api.post<Task>('/tasks', { descricao });
    onAdd(res.data);
    setDescricao('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-2 mt-4 bg-white rounded-xl p-2 border border-gray-200"
    >
      <input
        type="text"
        placeholder="Digite uma nova tarefa..."
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="flex-1 px-3 py-2 rounded-lg focus:outline-none text-gray-700"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Adicionar Tarefa
      </button>
    </form>
  );
}
