import express from "express";
import { UserServices } from "../services/userServices";
import bcrypt from "bcrypt";
import passport from "passport";
import { checkAdminRole, checkIdMatch } from "../middelware/authHandler";

const userService = new UserServices();

export const usersRouter = express.Router();
//Falta verificacion de permisos

usersRouter.get("/all_users", passport.authenticate('jwt', {session: false}), checkAdminRole, async (req, res, next) => {
  try{
    const users = await userService.getAllUsers();
    res.send(users);
  }catch(error){
    next(error)
  }
});

usersRouter.get("/email", passport.authenticate('jwt', {session: false}), checkAdminRole, async (req, res, next) => {
  try{
    const email = req.body.email;
    const user = await userService.getUserByEmail(email);
    res.send(user);
  }catch(error){
    next(error);
  }
});

usersRouter.get("/roles", passport.authenticate('jwt', {session: false}), checkAdminRole, async (req, res, next) => {
  try{
    console.log('sip');
    let role = false;
    if (req.body.role === 'admin') {
      role = true;
    }
    else{
      role = false;
    }
    const users = await userService.getUsersByRole(role);
    res.send(users);
  }catch(error){
    next(error);
  }
});


usersRouter.patch("/:userId/change_email", passport.authenticate('jwt', {session: false}), checkIdMatch,  async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const newEmail = req.body.email;
    const user = await userService.updateEmail(userId, newEmail);
    res.send(user);
  }catch(error){
    next(error);
  }
});

usersRouter.patch("/:userId/change_password", passport.authenticate('jwt',  {session: false}), checkIdMatch, async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const newPassword = req.body.password;
    const newHash = await bcrypt.hash(newPassword, 10);
    const user = await userService.updatePasswordHash(userId, newHash);
    res.send(user);
  }catch(error){
    next(error);
  }
});

usersRouter.patch("/:userId/change_name", passport.authenticate('jwt',  {session: false}), checkIdMatch, async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const newName = req.body.name;
    const user = await userService.updateUserName(userId, newName);
    res.send(user);
  }catch(error){
    next(error);
  }
});

usersRouter.delete("/:userId", passport.authenticate('jwt', {session: false}), checkIdMatch, async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const user = await userService.deleteUser(userId);
    res.send(user);
  }catch(error){
    next(error);
  }
});

usersRouter.get("/:userId", passport.authenticate('jwt', {session: false}), async (req, res, next ) => {

    try{
        const userId = req.params.userId;
        const user = await userService.getUserById(userId);
        res.send(user);
    }catch(error){
        next(error);
    }
});
