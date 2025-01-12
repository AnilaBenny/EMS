"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
function requestLogger(req, res, next) {
    logger_1.default.info('Incoming Request: %s %s', req.method, req.url);
    next();
}
exports.default = requestLogger;
