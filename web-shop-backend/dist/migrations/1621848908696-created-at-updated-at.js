"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdAtUpdatedAt1621848908696 = void 0;
class createdAtUpdatedAt1621848908696 {
    constructor() {
        this.name = 'createdAtUpdatedAt1621848908696';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "created_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "created_at" TIMESTAMP DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_at"`);
    }
}
exports.createdAtUpdatedAt1621848908696 = createdAtUpdatedAt1621848908696;
//# sourceMappingURL=1621848908696-created-at-updated-at.js.map