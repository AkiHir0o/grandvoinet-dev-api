import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEnventDto{
  @IsNotEmpty()
  public date!: Date;

  @IsNotEmpty()
  @IsString()
  public eventType!: 'RemoteWork' | 'PaidLeave';
  
  @IsOptional()
  public eventDescription?: string;

  @IsOptional()
  @IsString()
  public eventStatus?: 'Pending' | 'Accepted' | 'Declined' // valeur par défaut : 'Pending';

  @IsNotEmpty()
  public userId!: string;
}
