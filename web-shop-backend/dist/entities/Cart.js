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
exports.Cart = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const WebshopUser_1 = require("./WebshopUser");
let Cart = class Cart {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cart.prototype, "cart_id", void 0);
__decorate([
    typeorm_1.Column({ default: 0, nullable: true }),
    __metadata("design:type", Number)
], Cart.prototype, "total_price", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Cart.prototype, "dateOfPurchase", void 0);
__decorate([
    typeorm_1.OneToOne(() => WebshopUser_1.WebshopUser, (wsUser) => wsUser.cart),
    typeorm_1.JoinColumn(),
    __metadata("design:type", WebshopUser_1.WebshopUser)
], Cart.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Product_1.Product, (product) => product.carts, {
        cascade: true,
        nullable: true,
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Cart.prototype, "products", void 0);
Cart = __decorate([
    typeorm_1.Entity()
], Cart);
exports.Cart = Cart;
//# sourceMappingURL=Cart.js.map