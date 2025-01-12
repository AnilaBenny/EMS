interface CustomError extends Error {
    statusCode: number;
}

class UnauthorizedError extends Error implements CustomError {
    statusCode: number;

    constructor(message = 'Unauthorized access') {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
        Object.setPrototypeOf(this, UnauthorizedError.prototype); 
    }
}

class NotFoundError extends Error implements CustomError {
    statusCode: number;

    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype); 
    }
}

class ValidationError extends Error implements CustomError {
    statusCode: number;

    constructor(message = 'Validation error') {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        Object.setPrototypeOf(this, ValidationError.prototype); 
    }
}

class InternalServerError extends Error implements CustomError {
    statusCode: number;

    constructor(message = 'Internal server error') {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
        Object.setPrototypeOf(this, InternalServerError.prototype); 
    }
}

export { UnauthorizedError, NotFoundError, ValidationError, InternalServerError };
