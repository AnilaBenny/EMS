import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
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

export default errorHandler;
