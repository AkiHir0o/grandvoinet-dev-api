import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  @IsNotEmpty()
  public username!: string;

  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @MinLength(8)
  public password!: string;
  
  @IsOptional()
  @IsString()
  public role?: 'Employee' | 'Admin' | 'ProjectManager';
}
