"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const calculatrice_controller_1 = require("./calculatrice.controller");
exports.router = express_1.default.Router();
exports.controller = new calculatrice_controller_1.CalculController();
// /calcul => GET
exports.router.post('/', exports.controller.calcul);
