import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import JwtInterface from "../../auth/interfaces/jwt-interface";
import { CreateEnventDto } from "../dto/create_event_dto";
import { Event } from "../event.entity";
import { EventsService } from "../services/events.service";

@Controller('events')
export class EventsController{
  constructor(
    private eventService: EventsService
  ){}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Request() req: Request & { user: JwtInterface }, @Body() createEventDto: CreateEnventDto){
      return await this.eventService.create(createEventDto, req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Event[]>{
    return this.eventService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string): Promise<Event> {
    return this.eventService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/validate')
  isValidate(@Request() req: Request & { user: JwtInterface }, @Param('id') id: string): Promise<Event>{
    return this.eventService.updateStatus(id, req.user, true);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/decline')
  isDecline(@Request() req: Request & { user: JwtInterface }, @Param('id') id: string): Promise<Event>{
    return this.eventService.updateStatus(id, req.user, false);
  }
}
