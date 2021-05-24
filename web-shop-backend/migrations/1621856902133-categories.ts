import {MigrationInterface, QueryRunner} from "typeorm";

export class categories1621856902133 implements MigrationInterface {
    name = 'categories1621856902133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("category_id" SERIAL NOT NULL, "cateogry_name" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "version" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "webshop_user" ALTER COLUMN "version" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_8b4d0e2be5e945a828f313b4f30" FOREIGN KEY ("categoryCategoryId") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_8b4d0e2be5e945a828f313b4f30"`);
        await queryRunner.query(`ALTER TABLE "webshop_user" ALTER COLUMN "version" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "version" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryCategoryId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
