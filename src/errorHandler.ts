import {NextFunction, Request, Response} from 'express';
import {AppError} from './AppError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({message: err.message});
    }
    console.error(err);
    res.status(500).json({message: 'Erreur interne du serveur'});
};