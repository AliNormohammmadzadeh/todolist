import { User } from '../../domain/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { TodoList } from 'src/modules/todolist/domain/entities/todolist.entity';
import { TodoItem } from 'src/modules/todoitem/domain/entities/todoitem.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<User | null> {
    const userDoc = await this.userModel.findById(id).exec();
    if (!userDoc) return null;

    const todoLists = userDoc.todoLists.map(todoListDoc =>
      new TodoList(
        todoListDoc._id.toString(),
        userDoc._id.toString(), 
        todoListDoc.title,
        todoListDoc.todoItems.map(item =>
          new TodoItem(
            item._id.toString(),
            todoListDoc._id.toString(),
            item.title,
            item.description,
            item.priority
          )
        )
      )
    );

    return new User(
      userDoc._id.toString(),
      userDoc.username,
      userDoc.password,
      todoLists
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const userDoc = await this.userModel.findOne({ username }).exec();
    if (!userDoc) return null;

    const todoLists = userDoc.todoLists.map(todoListDoc =>
      new TodoList(
        todoListDoc._id.toString(),
        userDoc._id.toString(),
        todoListDoc.title,
        todoListDoc.todoItems.map(item =>
          new TodoItem(
            item._id.toString(),
            todoListDoc._id.toString(),
            item.title,
            item.description,
            item.priority
          )
        )
      )
    );

    return new User(
      userDoc._id.toString(),
      userDoc.username,
      userDoc.password,
      todoLists
    );
  }

  async save(user: User): Promise<void> {
    const userDoc = new this.userModel({
      _id: user.id, 
      username: user.username,
      password: user.password,
      todoLists: user.todoLists.map(todoList => ({
        _id: todoList.id,
        title: todoList.title,
        todoItems: todoList.todoItems.map(todoItem => ({
          _id: todoItem.id,
          title: todoItem.title,
          description: todoItem.description,
          priority: todoItem.priority
        }))
      }))
    });
    await userDoc.save();
  }

  async update(user: User): Promise<void> {
    await this.userModel.updateOne(
      { _id: user.id },
      {
        username: user.username,
        password: user.password,
        todoLists: user.todoLists.map(todoList => ({
          _id: todoList.id,
          title: todoList.title,
          todoItems: todoList.todoItems.map(todoItem => ({
            _id: todoItem.id,
            title: todoItem.title,
            description: todoItem.description,
            priority: todoItem.priority
          }))
        }))
      }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id }).exec();
  }
}
