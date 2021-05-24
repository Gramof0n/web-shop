"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version1621849435605 = void 0;
class version1621849435605 {
    constructor() {
        this.name = "version1621849435605";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" ADD "version" integer`);
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "version" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "version"`);
    }
}
exports.version1621849435605 = version1621849435605;
//# sourceMappingURL=1621849435605-version.js.map