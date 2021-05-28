import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { WebshopUser } from "./WebshopUser";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @Column({ default: 0, nullable: true })
  total_price: number;

  @Column({ nullable: true })
  dateOfPurchase: Date;

  @OneToOne(() => WebshopUser, (wsUser) => wsUser.cart)
  @JoinColumn()
  user: WebshopUser;

  @ManyToMany(() => Product, (product) => product.carts, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  products: Product[];
}
