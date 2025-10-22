import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.service.create(dto);
  }

  @Get()
  async list(): Promise<Task[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Task> {
    return this.service.findById(id);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto): Promise<Task> {
    return this.service.updateStatus(id, dto.status);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.service.remove(id);
    return { message: 'Tarefa removida' };
  }
}
