import { type Task } from '../types/task';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onUpdate, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-400 mt-4">Nenhuma tarefa encontrada.</p>;
  }

  return (
    <ul className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 divide-y">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
