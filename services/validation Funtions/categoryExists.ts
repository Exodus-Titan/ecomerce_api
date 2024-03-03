import { CategoryServices } from "../categoryServices";
const categoryService = new CategoryServices();

export async function categoryExists(categoryId: string) {;
  const category = await categoryService.getCategoryById(categoryId);
  if (category) {
    return true
  } else {
    return false
  }
}
