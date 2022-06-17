import { HttpException } from './../exceptions/HttpException';
import { CreateProject, UpdateProject } from './../dtos/project.dto';
import * as fs from 'fs';
import * as path from 'path';

export class SandboxService {
  ROOT = path.join(__dirname, '../../outputs');

  // constructor() {}

  getProjectList() {
    return fs.readdirSync(this.ROOT);
  }

  createProject(projectData: CreateProject) {
    if (!projectData) {
      throw new HttpException(401, `Project data required!`);
    }
    const projectTitle = projectData.title.charAt(0).toUpperCase() + projectData.title.slice(1).toLowerCase();
    const list = this.getProjectList();
    if (list.indexOf(projectTitle) > -1) {
      throw new HttpException(409, `The "${projectTitle}" project already exists!`);
    }
    const projectPath = path.join(this.ROOT, projectTitle);
    fs.mkdirSync(projectPath);
    const filePath = path.join(projectPath, `${projectTitle}.json`);
    fs.writeFileSync(filePath, projectData.data, { encoding: 'utf-8' });

    // const keys: string[] = [];

    const project: CreateProject = {
      title: projectTitle,
      data: projectData.data,
      // keys
    };
    return { ...project };
  }

  updateProject(projectData: UpdateProject) {
    if (!projectData) {
      throw new HttpException(401, `Project data required!`);
    }
    const projectTitle = projectData.title;
    const list = this.getProjectList();
    if (list.indexOf(projectTitle) < 0) {
      throw new HttpException(404, `The "${projectTitle}" project not found!`);
    }
    const projectPath = path.join(this.ROOT, projectTitle);
    const filePath = path.join(projectPath, `${projectTitle}.json`);
    fs.writeFileSync(filePath, projectData.data, {encoding: 'utf-8'});

    const project: UpdateProject = {
      title: projectTitle,
      data: projectData.data,
    };
    return { ...project };
  }
}
