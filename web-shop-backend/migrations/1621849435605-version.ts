import { MigrationInterface, QueryRunner } from "typeorm";

export class version1621849435605 implements MigrationInterface {
  name = "version1621849435605";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "version" integer`);
    await queryRunner.query(`ALTER TABLE "webshop_user" ADD "version" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "version"`);
  }
}
