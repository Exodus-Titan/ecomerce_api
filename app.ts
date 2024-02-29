import express from "express";
import 'dotenv/config';
import { PrismaClient } from '@prisma/client'
import { routerApi } from "./routers";

const prisma = new PrismaClient()

async function main() {
  const app = express();
  app.use(express.json());
  routerApi(app);


  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
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


