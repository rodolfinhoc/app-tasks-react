export type TaskStatus = 'PENDENTE' | 'CONCLUIDA';

export interface Task {
  id: string;
  descricao: string;
  status: TaskStatus;
  dataCriacao: string;
}
