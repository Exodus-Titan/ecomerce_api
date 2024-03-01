import { CategoryDto } from "../dto/categoryDto";
import { validateData } from "../middelware/dtoValidationMiddleware";
import { createCategoryQuery, deleteCategoryQuery, findAllCategoriesQuery, findCategoryByIdQuery, findCategoryByNameQuery, updateCategoryDescriptionQuery, updateCategoryNameQuery } from "../prisma/queries/category queries/categoryQueriesIndex";

export class CategoryServices {

    async createCategory(categoryDto: CategoryDto) {

        try {
          const validationResult = await validateData(CategoryDto, categoryDto);
          if (validationResult.isValid) {
            const category = validationResult.validatedData;
            if (category) {
              const validCategory = await createCategoryQuery(category);
              return validCategory;
            } else {
              throw new Error('Invalid Category');
            }
          }
          else {
            throw new Error(validationResult.errors?.[0]);
          }
        }
        catch (error) {
          console.log(error); //enviar un mensaje con el error
        }
    }

    async getCategoryById(id: string) {
        try {
            const category = await findCategoryByIdQuery(id);
            if (category) {
                return category;
            }
            else {
                throw new Error('Category not found');
            }
        }
        catch (error) {
            console.log(error); //enviar un mensaje con el error
        }
    }

    async getAllCategories() {
        try {
            const categories = await findAllCategoriesQuery();
            if (categories) {
                return categories;
            }
            else {
                throw new Error('No categories found');
            }
        }
        catch (error) {
            console.log(error); //enviar un mensaje con el error
        }
    }
    async getCategoryByName(name: string) {
      try {
        const category = await findCategoryByNameQuery(name);
        if (category) {
            return category;
        }
        else {
            throw new Error('Category not found');
        }
    }
    catch (error) {
        console.log(error); //enviar un mensaje con el error
    }
    }

    async updateCategoryName(id: string, name: string) {
        try {
            const updatedCategory = await updateCategoryNameQuery(id, name);
            if (updatedCategory) {
                return updatedCategory;
            } else {
                throw new Error('Category not found');
            }
        } catch (error) {
            console.log(error); //enviar un mensaje con el error
        }
    }

    async updateCategoryDescription(id: string, description: string) {
        try {
            const updatedCategory = await updateCategoryDescriptionQuery(id, description);
            if (updatedCategory) {
                return updatedCategory;
            } else {
                throw new Error('Category not found');
            }
        } catch (error) {
            console.log(error); //enviar un mensaje con el error
        }
    }

    async deleteCategory(id: string) {
        try {
            const deletedCategory = await deleteCategoryQuery(id);
            if (deletedCategory) {
                return deletedCategory;
            } else {
                throw new Error('Category not found');
            }
        } catch (error) {
            console.log(error); //enviar un mensaje con el error
        }
    }
}
