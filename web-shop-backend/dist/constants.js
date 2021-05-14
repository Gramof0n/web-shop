"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__prod__ = exports.MAIL_REGEX = exports.PORT = void 0;
exports.PORT = process.env.PORT || 4000;
exports.MAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
exports.__prod__ = process.env.NODE_ENV === "production";
//# sourceMappingURL=constants.js.map