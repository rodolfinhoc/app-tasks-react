import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  async create(createDto: CreateTaskDto): Promise<Task> {
    const task = this.repo.create({ descricao: createDto.descricao });
    return this.repo.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.repo.find({ order: { dataCriacao: 'DESC' } });
  }

  async findById(id: string): Promise<Task> {
    const t = await this.repo.findOne({ where: { id }});
    if (!t) throw new NotFoundException('Tarefa não encontrada');
    return t;
  }

  async updateStatus(id: string, status: 'PENDENTE'|'CONCLUIDA'): Promise<Task> {
    const task = await this.findById(id);
    task.status = status;
    return this.repo.save(task);
  }

  async remove(id: string): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Tarefa não encontrada');
  }
}
