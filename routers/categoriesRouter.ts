import express from "express";

export const categoriesRouter = express.Router();

categoriesRouter.get("/", (req, res) => {
  //get all categories endpoint
});

categoriesRouter.get("/:categoryId", (req, res) => {
  //get category by id endpoint
});

categoriesRouter.get("/:name", (req, res) => {
  //get category by name endpoint
});

categoriesRouter.post("/create_category", (req, res) => {
  //create category endpoint
});

categoriesRouter.patch("/:categoryId/change_name", (req, res) => {
  //change name endpoint
});

categoriesRouter.patch("/:categoryId/change_description", (req, res) => {
  //change description endpoint
});

categoriesRouter.delete("/:categoryId", (req, res) => {
  //delete category endpoint
});
