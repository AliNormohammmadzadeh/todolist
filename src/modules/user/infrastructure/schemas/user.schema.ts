import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  TodoList,
  TodoListSchema,
} from 'src/modules/todolist/infrastructure/schemas/todo-list.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [TodoListSchema] })
  todoLists: TodoList[];
}

export const UserSchema = SchemaFactory.createForClass(User);
