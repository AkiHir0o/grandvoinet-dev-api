import { Column, Entity, Unique, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn("uuid")
  id!: string; //au format uuidv4

  @Column({ name: "username" })
  username!: string; // cette propriété doit porter une contrainte d'unicité

  @Column({ name: "email" })
  //@isEmail()
  email!: string; // cette propriété doit porter une contrainte d'unicité

  @Column()
  password!: string;

  @Column({default: "Employee"})
  role?: 'Employee' | 'Admin' | 'ProjectManager' // valeur par defaut : 'Employee'
}
