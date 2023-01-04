import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../dto/create_user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "../user.entity";
import { isUUID } from "class-validator";
import * as dayjs from "dayjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...user, 
      password:  await bcrypt.hash(user.password, await bcrypt.genSalt(10)),
    });
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneBy(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }
  
  async getById(id: string): Promise<User | undefined> {
    if(!isUUID(id)) throw new BadRequestException('Invalid id') 
      const user = await this.userRepository.findOneBy({ id });
      if(!user){
        throw new NotFoundException('User not found')
      }
    return user;
  }

  // async getMealVouchers(event: Event, user: JwtInterface): Promise<User>{
  //   const events = await this.eventRepository.findBy(
  //     {userId : user.id,
  //     date : MoreThanOrEqual(dayjs(event.date).startOf('week').toDate()) &&
  //     LessThanOrEqual(dayjs(event.date).endOf('week').toDate()),}
  //   )  
    
  //   const getBuisenessDaysNumberInAMonth = (month: number) => {
  //     const start = dayjs().month(month)
  //     const daysInMonth = start.daysInMonth()
  //     const workingDays = [1,2,3,4,5]
  //     let count = 0
  //     for (let i = 1; i <= daysInMonth; i++) {
  //       if (workingDays.includes(dayjs().date(i).month(month).day())) {
  //         count ++;
  //       }
  //     }
  //     return count
  //   }
  // }
}
