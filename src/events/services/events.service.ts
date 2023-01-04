import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import JwtInterface from "../../auth/interfaces/jwt-interface";
import { CreateEnventDto } from "../dto/create_event_dto";
import { Event } from "../event.entity";
import * as dayjs from 'dayjs';


@Injectable()
export class EventsService{
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ){}

  async create(event: CreateEnventDto, user: JwtInterface): Promise<Event>{
    const {date, eventType, eventDescription} = event;

    const events = await this.eventRepository.findBy(
      {userId : user.id,
      date : MoreThanOrEqual(dayjs(event.date).startOf('week').toDate()) &&
      LessThanOrEqual(dayjs(event.date).endOf('week').toDate()),}
    )

    if(events.length === 2){
      throw new UnauthorizedException("3 TT in the same week is not possible")
    }

    for (const event of events) {
      if(dayjs(event.date).isSame(event.date, 'day')){
        throw new UnauthorizedException("Same event the same day with user role")
      }
    }    

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



    return this.eventRepository.save(newEvent);
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

  async updateStatus(id: string, user: JwtInterface, accepted: boolean): Promise<Event>{
    if(user.role === "Employee") throw new UnauthorizedException("Role not accepted");
    const newStatus = await this.getById(id)
    if(newStatus.eventStatus != "Accepted"){
      newStatus.eventStatus = accepted ? "Accepted" : "Declined"
      return await this.eventRepository.save(newStatus)
    }
  }
}
