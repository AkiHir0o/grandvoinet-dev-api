import { Body, Controller, ForbiddenException, Get, Param, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import JwtInterface from "../../auth/interfaces/jwt-interface";
import { CreateProjectDto } from "../dto/create_project_dto";
import { Project } from "../project.entity";
import { ProjectsService } from "../services/project.service";

@Controller('projects')
export class ProjectsController {
    constructor (
      private projectService: ProjectsService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Request() req: Request & { user: JwtInterface }, @Body() createProjectDto: CreateProjectDto){
      if(req.user.role === "Admin"){
        return await this.projectService.create(createProjectDto)
      } else{
        throw new UnauthorizedException ("Autorisation refusée")
      }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req: Request & { user: JwtInterface }): Promise<CreateProjectDto[]>{
      if(req.user.role === "Admin" || req.user.role === "ProjectManager"){
        return await this.projectService.findAll();
      }
      else{
        return await this.projectService.getByUserId(req.user.id);
      }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getById(@Param('id') id: string): Promise<CreateProjectDto> {
      return this.projectService.getById(id)
    }
}
