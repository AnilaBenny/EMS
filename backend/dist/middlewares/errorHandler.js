"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred';
    console.error(`Error: ${err.name}, StatusCode: ${statusCode}, Message: ${message}`);
    res.status(statusCode).json({
        error: {
            name: err.name,
            message,
        },
    });
};
exports.default = errorHandler;
