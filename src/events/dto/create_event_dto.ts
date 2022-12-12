import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEnventDto{
  @IsNotEmpty()
  public date!: Date;

  @IsNotEmpty()
  @IsString()
  public eventType!: 'RemoteWork' | 'PaidLeave';
  
  @IsOptional()
  public eventDescription?: string;
}
