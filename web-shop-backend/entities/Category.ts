import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id?: number;

  @Column()
  category_name: string;

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date;

  @CreateDateColumn({ nullable: true })
  created_at?: Date;

  @VersionColumn()
  version?: number;

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  product?: Product[];
}
