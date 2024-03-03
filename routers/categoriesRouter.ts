import express from "express";
import { CategoryServices } from "../services/categoryServices";
import { CategoryDto } from "../dto/categoryDto";
import passport from "passport";
import { checkAdminRole } from "../middelware/authHandler";

const categoryService = new CategoryServices();

export const categoriesRouter = express.Router();


categoriesRouter.get("/", async (req, res, next) => {
  try{
    const categories = await categoryService.getAllCategories();
    res.send(categories);
  }catch(error){
    next(error)
  }
});

categoriesRouter.post("/create_category",passport.authenticate('jwt', {session: false}), checkAdminRole, async (req, res, next) => {
  try{
    const categoryDto = new CategoryDto(req.body.name, req.body.description);
    const category = await categoryService.createCategory(categoryDto);
    res.send(category);
  }catch(error){
    next(error)
  }
});


categoriesRouter.get("/name", async (req, res, next) => {
  try{
    const name = req.body.name;
    const category = await categoryService.getCategoryByName(name);
    res.send(category);
  }catch(error){
    next(error)
  }
});


categoriesRouter.patch("/:categoryId/change_name",passport.authenticate('jwt', {session: false}), checkAdminRole, async (req, res, next) => {
  try{
    const categoryId = req.params.categoryId;
    const newName = req.body.name;
    const category = await categoryService.updateCategoryName(categoryId, newName);
    res.send(category);
  }catch(error){
    next(error)
  }
});

categoriesRouter.patch("/:categoryId/change_description",passport.authenticate('jwt', {session: false}), checkAdminRole, async (req, res, next) => {
  try{
    const categoryId = req.params.categoryId;
    const newDescription = req.body.description;
    const category = await categoryService.updateCategoryDescription(categoryId, newDescription);
    res.send(category);
  }catch(error){
    next(error)
  }
});

categoriesRouter.delete("/:categoryId",passport.authenticate('jwt', {session: false}), checkAdminRole, async (req, res, next) => {
  try{
    const categoryId = req.params.categoryId;
    const category = await categoryService.deleteCategory(categoryId);
    res.send(category);
  }catch(error){
    next(error)
  }
});

categoriesRouter.get("/:categoryId", async (req, res, next) => {
  try{
    const categoryId = req.params.categoryId;
    const category = await categoryService.getCategoryById(categoryId);
    res.send(category);
  }catch(error){
    next(error)
  }
});
