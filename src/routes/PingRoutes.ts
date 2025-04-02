import {Router} from "express";

const router = Router();

router.get('/ping',(req, res) => {
    console.log("HELLO WORD");
    res.json({ data: "ping" });
});

export const PingRoutes = router;
