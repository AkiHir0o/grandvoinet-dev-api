import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectUserModule } from "../project-users/project-user.module";
import { UsersModule } from "../users/users.module";
import { ProjectsController } from "./controllers/projects.controller";
import { Project } from "./project.entity";
import { ProjectsService } from "./services/project.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]), ProjectUserModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectModule {}
