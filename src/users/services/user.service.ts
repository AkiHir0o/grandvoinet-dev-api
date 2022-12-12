import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../dto/create_user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "../user.entity";
import { isUUID } from "class-validator";

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
}
