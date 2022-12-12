import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string; //au format uuidv4

  @Column()
  name!: string;

  @Column({nullable: true})
  description?: string;

  @Column('uuid')
  referringEmployeeId!: string; //au format uuidv4

  @ManyToOne(() => User)
  @JoinColumn()
  referringEmployee!: string; 
}
