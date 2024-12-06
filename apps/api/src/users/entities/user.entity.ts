import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  githubId: string

  @Column()
  name: string

  @Column({ nullable: true })
  email: string
}
