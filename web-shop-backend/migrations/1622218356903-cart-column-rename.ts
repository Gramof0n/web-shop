import {MigrationInterface, QueryRunner} from "typeorm";

export class cartColumnRename1622218356903 implements MigrationInterface {
    name = 'cartColumnRename1622218356903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "purchasedAmount" TO "total_price"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "total_price" TO "purchasedAmount"`);
    }

}
