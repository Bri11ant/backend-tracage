import { CreateProject, UpdateProject } from './../dtos/project.dto';
import { SandboxService } from '@/services/sandbox.service';
import { Body, Controller, Get, HttpCode, Post, Put } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class SandboxController {
  service = new SandboxService();

  @Get('/projects')
  @OpenAPI({ summary: 'Get project list' })
  @HttpCode(200)
  async getProjectList() {
    const list = this.service.getProjectList();
    return { message: 'file list', list };
  }

  @Post('/projects')
  @OpenAPI({ summary: 'Create new project' })
  @HttpCode(201)
  async createProject(@Body() projectData: CreateProject) {
    return this.service.createProject(projectData);
  }

  @Put('/projects')
  @OpenAPI({summary: 'Update a project'})
  @HttpCode(200)
  async updateProject(@Body() projectData: UpdateProject) {
    return this.service.updateProject(projectData)
  }
}
