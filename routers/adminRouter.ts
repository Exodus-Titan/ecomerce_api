import express from "express";

export const adminRouter = express.Router();

adminRouter.get("/all_users", (req, res) => {
  //get all users endpoint
  console.log("get all users");
});

adminRouter.post("/:userId/create_admin", (req, res) => {
  //create admin user endpoint
});

adminRouter.get("/", (req, res) => {
  //get all orders endpoint
});
