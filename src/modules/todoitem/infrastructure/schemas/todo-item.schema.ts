import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoItemDocument = TodoItem & Document;

@Schema()
export class TodoItem {
  @Prop({ type: String })
  _id: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  priority: number;

  @Prop({ type: String })
  todoListId: string;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
