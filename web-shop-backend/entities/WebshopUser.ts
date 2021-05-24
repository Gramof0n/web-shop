import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class WebshopUser {
  @PrimaryGeneratedColumn()
  webshop_user_id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @VersionColumn()
  version: number;
}
