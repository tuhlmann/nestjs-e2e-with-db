import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { TasksModule } from "./tasks/tasks.module"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./taskmanager.sqlite3",
      synchronize: true,
      entities: ["./src/server/**/*.entity.{js,ts}"]
    }),
    TasksModule
  ]
})
export class AppModule { }
