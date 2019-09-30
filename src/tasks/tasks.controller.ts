import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto"
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe"
import { TaskStatus } from "./task-status.enum"
import { Task } from "./task.entity"
import { TasksService } from "./tasks.service"

@Controller("/tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger("TasksController")

  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    this.logger.verbose(
      `retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`
    )
    return this.tasksService.getTasks(filterDto)
  }

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    this.logger.verbose(
      `creating new task. Data: ${JSON.stringify(createTaskDto)}`
    )
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete("/:id")
  deleteTask(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id)
  }

  @Patch("/:id/status")
  updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus
  ) {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
