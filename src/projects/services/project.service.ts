
import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { Repository } from "typeorm";
import { ProjectUser } from "../../project-users/project-user.entity";
import { ProjectUsersService } from "../../project-users/services/project-users.service";
import { User } from "../../users/user.entity";
import { CreateProjectDto } from "../dto/create_project_dto";
import { Project } from "../project.entity";

@Injectable()
export class ProjectsService {
  
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly projectUserService: ProjectUsersService
  ) {}

  async create(project: CreateProjectDto): Promise<Project>{
    const {name, referringEmployeeId} = project;

    const refEmployee: User = await User.findOne({where:{id: referringEmployeeId}});

    if(refEmployee.role != "ProjectManager" && refEmployee.role != "Admin"){
      throw new UnauthorizedException("Autorisation refusée");
    }

    const newProject = Project.create();
    newProject.name = name;
    newProject.referringEmployeeId = referringEmployeeId;
    return await newProject.save();
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }
  
  findIsConcern(id: string): Promise<Project[]> {
    return Project.find({where: {referringEmployeeId: id}, relations: ['referringEmployee']});
  }

  async findProjectUser(userId: string, projectId: string) {
    const projectUser = await ProjectUser.findOne({where: {userId: userId, projectId: projectId}})
    if (projectUser) {
        const result = await Project.find({where: {id: projectId}})
        return result[0]
    } else {
        throw new ForbiddenException("User not found in the project")
    }
}

  async getById(id: string): Promise<Project>{
    if(!isUUID(id)) throw new BadRequestException('Invalid id') 
      const project = await this.projectRepository.findOneBy({ id });
      if(!project){
        throw new NotFoundException('Project not found');
      }
    return project;
  }

  async getByUserId(id: string): Promise<Project[]>{
    const userProject = await this.projectUserService.getUserById(id)
    return userProject.map(userProject => userProject.project)
  }
}
