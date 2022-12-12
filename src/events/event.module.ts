import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectModule } from "../projects/project.module";
import { UsersModule } from "../users/users.module";
import { EventsController } from "./controllers/events.controller";
import { EventsService } from "./services/events.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]), UsersModule
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventModule {}
