"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRETKEY = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.SECRETKEY = process.env.SECRETKEY;
