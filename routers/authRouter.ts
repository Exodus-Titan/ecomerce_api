import express from "express";
import passport from "passport";
import { signToken } from "../auth/jwt/signToken";
import { User } from "@prisma/client";
import { removePassword } from "../prisma/queries/common functions/excludePassword";
import { UserDto } from "../dto/userDto";
import bycrypt from "bcrypt";
import { AuthServices } from "../services/authServices";

const authService = new AuthServices();
export const authRouter = express.Router();

authRouter.get("/login", passport.authenticate('local', {session:false}) , async (req, res, next) => {
    try {
      if(!req.user)
        throw new Error("User not found");
      const user = removePassword(req.user as User);
      const token = signToken(user.id, user.role);
      res.send({
        user,
        token
      });
    } catch (error) {
        next(error);
    }
});

authRouter.post("/register", async (req, res, next) => {
  try {
      const passwordHash = bycrypt.hashSync(req.body.password, 10);
      const newUserDto = new UserDto(req.body.email, req.body.name, passwordHash, false);
      const newUser = await authService.registerUser(newUserDto);
      res.send(newUser);
    } catch (error) {
        next(error);
    }
});
