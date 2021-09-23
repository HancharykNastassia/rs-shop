export interface SubcategoryModel {
  id: string;
  name: string;
}

export interface CategoryModel {
  id: string;
  name: string;
  subCategories: SubcategoryModel[];
}
