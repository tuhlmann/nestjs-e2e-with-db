import { EntityRepository, Repository } from "typeorm"

import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto"
import { TaskStatus } from "./task-status.enum"
import { Task } from "./task.entity"
import { Logger, InternalServerErrorException } from "@nestjs/common"

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger("TaskRepository")

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder("task")

    if (status) {
      query.andWhere("task.status = :status", { status })
    }

    if (search) {
      query.andWhere("(task.title LIKE :search OR task.description LIKE :search)", {
        search: `%${search}%`
      })
    }

    try {
      const tasks = await query.getMany()
      return tasks
    } catch (error) {
      this.logger.error(
        `Could not retrieve tasks. DTO: ${JSON.stringify(filterDto)}`,
        error.stack
      )
      throw error
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task()

    task.title = createTaskDto.title
    task.description = createTaskDto.description
    task.status = TaskStatus.OPEN
    task.save()

    return task
  }
}
