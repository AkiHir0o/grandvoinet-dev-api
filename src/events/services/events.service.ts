import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { Repository } from "typeorm";
import JwtInterface from "../../auth/interfaces/jwt-interface";
import { User } from "../../users/user.entity";
import { CreateEnventDto } from "../dto/create_event_dto";
import { Event } from "../event.entity";

@Injectable()
export class EventsService{
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ){}

  async create(event: CreateEnventDto, user: JwtInterface): Promise<Event>{
    const {date, eventType, eventDescription} = event;
    
    const newEvent = Event.create();
    newEvent.date = date;
    newEvent.eventStatus = 
      user.role === "Employee" 
      && eventType === "PaidLeave" 
        ? "Pending" 
        : "Accepted";
    newEvent.eventType = eventType;
    newEvent.eventDescription = eventDescription;
    newEvent.userId = user.id;
    
    return this.eventRepository.save(newEvent)
  }

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async getById(id: string): Promise<Event>{
    if(!isUUID(id)) throw new BadRequestException('Invalid id') 
      const user = await this.eventRepository.findOneBy({ id });
      if(!user){
        throw new NotFoundException('User not found');
      }
    return await this.eventRepository.findOneBy({id});
  }
}
