import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectModule } from "../projects/project.module";
import { UsersModule } from "../users/users.module";
import { ProjectUsersController } from "./controllers/project-users.controller";
import { ProjectUser } from "./project-user.entity";
import { ProjectUsersService } from "./services/project-users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectUser]), UsersModule
  ],
  controllers: [ProjectUsersController],
  providers: [ProjectUsersService],
  exports: [ProjectUsersService]
})
export class ProjectUserModule {}
