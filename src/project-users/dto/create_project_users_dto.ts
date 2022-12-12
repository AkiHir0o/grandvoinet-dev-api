import { IsNotEmpty } from "class-validator";

export class CreateProjectUserDto {
  @IsNotEmpty()
  public startDate!: Date;
  
  @IsNotEmpty()
  public endDate!: Date;

  @IsNotEmpty()
  public projectId!: string;
  
  @IsNotEmpty()
  public userId!: string;
}
