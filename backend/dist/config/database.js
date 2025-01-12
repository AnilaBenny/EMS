"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.closeDatabase = closeDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseURI = process.env.MONGODB_URI;
async function connectToDatabase() {
    try {
        if (!databaseURI) {
            console.log('not found');
            throw new Error('MONGODB_URI is not defined in the environment variables.');
        }
        await mongoose_1.default.connect(databaseURI);
        console.log('MongoDB Connected');
    }
    catch (err) {
        console.error('Error connecting to MongoDB: ' + err.message);
        throw err;
    }
}
async function closeDatabase() {
    try {
        await mongoose_1.default.connection.close();
        console.log('MongoDB connection closed');
    }
    catch (err) {
        console.error('Error closing MongoDB connection: ' + err.message);
        throw err;
    }
}
