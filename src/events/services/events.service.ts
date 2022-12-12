import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { Repository } from "typeorm";
import { CreateEnventDto } from "../dto/create_event_dto";
import { Event } from "../event.entity";

@Injectable()
export class EventsService{
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ){}

  async create(event: CreateEnventDto): Promise<Event>{
    const {date, eventStatus, eventType, eventDescription, userId} = event;
    
    const newEvent = Event.create();
    newEvent.date = date;
    newEvent.eventStatus = eventStatus;
    newEvent.eventType = eventType;
    newEvent.eventDescription = eventDescription;
    newEvent.userId = userId;
    return await newEvent.save();
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
