import { CreateProject } from './../dtos/project.dto';
import { SandboxService } from '@/services/sandbox.service';
import { Body, Controller, Get, HttpCode, Post } from 'routing-controllers';
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
}
