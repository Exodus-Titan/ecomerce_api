import { CategoryDto } from "../dto/categoryDto";
import { validateData } from "../middelware/dtoValidationMiddleware";
import Boom from "@hapi/boom";
import { createCategoryQuery, deleteCategoryQuery, findAllCategoriesQuery, findCategoryByIdQuery, findCategoryByNameQuery, updateCategoryDescriptionQuery, updateCategoryNameQuery } from "../prisma/queries/category queries/categoryQueriesIndex";
import { StringDto } from "../dto/stringDto";

export class CategoryServices {

    async createCategory(categoryDto: CategoryDto) {
      const validationResult = await validateData(CategoryDto, categoryDto);
      if (validationResult.isValid) {
        const category = validationResult.validatedData;
        const validCategory = await createCategoryQuery(category as CategoryDto);
        return validCategory;
      }
      else {
        throw Boom.badData(validationResult.errors?.[0]);
      }
    }

    async getCategoryById(categoryId: string) {
      const categoryIdDto = new StringDto(categoryId);
      const validationResult = await validateData<StringDto>(StringDto, categoryIdDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          const category = await findCategoryByIdQuery(data.string);
          if(category){
            return category;
          }else{
            throw Boom.notFound('Category not found');
          }
        }
        else {
            throw Boom.notFound('Category id not provided');
        }
      }else{
        throw Boom.badData(validationResult.errors?.[0]);
      }
    }

    async getAllCategories() {
      const categories = await findAllCategoriesQuery();
      if (categories && categories.length > 0) {
          return categories;
      }
      else {
        throw Boom.notFound('No categories found');
      }
    }


    async getCategoryByName(name: string) {
      const nameDto = new StringDto(name);
      const validationResult = await validateData<StringDto>(StringDto, nameDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          const category = await findCategoryByNameQuery(data.string);
          if (category) {
            return category;
          }else{
            throw Boom.notFound('Category not found');
          }
        }
        else {
          throw Boom.badData('Category name not provided');
        }
      }else{
        throw Boom.badData(validationResult.errors?.[0]);
      }
    }

    async updateCategoryName(categoryId: string, name: string) {
      const categoryIdDto = new StringDto(categoryId);
      const nameDto = new StringDto(name);
      const validationCategoryId = await validateData<StringDto>(StringDto, categoryIdDto);
      const vaidationName = await validateData<StringDto>(StringDto, nameDto);
      if (validationCategoryId.isValid) {
        const validId = validationCategoryId.validatedData;
        if (validId) {
          if (vaidationName.isValid) {
            const validName = vaidationName.validatedData;
            if (validName) {
            const updatedCategory = await updateCategoryNameQuery(validId.string, validName.string);
            if (updatedCategory) {
                return updatedCategory;
            } else {
              throw Boom.notFound('Category not found');
            }
          }else{
            throw Boom.notFound('Name not provided');
          }
        }else{
          throw Boom.badData(vaidationName.errors?.[0]);
        }
      }else{
        throw Boom.badData('Id not provided');
      }
      }else{
        throw Boom.badData(validationCategoryId.errors?.[0]);
      }
    }

    async updateCategoryDescription(categoryId: string, description: string) {
      const categoryIdDto = new StringDto(categoryId);
      const descriptionDto = new StringDto(description);
      const validationId = await validateData(StringDto, categoryIdDto);
      const vaidationDescription = await validateData(StringDto, descriptionDto);
      if (validationId.isValid) {
        const validId = validationId.validatedData;
        if (validId) {
          if (vaidationDescription.isValid) {
            const validDescription = vaidationDescription.validatedData;
            if (validDescription) {
            const updatedCategory = await updateCategoryDescriptionQuery(validId.string, validDescription.string);
            if (updatedCategory) {
                return updatedCategory;
            } else {
              throw Boom.notFound('Category not found');
            }
          }else{
            throw Boom.badData('Description not provided');
          }
        }else{
          throw Boom.badData(vaidationDescription.errors?.[0]);
        }
      }else{
        throw Boom.badData('Id not provided');
      }
      }else{
        throw Boom.badData(validationId.errors?.[0]);
      }
    }

    async deleteCategory(categoryId: string) {
      const categoryIdDto = new StringDto(categoryId);
      const validationResult = await validateData(StringDto, categoryIdDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          const deletedCategory = await deleteCategoryQuery(data.string);
          if (deletedCategory) {
              return deletedCategory;
          } else {
            throw Boom.notFound('Category not found');
          }
        }else {
          throw Boom.badData('Id not provided');
        }
      }else{
        throw Boom.badData(validationResult.errors?.[0]);
      }
    }
  }
