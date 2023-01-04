import { Body, Controller, Get, NotFoundException, Param, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import JwtInterface from "../../auth/interfaces/jwt-interface";
import { CreateProjectDto } from "../../projects/dto/create_project_dto";
import { CreateProjectUserDto } from "../dto/create_project_users_dto";
import { ProjectUser } from "../project-user.entity";
import { ProjectUsersService } from "../services/project-users.service";

@Controller('project-users')
export class ProjectUsersController{
    constructor(
      private projectUsersService: ProjectUsersService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Request() req: Request & { user: JwtInterface }, @Body() createProjectUserDto: CreateProjectUserDto){
      if(req.user.role === "Admin" || req.user.role === "ProjectManager"){
        return await this.projectUsersService.create(createProjectUserDto)
      } else{
        throw new UnauthorizedException ("Autorisation refusée")
      }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<ProjectUser[]>{
      return await this.projectUsersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Request() req: Request & { user: JwtInterface }, @Param('id') id: string): Promise<ProjectUser> {
      if(req.user.role === "Admin" || req.user.role === "ProjectManager"){
        return this.projectUsersService.getById(id)
      }
    }
  }
