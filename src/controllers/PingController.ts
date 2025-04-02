import { Request, Response, NextFunction } from "express";

export function Ping(req: Request, res: Response, next: NextFunction) {
    try {
        res.json({ data: "pong" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}