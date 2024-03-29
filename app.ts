import express from "express";
import { config } from "./config";
import { PrismaClient } from '@prisma/client'
import { routerApi } from "./routers";
import { boomErrorHandler, errorHandler } from "./middelware/errorHandler";
import cors from "cors";


const prisma = new PrismaClient()

async function main() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  require('./auth/strategies');
  routerApi(app);
  app.use(boomErrorHandler);
  app.use(errorHandler);

  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


