import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  TodoItemDocument,
  TodoItemSchema,
} from 'src/modules/todoitem/infrastructure/schemas/todo-item.schema';

export type TodoListDocument = TodoList & Document;

@Schema()
export class TodoList {
  @Prop({ type: String })
  _id: string;

  @Prop({ type: String })
  userId: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: [TodoItemSchema] })
  todoItems: TodoItemDocument[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
