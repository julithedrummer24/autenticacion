import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = TaskModel & Document;

@Schema({ timestamps: true })
export class TaskModel {
  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  isDone: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
