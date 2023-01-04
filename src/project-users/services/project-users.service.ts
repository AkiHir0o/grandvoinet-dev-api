import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { Between, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Project } from "../../projects/project.entity";
import { User } from "../../users/user.entity";
import { CreateProjectUserDto } from "../dto/create_project_users_dto";
import { ProjectUser } from "../project-user.entity";

@Injectable()
export class ProjectUsersService{

  constructor(
    @InjectRepository(ProjectUser)
    private readonly projectUserRepository: Repository<ProjectUser>
  ) {}

  async create(projectUser: CreateProjectUserDto): Promise<ProjectUser>{
    const { startDate, endDate, projectId, userId} = projectUser;
    
    const user: User = await User.findOne({where:{id: userId}});
    const project: Project = await Project.findOne({where:{id: projectId}})

    if(user === null || project === null){
      throw new NotFoundException('User or project not found')
    }

    const newProjectUser = ProjectUser.create();
    newProjectUser.startDate = startDate;
    newProjectUser.endDate = endDate;
    newProjectUser.projectId = projectId;
    newProjectUser.userId = userId;

    const checkDate = await this.projectUserRepository.count({
      where: [
        {
          userId: projectUser.userId,
          startDate: LessThanOrEqual(projectUser.endDate),
          endDate: MoreThanOrEqual(projectUser.startDate),
        },
        {
          userId: projectUser.userId,
          startDate: MoreThanOrEqual(projectUser.startDate),
          endDate: LessThanOrEqual(projectUser.endDate),
        },
        {
          userId: projectUser.userId,
          startDate:
            MoreThanOrEqual(projectUser.startDate) &&
            LessThanOrEqual(projectUser.endDate),
          endDate: MoreThanOrEqual(projectUser.endDate),
        },
      ],
    });
    
    if(checkDate != 0){
      throw new ConflictException("Error")     
    }else
    {
      return await newProjectUser.save();
    }
    
  }
  

  findAll(): Promise<ProjectUser[]>{
    return this.projectUserRepository.find();
  }

  async getById(id: string): Promise<ProjectUser>{
    if(!isUUID(id)) throw new BadRequestException('Invalid id') 
      const projectUser = await this.projectUserRepository.findOneBy({ id });
      if(!projectUser){
        throw new NotFoundException('Project for user not found');
      }
    return projectUser;
  }

   async getUserById(id: string): Promise<ProjectUser[]>{
    if(!isUUID(id)) throw new BadRequestException('Invalid id')
      return await this.projectUserRepository.find({where: { userId : id }, relations: ['project'] });
  }
}
