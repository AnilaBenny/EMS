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
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const logger_1 = __importDefault(require("./utils/logger"));
const requestLogger_1 = __importDefault(require("./utils/requestLogger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://ems-beta-seven.vercel.app'],
    credentials: true,
}));
app.use(requestLogger_1.default);
app.use('/', authRoute_1.default);
app.use(errorHandler_1.default);
const PORT = 8080;
logger_1.default.info('App is starting...');
(0, database_1.connectToDatabase)().then(() => {
    logger_1.default.info('Connected to the database');
    app.listen(8080, () => {
        logger_1.default.info(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    logger_1.default.error('Failed to connect to the database:', error);
});
exports.default = app;
