import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../projects/project.entity";
import { User } from "../users/user.entity";

@Entity()
export class ProjectUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string; //au format uuidv4

  @Column( {type: 'timestamptz'} )
  startDate!: Date; 

  @Column( {type: 'timestamptz'} )
  endDate!: Date; 

  @Column('uuid')
  projectId!: string; //au format uuidv4

  @Column('uuid')
  userId!: string; //au format uuidv4

  @ManyToOne(() => Project)
  @JoinColumn()
  project!: Project

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User
}
