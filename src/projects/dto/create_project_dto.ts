import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateProjectDto {
  @MinLength(3)
  @IsNotEmpty()
  public name!: string;

  @IsOptional()
  public descritpion?: string;

  @IsNotEmpty()
  public referringEmployeeId!: string;
}
