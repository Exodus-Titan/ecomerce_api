import express from "express";
import 'dotenv/config';
import main from "./prisma/prismaConnection";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

main();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
