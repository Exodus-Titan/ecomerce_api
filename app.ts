import express from "express";
import 'dotenv/config';
import { PrismaClient } from '@prisma/client'
import { UserDto } from "./dto/userDto";
import { createUserQuery } from "./prisma/queries/user queries/createUserQuery";

const prisma = new PrismaClient()

async function main() {
  const app = express();
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

  const user = new UserDto('juan@ol.com', 'juan','10', false);
  console.log(await createUserQuery(user));
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


