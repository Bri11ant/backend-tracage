import { IsString } from 'class-validator';

export class CreateProject {
  @IsString()
  public title: string;

  @IsString()
  public data: string = '{}';

  // @IsString()
  // public keys?: string[] = []
}

export class UpdateProject {
  @IsString()
  public title: string;

  @IsString()
  public data: string;
}
