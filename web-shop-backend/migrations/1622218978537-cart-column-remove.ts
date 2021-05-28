import {MigrationInterface, QueryRunner} from "typeorm";

export class cartColumnRemove1622218978537 implements MigrationInterface {
    name = 'cartColumnRemove1622218978537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "isCheckedOut"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "isCheckedOut" boolean DEFAULT false`);
    }

}
