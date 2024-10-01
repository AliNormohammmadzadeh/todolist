import {
    Controller,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    UseGuards,
    Request
  } from '@nestjs/common';
  import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { AddTodoItemCommand } from '../application/commands/add-todo-item.command';
import { UpdateTodoItemPriorityCommand } from '../application/commands/update-todo-item-priority.command';
import { DeleteTodoItemCommand } from '../application/commands/delete-todo-item.command';
import { UpdateTodoItemCommand } from '../application/commands/update-todo-item.command';
import { UpdateTodoListCommand } from 'src/modules/todolist/application/commands/update-todo-list.command';
  
  @UseGuards(JwtAuthGuard) 
  @Controller('todo-item')
  export class TodoItemController {
    constructor(private readonly commandBus: CommandBus) {}
  
    @Post(':todoListId')
    async addTodoItem(
      @Param('todoListId') todoListId: string,
      @Body() body: { title: string; description: string; priority: number },
      @Request() req
    ) {
      const userId = req.user.userId;
      return this.commandBus.execute(
        new AddTodoItemCommand(userId, todoListId, body.title, body.description, body.priority)
      );
    }
  
    @Patch(':todoListId/:itemId')
    async updateTodoItem(
      @Param('todoListId') todoListId: string,
      @Param('itemId') itemId: string,
      @Body() body: { title?: string; description?: string; priority?: number },
      @Request() req
    ) {
      const userId = req.user.userId;
      return this.commandBus.execute(
        new UpdateTodoItemCommand(userId, todoListId, itemId, body.title, body.description, body.priority)
      );
    }

    @Patch(':todoListId')
    async updateTodoList(
      @Param('todoListId') todoListId: string,
      @Body() body: { title?: string }, 
      @Request() req
    ) {
      const userId = req.user.userId;
      return this.commandBus.execute(
        new UpdateTodoListCommand(userId, todoListId, body.title)
      );
    }

    @Delete(':todoListId/:itemId')
    async deleteTodoItem(
      @Param('todoListId') todoListId: string,
      @Param('itemId') itemId: string,
      @Request() req
    ) {
      const userId = req.user.userId;
      return this.commandBus.execute(
        new DeleteTodoItemCommand(userId, todoListId, itemId)
      );
    }
  }
  