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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const Cart_1 = require("./Cart");
const Category_1 = require("./Category");
let Product = class Product {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "product_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "img_url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "amount", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Category_1.Category, (category) => category.product),
    __metadata("design:type", Category_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Cart_1.Cart, (cart) => cart.products, { nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "carts", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ nullable: true }),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: true }),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    typeorm_1.VersionColumn(),
    __metadata("design:type", Number)
], Product.prototype, "version", void 0);
Product = __decorate([
    typeorm_1.Entity()
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.js.map