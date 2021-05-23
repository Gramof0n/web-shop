import {MigrationInterface, QueryRunner} from "typeorm";

export class webShopLatest1621767815228 implements MigrationInterface {
    name = 'webShopLatest1621767815228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "is_admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "is_admin"`);
    }

}
