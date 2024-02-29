import express, { Router } from "express";

export const authRouter = express.Router();

authRouter.get("/", (req, res) => {
    //login
});

authRouter.post("/", (req, res) => {
    //register
});
