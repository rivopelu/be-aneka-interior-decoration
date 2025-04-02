"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = Ping;
function Ping(req, res, next) {
    try {
        res.json({ data: "pong" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
