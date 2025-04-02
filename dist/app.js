"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = server;
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middlewares/errorHandler");
const config_1 = require("./configs/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
app.get('/ping', async (req, res) => {
    console.log('masuk');
    res.status(200).send('OK');
});
app.use(errorHandler_1.errorHandler);
function setupServer() {
    const port = config_1.AppConfig.port;
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}
function server() {
    setupServer();
}
