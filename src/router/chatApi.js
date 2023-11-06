import express from "express";
import db from '../utils/dbContext';
import jwt from '../utils/jwt';

let router = express.Router();

const initChatAPIRoutes = (app) => {
    router.get("/chat/:token", async (req, res) => {

        let decoded = jwt.decode(req.params.token)

        if (decoded) {
            
            res.send(await db.findOne('chat_class', {classId: parseInt(decoded.classId, 10)}));

        } else res.status(403).send('error');

    });

    return app.use("/api/v1", router);
};

module.exports = initChatAPIRoutes;
