"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_routes_1 = __importDefault(require("./student.routes"));
const router = (0, express_1.Router)();
const url_prefix = "/api/v1";
router.use(`${url_prefix}/student`, new student_routes_1.default().getRouter());
exports.default = router;
