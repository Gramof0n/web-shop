"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebshopUser = void 0;
const typeorm_1 = require("typeorm");
const Cart_1 = require("./Cart");
let WebshopUser = class WebshopUser {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WebshopUser.prototype, "webshop_user_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WebshopUser.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WebshopUser.prototype, "surname", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WebshopUser.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WebshopUser.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WebshopUser.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], WebshopUser.prototype, "is_admin", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], WebshopUser.prototype, "is_deleted", void 0);
__decorate([
    typeorm_1.OneToOne(() => Cart_1.Cart, (cart) => cart.user),
    __metadata("design:type", Cart_1.Cart)
], WebshopUser.prototype, "cart", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ nullable: true }),
    __metadata("design:type", Date)
], WebshopUser.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: true }),
    __metadata("design:type", Date)
], WebshopUser.prototype, "created_at", void 0);
__decorate([
    typeorm_1.VersionColumn(),
    __metadata("design:type", Number)
], WebshopUser.prototype, "version", void 0);
WebshopUser = __decorate([
    typeorm_1.Entity()
], WebshopUser);
exports.WebshopUser = WebshopUser;
//# sourceMappingURL=WebshopUser.js.map