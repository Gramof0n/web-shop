"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webShopLatest1621768020736 = void 0;
class webShopLatest1621768020736 {
    constructor() {
        this.name = 'webShopLatest1621768020736';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "is_admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "webshop_user" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "webshop_user" DROP COLUMN "is_admin"`);
    }
}
exports.webShopLatest1621768020736 = webShopLatest1621768020736;
//# sourceMappingURL=1621768020736-web-shop-latest.js.map