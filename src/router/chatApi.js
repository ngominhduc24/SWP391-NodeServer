import express from "express";
import db from '../utils/dbContext';
import jwt from '../utils/jwt';

let router = express.Router();

const initChatAPIRoutes = (app) => {
    router.get("/chat/:token", async (req, res) => {

        let decoded = jwt.decode(req.params.token)

        if (decoded) {
            let classId = parseInt(decoded.classId, 10);

            //check db
            if(await db.findOne('chat_class', {classId}) == null)
                db.insertOne('chat_class', {
                    classId: classId,
                    message: [],
                })

            // response chat db
            res.send(await db.findOne('chat_class', {classId}));

        } else res.status(403).send('error');

    });

    return app.use("/api/v1", router);
};

module.exports = initChatAPIRoutes;
