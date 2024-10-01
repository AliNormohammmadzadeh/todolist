import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { AddTodoItemCommand } from 'src/modules/todoitem/application/commands/add-todo-item.command';
import { DeleteTodoItemCommand } from 'src/modules/todoitem/application/commands/delete-todo-item.command';
import { UpdateTodoItemPriorityCommand } from 'src/modules/todoitem/application/commands/update-todo-item-priority.command';
import { DeleteTodoListCommand } from '../application/commands/delete-todo-list.command';
import { GetUserTodoListsQuery } from '../application/queries/get-todo-list.query';
import { AddTodoListCommand } from '../application/commands/add-todo-list-command';
import { UpdateTodoItemCommand } from 'src/modules/todoitem/application/commands/update-todo-item.command';

@UseGuards(JwtAuthGuard)
@Controller('todo-list')
export class TodoListController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getUserTodoLists(@Request() req) {
    const userId = req.user.userId;
    return this.queryBus.execute(new GetUserTodoListsQuery(userId));
  }

  @Post()
  async addTodoList(@Body() body: { title: string }, @Request() req) {
    const userId = req.user.userId;
    return this.commandBus.execute(new AddTodoListCommand(userId, body.title));
  }

  @Post(':todoListId/item')
  async addTodoItem(
    @Param('todoListId') todoListId: string,
    @Body() body: { title: string; description: string; priority: number },
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.commandBus.execute(
      new AddTodoItemCommand(
        userId,
        todoListId,
        body.title,
        body.description,
        body.priority,
      ),
    );
  }

  @Patch(':todoListId/item/:itemId')
  async updateTodoItem(
    @Param('todoListId') todoListId: string,
    @Param('itemId') itemId: string,
    @Body() body: { title?: string; description?: string; priority?: number },
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.commandBus.execute(
      new UpdateTodoItemCommand(
        userId,
        todoListId,
        itemId,
        body.title,
        body.description,
        body.priority,
      ),
    );
  }

  @Delete(':todoListId/item/:itemId')
  async deleteTodoItem(
    @Param('todoListId') todoListId: string,
    @Param('itemId') itemId: string,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.commandBus.execute(
      new DeleteTodoItemCommand(userId, todoListId, itemId),
    );
  }

  @Delete(':todoListId')
  async deleteTodoList(
    @Param('todoListId') todoListId: string,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.commandBus.execute(
      new DeleteTodoListCommand(userId, todoListId),
    );
  }
}
