import { useState } from 'react';
import { type Task } from '../types/task';
import { api } from '../services/api';
import { Trash2, X, Check, Clock, Calendar } from 'lucide-react';

interface Props {
  task: Task;
  onUpdate: (updated: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleStatus = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      const newStatus = task.status === 'PENDENTE' ? 'CONCLUIDA' : 'PENDENTE';
      const res = await api.patch<Task>(`/tasks/${task.id}/status`, { status: newStatus });
      onUpdate(res.data);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const remove = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      onDelete(task.id);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    } finally {
      setShowModal(false);
    }
  };

  const StatusIcon = task.status === 'CONCLUIDA' ? Check : Clock;

  return (
    <>
      {/* Item da lista */}
      <li className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-white/20 hover:shadow-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-0.5 mx-1">
        <div className="flex items-start gap-3">
          {/* Checkbox customizado */}
          <button
            onClick={toggleStatus}
            disabled={isUpdating}
            className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-0.5 ${
              task.status === 'CONCLUIDA'
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-500 group-hover:border-green-400'
            } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {task.status === 'CONCLUIDA' && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
          </button>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <p
              className={`text-gray-800 font-medium leading-relaxed break-words text-sm sm:text-base ${
                task.status === 'CONCLUIDA' ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.descricao}
            </p>
            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {new Date(task.dataCriacao).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 w-fit">
                <StatusIcon className="w-3 h-3" />
                <span className="text-xs font-medium">
                  {task.status === 'CONCLUIDA' ? 'Concluída' : 'Pendente'}
                </span>
              </div>
            </div>
          </div>

          {/* Botão de excluir */}
          <button
            onClick={() => setShowModal(true)}
            disabled={isUpdating}
            className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-all duration-300 p-1.5 sm:p-2 rounded-lg hover:bg-red-50 group-hover:opacity-100 opacity-70"
            title="Excluir tarefa"
          >
            <Trash2 size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </li>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 z-50 p-4 animate-fadeIn safe-area-bottom">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-md animate-scaleIn mx-2">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                Confirmar exclusão
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition p-1.5 rounded-lg hover:bg-gray-100"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-2 text-sm sm:text-base">
              Tem certeza que deseja excluir esta tarefa?
            </p>
            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-gray-800 font-medium text-sm sm:text-base">{task.descricao}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all duration-300 font-medium text-sm sm:text-base flex-1 sm:flex-none"
              >
                Cancelar
              </button>
              <button
                onClick={remove}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base flex-1 sm:flex-none"
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