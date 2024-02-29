import express from "express";

export const usersRouter = express.Router();

usersRouter.get("/:userId", (req, res) => {
    //get user by id endpoint
});

usersRouter.get("/:email", (req, res) => {
  //get user by email endpoint
});

usersRouter.get("/roles", (req, res) => {
  //get users by roles endpoint
});

usersRouter.patch("/:userId/change_email", (req, res) => {
  //change email endpoint
});

usersRouter.patch("/:userId/change_password", (req, res) => {
  //change password endpoint
});

usersRouter.patch("/:userId/change_name", (req, res) => {
  //change name endpoint
});

usersRouter.delete("/:userId", (req, res) => {
  //delete user endpoint
});
