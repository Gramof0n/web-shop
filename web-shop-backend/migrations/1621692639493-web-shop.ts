import {MigrationInterface, QueryRunner} from "typeorm";

export class webShop1621692639493 implements MigrationInterface {
    name = 'webShop1621692639493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("product_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "img_url" character varying NOT NULL, "amount" integer NOT NULL, "category" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TABLE "webshop_user" ("webshop_user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_abef2ba50949df7bc1c105f80d7" PRIMARY KEY ("webshop_user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "webshop_user"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
