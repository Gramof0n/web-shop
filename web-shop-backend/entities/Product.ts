import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
