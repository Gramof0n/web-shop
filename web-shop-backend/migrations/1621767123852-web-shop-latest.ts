import {MigrationInterface, QueryRunner} from "typeorm";

export class webShopLatest1621767123852 implements MigrationInterface {
    name = 'webShopLatest1621767123852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "username"`);
    }

}
