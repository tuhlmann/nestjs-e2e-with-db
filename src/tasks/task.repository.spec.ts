import { Test } from "@nestjs/testing"

import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto"
import { TaskRepository } from "./task.repository"
import { CreateTaskDto } from "./dto/create-task.dto"
import { Task } from "./task.entity"
import { TaskStatus } from "./task-status.enum"
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm"
import { AppModule } from "../app.module"
import { INestApplication, Logger } from "@nestjs/common"
import { TasksModule } from "./tasks.module"
import { Repository } from "typeorm"

const logger = new Logger("TaskRepository Test")

describe("TaskRepository", () => {
  let taskRepository: TaskRepository
  let app: INestApplication

  beforeEach(async done => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: "sqlite",
        database: "./taskmanager_test.sqlite3",
        synchronize: true,
        dropSchema: true,
        entities: ["./src/**/*.entity.{js,ts}"]
      }),
      TypeOrmModule.forFeature([TaskRepository])],
      providers: []
    }).compile()

    // const app = module.createNestApplication()
    // await app.init()
    taskRepository = module.get<TaskRepository>(getRepositoryToken(Task))

    // testUtils = module.get<TestUtils>(TestUtils)
    // await testUtils.reloadFixtures()
    // taskRepository = testUtils.databaseService.connection.getCustomRepository(TaskRepository)
    done()
  })

  afterEach(async done => {
    // await testUtils.closeDbConnection()
    done()
  })

  describe("findAll Tasks", () => {
    it("should return all tasks", async done => {
      const createResult = await taskRepository.createTask(
        {
          title: "task1",
          description: "a description"
        } as CreateTaskDto
      )

      logger.log("created task: " + JSON.stringify(createResult))

      expect(createResult.status).toEqual(TaskStatus.OPEN)

      const mockGetTasksDto: GetTasksFilterDto = {}
      const tasks = await taskRepository.getTasks(mockGetTasksDto)
      expect(tasks.length).toEqual(1)
      expect(tasks[0].title).toBe("task1")
      // done()
    })
  })
})
