import { IsString } from 'class-validator';

export class CreateProject {
  @IsString()
  public title: string;
}
