import { useState } from 'react';
import { type Task } from '../types/task';
import { api } from '../services/api';
import { Trash2, X } from 'lucide-react';

interface Props {
  task: Task;
  onUpdate: (updated: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [showModal, setShowModal] = useState(false);

  const toggleStatus = async () => {
    const newStatus = task.status === 'PENDENTE' ? 'CONCLUIDA' : 'PENDENTE';
    const res = await api.patch<Task>(`/tasks/${task.id}/status`, { status: newStatus });
    onUpdate(res.data);
  };

  const remove = async () => {
    await api.delete(`/tasks/${task.id}`);
    onDelete(task.id);
    setShowModal(false);
  };

  return (
    <>
      {/* Item da lista */}
      <li className="flex items-center justify-between border-b border-gray-200 py-2 px-2 hover:bg-gray-50 rounded-lg transition">
        <div className="flex items-center gap-3 flex-1">
          <input
            type="checkbox"
            checked={task.status === 'CONCLUIDA'}
            onChange={toggleStatus}
            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-0"
          />
          <div>
            <p
              className={`text-gray-800 ${
                task.status === 'CONCLUIDA' ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.descricao}
            </p>
            <span className="text-xs text-gray-400">
              Criada em: {new Date(task.dataCriacao).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="text-gray-400 hover:text-red-600 transition p-1 rounded"
          title="Excluir tarefa"
        >
          <Trash2 size={18} />
        </button>
      </li>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/20 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-80 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirmar exclusão
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Deseja realmente excluir essa tarefa? <b>{task.descricao}</b>
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={remove}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
