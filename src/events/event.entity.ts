import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string; //au format uuidv4

  @Column( {type: 'timestamptz'} )
  date!: Date;

  @Column({default: "Pending"})
  eventStatus?: 'Pending' | 'Accepted' | 'Declined' // valeur par défaut : 'Pending';

  @Column()
  eventType!: 'RemoteWork' | 'PaidLeave';
  
  @Column()
  eventDescription?: string;

  @Column('uuid')
  userId!: string; //au format uuidv4

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User
}
