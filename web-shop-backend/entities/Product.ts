import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Category } from "./Category";

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

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @ManyToMany(() => Cart, (cart) => cart.products, { nullable: true })
  carts: Cart[];

  @Column()
  price: number;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @VersionColumn()
  version: number;
}
