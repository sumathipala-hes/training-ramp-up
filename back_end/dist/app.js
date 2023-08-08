"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
// dotenv configuration
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const db_config_1 = require("./configs/db.config");
// Create the express app
const app = (0, express_1.default)();
// Here you can add more origins to allow CORS
const allowedOrigins = ['http://localhost:3000'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));
// if you are receiving JSON data in request-body
app.use(express_1.default.json());
// Mount the routes at /resourse URL path
app.use('/', routes_1.default);
db_config_1.dataSource.initialize().then(() => {
    console.log('Database connection established successfully');
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...!`);
});
