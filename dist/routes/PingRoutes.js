"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/ping', (req, res) => {
    console.log("HELLO WORD");
    res.json({ data: "ping" });
});
exports.PingRoutes = router;
