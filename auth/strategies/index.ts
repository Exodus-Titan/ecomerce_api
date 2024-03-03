import passport from "passport";
import { localStrategy } from "./localStrategy";
import { JwtStrategy } from "./jwtStrategy";

passport.use(localStrategy);
passport.use(JwtStrategy);
