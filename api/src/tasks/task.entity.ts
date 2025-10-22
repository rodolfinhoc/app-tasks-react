import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type TaskStatus = 'PENDENTE' | 'CONCLUIDA';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 1000 })
  descricao: string;

  @Column({ type: 'enum', enum: ['PENDENTE', 'CONCLUIDA'], default: 'PENDENTE' })
  status: TaskStatus;

  @CreateDateColumn({ type: 'datetime' })
  dataCriacao: Date;
}
