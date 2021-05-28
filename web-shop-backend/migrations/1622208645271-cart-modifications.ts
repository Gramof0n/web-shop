import {MigrationInterface, QueryRunner} from "typeorm";

export class cartModifications1622208645271 implements MigrationInterface {
    name = 'cartModifications1622208645271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "isCheckedOut" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "purchasedAmount" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "dateOfPurchase" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "dateOfPurchase"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "purchasedAmount"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "isCheckedOut"`);
    }

}
