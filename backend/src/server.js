"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({

    origin: ['http://localhost:5173', 'https://ems-beta-seven.vercel.app'],

    credentials: true,
}));
app.use('/', authRoute_1.default);
const PORT = 8080;
console.log('App is starting...');
(0, database_1.connectToDatabase)().then(() => {
    console.log('Connected to the database');
    app.listen(8080, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
});
