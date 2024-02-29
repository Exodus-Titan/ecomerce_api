import express from "express";
import { usersRouter } from "./usersRouter";
import { adminRouter } from "./adminRouter";
import { categoriesRouter } from "./categoriesRouter";
import { ordersRouter } from "./ordersRouter";
import { productsRouter } from "./productsRouter";
import { authRouter } from "./authRouter";

export function routerApi(app: express.Application){
  const router = express.Router();
  app.use("/api", router);
  router.use("/user", usersRouter);
  router.use("/admin", adminRouter);
  router.use("/category", categoriesRouter);
  router.use("/order", ordersRouter);
  router.use("/product", productsRouter);
  router.use("/auth", authRouter);
  return router;
}
