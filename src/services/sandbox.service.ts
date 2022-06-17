import { HttpException } from './../exceptions/HttpException';
import { CreateProject } from './../dtos/project.dto';
import * as fs from 'fs';
import * as path from 'path';

export class SandboxService {
  ROOT = path.join(__dirname, '../../outputs');

  // constructor() {}

  getProjectList() {
    return fs.readdirSync(this.ROOT);
  }

  createProject(projectData: CreateProject) {
    if(!projectData) {
      throw new HttpException(401, `Project data required!`)
    }
    const projectTitle = projectData.title.charAt(0).toUpperCase() + projectData.title.slice(1).toLowerCase()
    const list = this.getProjectList();
    if (list.indexOf(projectTitle) > -1) {
      throw new HttpException(409, `The ${projectTitle} project already exists!`);
    }
    const projectPath = path.join(this.ROOT, projectTitle);
    fs.mkdirSync(projectPath);
    const filePath = path.join(projectPath, `${projectTitle}.json`);
    fs.writeFileSync(filePath, '{}');
    return { message: 'Project created successfully!' };
  }
}
