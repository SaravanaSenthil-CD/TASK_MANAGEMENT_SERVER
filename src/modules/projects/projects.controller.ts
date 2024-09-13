import { Controller, Post, Body, InternalServerErrorException, Get, NotFoundException, Param, Put, Delete, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  async createProject(@Body() createProjectDto: CreateProjectDto,@Req() req: Request,) {
    try {
      const project= await this.projectsService.create(createProjectDto);
      return {
        message:'Project Created successfully',
        data:project
      }
    } catch (error) {
      throw new InternalServerErrorException('Error creating project');
    }
  }

  @Get('allproject')
  async findAll() {
    try {
      const projects= await this.projectsService.findAll();
      return {
        message:'Projects fetched successfully',
        data:projects
      }
    } catch (error) {
      throw new InternalServerErrorException('Error fetching projects');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const project= await this.projectsService.findOne(id);
      return{
        message:`Project with ID ${id} fetched succesfully`,
        data:project
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching project');
    }
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.projectsService.update(id, updateProjectDto);
      return {
        message: `Project With ID ${id} updated successfully`,
        data: project
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating project');
    }
  }
  

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
        const project = await this.projectsService.findOne(id);

      if (!project) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
     await this.projectsService.remove(id);
      return{
        message:`Project with ID ${id} deleted succesfully`
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error deleting project');
    }
  }
}
