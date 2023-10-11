import express from "express";
import Controller from "../controller/Controller.js";

let router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/students", Controller.getData);

    return app.use("/api/v1", router);
};

module.exports = initAPIRoutes;
