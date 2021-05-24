import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  img_url: string;

  @Column()
  amount: number;

  @Column()
  category: string;

  @Column()
  price: number;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @VersionColumn()
  version: number;
}
