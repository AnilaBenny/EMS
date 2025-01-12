"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ValidationError = exports.NotFoundError = exports.UnauthorizedError = void 0;
class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized access') {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends Error {
    constructor(message = 'Validation error') {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
class InternalServerError extends Error {
    constructor(message = 'Internal server error') {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
exports.InternalServerError = InternalServerError;
