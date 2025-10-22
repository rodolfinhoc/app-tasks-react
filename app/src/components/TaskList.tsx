import { type Task } from '../types/task';
import { TaskItem } from './TaskItem';
import { ClipboardList } from 'lucide-react';

interface Props {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onUpdate, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-2">
        <div className="flex justify-center mb-3 sm:mb-4">
          <ClipboardList className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300" />
        </div>
        <p className="text-gray-400 text-base sm:text-lg font-medium">Nenhuma tarefa encontrada</p>
        <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
          Adicione uma nova tarefa para começar
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3 animate-fadeIn">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}