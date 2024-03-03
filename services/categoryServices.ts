import { CategoryDto } from "../dto/categoryDto";
import { validateData } from "../middelware/dtoValidationMiddleware";
import Boom from "@hapi/boom";
import { createCategoryQuery, deleteCategoryQuery, findAllCategoriesQuery, findCategoryByIdQuery, findCategoryByNameQuery, updateCategoryDescriptionQuery, updateCategoryNameQuery } from "../prisma/queries/category queries/categoryQueriesIndex";

export class CategoryServices {

    async createCategory(categoryDto: CategoryDto) {

      const validationResult = await validateData(CategoryDto, categoryDto);
      if (validationResult.isValid) {
        const category = validationResult.validatedData;
        const validCategory = await createCategoryQuery(category as CategoryDto);
        return validCategory;
      }
      else {
        Boom.badData(validationResult.errors?.[0]);
      }
    }

    async getCategoryById(id: string) {
      const category = await findCategoryByIdQuery(id);
      if (category) {
          return category;
      }
      else {
          throw Boom.notFound('Category not found');
      }
    }

    async getAllCategories() {
      const categories = await findAllCategoriesQuery();
      if (categories) {
          return categories;
      }
      else {
        throw Boom.notFound('No categories found');
      }
    }


    async getCategoryByName(name: string) {
      const category = await findCategoryByNameQuery(name);
      if (category) {
          return category;
      }
      else {
        throw Boom.notFound('Category not found');
      }
    }

    async updateCategoryName(id: string, name: string) {
      const updatedCategory = await updateCategoryNameQuery(id, name);
      if (updatedCategory) {
          return updatedCategory;
      } else {
        throw Boom.notFound('Category not found');
      }
    }

    async updateCategoryDescription(id: string, description: string) {
      const updatedCategory = await updateCategoryDescriptionQuery(id, description);
      if (updatedCategory) {
          return updatedCategory;
      } else {
        throw Boom.notFound('Category not found');
      }
    }

    async deleteCategory(id: string) {
      const deletedCategory = await deleteCategoryQuery(id);
      if (deletedCategory) {
          return deletedCategory;
      } else {
        throw Boom.notFound('Category not found');
      }

    }
}
