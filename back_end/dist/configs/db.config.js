"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const student_model_1 = require("../models/student.model");
const DataSource_1 = require("typeorm/data-source/DataSource");
exports.dataSource = new DataSource_1.DataSource({
    type: 'postgres',
    // host: process.env.DB,
    // port: Number(process.env.DB_PORT),
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME,
    // entities: [Student],
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'rampupapp',
    entities: [student_model_1.Student],
    synchronize: true,
    logging: true,
});
