import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskModel, TaskDocument } from './schemas/task.schema';
import {
  Task,
  TaskService as TaskServiceInterface,
} from './interfaces/task.interface';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';

@Injectable()
export class TaskService implements TaskServiceInterface {
  constructor(
    @InjectModel(TaskModel.name) private taskModel: Model<TaskDocument>,
  ) {}

  findAll(): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  create(createTaskDto: any): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateTaskDto: any): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
