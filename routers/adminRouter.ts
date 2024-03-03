import express from "express";
import { UserServices } from "../services/userServices";
import { UserDto } from "../dto/userDto";
import bycrypt from "bcrypt";
import { OrderServices } from "../services/orderServices";
import passport from "passport";
import { checkAdminRole } from "../middelware/authHandler";


const userService = new UserServices();
const orderService = new OrderServices();

export const adminRouter = express.Router();


adminRouter.post("/create_admin", passport.authenticate('jwt', {session: false}), checkAdminRole, async (req, res, next) => {
  try{
    const passwordHash = bycrypt.hashSync(req.body.password, 10);
    const userDto = new UserDto(req.body.email, req.body.name, passwordHash, true);
    const user = await userService.createUser(userDto);
    res.send(user);
  }catch(error){
    next(error)
  }
});



